import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import supabase from '../supabaseClient.js';

export const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const { data: user } = await supabase
        .from('users')
        .select('id, email')
        .eq('id', decoded.id)
        .single();

      req.user = user;

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});