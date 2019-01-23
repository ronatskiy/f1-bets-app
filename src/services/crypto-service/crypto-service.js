import bcrypt from "bcryptjs";

function encodePassword(password) {
	return bcrypt.hashSync(password, 8);
}

function isPasswordValid(password, hash) {
	return bcrypt.compareSync(password, hash);
}

export const cryptoService = {
	encodePassword,
	isPasswordValid,
};
