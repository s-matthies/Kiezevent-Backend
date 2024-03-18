# Mein Backend-Projekt

Dieses Projekt ist ein Backend-Server, der mit Node.js und Express.js erstellt wurde. Es verwendet PostgreSQL als Datenbank.

## Installation

1. Stellen Sie sicher, dass Sie [Node.js](https://nodejs.org/) und npm installiert haben.

2. Installieren Sie die Abhängigkeiten:

```bash
npm install
```

3. Stellen Sie sicher, dass Sie eine PostgreSQL-Datenbank eingerichtet haben und die Verbindungsinformationen korrekt in der Datei `db.js` eingetragen sind.

## Verwendung

Starten Sie den Server mit:

```bash
npm start
```

Der Server läuft standardmäßig auf Port 3000.

## Endpunkte

- `GET /`: Gibt alle Ereignisse zurück.
- `GET /:id`: Gibt das Ereignis mit der angegebenen ID zurück.
- `POST /`: Fügt ein neues Ereignis hinzu.
- `PUT /:id`: Aktualisiert das Ereignis mit der angegebenen ID.
- `DELETE /:id`: Löscht das Ereignis mit der angegebenen ID.

## Datenbank

Die Datenbank besteht aus einer Tabelle namens `events`. Jedes Ereignis hat die folgenden Felder:

- `id`: Eine eindeutige ID.
- `title`: Der Titel des Ereignisses.
- `date`: Das Datum des Ereignisses.
- `starttime`: Die Startzeit des Ereignisses.
- `endtime`: Die Endzeit des Ereignisses.
- `location`: Der Ort des Ereignisses.
- `description`: Eine Beschreibung des Ereignisses.
- `link`: Ein Link zu weiteren Informationen über das Ereignis.

## Lizenz

Dieses Projekt steht unter der MIT-Lizenz.
