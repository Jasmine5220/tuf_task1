const mysql = require('mysql2');
const bcrypt = require('bcrypt');

// Connect to MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'J@$m!nej5220'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL.');

  // Create the database if it doesn't exist
  db.query('CREATE DATABASE IF NOT EXISTS flashcards_db', (err, result) => {
    if (err) throw err;
    console.log('Database created or already exists.');

    // Switch to the new database
    db.changeUser({ database: 'flashcards_db' }, (err) => {
      if (err) throw err;

      // Create users table
      const createUsersTable = `
        CREATE TABLE IF NOT EXISTS users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          username VARCHAR(255) NOT NULL,
          password VARCHAR(255) NOT NULL,
          is_admin BOOLEAN DEFAULT false
        );
      `;
      db.query(createUsersTable, (err, result) => {
        if (err) throw err;
        console.log('Users table created or already exists.');

        // Create flashcards table
        const createFlashcardsTable = `
          CREATE TABLE IF NOT EXISTS flashcards (
            id INT AUTO_INCREMENT PRIMARY KEY,
            question TEXT NOT NULL,
            answer TEXT NOT NULL
          );
        `;
        db.query(createFlashcardsTable, (err, result) => {
          if (err) throw err;
          console.log('Flashcards table created or already exists.');

          // Insert initial users
          const insertUsers = `
            INSERT INTO users (username, password, is_admin) VALUES 
            ('admin', '${bcrypt.hashSync('admin123', 10)}', true),
            ('user', '${bcrypt.hashSync('user123', 10)}', false);
          `;
          db.query(insertUsers, (err, result) => {
            if (err) throw err;
            console.log('Initial users inserted.');

            // Insert initial flashcards
            const insertFlashcards = `
              INSERT INTO flashcards (question, answer) VALUES
              ('What is JavaScript?', 'JavaScript is a programming language.'),
              ('What is Node.js?', 'Node.js is a runtime environment for executing JavaScript on the server.'),
              ('What is the time complexity of binary search?', 'O(log n)'),
              ('What is the difference between a stack and a queue?', 'A stack follows LIFO (Last In, First Out), whereas a queue follows FIFO (First In, First Out).'),
              ('What is a linked list?', 'A linked list is a linear data structure where elements are stored in nodes, and each node points to the next node.'),
              ('Explain the concept of dynamic programming.', 'Dynamic programming is a method for solving complex problems by breaking them down into simpler subproblems and storing the results to avoid redundant work.'),
              ('What is a binary tree?', 'A binary tree is a hierarchical data structure in which each node has at most two children, referred to as the left child and the right child.'),
              ('What is the purpose of a hash table?', 'A hash table is used to store key-value pairs and provides efficient lookup, insertion, and deletion operations through hashing.'),
              ('Explain the concept of recursion.', 'Recursion is a process in which a function calls itself as a subroutine to solve a problem.'),
              ('What is a graph?', 'A graph is a data structure consisting of nodes (vertices) and edges that represent connections between pairs of nodes.'),
              ('Describe the QuickSort algorithm.', 'QuickSort is a divide-and-conquer algorithm that picks a pivot element, partitions the array, and recursively sorts the subarrays.'),
              ('What is the difference between BFS and DFS?', 'BFS (Breadth-First Search) explores all nodes at the present depth before moving on to nodes at the next depth level, while DFS (Depth-First Search) explores as far as possible along a branch before backtracking.');
            `;
            db.query(insertFlashcards, (err, result) => {
              if (err) throw err;
              console.log('Initial flashcards inserted.');
              db.end();
            });
          });
        });
      });
    });
  });
});
