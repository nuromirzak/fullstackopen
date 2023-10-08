import express from 'express';
import cors = require('cors');
const app = express();
app.use(express.json());

const options: cors.CorsOptions = {
  origin: ['http://localhost:5173']
};

app.use(cors(options));

const PORT = 3000;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});