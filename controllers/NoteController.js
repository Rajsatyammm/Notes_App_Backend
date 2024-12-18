const Note = require('../models/Note');
const ErrorMessage = require('../constants/ErrorMessage')

const createNote = async (req, res) => {
    const { title, content, category } = req.body;
    const userId = req.user.id;
    try {
        const newNote = new Note({ title, content, category, userId });
        await newNote.save();
        res.status(201).json(newNote);
    } catch (error) {
        res.status(500).json({ message: ErrorMessage.SERVER_ERROR });
    }
};

const getNotes = async (req, res) => {
    try {
        const notes = await Note.find({ userId: req.user.id });
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ message: ErrorMessage.SERVER_ERROR });
    }
};

const updateNote = async (req, res) => {
    const { noteId, title, content, category } = req.body;
    try {
        const note = await Note.findById(noteId);
        if (!note) return res.status(404).json({
            message: ErrorMessage.NOTE_NOT_FOUND
        });

        if (note.userId.toString() !== req.user.id)
            return res.status(403).json({
                message: ErrorMessage.ERROR_AUTH_DENIED
            });

        note.title = title || note.title;
        note.content = content || note.content;
        note.category = category || note.category;
        await note.save();

        res.status(200).json(note);
    } catch (error) {
        res.status(500).json({
            message: ErrorMessage.SERVER_ERROR
        });
    }
};

const deleteNote = async (req, res) => {
    const id = req.params.id;
    try {
        const note = await Note.findById(id);
        if (!note)
            return res.status(404).json({
                message: ErrorMessage.NOTE_NOT_FOUND
            });
        if (note.userId.toString() !== req.user.id)
            return res.status(403).json({
                message: ErrorMessage.ERROR_AUTH_DENIED
            });
        await Note.findOneAndDelete({ _id: note._id })
        return res.status(200).json({
            message: "Note deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: ErrorMessage.SERVER_ERROR
        });
    }
};

module.exports = { createNote, getNotes, updateNote, deleteNote };
