# KiezEvent-Backend

Dies ist das Backend für die Verwaltung von Veranstaltungen im Kiez ("KiezEvents"), das mit Node.js und Express entwickelt wurde.

## Inhaltsverzeichnis

1. [Übersicht](#übersicht)
2. [Anforderungen](#anforderungen)
3. [Installation](#installation)
4. [Verwendung](#verwendung)
5. [API-Endpunkte](#api-endpunkte)
6. [API Dokumentation](#api-dokumentation)

## Übersicht

Das KiezEvent-Backend ist eine RESTful API, die CRUD-Operationen für Veranstaltungen ermöglicht. Es interagiert mit einer PostgreSQL-Datenbank, um Veranstaltungsdaten zu speichern, abzurufen, zu aktualisieren und zu löschen.

## Anforderungen

Um das Backend auszuführen, muss Folgendes installiert werden:

- Node.js (Version 20.10.0)
- npm (Node Package Manager)
  
## Installation

1. Klone das Repository auf deinen lokalen Computer:
   
    `git clone https://github.com/s-matthies/Kiezevent-Backend.git`

3. Wechsele in das Verzeichnis des Projekts:

    `cd kiezevent-backend`

4. Installiere die Abhängigkeiten:

    `npm install`

## Verwendung

Starte den Server mit dem Befehl:
`npm start`

Der Server läuft standardmäßig auf Port 4000 (konfigurierbar in der Datei `index.js`).

## API-Endpunkte

Das Backend bietet folgende API-Endpunkte:

- GET `/events`: Ruft alle Veranstaltungen ab.
- POST `/events`: Erstellt eine neue Veranstaltung.
- GET `/events/:id`: Ruft eine einzelne Veranstaltung anhand ihrer ID ab.
- PUT `/events/:id`: Aktualisiert eine Veranstaltung.
- DELETE `/events/:id`: Löscht eine Veranstaltung.

## API-Dokumentation

Die API-Dokumentation für dieses Projekt kann über die folgende URL erreicht werden:
[Swagger UI](https://kiezevent-backend.onrender.com/api-docs/)

Dafür ist es notwendig, dass die Anwendung läuft, bevor auf den obigen Link geklickt wird.


