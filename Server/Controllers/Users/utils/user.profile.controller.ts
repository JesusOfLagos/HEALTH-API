import User from '../../../Models/User/user.model'


export async function changeUsername (req: any, res: any) {
    try {
        const userId = req.user
        const { username } = req.body
        const user = await User.findById(userId)
        if (!user) return res.status(404).json({ message: 'User not found' })
        user.username = username
        await user.save()
        return res.status(200).json({ message: 'Username changed successfully' })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
