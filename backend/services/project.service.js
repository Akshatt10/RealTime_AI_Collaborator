import projectModel from "../models/project.model.js";
import mongoose from "mongoose";
import userModel from "../models/user.model.js";


export const createProject = async ({name,userId}) => {

    if (!name) {
        throw new Error('Name is required');
    }
    if(!userId){
        throw new Error('User is required');
    }
    let project;
    try {
        project = await projectModel.create({
            name,
            users: [ userId ]
        });
    } catch (error) {
        if (error.code === 11000) {
            throw new Error('Project name already exists');
        }
        throw error;
    }

    return project;


}


export const getAllProjectsByUserId = async ({userId}) => {
    if (!userId) {
        throw new Error('User is required');
    }
    
    const allUserProjects = await projectModel.find({ users: userId });

    return allUserProjects;
}


export const addUsersToProject = async ({ users, projectId, userId }) => {

    if (!projectId) {
        throw new Error('Project ID is required');
    }
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
        throw new Error('Invalid Project ID');
    }
    if (!users || !Array.isArray(users)) {
        throw new Error('Users are required and must be an array');
    }
    if (!userId) {
        throw new Error('User is required');
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new Error('Invalid User ID');
    }

    const project = await projectModel.findOne({
        _id: projectId,
        users: userId
    });

    if(!project){
        throw new Error('User is not a member of the project');
    }

    const updatedProject = await projectModel.findOneAndUpdate(
        { _id: projectId },
        { $addToSet: { users: { $each: users } } },
        { new: true }
    );

    return updatedProject;

    
}


export const projectById = async ({ projectId })  => {

    if (!projectId) {
        throw new Error('Project ID is required');
    }
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
        throw new Error('Invalid Project ID');
    }

    const project = await projectModel.findOne({
        _id:projectId
    }).populate('users')

    if (!project) {
        throw new Error('Project not found');
    }

    return project;

}