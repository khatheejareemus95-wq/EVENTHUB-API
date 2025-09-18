const express = require('express');
const cors = require('cors');
const path = require('path');

const eventsRouter = require('./routes/events');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());             // enable CORS for frontend
app.use(express.json());     // parse JSON bodies
app.use(express.static('public'));     // parse JSON bodies

app.use('/api/events', eventsRouter);

app.get('/', (req, res) => res.send('EventHub API is running'));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
