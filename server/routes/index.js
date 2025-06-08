import express from 'express';
import userRoutes from './userRoutes.js';
import adminRoutes from './adminRoutes.js';
// Import the EventEmitter module
import { EventEmitter } from 'events';

// Increase the maximum number of listeners for the EventEmitter
EventEmitter.defaultMaxListeners = 20; // Set to an appropriate value based on your application's needs

const router = express.Router();

router.use("/user",userRoutes);
router.use("/admin",adminRoutes);
export default router;