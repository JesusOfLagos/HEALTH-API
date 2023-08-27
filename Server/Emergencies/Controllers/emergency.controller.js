

import Emergency from '../Models/emergency.model'



async function CreateEmergencyInstance () {
    try {
        const { urgency, description, location } = req.body
        const EmergencyInstance = new Emergency({
            urgency,
            description,
            location
        })

        await EmergencyInstance.save()
        res.json({
            success: true,
            message: "Emergency Instance Created Succesfully.",
            EmergencyInstance
        })
    } catch (error) {
        res.json({
            message: "Emergencies can't be created at the moment.",
            success: false
        })
    }
}


export default async function NotifyServersOfAnEmergencyInstance () {
    try {
        await CreateEmergencyInstance()
        const server = await EmergencyHandler.notify()
    } catch (error) {
        
    }
}