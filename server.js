const express = require('express');
const moment = require('moment-timezone');
const path = require('path');

const app = express();
const port = 3001;

// Set up EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
    const timezones = moment.tz.names();
    res.render('index', { timezones });
});

app.get('/api/time', (req, res) => {
    const { timezone } = req.query;
    const time = moment().tz(timezone).format('YYYY-MM-DD HH:mm:ss');
    res.json({ time, timezone });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
