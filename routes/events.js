const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const router = express.Router();
const DATA_FILE = path.join(__dirname, '..', 'data', 'events.json');

async function readEvents() {
  try {
    const txt = await fs.readFile(DATA_FILE, 'utf8');
    return JSON.parse(txt);
  } catch (err) {
    if (err.code === 'ENOENT') {
      // create folder & file if missing
      await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
      await fs.writeFile(DATA_FILE, '[]', 'utf8');
      return [];
    }
    // corrupted or other error → rethrow to be handled by caller
    throw err;
  }
}

async function writeEvents(events) {
  const tmp = DATA_FILE + '.tmp';
  await fs.writeFile(tmp, JSON.stringify(events, null, 2), 'utf8');
  await fs.rename(tmp, DATA_FILE); // atomic replace
}

// GET /api/events
router.get('/', async (req, res) => {
  try {
    const events = await readEvents();
    res.json(events);
  } catch (err) {
    console.error('Error reading events:', err);
    res.status(500).json({ error: 'Failed to read events' });
  }
});

// POST /api/events
router.post('/', async (req, res) => {
  try {
    const { title, description, date, location, maxAttendees } = req.body;

    // Validation
    if (!title || !date || !location || maxAttendees === undefined) {
      return res.status(400).json({ error: 'title, date, location and maxAttendees are required' });
    }

    const max = Number(maxAttendees);
    if (!Number.isInteger(max) || max <= 0) {
      return res.status(400).json({ error: 'maxAttendees must be a positive integer' });
    }

    const parsed = Date.parse(date);
    if (Number.isNaN(parsed)) {
      return res.status(400).json({ error: 'date must be a valid date string (ISO 8601 recommended)' });
    }

    const events = await readEvents();

    const newEvent = {
      eventId: `EVT-${Date.now()}`,
      title: String(title),
      description: description ? String(description) : '',
      date: new Date(parsed).toISOString(),
      location: String(location),
      maxAttendees: max,
      currentAttendees: 0,
      status: 'upcoming'
    };

    events.push(newEvent);
    await writeEvents(events);

    // Return created event
    res.status(201).json(newEvent);
  } catch (err) {
    console.error('Error creating event:', err);
    res.status(500).json({ error: 'Failed to create event' });
  }
});

module.exports = router;
