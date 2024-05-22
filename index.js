const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware para soportar CORS
app.use(cors());

// Middleware para parsear JSON en las peticiones
app.use(bodyParser.json());

// Objeto para almacenar las estadísticas
let stats = {
  totalVotes: 0,
  totalScore: 0,
  avgScore: 0
};

// Endpoint para recibir la puntuación
app.post('/send-score', (req, res) => {
  const { score } = req.body;

  // Validar que el score esté entre 1 y 10
  if (typeof score !== 'number' || score < 1 || score > 10) {
    return res.status(400).json({
      error: 'Score must be a number between 1 and 10', dataReceived: req.body,
    });
  }

  // Actualizar las estadísticas
  stats.totalVotes += 1;
  stats.totalScore += score;
  stats.avgScore = stats.totalScore / stats.totalVotes;


  // Devolver la respuesta con la media de puntuaciones y el número de votaciones totales
  res.json({
    dataReceived: req.body,
    result: "Score added successfully",
    averageScore: stats.avgScore,
    totalVotes: stats.totalVotes
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
