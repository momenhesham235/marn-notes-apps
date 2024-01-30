import { useState } from "react";
import CRUD from "../../../Services/CURD";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreateNote = () => {
  const [notes, setNotes] = useState({
    title: "",
    description: "",
    color: "#ffffff",
  });

  const navigate = useNavigate();

  const handleNoteChange = (e) => {
    console.log(e.target.name, e.target.value);
    setNotes({
      ...notes,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await CRUD.createNote(notes);
    console.log(data);
    if (data.success) {
      setNotes({
        title: "",
        description: "",
        color: "#ffffff",
      });
      toast.success(data.message);
      navigate("/notes");
    }

    if (!data.success) {
      toast.error(data.error);
    }
  };

  const { title, description, color } = notes;
  return (
    <div className="flex flex-col gap-4 p-4 min-h-screen items-center justify-center">
      <form className="flex flex-col gap-4 container" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          name="title"
          value={title}
          onChange={handleNoteChange}
          className="bg-gray-100 px-4 py-2 rounded-md"
        />

        <input
          type="text"
          placeholder="Description"
          name="description"
          value={description}
          onChange={handleNoteChange}
          className="bg-gray-100 px-4 py-2 rounded-md"
        />

        <select
          name="color"
          value={color}
          onChange={handleNoteChange}
          className="bg-gray-100 px-4 py-2 rounded-md"
        >
          <option value="#ffffff">White</option>
          <option value="#ff0000">Red</option>
          <option value="#00ff00">Green</option>
          <option value="#0000ff">Blue</option>
        </select>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Create Note
        </button>
      </form>
    </div>
  );
};

export default CreateNote;
