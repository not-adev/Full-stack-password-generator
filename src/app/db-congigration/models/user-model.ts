import mongoose, { Schema, Document, Model } from 'mongoose';

/**
 * Mongoose user document interface
 */

interface ISavedPassword {
  site: string;
  username: string;
  password: string;
}

export interface IUser extends Document {
  email: string;
  password: string;
  SavedPasswords: ISavedPassword[];
}
const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true },
  SavedPasswords: [{ type: Schema.Types.ObjectId, ref: 'SavedPassword' }],

});

// ensure email unique index at schema level
UserSchema.index({ email: 1 }, { unique: true });

export const UserModel: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default UserModel;
