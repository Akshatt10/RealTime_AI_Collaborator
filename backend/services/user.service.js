import userModel from '../models/user.model.js';


export const createUser = async ({
    email,
    password
}) => { 
    // Check if email and password are provided
    if(!email || !password) {
        throw new Error('Email and password are required');
    }

    // HAsh the password before adding to the database
    const hashPassword = await userModel.hashPassword(password);
    const user = await userModel.create({ 
        email, 
        password: hashPassword 
    });


    return user;
}
