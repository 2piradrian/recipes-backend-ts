# Ruta: /auth

```typescript
app.use("/auth", AuthRouter);
```

La ruta "/auth" servirá como punto de entrada para todas las operaciones relacionadas con la autenticación, como el registro, inicio de sesión y renovación de tokens.

### Router: AuthRouter

El AuthRouter es un middleware que maneja las rutas relacionadas con la autenticación. Estas rutas son específicas para el registro, inicio de sesión y renovación de tokens.

```typescript
AuthRouter.post("/login", AuthValidator.login, AuthController.login);

AuthRouter.post("/register", AuthValidator.register, AuthController.register);

AuthRouter.post("/refresh-token", AuthValidator.refreshToken, AuthController.refreshToken);
```

El AuthRouter define tres rutas diferentes:

### POST /login

Esta ruta se utiliza para que los usuarios inicien sesión. Debes enviar una solicitud HTTP POST con las credenciales (email y password) en elcuerpo de la solicitud.

### POST /register

Esta ruta se utiliza para que los usuarios se registren en la aplicación. Debes enviar una solicitud HTTP POST con la información de registro(email, password, name y image) en el cuerpo de la solicitud.

### POST /refresh-token

Esta ruta se utiliza para renovar el token de accesoexpirado. Debes enviar una solicitud HTTP POST con el refreshToken en el cuerpode la solicitud.

# Ruta: /recipes

```typescript
app.use("/recipes", RecipeRouter);
```

La ruta "/recipes" servirá como punto de entrada para todas las operaciones relacionadas con las recetas.

### Router: RecipeRouter

El RecipeRouter es un middleware que maneja las rutas relacionadas con las recetas. Proporciona varias rutas para obtener información sobre las recetas, crear y actualizar recetas, obtener recetas del usuario, etc.

```typescript
RecipeRouter.get("/", RecipeController.getAll);

RecipeRouter.get("/:id", RecipeController.getById);

RecipeRouter.get("/user-recipes/:id", RecipeController.getUserRecipes);

RecipeRouter.get("/home/lastest", RecipeController.getLatest);

RecipeRouter.post("/page", RecipeController.getPage);

RecipeRouter.post("/liked", AuthValidator.checkToken, RecipeController.getLiked);

RecipeRouter.post("/home/recommended", AuthValidator.checkToken, RecipeController.getRecommended);

RecipeRouter.post("/", AuthValidator.checkToken, RecipeValidator.create, RecipeController.create);

RecipeRouter.put("/:id", AuthValidator.checkToken, RecipeController.update);
```

El RecipeRouter define varias rutas para interactuar con las recetas:

### GET /recipes:

Obtiene la lista de todas las recetas disponibles.

### GET /recipes/:id

Obtiene una receta específica según su ID.

### GET /recipes/user-recipes/:id

Obtiene todas las recetas pertenecientes a un usuario específico.

### GET /recipes/home/lastest

Obtiene las recetas más recientes para mostrar en la página de inicio.

### POST /recipes/page

Obtiene una página de recetas con paginación según la categoría (opcional).

### POST /recipes/liked

Obtiene las recetas que un usuario ha marcado como favoritas, requiere autenticación.

### POST /recipes/home/recommended

Obtiene recetas recomendadas para un usuario en función de sus categorías de interés, requiere autenticación.

### POST /recipes

Crea una nueva receta, requiere autenticación y debe pasar por un proceso de validación.

### PUT /recipes/:id

Actualiza una receta existente, requiere autenticación y debe pasar por un proceso de validación.

# Ruta: /user

```typescript
app.use("/user", UserRouter);
```

### Router: UserRouter

El UserRouter es un middleware que maneja las rutas relacionadas con los usuarios. Proporciona rutas para obtener información sobre los usuarios, actualizar su perfil y más.

```typescript
UserRouter.get("/:id", AuthValidator.checkToken, UserValidator.getById, UserController.getById);

UserRouter.get(
	"/email/:email",
	AuthValidator.checkToken,
	UserValidator.getByEmail,
	UserController.getByEmail
);

UserRouter.post("/", AuthValidator.checkToken, UserController.getByToken);

UserRouter.put("/", AuthValidator.checkToken, UserValidator.update, UserController.update);
```

El UserRouter define varias rutas para interactuar con los usuarios:

### GET /user/:id

Obtiene información de un usuario específico por su ID, requiere autenticación.

### GET /user/email/:email

Obtiene información de un usuario específico por su correo electrónico, requiere autenticación.

### POST /user

Obtiene información del usuario actual a partir del token proporcionado en el encabezado de autorización, requiere autenticación.

### PUT /user

Actualiza el perfil de usuario con la información proporcionada en el cuerpo de la solicitud, requiere autenticación y debe pasar por un proceso de validación.
