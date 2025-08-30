import { useState } from "react";
import Body from "./components/Body";
import InputForm from "./components/InputForm";
import NavBar from "./components/NavBar";
import { Toaster } from "react-hot-toast";

const App = () => {
  const [dep, setDep] = useState(0); // for dependencey array control
  return (
    <div className="bg-gray-300 min-h-screen">
      <Toaster position="bottom-center" />
      <NavBar />
      <InputForm setDep={setDep} />
      <Body dep={dep} setDep={setDep} />
    </div>
  );
};

export default App;
