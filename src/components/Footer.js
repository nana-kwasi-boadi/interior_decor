import React from "react";
import classes from "./Footer.module.css";

const Footer = () => {
	return (
		<>
			
			<footer className={classes.footer}>
				<div className={classes["footer-links"]}>
					<a
						href="https://www.instagram.com/madbisbeads.gh/"
						target="_blank"
						rel="noreferrer">
					</a>
				</div>
				<div className={classes["footer-info"]}>
					<p>&copy; 2023 Nova. All rights reserved.</p>
					<p>Contact us: 123-456-7890</p>
				</div>
			</footer>
		</>
	);
};

export default Footer;
