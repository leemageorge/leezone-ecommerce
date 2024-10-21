const userModal = require("../../models/userModal")
const bcrypt = require('bcryptjs');

const userSignUpController = async(req,res)=>{

try{
  const{email, password, name} = req.body

  const user = await userModal.findOne({email})
  if(user){
    throw new Error ("User already exists")
  }
  if(!email){
    throw new Error("Please provide Email")
  }
  if(!password){
    throw new Error("Please provide password")
  }
  if(!name){
    throw new error ("Please provide name")
  }
  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);

 if(!hashPassword){
  throw new Error("Something went wrong")
 }

 const payload = {
  ...req.body,
  role: "GENERAL",
  password: hashPassword
 }
 const userData = new userModal(payload);
 const savedUser = await userData.save()

 res.status(200).json({
  message: "User created Successfully",
  data: savedUser,
  error: false,
  success: true
 })

}catch(err){
  res.status(500).json({
    message:err.message || err,
    error: true,
    success: false
  })
}

}

module.exports = userSignUpController