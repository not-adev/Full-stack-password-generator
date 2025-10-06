import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISavedPassword extends Document {
  username: string;
  password: string;
  user: mongoose.Types.ObjectId; // optional back-reference
}

const SavedPasswordSchema = new Schema<ISavedPassword>({
  username: { type: String, required: true },
  password: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User' }, // optional
});

export const SavedPasswordModel: Model<ISavedPassword> =
  mongoose.models.SavedPassword || mongoose.model<ISavedPassword>('SavedPassword', SavedPasswordSchema);