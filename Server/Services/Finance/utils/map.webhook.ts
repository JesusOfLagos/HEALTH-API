import express, { Request, Response } from 'express';
import crypto from 'crypto';

const app = express();


// Replace 'your-secret-key' with your actual webhook secret key
const webhookSecretKey = process.env.WEBHOOK_SECRET_KEY as string;

app.use(express.json());

function calculateWebhookSignature(
  svixId: string,
  svixTimestamp: string,
  body: string,
  secret: string
): string {
  const signedContent = `${svixId}.${svixTimestamp}.${body}`;
  const secretBytes = Buffer.from(secret.split('_')[1], 'base64');
  const signature = crypto
    .createHmac('sha256', secretBytes)
    .update(signedContent)
    .digest('base64');
  return signature;
}

function verifyWebhookTimestamp(svixTimestamp: string): boolean {
  // Set your timestamp tolerance (e.g., 5 minutes)
  const tolerance = 5 * 60; // 5 minutes in seconds
  const currentTimestamp = Math.floor(Date.now() / 1000); // Current timestamp in seconds
  const webhookTimestamp = parseInt(svixTimestamp, 10);

  return Math.abs(currentTimestamp - webhookTimestamp) <= tolerance;
}

app.post('/webhook', (req: Request, res: Response) => {
  const svixId = req.headers['svix-id'] as string;
  const svixTimestamp = req.headers['svix-timestamp'] as string;
  const svixSignature = req.headers['svix-signature'] as string;
  const body = JSON.stringify(req.body);

  // Verify the webhook signature
  const calculatedSignature = calculateWebhookSignature(
    svixId,
    svixTimestamp,
    body,
    webhookSecretKey
  );

  if (calculatedSignature === svixSignature) {
    // Verify the timestamp
    if (verifyWebhookTimestamp(svixTimestamp)) {
      console.log('Webhook is valid. Processing...');
      // Process the webhook data here
      // ...
      res.status(200).send('Webhook processed');
    } else {
      console.log('Webhook timestamp is not valid. Discarding...');
      res.status(403).send('Invalid webhook timestamp');
    }
  } else {
    console.log('Webhook signature is not valid. Discarding...');
    res.status(403).send('Invalid webhook signature');
  }
});
