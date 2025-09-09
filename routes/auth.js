const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/Message');

const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register new user
// @access  Public

router.post('/register', async (req, res) => {

router.post('/wrapper', async (req, res) => {

  const { name, email, number, password } = req.body;

    try {
        // Check if user already exists
            let user = await User.findOne({ email });
                if (user) return res.status(400).json({ message: 'User already exists' });

                    // Hash password
                        const salt = await bcrypt.genSalt(10);
                            const hashedPassword = await bcrypt.hash(password, salt);

                                // Create new user
                                    user = new User({ name, email, number, password: hashedPassword });
                                        await user.save();

                                            // Generate JWT
                                                const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                                                      expiresIn: '1h'
                                                          });

                                                              res.status(201).json({
                                                                    token,
                                                                          user: { id: user._id, name: user.name, email: user.email, number: user.number }
                                                                              });
                                                                                } catch (err) {
                                                                                    console.error(err.message);
                                                                                        res.status(500).send('Server error');
                                                                                          }
                                                                                          });

                                                                                          // @route   POST /api/auth/login
                                                                                          // @desc    Authenticate user & get token
                                                                                          // @access  Public

                                                                                          router.post('/login', async (req, res) => {

                                                                                          router.post('/wrapper', async (req, res) => {

                                                                                            const { number, password } = req.body;

                                                                                              try {
                                                                                                  // Check for user
                                                                                                      const user = await User.findOne({ number });
                                                                                                          if (!user) return res.status(400).json({ message: 'Invalid credentials' });

                                                                                                              // Compare password
                                                                                                                  const isMatch = await bcrypt.compare(password, user.password);
                                                                                                                      if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

                                                                                                                          // Generate JWT
                                                                                                                              const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                                                                                                                                    expiresIn: '1h'
                                                                                                                                        });

                                                                                                                                            res.json({
                                                                                                                                                  token,
                                                                                                                                                        user: { id: user._id, name: user.name, email: user.email, number: user.number }
                                                                                                                                                            });
                                                                                                                                                              } catch (err) {
                                                                                                                                                                  console.error(err.message);
                                                                                                                                                                      res.status(500).send('Server error');
                                                                                                                                                                        }
                                                                                                                                                                        });

                                                                                                                                                                        module.exports = router;
