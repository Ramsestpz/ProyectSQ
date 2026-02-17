
export interface Meal {
  id: string;
  title: string;
  description: string;
  calories: number;
  protein: number;
  fat: number;
  carbs: number; // Added carbs for completeness
  image: string;
  time: number; // in minutes
  type: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';
  date: string; // ISO date string
  isVegetarian?: boolean;
}
