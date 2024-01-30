import { axiosInstance } from "./API";

const notesService = {
  createNote: async (notes) => {
    const response = await axiosInstance.post("/notes/", notes);
    return response;
  },
  getAllNotes: async () => {
    const response = await axiosInstance.get("/notes");
    return response;
  },

  getNote: async (id) => {
    const response = await axiosInstance.get(`/notes/${id}`);
    return response;
  },

  updateNote: async (id, noteUpdate) => {
    const response = await axiosInstance.put(`/notes/${id}`, noteUpdate);
    return response;
  },
  deleteNote: async (id) => {
    const response = await axiosInstance.delete(`/notes/${id}`);
    return response;
  },
};

export default notesService;
