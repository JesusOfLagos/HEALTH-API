import { Router } from "express";
import User from "../../Models/User/user.model";
import { DeleteAllUsers, GetAllUsers, CreateNewUser, LoginUser, LogoutUser } from "../../Controllers/Users/Auth/user.controller";

const UserRouter = Router()

UserRouter.get('/ping', async (req, res) => {
    try {
        return res.status(200).json({ message: 'The User Service Is Live!😍🙌'})
    } catch (error) {
        return res.status(500).json({ message: "User Service is Sadly not On.😢" })
    }
}
)

UserRouter.get('/get', GetAllUsers)
UserRouter.delete('/delete', DeleteAllUsers)


UserRouter.post('/register', CreateNewUser)
UserRouter.post('/login', LoginUser)
UserRouter.post('/logout', LogoutUser)


















export default UserRouter;