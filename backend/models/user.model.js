import mongoose from 'mongoose';

const UserModelSchema = new mongoose.Schema({
  // Имя пользователя
  name: {
    type: String,
    required: true,
    unique: true,
    // minlength: 4,
    // match: /^[A-Z]\w+$/i,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    // minlength: 3,
    // match: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  },
});

export default mongoose.model('UserModel', UserModelSchema);
