import bcrypt from 'bcrypt';
import express from 'express';
import UserModel from '../models/user.model.js';

const router = express.Router();

router.post('/signup', async (req, res) => {
  const { name, password, email } = req.body;
  try {

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await UserModel.create({
      name,
      email,
      password: hashedPassword,
    })
    req.session.user = { userId: user.id, userName: user.name }
    res.json({ userId: user.id, userName: user.name })
  } catch (error) {
    return res.json({ message: "все не ок", error: error.message });
  }
});


router.post('/signin', async (req, res) => {
  const { name, password } = req.body;
  try {
    const user = await UserModel.findOne({ name }).exec();
    if (!user) {
      return res.json({ message: "все не ок c Именем" })
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.json({ message: "все не ок c Паролем" })
    }
    req.session.user = { userId: user.id, userName: user.name };
    res.json({ userId: user.id, userName: user.name })
  } catch (error) {
    return res.json({ message: "все не ок", error: error.message });
  }
});

router.get('/signout', (req, res, next) => {
  req.session.destroy((err) => {
    if (err) return next(err);
    res.clearCookie('sid');
    return res.redirect('/');
  });
});

router.get('/check', (req, res) => {
  if (req.session.user) {
    res.json({ ...req.session.user })
  }
});

export default router;
