import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
const Navbar = lazy(() => import("../Apps/Components/Navbar"));
const Home = lazy(() => import("../Apps/Pages/Home/Home"));
const Register = lazy(() => import("../Apps/Pages/Register/Register"));
const Login = lazy(() => import("../Apps/Pages/Login/Login"));
const Notes = lazy(() => import("../Apps/Pages/Notes/Notes"));
const CreateNote = lazy(() => import("../Apps/Pages/CreateNote/CreateNote"));
const UpdateNote = lazy(() => import("../Apps/Pages/UpdateNote/UpdateNotes"));
import { useAuth } from "../Utils/Hooks/useAuth";

const MainRoute = () => {
  const { user } = useAuth();
  return (
    <>
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/register"
            element={user ? <Navigate to="/" /> : <Register />}
          />
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login />}
          />
          <Route element={<PrivateRoutes />}>
            <Route path="/notes" element={<Notes />} />
            <Route path="/notes/create" element={<CreateNote />} />
            <Route path="/notes/update/:id" element={<UpdateNote />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
};

export default MainRoute;
