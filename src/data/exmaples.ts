const recipe = {
	id: "12345678888",
	authorname: "Carlitos",
	authorphoto: 1,
	authoruid: "1234567890",
	category: "Panaderia",
	comments: ["", ""],
	description: "Receta de pan",
	image: "https://...",
	ingredients: [
		{
			cant: "10",
			name: "harina",
			unit: "gr",
		},
		{
			cant: "10",
			name: "agua",
			unit: "ml",
		},
		{
			cant: "10",
			name: "levadura",
			unit: "gr",
		},
	],
	steps: [
		"Agrega el agua tibia y mezcla hasta que se forme una masa suave.",
		"Deja reposar por 30 minutos.",
	],
	name: "Pan de muerto",
	time: "30 minutos",
};

const user = {
	uid: "1234567890",
	name: "Carlos",
	surname: "Gonzalez",
	email: "carlos@carlos.carlos",
	recipes: ["12345678888"],
	favourites: ["12345678888"],
	categories: ["Panaderia", "Postres"],
	image: 7,
};
