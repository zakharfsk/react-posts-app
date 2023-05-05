import About from "../pages/About";
import PostIdPage from "../pages/PostIdPage";
import Posts from "../pages/Posts";
import {createBrowserRouter} from "react-router-dom";
import Login from "../pages/Login";

export const privetRoutes = createBrowserRouter([
    {path: "/posts", element: <Posts />},
    {path: "/posts/:id", element: <PostIdPage />},
    {path: "/about", element: <About />},
]);

export const publicRoutes = createBrowserRouter([
    {path: "/login", element: <Login />},
]);
