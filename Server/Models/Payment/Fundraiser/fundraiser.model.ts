
import * as mongoose from 'mongoose';

export interface IFundraiser extends mongoose.Document {
  user: string;
  fundraiserName: string;
  target: number;
  anountGenerated: number;
  withdrawals: mongoose.Schema.Types.ObjectId[];
  dueDate: Date;
  fundraiserLink: string;
  image: string;
  isBlocked: boolean;
}

const FundraiserSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
  fundraiserName: { type: String, required: true },
  target: { type: Number, required: true },
  anountGenerated: { type: Number, default: 0 },
  withdrawals: { type: [mongoose.Schema.Types.ObjectId], ref: 'Withdrawals', default: [] },
  dueDate: { type: Date, required: true },
  fundraiserLink: { type: String, required: true },
  image: { type: String, required: false },
  isBlocked: { type: Boolean, default: true}
});

export default mongoose.model<IFundraiser>('Fundraiser', FundraiserSchema);
