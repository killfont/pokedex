import mongoose from 'mongoose'

const pkmnSchema = new mongoose.Schema({
  
   
   name: {
        type: String,
        required: [true, "pas de nom"]
    },
    level: {
        type: Number,
        required: [true, "pas de niveau"]
    },
    type: {
        type: String,
        required: [true, "pas de type"]
    },
    userId: {
        type: String,
        required: [true, "pas de dresseur"]
    },
    img:{
        type:String,
        default: "pikachu.png"
    }
})

const PkmnModel = mongoose.model('pokemons', pkmnSchema)
export default PkmnModel