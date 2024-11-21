const Database = require('better-sqlite3');
const db = new Database('app.db', { verbose: console.log });


const init = () => {
  // Courses Table
  db.prepare(`
    CREATE TABLE IF NOT EXISTS Courses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE
    )
  `).run();

  // Teachers Table
  db.prepare(`
    CREATE TABLE IF NOT EXISTS Teachers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE
    )
  `).run();

  // Notices Table
  db.prepare(`
    CREATE TABLE IF NOT EXISTS Notices (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT NOT NULL,
      day TEXT NOT NULL,
      time TEXT NOT NULL,
      notice TEXT NOT NULL
    )
  `).run();

  // CTAnnouncements Table
  db.prepare(`
    CREATE TABLE IF NOT EXISTS CTAnnouncements (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT NOT NULL,
      day TEXT NOT NULL,
      time TEXT NOT NULL,
      place TEXT NOT NULL,
      course_id INTEGER,
      topic TEXT NOT NULL,
      teacher_id INTEGER,
      FOREIGN KEY(course_id) REFERENCES Courses(id),
      FOREIGN KEY(teacher_id) REFERENCES Teachers(id)
    )
  `).run();

  // Seed Courses and Teachers if empty
  const courseCount = db.prepare(`SELECT COUNT(*) as count FROM Courses`).get().count;
  if (courseCount === 0) {
    const insertCourse = db.prepare(`INSERT INTO Courses (name) VALUES (?)`);
    ['System Project', 'Operating Systems', 'Applied Statistics', 'Compiler', 'Mobile Computing', 'Ethics'].forEach(course => {
      insertCourse.run(course);
    });
  }

  const teacherCount = db.prepare(`SELECT COUNT(*) as count FROM Teachers`).get().count;
  if (teacherCount === 0) {
    const insertTeacher = db.prepare(`INSERT INTO Teachers (name) VALUES (?)`);
    ['RA', 'AA', 'IH', 'KSA', 'NJKC' , 'DB' , 'KFI' , 'ACD' , 'MRI' , 'SS' , 'BR'].forEach(teacher => {
      insertTeacher.run(teacher);
    });
  }
};

init();

module.exports = db;
