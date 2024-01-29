import NotesSchema from "../models/NotesSchema.js";

/**
 * Retrieves all notes and sends a JSON response with the notes data or an error message.
 *
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @return {Promise<void>} A promise that resolves with a JSON response
 */
export const getAllNotes = async (req, res) => {
  const userId = req.userId;
  try {
    const notes = await NotesSchema.find({ userId });
    res.status(200).json({
      success: true,
      data: notes,
      message: "Notes fetched successfully",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Creates a new note using the provided request body and returns a success
 * response with the created note, or a failure response with an error message.
 *
 * @param {Object} req - The request object containing the note data
 * @param {Object} res - The response object for sending the HTTP response
 * @return {Promise<void>} A Promise that resolves after handling the request
 */
export const addANewNote = async (req, res) => {
  const userId = req.userId;
  try {
    const note = await NotesSchema.create({ ...req.body, userId });
    res.status(201).json({
      success: true,
      data: note,
      message: "Note created successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Retrieves a note based on the provided ID and sends it as a JSON response.
 *
 * @param {Object} req - the request object
 * @param {Object} res - the response object
 * @return {Promise<void>} a Promise that resolves to nothing
 */
export const getNote = async (req, res) => {
  // check if the valid mongoose id
  if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(404).json({
      success: false,
      message: "Invalid note ID",
    });
  }
  try {
    const note = await NotesSchema.findById(req.params.id);
    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    } else {
      res.status(200).json({
        success: true,
        data: note,
        message: "Note fetched successfully",
      });
    }
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Updates a note in the database.
 *
 * @param {object} req - the request object
 * @param {object} res - the response object
 * @return {Promise} a Promise that resolves to the updated note
 */
export const updateNote = async (req, res) => {
  try {
    const note = await NotesSchema.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      data: note,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Deletes a note using the provided ID.
 *
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @return {Object} The deleted note
 */
export const deleteNote = async (req, res) => {
  try {
    const note = await NotesSchema.findByIdAndDelete(req.params.id);
    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Note deleted successfully",
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
