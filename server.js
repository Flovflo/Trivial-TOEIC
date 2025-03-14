// server.js
const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs'); // Utilisation de bcryptjs
const jwt = require('jsonwebtoken');

const app = express();
const port = process.env.PORT || 3001;
const mongoUri = process.env.MONGO_URI || 'mongodb://mongo:27017';
const jwtSecret = process.env.JWT_SECRET || 'secretkey';

app.use(cors());
app.use(express.json());

let questionsCollection;
let usersCollection;

async function connectToDB() {
  try {
    const client = new MongoClient(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    await client.connect();
    const db = client.db('quiz');
    questionsCollection = db.collection('questions');
    usersCollection = db.collection('users');
    console.log('Connecté à MongoDB !');
  } catch (error) {
    console.error('Erreur de connexion à MongoDB:', error);
  }
}
connectToDB();

app.get('/api/questions', async (req, res) => {
  try {
    const questions = await questionsCollection.find({}).toArray();
    res.json(questions);
  } catch (error) {
    console.error('Erreur lors de la récupération des questions:', error);
    res.status(500).json({ error: 'Échec de la récupération des questions' });
  }
});

app.post('/api/signup', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ error: "Nom d'utilisateur et mot de passe requis" });
  try {
    const existingUser = await usersCollection.findOne({ username });
    if (existingUser)
      return res.status(409).json({ error: "L'utilisateur existe déjà" });
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { username, password: hashedPassword };
    const result = await usersCollection.insertOne(newUser);
    res.json({ message: "Utilisateur créé", userId: result.insertedId });
  } catch (error) {
    console.error("Erreur lors de l'inscription:", error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ error: "Nom d'utilisateur et mot de passe requis" });
  try {
    const user = await usersCollection.findOne({ username });
    if (!user)
      return res.status(401).json({ error: "Identifiants invalides" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ error: "Identifiants invalides" });
    const token = jwt.sign({ username: user.username, userId: user._id }, jwtSecret, { expiresIn: '1h' });
    res.json({ message: "Connexion réussie", token });
  } catch (error) {
    console.error("Erreur lors de la connexion:", error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
});

app.listen(port, () => {
  console.log(`API écoute sur le port ${port}`);
});