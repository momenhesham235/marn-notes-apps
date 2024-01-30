import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainRoute from "./Route/MainRoute";

const App = () => {
  // const { user } = useAuth();
  return (
    <>
      <ToastContainer />
      <MainRoute />
    </>
  );
};

export default App;
