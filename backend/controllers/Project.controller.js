import Project from "../models/project.model.js";
import * as projectService from "../services/project.service.js";
import { validationResult } from "express-validator";
import userModel from "../models/user.model.js";

export const createProject = async (req, res) => {

    const erros = validationResult(req);

    if (!erros.isEmpty()) {
        return res.status(400).json({ errors: erros.array() });
    }

    try {

    const { name } = req.body;
    const loggedInUser = await userModel.findOne({email: req.user.email});

    const userId = loggedInUser._id;

    const newProject = await projectService.createProject({ name, userId });

    res.status(201).json(newProject);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
}};


export const getAllProjects = async (req, res) => {
    try {
        const loggedInUser = await userModel.findOne({
            email: req.user.email
        });

        const allUserProjects = await projectService.getAllProjectsByUserId({
            userId: loggedInUser._id
        });

        return res.status(200).json({
            projects: allUserProjects
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
};

export const addUserToProject = async (req, res) => {
    const erros = validationResult(req);

    if (!erros.isEmpty()) {
        return res.status(400).json({ errors: erros.array() });
    }

    try {
        const { users, projectId } = req.body;
        const loggedInUser = await userModel.findOne({
            email: req.user.email
        });

        const allUserProjects = await projectService.addUsersToProject({
            projectId,
            users,
            userId: loggedInUser._id
        });

        return res.status(200).json({
            allUserProjects,
        });


    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
} 


export const getProjectById = async (req, res) => {

    const { projectId } = req.params;

    try{
        const project = await projectService.projectById({ projectId });
        return res.status(200).json({
            project
        });
    }
    catch(error){
        console.error(error);
        res.status(400).json({ message: error.message });
    }
}