const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');

// Helper function to get dropdown data
const getDropdownData = () => {
  const courses = db.prepare(`SELECT * FROM Courses`).all();
  const teachers = db.prepare(`SELECT * FROM Teachers`).all();
  const times = [
    '08:00', '09:00', '10:00', '11:00',
    '12:00', '13:00', '14:00', '15:00',
    '16:00', '17:00', '18:00'
  ];
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const types = ['Lab', 'Class'];
  return { courses, teachers, times, days, types };
};

// Routes

// Dashboard Route
app.get('/', (req, res) => {
  const dropdownData = getDropdownData();

  const notices = db.prepare(`SELECT * FROM Notices ORDER BY date DESC`).all();

  const ctAnnouncements = db.prepare(`
    SELECT CTAnnouncements.*, Courses.name as course, Teachers.name as teacher
    FROM CTAnnouncements
    LEFT JOIN Courses ON CTAnnouncements.course_id = Courses.id
    LEFT JOIN Teachers ON CTAnnouncements.teacher_id = Teachers.id
    ORDER BY date DESC
  `).all();

  res.render('index', { dropdownData, notices, ctAnnouncements });
});

// Handle Notice Submission
app.post('/add-notice', (req, res) => {
  const { date, day, time, notice , pass } = req.body;
  if(pass != "1234"){
    res.json({status: 'failed'});
    return;
}

  const stmt = db.prepare(`
    INSERT INTO Notices (date, day, time, notice)
    VALUES (?, ?, ?, ?)
  `);
  stmt.run(date, day, time, notice);
//   res.redirect('/');
  res.json({status: 'success'});
});

// Handle Notice Deletion
app.post('/delete-notice', (req, res) => {
  const { id } = req.body;
  const stmt = db.prepare(`DELETE FROM Notices WHERE id = ?`);
  stmt.run(id);
  res.redirect('/');
});

// Handle CT Announcement Submission
app.post('/add-ct-announcement', (req, res) => {
  const { date, day, time, place, course_id, topic, teacher_id , pass } = req.body;
    if(pass != "1234"){
    res.json({status: 'failed'});
    return;
}
  const stmt = db.prepare(`
    INSERT INTO CTAnnouncements (date, day, time, place, course_id, topic, teacher_id)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);
  stmt.run(date, day, time, place, course_id, topic, teacher_id);
//   res.redirect('/');
    res.json({status: 'success'});
});

// API Endpoints

// Get Notices
app.get('/api/notices', (req, res) => {
  const notices = db.prepare(`SELECT * FROM Notices ORDER BY date DESC`).all();
  res.json(notices);
});

// Get CT Announcements
app.get('/api/ct-announcements', (req, res) => {
  const ctAnnouncements = db.prepare(`
    SELECT CTAnnouncements.*, Courses.name as course, Teachers.name as teacher
    FROM CTAnnouncements
    LEFT JOIN Courses ON CTAnnouncements.course_id = Courses.id
    LEFT JOIN Teachers ON CTAnnouncements.teacher_id = Teachers.id
    ORDER BY date DESC
  `).all();
  res.json(ctAnnouncements);
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
