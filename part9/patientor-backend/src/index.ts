import express from 'express';
import cors = require('cors');
import diagnosesRouter from './routes/diagnoses';
import patientsRouter from './routes/patients';
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

app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientsRouter);

app.use((req, res) => {
  console.log(req.url);
  res.status(404).send({ error: 'unknown endpoint' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});