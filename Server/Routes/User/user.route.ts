import { Router } from "express";
import User from "../../Models/User/user.model";
import { DeleteAllUsers, GetAllUsers, CreateNewUser, LoginUser, LogoutUser } from "../../Controllers/Users/Auth/user.controller";
import { createPaymentDetails, getAllPaymentDetails, getAllTransactions, getTransactionStatus } from "../../Services/Finance/utils/account.controller";

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


// UserRouter.get('/payment-detail/get/:id', getTransactionStatus)

// UserRouter.get('/payment-detail/get', getAllPaymentDetails)
UserRouter.get('/payment-detail/get/:userId', getAllTransactions)
UserRouter.post('/payment-detail/create', createPaymentDetails)

















export default UserRouter;