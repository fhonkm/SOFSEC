import { createBrowserRouter } from "react-router-dom";
import App from "./App"
import SignUp from "./components/SignUp";
import LoginPage from "./components/LoginPage"

export const router = createBrowserRouter([
    { path: "/", element: <App />},
    { path: "/signup", element: <SignUp />},
    { path: "/loginpage", element: <LoginPage />},
]);