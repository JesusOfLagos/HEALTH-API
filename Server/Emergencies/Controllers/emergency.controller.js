

import Emergency from '../Models/emergency.model'

async function EmergencyHandler (emergency) {
    try {
        return "X"
    } catch (error) {
        
    }
}

async function CreateEmergencyInstance () {
    try {
        const { urgency, description, location } = req.body
        const EmergencyInstance = new Emergency({
            urgency,
            description,
            location
        })

        await EmergencyInstance.save()
        return res.json({
            success: true,
            message: "Emergency Instance Created Succesfully.",
            EmergencyInstance
        })
    } catch (error) {
        return res.json({
            message: "Emergencies can't be created at the moment.",
            success: false
        })
    }
}


export default async function NotifyServersOfAnEmergencyInstance () {
    try {
        const emergency = await CreateEmergencyInstance()
        const server = await EmergencyHandler(emergency)
        const result = await PoolOfRequestS.push(emergency)
        res.json({
            success: true,
            message: "Notified Servers succesfully. Waiting for a nearest response.",
            emergency._id
        })
    } catch (error) {
        res.json({
            success: false,
            message: "Emergencies cannot be initiated at the moment."
        })
    }
}