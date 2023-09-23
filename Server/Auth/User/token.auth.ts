import jwt, { TokenExpiredError } from 'jsonwebtoken';
import otpGenerator from 'otp-generator';
import { AppTokenError } from '../../Errors/Auth/token.error';
import Blacklist from '../../Models/utils/Blacklist.model'; // Import your Blacklist model


export async function generateOTP() {
    const otp = otpGenerator.generate(6, {
        digits: true,
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
      }
      );

    return otp
}


export async function generateAccessToken(user: any) {
  const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET as string

  if (!accessTokenSecret) {
    throw new AppTokenError('ACCESS_TOKEN_SECRET is not defined in the environment.');
  }

  const payload = { user };
  const token = jwt.sign(payload, accessTokenSecret, { expiresIn: '7d' });
  return token;
}


export async function generateRefreshToken(user: any) {
    const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET as string
  
    if (!refreshTokenSecret) {
      throw new AppTokenError('REFRESH_TOKEN_SECRET is not defined in the environment.');
    }
  
    const payload = { user };
    const token = jwt.sign(payload, refreshTokenSecret, { expiresIn: '7d' });
    return token;
  }
  



export async function verifyRefreshToken(token: string) {
  const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET as string;

  if (!refreshTokenSecret) {
    throw new Error('REFRESH_TOKEN_SECRET is not defined in the environment.');
  }

  try {
    const payload = jwt.verify(token, refreshTokenSecret);
    return payload;
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      throw new AppTokenError('Refresh Token has expired.');
    } else {
      throw new AppTokenError('Invalid Refresh Token.');
    }
  }
}


export async function verifyAccessToken(token: string) {
    const accessTokenSecret = process.env.ACCESSS_TOKEN_SECRET as string;
  
    if (!accessTokenSecret) {
      throw new Error('R is not defined in the environment.');
    }
  
    try {
      const payload = jwt.verify(token, accessTokenSecret);
      return payload;
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new AppTokenError('Access Token has expired.');
      } else {
        throw new AppTokenError('Invalid Access Token.');
      }
    }
  }

  export async function globalVerifyAccessToken(req, res, next) {
    const token = req.header('Authorization') as string;
    await isTokenBlacklisted(token);
    const payload = await verifyAccessToken(token);
    req.user = payload
    next();
  }

  export async function globalVerifyRefreshToken(req, res, next) {
    const token = req.header('Authorization') as string;
    await isTokenBlacklisted(token);
    const payload = await verifyRefreshToken(token);
    req.user = payload
    next();
  }



  export async function isTokenBlacklisted(token: string) {
    const blacklist = await Blacklist.findOne({ tokens: token });
  
    if (blacklist && blacklist.tokens.includes(token)) {
      throw new AppTokenError('Token is blacklisted.');
    }
  }
  



  export async function generateTokens(user: any) {
    const accessToken = await generateAccessToken(user);
    const refreshToken = await generateRefreshToken(user);
    return { accessToken, refreshToken };
  }

  export async function generateRandomUsername(): Promise<string> {
    const healthAdjectives = [
      'Healthy', 'Fit', 'Active', 'Wellness', 'Vital', 'Energetic',
      'Nutritious', 'Balanced', 'Strong', 'Resilient', 'Radiant',
      'Lively', 'Optimal', 'Spirited', 'Hearty', 'Robust', 'Fresh',
      'Wholesome', 'Revitalized', 'Vigorous', 'Dynamic', 'Thrive',
      'Invigorated', 'Buoyant', 'Renewed', 'Bountiful', 'Bloom',
      'Strengthened', 'Nourished', 'Sound', 'Restored', 'Brawny',
      'Vibrant', 'Well-being', 'Peachy', 'Peak', 'Flourish',
      'Rejuvenated', 'Soundness', 'Exuberant', 'Buoyancy',
      'Adept', 'Lively', 'Zealous', 'Thriving', 'Effervescent'
    ];
  
    const healthNouns = [
      'Health', 'Wellness', 'Fitness', 'Vitality', 'Nutrition', 'Energy',
      'Strength', 'Resilience', 'Well-being', 'Recovery', 'Revival',
      'Thrive', 'Performance', 'Radiance', 'Refresh', 'Regeneration',
      'Renewal', 'Flourish', 'Fortitude', 'Rejuvenation', 'Prosperity',
      'Sustenance', 'Soundness', 'Bloom', 'Vigor', 'Revitalization',
      'Vitalism', 'Buoyancy', 'Salubrity', 'Robustness', 'Wholesomeness',
      'Nourishment', 'Soundness', 'Recovery', 'Restoration', 'Invigoration',
      'Renewed', 'Well-being', 'Stamina', 'Elixir', 'Renewal', 'Balancing',
      'Boost', 'Flourishing', 'Energizing', 'Reviving', 'Thriver'
    ];
  
    // Randomly select a health adjective and a health noun
    const randomHealthAdjective = healthAdjectives[Math.floor(Math.random() * healthAdjectives.length)];
    const randomHealthNoun = healthNouns[Math.floor(Math.random() * healthNouns.length)];
  
    // Combine them to create the username
    const username = `${randomHealthAdjective}${randomHealthNoun}`;
  
    return username;
  }
  
//   // Example usage:
//   const randomUsername = generateRandomUsername();
//   console.log(`Random Username: ${randomUsername}`);
  