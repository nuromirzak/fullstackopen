interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (
  exerciseHours: number[],
  target: number
): Result => {
  const periodLength = exerciseHours.length;
  const trainingDays = exerciseHours.filter((hours) => hours > 0).length;
  const average = exerciseHours.reduce((a, b) => a + b, 0) / periodLength;
  const success = average >= target;
  const rating = success ? 3 : average >= target * 0.5 ? 2 : 1;
  const ratingDescription =
    rating === 3
      ? "Your parents would be proud"
      : rating === 2
      ? "Work harder"
      : "You should probably quit";
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));

export const parseArguments = (args: string[]): number[] => {
  console.log('before', args.length);
  if (args.length < 4) throw new Error("Not enough arguments");
  if (!isNaN(Number(args[2]))) {
    const toReturn =  [Number(args[2]), ...args.slice(3).map((arg) => Number(arg))];
    console.log('after', toReturn.length);
    return toReturn;
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

try {
  const [target, ...exerciseHours] = parseArguments(process.argv);
  console.log(calculateExercises(exerciseHours, target));
} catch (e: unknown) {
  let errorMessage = "Error, something bad happened, message: ";
  if (e instanceof Error) {
    errorMessage += e.message;
  } else {
    errorMessage += "unknown error";
  }
  console.log(errorMessage);
}

export default calculateExercises;
