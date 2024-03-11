const express = require('express');
const client = require('./db');
const initdb = express.Router();
const format = require('pg-format');

/*
initdb.get('/initdb', async (req, res) => {
    const query = format('CREATE TABLE IF NOT EXISTS events (id SERIAL PRIMARY KEY, title VARCHAR(255), date DATE, starttime TIME, endtime TIME, location VARCHAR(255), description TEXT, link VARCHAR(255))');
    try {
        const result = await client.query(query);
        console.log(result);
        res.status(200).json({ message: "Table events created" });
    } catch (error) {
        console.log("error", error.stack);
        res.status(500).json({ error: error });
    }
});
*/

// Befüllen der Tabelle events 
initdb.get('/', async (req, res) => {
    
    const sampleEvents = [
        {
          title: "Yoga im Kiezladen",
          date: "2024-04-15",
          starttime: "10:00:00",
          endtime: "11:30:00",
          location: "Kiezladen, Berlin",
          description: "Entspannen Sie sich und tanken Sie neue Energie bei unserer Yoga-Stunde. Keine Vorkenntnisse erforderlich. Bitte bringen Sie eine eigene Matte mit.",
          link: "http://example.com/yoga"
        },
        {
          title: "KüfA - Küche für Alle",
          date: "2024-05-05",
          starttime: "18:00:00",
          endtime: "22:00:00",
          location: "Kiezladen, Berlin",
          description: "Leckeres Abendessen in gemütlicher Atmosphäre. Spendenbasis. Jeder ist willkommen.",
          link: "http://example.com/küfa"
        },
        {
          title: "Kunstausstellung",
          date: "2024-06-10",
          starttime: "15:00:00",
          endtime: "18:00:00",
          location: "Kunstgalerie im Kiez, Berlin",
          description: "Erleben Sie die neuesten Kunstwerke lokaler Künstler in unserer Kunstausstellung. Kostenlose Eintrittskarten sind erhältlich.",
          link: "http://example.com/artexhibition"
        },
        {
          title: "Kinderfest",
          date: "2024-07-20",
          starttime: "14:00:00",
          endtime: "17:00:00",
          location: "Schmollerplatz, Berlin",
          description: "Ein unterhaltsamer Tag für Kinder mit Spielen, Aktivitäten und Leckereien. Eintritt frei für alle Kinder und ihre Familien.",
          link: "http://example.com/kidsfest"
        },
        {
          title: "Live-Musik in der Kiez-Kneipe",
          date: "2024-08-08",
          starttime: "20:00:00",
          endtime: "02:00:00",
          location: "Kiez-Kneipe, Berlin",
          description: "Genießen Sie eine Nacht voller Live-Musik verschiedener Genres. Getränkespecials und gute Stimmung erwartet Sie.",
          link: "http://example.com/live-music"
        },
        {
          title: "Flohmarkt",
          date: "2024-09-25",
          starttime: "09:00:00",
          endtime: "16:00:00",
          location: "Kiezplatz, Berlin",
          description: "Stöbern Sie durch eine Vielzahl von gebrauchten Gegenständen auf unserem Flohmarkt. Für einen Stand kontaktieren Sie uns bitte im Voraus.",
          link: "http://example.com/fleamarket"
        },
        {
          title: "Filmabend im Freien",
          date: "2024-10-12",
          starttime: "19:30:00",
          endtime: "22:00:00",
          location: "Kiezpark, Berlin",
          description: "Genieße einen gemütlichen Abend unter freiem Himmel mit einem Film. Bitte bringen eine eigene Decken und Snacks mit.",
          link: "http://example.com/outdoorcinema"
        },
        {
          title: "Kiezquiz",
          date: "2024-11-03",
          starttime: "18:00:00",
          endtime: "21:00:00",
          location: "Kiezkneipe, Berlin",
          description: "Teste dein Wissen bei unserem Kiezquiz. Teams von 2-6 Personen sind willkommen. Anmeldung erforderlich.",
          link: "http://example.com/kiezquiz"
        },
        {
          title: "Weihnachtsmarkt im Kiez",
          date: "2024-12-20",
          starttime: "16:00:00",
          endtime: "22:00:00",
          location: "Kiezplatz, Berlin",
          description: "Erleben Sie die festliche Atmosphäre auf unserem traditionellen Weihnachtsmarkt. Glühwein, Leckereien und Handwerkskunst warten auf Sie.",
          link: "http://example.com/christmasmarket"
        },
        {
          title: "Coding Workshop",
          date: "2024-06-15",
          starttime: "17:00:00",
          endtime: "20:00:00",
          location: "Kiezladen, Berlin",
          description: "Lerne die Grundlagen des Programmierens in unserem kostenlosen Workshop. Keine Vorkenntnisse erforderlich. Anmeldung erforderlich.",
          link: "http://example.com/codingworkshop"
        }
      ];

      const sampleEventsArray = sampleEvents.map(event => [
        event.title,
        event.date,
        event.starttime,
        event.endtime,
        event.location,
        event.description,
        event.link
    ]);

    const paramquery = format('INSERT INTO events (title, date, starttime, endtime, location, description, link) VALUES %L RETURNING*', sampleEventsArray);

    try {
        const result = await client.query(paramquery);
        console.log("10 events inserted ...");
        res.status(200).json(result.rows);
    } catch (error) {
        console.log("error", error.stack);
        res.status(500).json({ error: error });
    }
}
);

module.exports = initdb;