import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./LoginPage.module.css";

function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate()

	const handleEmailOnChange = (event) => {
		setEmail(event.target.value);
	};
	const handlePasswordOnChange = (event) => {
		setPassword(event.target.value);
	};

	const onSubmitHandler = (event) => {
		event.preventDefault();

		const postData = {
			email: email,
			password: password,
		};

		const requestOptions = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(postData),
		};

		const url = "http://localhost/backend/login";

		fetch(url, requestOptions)
			.then((response) => {
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				return response.json();
			})
			.then((data) => {
				if (
					data.message.error === "User does not exist" ||
					data.message.error === "Incorrect password"
				) { 
					setError(data.message.error); 
					return;
				}

				localStorage.setItem("token", data.message.token);
				navigate("/")

			})
			.catch((error) => {
				console.error("There was a problem with the POST request:", error);
			});
	};

	return (
		<>
			<form className={classes.form} onSubmit={onSubmitHandler}>
				<h2 className={classes.heading}>Login</h2>
				<p className={classes.error}>{error}</p>
				<label htmlFor="email">email</label>
				<input
					className={classes.input}
					type="email"
					name="email"
					value={email}
					onChange={handleEmailOnChange}
					required
				/>
				<label htmlFor="password">Password</label>
				<input
					className={classes.input}
					type="password"
					name="password"
					value={password}
					onChange={handlePasswordOnChange}
					required
				/>
				<input type="submit" value="Login"></input>
				<p>
					Already have an account?
					<Link className={classes.link} to="/register">
						Register
					</Link>
				</p>
			</form>
		</>
	);
}

export default LoginPage;
