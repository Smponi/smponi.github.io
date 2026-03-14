---
title: "Das Ding mit KI in der Software-Entwicklung..."
date: "2026-01-19"
tags: ["Software-Entwicklung", "UX", "Codex", "Claude Code", "Ralph Wiggum"]
description: "Meine Gedanken über die Entwicklung der Software-Entwicklung mit KI."
---

Bevor wir loslegen: kleiner Background zu mir und KI. Mein Wort ist nicht auf die Goldwaage zu legen. Bis auf eine KI‑Vorlesung im Studium und eine alte MIT‑Vorlesung auf YouTube kann ich zum inneren Aufbau von LLMs wenig Substanzielles beitragen.

Was ich mir aber zutraue: halbwegs gut einschätzen, was einen guten Software‑Entwickler ausmacht. Und wenn ich *einen* Punkt nennen müsste (gegen alle romantischen Ideale von “Ich kann alles auswendig”): **offen und engagiert für Neues**. Genau da steht KI gerade – und sie geht auch nicht mehr weg.

Meine aktuelle Leitthese dazu:

> **KI macht Code günstiger. Urteilskraft, Dokumentation und Verantwortung werden teurer. Falsche Dokumentation kann extremst teuer werden.**

Und damit zur Frage, die eigentlich alle stellen:

## Wird KI Software‑Entwickler obsolet machen?
Well… that’s not that simple. *(Spoiler: Nein.)*

## “Schreibt KI guten Code?” – und was heißt überhaupt “gut”?

KI ändert nicht nur *wie schnell* wir entwickeln, sondern *wie* wir über Qualität nachdenken. Typische Fragen:

- Wird der Code “gut”?
- Heißt “gut”: leicht zu verstehen?
- Viele Kommentare?
- Sicher?
- Defensiv oder offensiv programmiert?
- Edge Cases abgedeckt?
- Folgt das allen *clean patterns*?
- ...

Ein paar Punkte sind relativ klar, andere sind Philosophie.

**Sicherer Code** sollte (hoffentlich) immer das Ziel sein.  
**Offensiv vs. defensiv** ist für mich bis heute nicht schwarz‑weiß. Beides kann richtig sein – je nach Produkt, Risiko, Team und Kontext.

Aber bei einem Punkt habe ich meine Meinung geändert:

### “Gut” heißt nicht automatisch: direkt lesbar für Menschen
Ich bin mir nicht mehr sicher, ob guter Code per se bedeutet, dass er für *uns* auf Anhieb “schön” ist. Und ich glaube auch nicht, dass er *viele* Kommentare braucht.

Provokant gefragt: **Braucht KI Kommentare?**  
Wenn ein Modell den Code in Sekunden querlesen, refactoren und testen kann, sind Kommentare, die nur nacherzählen, was der Code ohnehin tut, oft nur: zusätzliche Tokens, zusätzliche Drift‑Gefahr, zusätzliche Pflege.

Wichtiger ist etwas anderes: **Intent und Wahrheit.**  
Und die stecken aus meiner Sicht vor allem in:

- **Tests** (was muss wahr sein?)
- **Constraints/Invariants** (was darf nie passieren?)
- **Architektur‑Doku** (wie ist das System gedacht?)
- **Entscheidungsgründen** (warum so und nicht anders?)

Kurz: Nicht weniger Dokumentation – sondern weniger Nacherzählung.


## Code macht einen Full Circle (und das ist gar nicht so romantisch)

Wir haben historisch irgendwo bei **Assembly** angefangen. Zeig heute vielen Entwicklern Assembly – und die meisten (mich eingeschlossen) werden nicht spontan verstehen, was da passiert. Rudimentäre Kenntnisse? Klar. Aber “mal eben lesen”? Eher nicht. (Shout out an FFmpeg-Entwickler, ihr seid echte Magier.)

Dann ging es jahrelang in die Gegenrichtung:

- Programmiersprachen wurden **lesbarer** für Menschen,
- Syntax wurde **einfacher**,
- Boilerplate wurde **reduziert** (Selbst in java kann man mittlerweile ohne viel Code eine main Methode schreiben. Undenkbar.),
- der Fokus: Menschen sollen das System verstehen und ändern können.

Und jetzt kommt KI – und dreht das Spielfeld leicht an:  
**Code muss nicht mehr ausschließlich das Haupt‑Thema für uns sein.** Er ist zunehmend ein präziser Bauplan, den Maschinen gut verarbeiten können. Wir brauchen dafür nicht zwangsläufig mehr Kommentare im Code – wir brauchen bessere Orientierung *um* den Code herum.

## Dokumentation ist jetzt nicht “nice to have”, sondern dein Multiplikator

Wenn ich heute in ein Repo komme, will ich wissen:

- Welche KI wird hier verwendet?
- Welche Schichten gibt es?
- Welche Regeln gelten? 
- Welche Trade-offs wurden bewusst gewählt (Performance vs. Effizienz vs. Wartbarkeit)?
- Was ist “Source of Truth”?

In meinem aktuellen Projekt erklären mir nicht die `*.swift`‑Dateien am meisten, sondern diese Art von Struktur:

```text
docs/
  ARCHITECTURE.md        # Überblick, Boundaries, Datenflüsse, Prinzipien
  IMPLEMENTATION.md      # konkrete Patterns, Konventionen, wichtige Details
  CHANGELOG.md           # Entscheidungen + Kontext (mit Timestamps)
```

Ich lasse `ARCHITECTURE.md` und `IMPLEMENTATION.md` regelmäßig nachziehen – gerade nach Feature‑Arbeit oder Core‑Änderungen. Das sind die Dateien, die mir sagen: **wo** finde ich etwas und **warum** ist es so.

Und ja: KI hilft dabei brutal. Aber nur, wenn wir sie wie ein Teammitglied behandeln: mit klaren Inputs, klaren Akzeptanzkriterien und klarer Verantwortung auf unserer Seite.


## Der echte Shift: Code tippen ist weniger Arbeit – Code beurteilen mehr

“Steuern statt Tippen” war eigentlich schon immer das Ziel. Der Unterschied heute ist: Das Tippen macht nicht mehr automatisch den Großteil der Arbeit aus.

Was wächst, ist der Anteil von:

- Review: Ist das fachlich korrekt?
- Validierung: Macht es wirklich das, was es soll?
- Risiko‑Check: Security, Performance, Kosten, Compliance
- Systemfit: Passt es in Architektur und Konventionen?
- Beweisführung: Welche Tests zeigen das verlässlich?

Oder in einem Satz: **Code schreiben wird günstiger – Korrektheit nachweisen wird der essenzielle Job.**


## Was KI (noch) fehlt: Weitsicht im System

KI ist stark im lokalen Optimum: gegebenen Code + gegebenen Kontext + klare Aufgabenstellung. Was in meinen Augen (noch) oft fehlt, ist **Weitsicht**:

- Passt das in *dieses* System langfristig?
- Welche Folgekosten kaufe ich mir ein?
- Welche Abhängigkeiten/Randbedingungen ändern sich in 6 Monaten?

Diese Entscheidungen sind selten rein technisch. Sie sind Produkt + Betrieb + Team + Zeitachse. Und genau da bleibt der Software‑Entwickler.


## Fazit: Nicht obsolet – aber anders (und breiter als “nur Code”)

KI ersetzt nicht “den Entwickler”. Sie verschiebt Wertschöpfung.

- **Weniger**: Tippen, Boilerplate, “mach mal schnell”‑Implementierung
- **Mehr**: Review, Tests, Doku, Systemdenken, Risiko‑Management
- **Mehr**: schnelle Prototypen, schnelleres Lernen, frühere UX‑Validierung

Nicht vergessen: Aktuell muss die KI ja auch von jemandem aktiv bedient werden.
Und wir sollten dabei nicht engstirnig nur auf Code schauen: Wir können **Click‑Prototypen** so schnell bauen wie noch nie und früh testen, ob eine UX in *diesem* Kontext Sinn ergibt – bevor man sich in Implementierungsdetails vergräbt.

Kleines Beispiel: Ich habe diesen Artikel teilweise nicht getippt, sondern diktiert – mit **NVIDIA Parakeet TDT v3**. Genau so sieht “Software‑Arbeit” 2026 aus: KI ist nicht nur ein Code‑Tool, sondern ein Produktivitäts‑Layer über allem.

Der Haken an der ganzen Sache: **Man muss investieren**, um die richtigen Modelle, Tools und Workflows sinnvoll zu nutzen (Zeit, Geld, Standards, Infrastruktur, Test‑Setup, Doku‑Disziplin).
Wann verwende ich Claude Code? Für was ist Codex besser? Wann sollte ich Gemini fragen?
Was sind Skills? Wofür ist die AGENTS.md?,...
Wer nicht mit der Zeit geht, wird nicht nur überrundet – **er nimmt gar nicht erst am Rennen teil**.

Und falls du dich fragst, warum in meinen Tags irgendwo *Ralph Wiggum* steht: Wenn du’s nicht weißt, bist du schon hinterher.

Bonuspunkt, wenn du den _Ralph Wiggum_-Tag direkt einordnen konntest.
