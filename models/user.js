import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name: String,
    firstname: {
        type:String,
        required: [true, "Pas de prenom"]
    },
    mail: {
        type: String,
        required: [true, "pas de mail"]
    },
    password: {
        type: String,
        required: [true, "pas de mot de passe"]
    },
    pokemon: []
})

const UserModel = mongoose.model('users', userSchema)
export default UserModel