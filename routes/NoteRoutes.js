const express = require('express');
const { createNote, getNotes, updateNote, deleteNote, getNoteById } = require('../controllers/NoteController');
const authMiddleware = require('../middlewares/auth');
const router = express.Router();

router.post('/add', authMiddleware, createNote);
router.get('/getAll', authMiddleware, getNotes);
router.get('/getNote/:id', authMiddleware, getNoteById)
router.put('/update/:id', authMiddleware, updateNote);
router.delete('/delete/:id', authMiddleware, deleteNote);

module.exports = router;