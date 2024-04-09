import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./RegisterPage.module.css";

function RegisterPage() {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confrimPassword, setConfirmPassword] = useState("");
	const [userName, setUserName] = useState("");
	const [number, setNumber] = useState("");
	const [address, setAddress] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate()

	const handleFirstNameOnChange = (event) => {
		setFirstName(event.target.value);
	};

	const handleLastNameOnChange = (event) => {
		setLastName(event.target.value);
	};
	const handleEmailOnChange = (event) => {
		setEmail(event.target.value);
	};
	const handlePasswordOnChange = (event) => {
		setPassword(event.target.value);
	};
	const handleConfirmPasswordOnChange = (event) => {
		setConfirmPassword(event.target.value);
	};
	const handleUserNameOnChange = (event) => {
		setUserName(event.target.value);
	};
	const handleAddress = (event) => {
		setAddress(event.target.value);
	};
	const handlePhoneNumber = (event) => {
		setNumber(event.target.value);
	};

	const onSubmitHandler = (event) => {
		event.preventDefault();

		

		const postData = {
			firstName: firstName,
			lastName: lastName,
			email: email,
			number: number,
			address: address,
			userName: userName,
			confrimPassword: confrimPassword,
			password: password,
		};

		const requestOptions = {
			method: "POST",
			headers: {
				"Content-Type": "application/json", 
			},
			body: JSON.stringify(postData), 
		};

		const url = "http://localhost/backend/register"; 

		
		fetch(url, requestOptions)
			.then((response) => {
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				return response.json(); 
			})
			.then((data) => {
				if (data.message === "User registered successfully.") {
					navigate("/login")
					return
				}
					setError(data.message);
			})
			.catch((error) => {
				console.error("There was a problem with the POST request:", error);
			});
	};

	return (
		<>
			<form className={classes.form} onSubmit={onSubmitHandler}>
				<h2 className={classes.heading}>Register</h2>
				<p className={classes.error}>{error}</p>
				<label htmlFor="fname">First Name</label>
				<input
					className={classes.input}
					type="text"
					name="fname"
					value={firstName}
					onChange={handleFirstNameOnChange}
					required
				/>

				<label htmlFor="lname">Last Name</label>
				<input
					className={classes.input}
					type="text"
					name="lname"
					value={lastName}
					onChange={handleLastNameOnChange}
					required
				/>

				<label htmlFor="uname">User Name</label>
				<input
					className={classes.input}
					type="text"
					name="uname"
					value={userName}
					onChange={handleUserNameOnChange}
					required
				/>

				<label htmlFor="address">Address</label>
				<input
					className={classes.input}
					type="text"
					name="address"
					value={address}
					onChange={handleAddress}
					required
				/>

				<label htmlFor="number">phone Number</label>
				<input
					className={classes.input}
					type="text"
					name="number"
					value={number}
					onChange={handlePhoneNumber}
					required
				/>

				<label htmlFor="email">Email</label>
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

				<label htmlFor="confirm-password">Confirm Password</label>
				<input
					className={classes.input}
					type="password"
					name="confirm-password"
					value={confrimPassword}
					onChange={handleConfirmPasswordOnChange}
					required
				/>
				<input type="submit" value="Register"></input>
				<p>
					Already have an account?
					<Link className={classes.link} to="/login">
						Login
					</Link>
				</p>
			</form>
		</>
	);
}

export default RegisterPage;
