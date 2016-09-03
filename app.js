//(function(d, t, c, m) {
//    function Cursor(cursorElement) {
//        this.cursor = cursorElement;
//        this.hide = () => this.cursor.innerHTML = "&nbsp;";
//        this.show = () => this.cursor.innerHTML = "|";
//    }
//
//    function fadeIn(el) {
//        el.style.opacity = 0;
//        var last = +new Date();
//        var tick = function() {
//            el.style.opacity = +el.style.opacity + (new Date() - last) / 400;
//            last = +new Date();
//            if (+el.style.opacity < 1) {
//                (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
//            } else {
//                fadeOut(el);
//            }
//        };
//        tick();
//    }
//    
//    function fadeOut(el){
//     //   el.style.opacity = 0;    
//    }
//
//    function Text(text, cursor) {
//        this.text = text;
//        this.cursor = cursor;
//        this.intervalTime = 0;
//        this.setInterval = interval => this.intervalTime = interval;
//        this.write = div => {
//            var step = 0;
//            var cursorStep = 0;
//            var len = this.text.length;
//            var cursorInterval = setInterval(() => {
//                if (cursorStep % 2 == 0) {
//                    this.cursor.hide();
//                } else {
//                    this.cursor.show();
//                }
//                cursorStep++;
//            }, this.intervalTime / 2);
//            var interval = setInterval(() => {
//                if (step < len) {
//                    div.innerHTML += this.text.substr(step, 1);
//                    step++;
//                } else {
//                    var w = window,
//                        d = document,
//                        e = d.documentElement,
//                        g = d.getElementsByTagName('body')[0],
//                        x = w.innerWidth || e.clientWidth || g.clientWidth,
//                        y = w.innerHeight || e.clientHeight || g.clientHeight;
//                    var rows = m.innerHTML.split("<br />").length;
//                    m.style.marginLeft = x / 2 + div.offsetWidth - c.offsetWidth - div.innerHTML.length * 8 + "px";
//                    m.style.marginTop = y / 2 + rows * 10 - 10 + "px";
//                    clearInterval(interval);
//                    clearInterval(cursorInterval);
//                    setTimeout(() => {
//                        this.cursor.hide();
//                        if (x > (20 + parseInt(m.offsetWidth) + parseInt(m.style.marginLeft))) {
//                            fadeIn(m);
//                        }
//                    }, this.intervalTime / 2);
//                }
//            }, this.intervalTime);
//        }
//    }
//    var cursor = new Cursor(c);
//    var text = new Text(t, cursor);
//    text.setInterval(300);
//    text.write(d);
//})(document.getElementById("text"), _message, document.getElementById("cursor"),document.getElementById("textMessage"));
//window.addEventListener('resize', () => {
//    var m = document.getElementById("textMessage");
//    var w = window,
//        d = document,
//        e = d.documentElement,
//        g = d.getElementsByTagName('body')[0],
//        x = w.innerWidth || e.clientWidth || g.clientWidth,
//        y = w.innerHeight || e.clientHeight || g.clientHeight;
//    var div = document.getElementById("text");
//    var c = document.getElementById("cursor");
//    var rows = m.innerHTML.split("<br />").length;
//    m.style.marginLeft = x / 2 + div.offsetWidth - c.offsetWidth - div.innerHTML.length * 8 + "px";
//    m.style.marginTop = y / 2 + rows * 10 - 10 + "px";
//    m.style.opacity = x <= (20 + parseInt(m.offsetWidth) + parseInt(m.style.marginLeft)) ? 0 : 1;
//    
//});

var timer, fullText, currentOffset, onComplete, wordSet;

function Speak(person, text, callback) {
    $("#name").html(person);
    fullText = text;
    wordSet = text.split(" ");
    currentOffset = 0;
    onComplete = callback;
    timer = setInterval(onTick, 300);
}

function onTick() {
    currentOffset++;
    if (currentOffset == wordSet.length) {
        complete();
        return;
    }
    var text = "";
    for(var i = 0; i < currentOffset; i++){
     text += wordSet[i] + " ";   
    }
    text.trim();
    $("#message").html(text);
}

function complete() {
    clearInterval(timer);
    timer = null;
    $("#message").html(fullText);
    if (onComplete) onComplete();
}


Speak("wewep",
    "Hey, I hope you have enough time to discover the phenomenon wewep",

function () {
    setTimeout(function () {
    }, 2000);
});