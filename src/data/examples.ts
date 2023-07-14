const recipe = {
	uid: "12345678888",
	authorname: "Carlitos",
	authorphoto: 1,
	authoruid: "1234567890",
	category: "Panaderia",
	description: "Receta de pan",
	image: "https://...",
	ingredients: [
		{
			cant: "1",
			unit: "kg",
			name: "harina",
		},
		{
			cant: "10",
			unit: "ml",
			name: "agua",
		},
		{
			cant: "10",
			unit: "gr",
			name: "levadura",
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
	id: "1234567890",
	name: "Carlos Perez",
	email: "carlos@carlos.carlos",
	password: "123456",
	recipes: ["12345678888"],
	favourites: ["12345678888"],
	categories: ["Panaderia", "Postres"],
	image: 7,
};
