import bycrypt from 'bcryptjs';
import mongoose,{Schema} from 'mongoose';

const userSchema = new Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    isAdmin:{type:Boolean,required:false},
    department:{type:String}

},{timestamps:true});

userSchema.pre("save" ,async function(next){
    if(!this.isModified("password")){
        next();
    }
    const salt= await bycrypt.genSalt(10);
    this.password= await bycrypt.hash(this.password,salt);

})

userSchema.methods.matchPassword= async function (enteredPass){
    return await bycrypt.compare(enteredPass,this.password);
}

const User=mongoose.model("User",userSchema);
export default User;
