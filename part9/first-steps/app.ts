import express from 'express';
import calculateBmi from './bmiCalculator';
import { calculateExercises, parseArguments } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req: express.Request, res: express.Response) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req: express.Request, res: express.Response) => {
    console.log(req.query);
    const weight = Number(req.query.weight);
    const height = Number(req.query.height);

    if (isNaN(weight) || isNaN(height)) {
        return res.status(400).json({ error: 'malformatted parameters' });
    }

    const bmi = calculateBmi(height, weight);
    return res.json({ weight, height, bmi });
});

app.post("/exercises", (req, res) => {

    console.log(req.body);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { target, daily_exercises } = req.body;
    console.log(target, daily_exercises);
  
    if (!(daily_exercises && target)) {
      res.status(400).send({ error: "parameters missing" });
    }

    if (isNaN(Number(target)) || !Array.isArray(daily_exercises)) {
      res.status(400).send({ error: "malformatted parameters" });
    }
  
    try {
      const parsedArgs = parseArguments(['ts-node', 'index.ts', target as string, ...(daily_exercises as Array<string>)]);
      console.log(parsedArgs);
      res.send(calculateExercises(parsedArgs));
    } catch (e: unknown) {
      let errorMessage = "Error, something bad happened, message: ";
      if (e instanceof Error) {
        errorMessage += e.message;
      } else {
        errorMessage += "unknown error";
      }
      res.status(400).send({ error: errorMessage });
    }
  });

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});