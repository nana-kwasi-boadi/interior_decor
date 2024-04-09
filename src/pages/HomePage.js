import React, { useEffect, useState } from "react";
import classes from "./HomePage.module.css";
import Footer from "../components/Footer";
import Header from "../components/Header";
import placeHolder from "../assets/images/placeholder.png";

function Homepage() {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		fetch("http://localhost/backend/home")
			.then((response) => {
				if (!response.ok) {
					throw new Error("Failed to fetch data");
				}
				return response.json();
			})
			.then((data) => {
				setProducts(data);
			})
			.catch((error) => {
				console.error("Error fetching data:", error);
			});
	}, []);

	return (
		<>
			<Header />
			<div className={classes.heading}>
				<h2>Welcome to our Furniture Store</h2>
				<div className={classes["furniture-container"]}>
					{products.map((item) => (
						<div key={item.product_id} className={classes["furniture-item"]}>
							{
								<img
									className={classes.img}
									src={require(`../assets/images/${item.product_image}`)}
									// src={placeHolder}
									alt={item.product_name}
								/>
							}
							<h3>{item.product_name}</h3>
							<p>{item.price}</p>
							<button>Add to Cart</button>
						</div>
					))}
				</div>
				<Footer />
			</div>
		</>
	);
}

export default Homepage;
