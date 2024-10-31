import express from 'express';
import db from './db';
import { nanoid } from 'nanoid';

const app = express();
app.use(express.json());

// Ruta para inicio de sesión
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  await db.read();
  const user = db.data?.users.find(u => u.email === email && u.password === password);
  if (user) {
    res.json({ message: 'Login successful', user });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Ruta para obtener los detalles del usuario
app.get('/user/:id', async (req, res) => {
  const { id } = req.params;
  await db.read();
  const user = db.data?.users.find(u => u.id === id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// Ruta para actualizar los detalles del usuario
app.put('/user/:id', async (req, res) => {
  const { id } = req.params;
  const updatedDetails = req.body;
  await db.read();
  const userIndex = db.data?.users.findIndex(u => u.id === id);
  if (userIndex !== undefined && userIndex >= 0) {
    db.data!.users[userIndex] = { ...db.data!.users[userIndex], ...updatedDetails };
    await db.write();
    res.json({ message: 'User updated successfully' });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// Ruta para registrar un nuevo usuario
app.post('/register', async (req, res) => {
  const { email, password, balance, details } = req.body;
  await db.read();
  const newUser = { id: nanoid(), email, password, balance, details };
  db.data!.users.push(newUser);
  await db.write();
  res.status(201).json({ message: 'User registered successfully', user: newUser });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});