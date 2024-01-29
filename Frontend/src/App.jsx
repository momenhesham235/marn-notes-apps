import MainRoute from "./Route/Route";
import { AuthProvider } from "./Store/Context/authContext";

const App = () => {
  return (
    <>
      <AuthProvider>
        <MainRoute />
      </AuthProvider>
    </>
  );
};

export default App;
