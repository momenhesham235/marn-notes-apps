import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import CRUD from "../../../Services/CURD";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllNotes = async () => {
    const { data } = await CRUD.getAllNotes();
    setNotes(data);
    setLoading(false);

    if (data.success) {
      setNotes(data.data);
    }
  };

  const handleDeleteNote = async (id) => {
    const data = await CRUD.deleteNote(id);
    console.log(data);
    setNotes(notes.filter((note) => note._id !== id));
    if (data.success) {
      toast.success(data.message);
    }
  };

  useEffect(() => {
    getAllNotes();
  }, []);

  if (loading) return <h1>Loading...</h1>;

  return (
    <div className="container py-8 flex flex-col gap-4">
      {notes.length === 0 && (
        <h1 className="text-2xl text-center  font-bold">No Notes Found</h1>
      )}

      <div className=" flex flex-wrap gap-4 p-4">
        {notes.map((note) => (
          <div
            key={note._id}
            className="flex flex-col gap-4 p-4 items-center justify-center rounded-md  text-gray-800"
            style={{ backgroundColor: note.color }}
          >
            <h1 className="text-2xl font-bold">{note.title}</h1>
            <p className="text-xl">{note.description}</p>
            <button>
              <Link
                to={`/notes/update/${note._id}`}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Update Note
              </Link>
            </button>

            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
              onClick={() => handleDeleteNote(note._id)}
            >
              Delete Note
            </button>
          </div>
        ))}
      </div>

      <button>
        <Link
          to="/notes/create"
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Create Note
        </Link>
      </button>
    </div>
  );
};

export default Notes;
