import React from "react";
import { Route, BrowserRouter, Routes} from "react-router-dom";
import Login from "../screens/Login";
import Register from "../screens/Register";
import Home from "../screens/Home";
import Project from "../screens/project";

const AppRoutes = () =>{
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/register" element={<Register/>} />
                <Route path="/projects" element={<Project/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;