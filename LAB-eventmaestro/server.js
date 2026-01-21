const express = require('express');
const session = require('express-session');
const EventEmitter = require('events');
const path = require('path');

const app = express();
const PORT = 3001;

// Create Event Emitter instance
class EventMaestro extends EventEmitter {}
const eventMaestro = new EventMaestro();

// Event tracking object
const eventTracker = {
  'user-login': 0,
  'user-logout': 0,
  'user-purchase': 0,
  'profile-update': 0
};

// Simple user database (in-memory)
const users = {
  'admin': 'password123',
  'john': 'john123',
  'alice': 'alice456'
};

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({
  secret: 'event-maestro-secret',
  resave: false,
  saveUninitialized: true
}));

// Event Listeners
eventMaestro.on('user-login', (username) => {
  eventTracker['user-login']++;
  console.log(`✅ Event: user-login | User: ${username} | Count: ${eventTracker['user-login']}`);
});

eventMaestro.on('user-logout', (username) => {
  eventTracker['user-logout']++;
  console.log(`👋 Event: user-logout | User: ${username} | Count: ${eventTracker['user-logout']}`);
});

eventMaestro.on('user-purchase', (username, item) => {
  eventTracker['user-purchase']++;
  console.log(`🛒 Event: user-purchase | User: ${username} | Item: ${item} | Count: ${eventTracker['user-purchase']}`);
});

eventMaestro.on('profile-update', (username, field) => {
  eventTracker['profile-update']++;
  console.log(`👤 Event: profile-update | User: ${username} | Field: ${field} | Count: ${eventTracker['profile-update']}`);
});

eventMaestro.on('summary', () => {
  console.log('\n========== EVENT SUMMARY REPORT ==========');
  console.log(`User Login Events: ${eventTracker['user-login']}`);
  console.log(`User Logout Events: ${eventTracker['user-logout']}`);
  console.log(`User Purchase Events: ${eventTracker['user-purchase']}`);
  console.log(`Profile Update Events: ${eventTracker['profile-update']}`);
  console.log(`Total Events: ${Object.values(eventTracker).reduce((a, b) => a + b, 0)}`);
  console.log('==========================================\n');
});

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  if (users[username] && users[username] === password) {
    req.session.user = username;
    eventMaestro.emit('user-login', username);
    res.json({ success: true, message: 'Login successful!' });
  } else {
    res.json({ success: false, message: 'Invalid username or password!' });
  }
});

app.post('/logout', (req, res) => {
  const username = req.session.user;
  if (username) {
    eventMaestro.emit('user-logout', username);
    req.session.destroy();
    res.json({ success: true });
  }
});

app.post('/purchase', (req, res) => {
  const { item } = req.body;
  const username = req.session.user;
  
  if (username) {
    eventMaestro.emit('user-purchase', username, item);
    res.json({ success: true, message: `Purchase successful: ${item}` });
  } else {
    res.json({ success: false, message: 'Please login first!' });
  }
});

app.post('/update-profile', (req, res) => {
  const { field } = req.body;
  const username = req.session.user;
  
  if (username) {
    eventMaestro.emit('profile-update', username, field);
    res.json({ success: true, message: `Profile updated: ${field}` });
  } else {
    res.json({ success: false, message: 'Please login first!' });
  }
});

app.get('/summary', (req, res) => {
  eventMaestro.emit('summary');
  res.json({
    success: true,
    tracker: eventTracker,
    total: Object.values(eventTracker).reduce((a, b) => a + b, 0)
  });
});

app.get('/check-session', (req, res) => {
  res.json({ loggedIn: !!req.session.user, username: req.session.user });
});

app.listen(PORT, () => {
  console.log(`🚀 Event Maestro server running on http://localhost:${PORT}`);
  console.log(`📊 Event tracking initialized!`);
}); 