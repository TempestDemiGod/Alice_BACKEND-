import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    nombre:String,
    apellido: String,
    email: String,
    password: String,
    proyects: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project",
        },
    ],
})

const projectSchema = new mongoose.Schema({
nombre: String,
tema: String,
apiKey: String,
description: {type: String, optional: true},
artefactos: [
	{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Artifact",
	},
],


});

const artifactSchema = new mongoose.Schema({
  nombre: String,
  prompts: String,
  respuesta:String,
});


export const User = mongoose.model("User", UserSchema);

export const Project = mongoose.model("Project", projectSchema);

export const Artifact = mongoose.model("Artifact", artifactSchema);