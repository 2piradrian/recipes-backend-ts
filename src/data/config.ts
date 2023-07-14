const getAcessToken = (): string => {
	if (process.env.ACCESS_TOKEN) {
		return process.env.ACCESS_TOKEN;
	}
	throw new Error("ACCES TOKEN SECRET NOT PRESENT");
};
const getRefreshToken = () => {
	if (process.env.REFRESH_TOKEN) {
		return process.env.REFRESH_TOKEN;
	}
	throw new Error("REFRESH TOKEN SECRET NOT PRESENT");
};
const getPort = () => {
	if (process.env.PORT) {
		return process.env.PORT;
	}
	throw new Error("PORT NOT PRESENT");
};

export const config = {
	accessToken: getAcessToken(),
	refreshToken: getRefreshToken(),
	port: getPort(),
};
