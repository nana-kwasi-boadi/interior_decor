import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "../src/pages/HomePage";
import RegisterPage from "../src/pages/RegisterPage";
import LoginPage from "../src/pages/LoginPage";


const router = createBrowserRouter([
	{
		path: "/",
		element: <HomePage />,
	},
	{path: "/login", element: <LoginPage />},
	{path: "/register", element: <RegisterPage />}
]);

function App() {
	return (
		<>
			<RouterProvider router={router} />
		</>
	);
}

export default App;
