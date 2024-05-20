const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MySQL Connection
const dbConfig = {
  host: '127.0.0.1',
  user: 'root',
  password: 'yvan2021',
  database: 'taskmanage',
};

const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    process.exit(1); // Exit if there is a connection error
  }
  console.log('Connected to MySQL database');
});

// CRUD Endpoints

// Create a new task
app.post('/tasks', (req, res) => {
  const task = req.body;
  const sql = 'INSERT INTO tasks SET ?';
  connection.query(sql, task, (err, result) => {
    if (err) {
      console.error('Error creating task:', err);
      return res.status(500).json({ error: 'Failed to create task' });
    }
    console.log('Task created successfully');
    res.status(201).json({ message: 'Task created successfully', taskId: result.insertId });
  });
});

// Read all tasks
app.get('/tasks', (req, res) => {
  const sql = 'SELECT * FROM tasks';
  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching tasks:', err);
      return res.status(500).json({ error: 'Failed to fetch tasks' });
    }
    res.status(200).json(results);
  });
});

// Update a task by ID
app.put('/tasks/:taskId', (req, res) => {
  const taskId = req.params.taskId;
  const updatedTask = req.body;
  const sql = 'UPDATE tasks SET ? WHERE task_id = ?';
  connection.query(sql, [updatedTask, taskId], (err) => {
    if (err) {
      console.error('Error updating task:', err);
      return res.status(500).json({ error: 'Failed to update task' });
    }
    console.log('Task updated successfully');
    res.status(200).json({ message: 'Task updated successfully' });
  });
});

// Delete a task by ID
app.delete('/tasks/:taskId', (req, res) => {
  const taskId = req.params.taskId;
  const sql = 'DELETE FROM tasks WHERE task_id = ?';
  connection.query(sql, taskId, (err) => {
    if (err) {
      console.error('Error deleting task:', err);
      return res.status(500).json({ error: 'Failed to delete task' });
    }
    console.log('Task deleted successfully');
    res.status(200).json({ message: 'Task deleted successfully' });
  });
});

// Start the server
const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
