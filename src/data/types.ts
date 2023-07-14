type User = {
	id: string;
	email: string;
	password: string;
	name: string;
	image: number;
	categories: string[];
	favourites: string[];
	recipes: string[]; // Array of recipe IDs
};

type Recipe = {
	id: string;
	name: string;
	category: string;
	time: string;
	description: string;
	ingredients: Ingredient[];
	steps: string[];
	image: string;
	author: User; // Reference to the User who owns the recipe
	authorId: string; // ID of the User who owns the recipe
};

type Ingredient = {
	id: string;
	cant: string;
	name: string;
	unit: string;
	recipe: Recipe; // Reference to the Recipe this ingredient belongs to
	recipeId: string; // ID of the Recipe this ingredient belongs to
};

export interface RequestWithToken extends Request {
	userIdFromToken: String;
}
