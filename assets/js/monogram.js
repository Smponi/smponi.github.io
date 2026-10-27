/* ASCII monogram: an extruded "P", raymarched into characters.
   Pure function so the same code renders the static fallback frame at build time. */
window.renderMonogram = (function () {
  var RAMP = ".,-~:;=!*#$@";
  var CW = 0.6, CH = 1.2; // JetBrains Mono cell (advance width / line-height) in em
  var CAM = 6, R = 1.22;  // camera distance, bounding sphere radius
  var LAMP = [-1.6, 1.9, -2.4], VIEW = [0, 0, -1];
  var K = [[1, -1, -1], [-1, -1, 1], [-1, 1, -1], [1, 1, 1]], E = 0.003;

  function norm(x, y, z) { var l = Math.hypot(x, y, z); return [x / l, y / l, z / l]; }

  function sdP(x, y, z) {
    x -= 0.1;
    var sx = Math.abs(x + 0.36) - 0.16, sy = Math.abs(y) - 1;
    var stem = Math.hypot(Math.max(sx, 0), Math.max(sy, 0)) + Math.min(Math.max(sx, sy), 0);
    var bx = x + 0.2, by = y - 0.45;
    var bowl = Math.max(Math.abs(Math.hypot(bx, by) - 0.39) - 0.16, -bx);
    var d = Math.min(stem, bowl), w = Math.abs(z) - 0.2;
    return Math.min(Math.max(d, w), 0) + Math.hypot(Math.max(d, 0), Math.max(w, 0)) - 0.04;
  }

  return function (cols, rows, yaw, pitch) {
    var cy = Math.cos(yaw), sy = Math.sin(yaw), cp = Math.cos(pitch), sp = Math.sin(pitch);
    function rot(v) {
      var x = v[0] * cy + v[2] * sy, z = -v[0] * sy + v[2] * cy;
      return [x, v[1] * cp - z * sp, v[1] * sp + z * cp];
    }
    var lamp = rot(LAMP), V = rot(VIEW);
    var o = rot([0, 0, -CAM]), scale = 2.8 / (rows * CH), out = "";

    for (var j = 0; j < rows; j++) {
      for (var i = 0; i < cols; i++) {
        var d = norm((i + 0.5 - cols / 2) * CW * scale, (rows / 2 - j - 0.5) * CH * scale, CAM);
        d = rot(d);
        var b = o[0] * d[0] + o[1] * d[1] + o[2] * d[2], disc = b * b - (CAM * CAM - R * R), ch = " ";
        if (disc > 0) {
          var t = -b - Math.sqrt(disc), tFar = -b + Math.sqrt(disc);
          for (var s = 0; s < 48 && t < tFar; s++) {
            var px = o[0] + d[0] * t, py = o[1] + d[1] * t, pz = o[2] + d[2] * t, dist = sdP(px, py, pz);
            if (dist < 0.002) {
              var n = [0, 0, 0];
              for (var k = 0; k < 4; k++) {
                var f = sdP(px + K[k][0] * E, py + K[k][1] * E, pz + K[k][2] * E);
                n[0] += K[k][0] * f; n[1] += K[k][1] * f; n[2] += K[k][2] * f;
              }
              n = norm(n[0], n[1], n[2]);
              // point light: falloff across the flat face gives it a gradient instead of one flat glyph
              var L = norm(lamp[0] - px, lamp[1] - py, lamp[2] - pz), H = norm(L[0] + V[0], L[1] + V[1], L[2] + V[2]);
              var fall = 9 / (Math.pow(lamp[0] - px, 2) + Math.pow(lamp[1] - py, 2) + Math.pow(lamp[2] - pz, 2));
              var diff = Math.max(0, n[0] * L[0] + n[1] * L[1] + n[2] * L[2]) * fall;
              var spec = Math.pow(Math.max(0, n[0] * H[0] + n[1] * H[1] + n[2] * H[2]), 20);
              var lum = Math.min(1, 0.04 + 0.62 * diff + 0.5 * spec);
              ch = RAMP[Math.min(RAMP.length - 1, Math.floor(lum * RAMP.length))];
              break;
            }
            t += dist;
          }
        }
        out += ch;
      }
      out += "\n";
    }
    return out;
  };
})();
