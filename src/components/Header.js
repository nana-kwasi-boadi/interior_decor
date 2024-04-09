import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Header.module.css";
import logo from "../assets/images/logo.png";

const Header = () => {
	const [isOpen, setIsOpen] = useState(false);
	const navigate = useNavigate();

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	const logout = () => {
		localStorage.removeItem("token");
		navigate("/login");
	};

	return (
		<header className={classes.header}>
			{/* Logo */}
			<div className={classes.logo}>
				<img className={classes["company-logo"]} src={logo} alt="Logo" />
			</div>

			<h1 className={classes.h1}>NOVA DECOR</h1>

			{/* Account Dropdown */}
			<div className={classes.options}>
				<div className={classes.account}>
					<div className={classes.dropdown}>
						<button onClick={toggleDropdown} className={classes.dropbtn}>
							Account
							<i className={`${classes.icon} ${isOpen ? classes.rotate : ""}`}>
								&#9660;
							</i>
						</button>
						{isOpen && (
							<div className={classes.dropdownContent}>
								<p onClick={logout}>Logout</p>
							</div>
						)}
					</div>
				</div>

				{/* Cart Button */}
				<div className={classes.cart}>
					<button className={classes["cart-btn"]}>My Cart</button>
				</div>
			</div>
		</header>
	);
};

export default Header;
