import axios from "axios";
import jwt_decode from "jwt-decode";

export const login = (data, callback) => {
	axios
		.post("https://fakestoreapi.com/auth/login", data)
		.then((res) => {
			callback(true, res.data.token)
		})
		.catch((err) => {
			callback(false, err);
		})
}

export const getUserName = (token) => {
	const decoded = jwt_decode(token)
	console.log(decoded)
	return decoded.user
}