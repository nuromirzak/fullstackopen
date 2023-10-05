const calculateBmi = function(height: number, weight: number): string {
    const heightInMeters: number = height / 100;
    const bmiIndex = weight / Math.pow(heightInMeters, 2);
    console.log(`BMI index: ${bmiIndex}`);

    if (bmiIndex < 16.0) {
        return "Underweight (Severe thinness)";
    } else if (bmiIndex >= 16.0 && bmiIndex <= 16.9) {
        return "Underweight (Moderate thinness)";
    } else if (bmiIndex >= 17.0 && bmiIndex <= 18.4) {
        return "Underweight (Mild thinness)";
    } else if (bmiIndex >= 18.5 && bmiIndex <= 24.9) {
        return "Normal range";
    } else if (bmiIndex >= 25.0 && bmiIndex <= 29.9) {
        return "Overweight (Pre-obese)";
    } else if (bmiIndex >= 30.0 && bmiIndex <= 34.9) {
        return "Obese (Class I)";
    } else if (bmiIndex >= 35.0 && bmiIndex <= 39.9) {
        return "Obese (Class II)";
    } else {
        return "Obese (Class III)";
    }
}

console.log(calculateBmi(180, 74));