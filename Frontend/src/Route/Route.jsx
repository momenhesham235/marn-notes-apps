import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
const Home = lazy(() => import("../Apps/Pages/Home/Home"));
const Login = lazy(() => import("../Apps/Pages/Login/Login"));
const Register = lazy(() => import("../Apps/Pages/Register/Register"));
const Notes = lazy(() => import("../Apps/Pages/Notes/Notes"));
const CreateNotes = lazy(() => import("../Apps/Pages/CreateNote/CreateNotes"));
const UpdateNote = lazy(() => import("../Apps/Pages/UpdateNote/UpdateNote"));
const Navbar = lazy(() => import("../Apps/Components/Navbar"));
import PrivateRoutes from "./PrivateRoutes";

const MainRoute = () => {
  return (
    <>
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/notes" element={<Notes />} />
          </Route>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create-notes" element={<CreateNotes />} />
          <Route path="/update-note/:id" element={<UpdateNote />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default MainRoute;
