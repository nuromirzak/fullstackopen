interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const parseArguments = function(args: Array<string>): ExerciseValues {
    console.log('args', args);
    if (args.length < 4) throw new Error('Not enough arguments');
    
    for (let i = 2; i < args.length; i++) {
        if (isNaN(Number(args[i]))) throw new Error('Provided values were not numbers!');
    }

    const target = Number(args[2]);
    const days = args.slice(3).map(day => Number(day));

    return {
        days,
        target
    };
};

interface ExerciseValues {
    days: Array<number>;
    target: number;
}

const calculateExercises = function(exerciseValues:ExerciseValues): Result {
    const { days, target } = exerciseValues;
    const periodLength = days.length;
    const trainingDays = days.filter(day => day != 0).length;
    const average = days.reduce((accumulator, currentValue) => accumulator + currentValue, 0) / periodLength;
    const success = average >= target;
    const rating = average >= target * 1.5 ? 3 : average >= target ? 2 : 1;
    const ratingDescription = rating === 3 ? 'Great job!' : rating === 2 ? 'Not too bad but could be better' : 'You should try harder';
    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    };
};

// const exerciseValues = parseArguments(process.argv);
// console.log(calculateExercises(exerciseValues));

export { parseArguments, calculateExercises };