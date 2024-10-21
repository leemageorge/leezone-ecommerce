const userModal = require("../models/userModal")

const uploadProductPermission = async(userId)=>{

    const user = await userModal.findById(userId)

    if(user?.role !== "ADMIN"){
        return false
    }
    return true

}

module.exports = uploadProductPermission