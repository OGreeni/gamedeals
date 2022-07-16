import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
  },
  savedDeals: [
    {
      dealId: {
        type: String,
        required: true,
      },
    },
  ],
});

export default mongoose.model('user', userSchema);
