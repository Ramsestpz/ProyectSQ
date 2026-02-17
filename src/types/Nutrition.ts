
export interface NutritionProgress {
    calories: {
        current: number;
        target: number;
    };
    protein: {
        current: number;
        target: number;
    };
    carbs: {
        current: number;
        target: number;
    };
    fat: {
        current: number;
        target: number;
    };
    weeklyProtein: number[]; // Array of values for the chart
}
