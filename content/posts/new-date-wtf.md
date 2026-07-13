---
title: "new Date(wtf)"
date: "2026-05-19"
tags: ["JavaScript", "Date", "Java", "Design", "Temporal"]
description: "Bisschen was zu Date in JavaScript. Wo das eigentlich herkommt, wie man das heutzutage mit Temporal richtig machen sollte. Und das Immutability kein nice to have, sondern ein must have ist."
---

Wer hätte je gedacht, dass ich jemals freiwillig über JavaScript schreibe.

Jeder, der mich kennt, weiß: Ich halte von JavaScript ungefähr so viel wie vom FC Bayern München. Es ist in meinen Augen eine Sprache, die perfekt zum Prototyping ist. Sie ist einfach. Sie geht selten komplett kaputt. Du kannst alles machen.

Perfekt also, um dich an nichts, wirklich absolut gar nichts, halten zu müssen.

Und genau so sieht leider auch ein guter Teil des JS-Codes aus.

Trotzdem: Auch meine Reise hat am Ende mit HTML und JavaScript angefangen. Und man muss der Sprache lassen: Du hast sehr schnell etwas Funktionierendes im Browser.

**Oder?**

```js
new Date("wtf")
```

Lasst uns mal auf einen fast 30 Jahre alten Fehler schauen.

Es gibt die schöne Seite [https://jsdate.wtf/](https://jsdate.wtf/). Kannst du alle Fragen richtig beantworten? Ich zumindest nicht. Und ich will gar nicht wissen, wie viele Produktionsbugs aus genau diesem selbstbewussten „Ach, Date wird das schon richtig machen“ entstanden sind.

Spoiler: Wird es nicht.

Bei `Date` merkt man schnell: JavaScript hat nicht einfach eine Date-API. JavaScript hat ein nicht sterben wollendes Ausgrabungsstück mit Runtime-Anbindung.

Monate sind 0-basiert. Wochentage sind 0-basiert. Der Tag im Monat ist aber 1-basiert. Klingt komisch, ist aber immerhin konsequent inkonsequent.

Und JavaScript hat dieses Problem nicht einmal selbst erfunden. Die ursprüngliche `Date`-API war stark von frühen Java-Ideen beeinflusst. Und auch Java hat damals sehr schnell gemerkt: Uff. Vielleicht war das doch nicht der Gipfel menschlicher Zeitmodellierung.

Java hat später mit Java 8 die `java.time`-API eingeführt: immutable, thread-safe und fachlich sauberer modelliert. Die offiziellen Java-Dokumente beschreiben `java.time` als API für Dates, Times, Instants und Durations; alle Klassen sind immutable und thread-safe. Also im Grunde das Gegenteil von „wir werfen alles in ein Objekt und hoffen auf das Beste“. 

 Java 8 brachte dann unter JSR-310 die neue `java.time`-API.

Java hat also irgendwann gesagt:  
„Wir haben Mist gebaut. Lass es uns ordentlich neu machen.“

JavaScript hat gesagt:  
„Wir haben Mist gebaut. Aber leider benutzen inzwischen 400 Milliarden Webseiten diesen Mist. Also fassen wir ihn besser nicht an.“

Willkommen im Web. Es darf nichts kaputt gehen.

## Es gibt doch genügend Libraries?

Natürlich war die JavaScript-Community nicht untätig. Sie hat getan, was sie immer tut, wenn die Sprache selbst ein Problem hat:

Sie hat `npm install` gesagt.

Über die Jahre gab es einige Libraries, die versucht haben, `Date` erträglicher zu machen:

1. Moment.js
2. Moment Timezone
3. Luxon
4. date-fns
5. Day.js

Moment.js machte Dates endlich benutzbar.  
Moment Timezone nahm Zeitzonen ernst.  
Luxon dachte moderner und immutabler.  
date-fns machte daraus kleine, funktionale Werkzeuge.  
Day.js war Moment auf Diät.

Das Problem: Viele dieser Libraries machten `Date` angenehmer. Aber sie haben das Grundmodell nicht wirklich ersetzt.

Sie waren Pflaster. Gute Pflaster. Teilweise sehr gute Pflaster. Aber eben Pflaster auf einer API, die schon mit eingebauter Schiefstellung ausgeliefert wurde.

Und dann gibt es noch [**js-joda**](https://github.com/js-joda/js-joda).

js-joda ist besonders interessant, weil es direkt aus der Java-Welt kommt. Es beschreibt sich selbst als immutable Date/Time-Library für JavaScript mit einer domain-driven API, basierend auf dem ISO-Kalendersystem. Außerdem ist js-joda ein Port des ThreeTen-Backports, also der Grundlage von JSR-310, aus dem Java 8 `java.time` entstanden ist.

Anders gesagt:

> js-joda war im Prinzip Temporal, bevor JavaScript Temporal hatte.  
> Nur eben als Library. Nicht als Sprache.

## Tempora: endlich eine native Lösung

>Stand **19.05.2026** ist Temporal fachlich in jedem Browser angekommen, nur WebKit macht WebKit dinge. ([MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal?utm_source=chatgpt.com "Temporal - JavaScript | MDN"))

Der Standard selbst ist aber nicht mehr nur ein Wunschtraum aus irgendeinem TC39-GitHub-Issue. Temporal ist im TC39-Prozess als **Stage 4 Draft** dokumentiert. Die offizielle Temporal-Spezifikation nennt ziemlich direkt die Probleme von `Date`: fehlende Immutability, fehlende echte Zeitzonenunterstützung, keine saubere Modellierung für reine Dates oder reine Times und eine allgemein verwirrende API. ([tc39.es](https://tc39.es/proposal-temporal/?utm_source=chatgpt.com "Temporal"))

Fachlich ist Temporal ein riesiger Schritt: JavaScript bekommt endlich eine native API, die Zeit nicht mehr so modelliert, als wäre sie ein einziger magischer Zahlenklumpen mit Zeitzonen-PTBS.

Das alte `Date` tut so, als wäre alles dasselbe:

```js
new Date()
```

Ein Zeitpunkt?  
Ein Datum?  
Lokale Uhrzeit?  
UTC?  
Geburtstag?  
Meeting?  
Log-Eintrag?

Ja. Nein. Vielleicht. Kommt drauf an, auf welchem Rechner du es ausführst. Viel Glück.

Temporal trennt diese Konzepte endlich sauber:

```js
Temporal.Instant          // ein exakter Zeitpunkt
Temporal.PlainDate        // nur ein Datum, z.B. Geburtstag
Temporal.PlainTime        // nur eine Uhrzeit
Temporal.PlainDateTime    // Datum + Uhrzeit, aber ohne Zeitzone
Temporal.ZonedDateTime    // Datum + Uhrzeit + echte Zeitzone
Temporal.Duration         // eine Dauer
```

Das klingt erst einmal nach mehr Klassen. In Wahrheit ist es weniger Chaos.

`Date` war wie ein Schweizer Taschenmesser, bei dem Messer, Gabel, Uhr, Kompass und Steuererklärung alle dieselbe Klinge sind.

Der große Gewinn ist:

> Temporal zwingt dich, zu sagen, was du meinst.

Ein Geburtstag?

```js
Temporal.PlainDate.from("1998-05-06")
```

Kein Timestamp. Keine Zeitzone. Kein „ups, in Kalifornien ist es noch gestern“. Einfach ein Datum.

Ein Log-Eintrag?

```js
Temporal.Instant.from("2026-05-19T08:30:00Z")
```

Ein global eindeutiger Moment.

Maschinen lieben das. Menschen weniger. 

Ein Meeting in Berlin?

```js
Temporal.ZonedDateTime.from(
  "2026-05-19T10:00:00+02:00[Europe/Berlin]"
)
```

Und hier wichtig: `+02:00` ist nur ein Offset. `Europe/Berlin` ist eine echte Zeitzone mit Regeln, Sommerzeit, historischen Änderungen und dem ganzen bürokratischen Wahnsinn.

Temporal macht damit im Kern das, was **java.time** und später **js-joda** schon lange vorgemacht haben: Zeit wird nicht mehr als ein einzelnes Gott-Objekt modelliert, sondern als mehrere fachlich unterschiedliche Typen.

Ein `Instant` ist nicht dasselbe wie ein `LocalDate`.  
Ein Geburtstag ist kein Log-Zeitpunkt.  
Ein Meeting ist kein Unix-Timestamp mit dekorativem String-Geschmack.

Und dann ist da noch ein fast schon revolutionäres Konzept für JavaScript-Entwickler:

**Immutability.**

Temporal-Objekte werden nicht verändert. Methoden wie `add()` geben neue Werte zurück:

```js
const today = Temporal.PlainDate.from("2026-05-19")
const nextWeek = today.add({ days: 7 })
```

`today` bleibt `today`.

Keine heimliche Mutation. Kein „wer hat mein Datum angefasst?“. 

Das ist nicht nur schöner. Es verhindert Bugs strukturell.

> Nach fast 30 Jahren bekommt JavaScript endlich eine Zeit-API, die weiß, was ein Datum ist.  
> Das ist traurig. Aber auch schön.

Und wer nicht warten will, bis auch Safari offiziell im Jahr 2026 ankommt: Es gibt den [Temporal-Polyfill](https://github.com/js-temporal/temporal-polyfill).

```js
import { Temporal } from "@js-temporal/polyfill"
```

Das sind ein paar Kilobyte extra, die irgendwann wieder verschwinden, sobald sich WebKit entscheidet, auch bei Java 8 anzukommen.
