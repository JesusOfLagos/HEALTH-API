import { Request, Response } from 'express';
import Blacklist from '../../../Models/utils/Blacklist.model'; // Import your Blacklist model






// Function to log out a user and add the token to the blacklist
async function LogoutUser (req: Request, res: Response) {
  const token: string = req.header('Authorization') as string;

  if (!token) {
    return res.status(400).json({ message: 'Token is missing' });
  }
  try {
    // Add the token to the blacklist
    await Blacklist.findOneAndUpdate({}, { $addToSet: { tokens: token } }, { upsert: true });

    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Error while logging out', error });
  }
}
