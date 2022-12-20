
const mongoose=require("mongoose")


const UserSchema= new mongoose.Schema({

        title: {type:String, enum:["Mr", "Mrs", "Miss"]},
        name: {type:String, required:true},
        phone: {type:String, required:true, unique:true},
        email: {type:String, unique:true,lowercase:true}, 
        password: {type:String, required:true},
        address: {
          street: {type:String},
          city: {type:String},
          pincode: {type:String},
        },
    },{ timestamps: true })

    
module.exports=mongoose.model('User',UserSchema)
