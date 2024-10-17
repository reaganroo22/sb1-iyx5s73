import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import supabase from '../supabaseClient.js';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const { data: existingUser } = await supabase
    .from('users')
    .select('id')
    .eq('email', email)
    .single();

  if (existingUser) {
    res.status(400);
    throw new Error('User already exists');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const { data: user, error } = await supabase
    .from('users')
    .insert({ email, password: hashedPassword })
    .single();

  if (error) {
    res.status(400);
    throw new Error('Invalid user data');
  }

  // Create a profile for the user
  await supabase
    .from('profiles')
    .insert({ user_id: user.id, name });

  res.status(201).json({
    id: user.id,
    email: user.email,
    token: generateToken(user.id),
  });
});

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const { data: user } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      id: user.id,
      email: user.email,
      token: generateToken(user.id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = asyncHandler(async (req, res) => {
  const { data: user } = await supabase
    .from('users')
    .select('id, email')
    .eq('id', req.user.id)
    .single();

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateUserProfile = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const updateData = { email };

  if (password) {
    const salt = await bcrypt.genSalt(10);
    updateData.password = await bcrypt.hash(password, salt);
  }

  const { data: user, error } = await supabase
    .from('users')
    .update(updateData)
    .eq('id', req.user.id)
    .single();

  if (error) {
    res.status(404);
    throw new Error('User not found');
  }

  res.json({
    id: user.id,
    email: user.email,
    token: generateToken(user.id),
  });
});