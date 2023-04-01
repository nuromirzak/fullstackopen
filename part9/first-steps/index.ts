import express from "express";
import calculateBmi from "./bmiCalculator";
import calculateExercises from "./exerciseCalculator";
import { parseArguments } from "./exerciseCalculator";

const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight)) {
    res.status(400).send({ error: "malformatted parameters" });
  }

  const bmi = calculateBmi(height, weight);
  res.send({ weight, height, bmi });
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { target, daily_exercises } = req.body;
  console.log(target, daily_exercises);

  if (!(daily_exercises && target)) {
    res.status(400).send({ error: "parameters missing" });
  }

  try {
    const parsedArgs = parseArguments(['ts-node', 'index.ts', target, ...daily_exercises as number[]] as string[]);
    console.log(parsedArgs);
    console.log(calculateExercises(parsedArgs.slice(1), parsedArgs[0]));
    res.send(calculateExercises(parsedArgs.slice(1), parsedArgs[0]));
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

const PORT = 3001 || process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
