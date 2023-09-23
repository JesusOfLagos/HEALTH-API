


import Admin from "../../Models/Admin/admin.model"
import ObjectId from "mongoose"

async function CreateNewAdmin () {
    try {
        const newAdmin = new Admin({
            email,
            password,
            profile: new ObjectId
        })
    } catch (error) {
        
    }
}