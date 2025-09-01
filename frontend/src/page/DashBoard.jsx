import { useState } from "react";
import NavBar from "../components/NavBar";
import InputForm from "../components/InputForm";
import Body from "../components/Body";

const DashBoard = () => {
  const [dep, setDep] = useState(0); // for dependencey array control
  return (
    <div className="bg-gray-300 min-h-screen relative">
      <NavBar />
      <InputForm setDep={setDep} />
      <Body dep={dep} setDep={setDep} />
    </div>
  );
};

export default DashBoard;
