import InputForm from "./components/InputForm";
import NavBar from "./components/NavBar";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div className="bg-gray-300 min-h-screen">
      <Toaster position="bottom-center" />
      <NavBar />
      <InputForm />
    </div>
  );
};

export default App;
