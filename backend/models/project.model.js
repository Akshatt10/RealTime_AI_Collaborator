import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true,
    },

    users: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
       }
]

});

const Project = mongoose.model('Project', ProjectSchema);

export default Project;