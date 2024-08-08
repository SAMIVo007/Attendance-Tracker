import * as SQLite from "expo-sqlite";

let db;

export async function init() {
	db = await SQLite.openDatabaseAsync("Attendance.db");

	await db.execAsync(
		`PRAGMA journal_mode = WAL;
    PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS subjects (
      id TEXT PRIMARY KEY NOT NULL, 
      name TEXT NOT NULL UNIQUE
    );
    CREATE TABLE IF NOT EXISTS timetable (
      subject_id TEXT NOT NULL, 
      subject_name TEXT NOT NULL,
      session_type TEXT NOT NULL CHECK (session_type IN ('Lecture', 'Lab')),
      day TEXT NOT NULL,
      slot INTEGER NOT NULL,
      room TEXT, 
      faculty TEXT,
      PRIMARY KEY (subject_id, day, session_type, slot),
      FOREIGN KEY (subject_id) REFERENCES subjects(id)
    );
    CREATE TABLE IF NOT EXISTS attendance (
      subject_id TEXT NOT NULL, 
      date DATE NOT NULL,
      session_type TEXT NOT NULL CHECK (session_type IN ('Lecture', 'Lab')),
      attended BOOLEAN NOT NULL,
      PRIMARY KEY (subject_id, date, session_type),
      FOREIGN KEY (subject_id) REFERENCES subjects(id)
    );    
    `
	);
}

export async function addSubject(id, name) {
	try {
		const result = await db.runAsync(
			"INSERT INTO subjects (id, name) VALUES (?, ?)",
			[id, name]
		);
		console.log(
			"Subject inserted:",
			result.lastInsertRowId,
			"changes:",
			result.changes
		);
	} catch (error) {
		console.error("Error inserting subject:", error);
	}
}

export async function addTimetableEntry(
	subject_id,
	subject_name,
	session_type,
	day,
	slot,
	room = null,
	faculty = null
) {
	try {
		const result = await db.runAsync(
			"INSERT INTO timetable (subject_id, subject, session_type, day, slot, room, faculty) VALUES (?, ?, ?, ?, ?, ?, ?)",
			[subject_id, subject_name, session_type, day, slot, room, faculty]
		);
		console.log(
			"Timetable entry inserted",
			result.lastInsertRowId,
			"changes:",
			result.changes
		);
	} catch (error) {
		console.error("Error inserting timetable entry:", error);
	}
}

export async function recordAttendance(
	subject_id,
	date,
	session_type,
	attended
) {
	try {
		const result = await db.runAsync(
			"INSERT INTO attendance (subject_id, date, session_type, attended) VALUES (?, ?, ?, ?)",
			[subject_id, date, session_type, attended]
		);
		console.log(
			"Attendance recorded",
			result.lastInsertRowId,
			"changes:",
			result.changes
		);
	} catch (error) {
		console.error("Error recording attendance:", error);
	}
}

export async function getSubjects() {
	try {
		const allRows = await db.getAllAsync("SELECT * FROM subjects");
		for (const row of allRows) {
			console.log(row.id, row.name);
		}
	} catch (error) {
		console.error("Error retrieving subjects:", error);
	}
}
