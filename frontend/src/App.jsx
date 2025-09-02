// import { useState } from "react";
// import Body from "./components/Body";
// import InputForm from "./components/InputForm";
// import NavBar from "./components/NavBar";
// import { Toaster } from "react-hot-toast";

import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Home from "./page/Home";
import DashBoard from "./page/DashBoard";
import SignUp from "./page/SignUp";
import SignIn from "./page/SignIn";
import { useContext, useEffect } from "react";
import { AuthContext } from "./context/authContext";
import axios from "axios";

// const App = () => {
//   const [dep, setDep] = useState(0); // for dependencey array control
//   return (
//     <div className="bg-gray-300 min-h-screen relative">
//       <NavBar />
//       <InputForm setDep={setDep} />
//       <Body dep={dep} setDep={setDep} />
//     </div>
//   );
// };

// export default App;

const Layout = () => {
  const { user } = useContext(AuthContext);
  if (!user) {
    return <Navigate to="/sign-in" />;
  }
  return <Outlet />;
};

const PublicLayout = () => {
  const { user } = useContext(AuthContext);
  if (user) return <Navigate to="/dashboard" />;
  return <Outlet />;
};

const App = () => {
  const { setUser } = useContext(AuthContext);
  /**
   * use useContext()
   * use useEffect() and send api request GET - /api/auth/me
   * then if the data is success then setUser(data.data.user)
   */
  useEffect(() => {
    const loadUser = async () => {
      const { data } = await axios.get(
        import.meta.env.VITE_BACKEND_URL + "/api/auth/me",
        {
          withCredentials: true,
        }
      );
      if (data.success) setUser(data.data.user);
    };
    loadUser();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<DashBoard />} />
      </Route>
      <Route element={<PublicLayout />}>
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
      </Route>
    </Routes>
  );
};

export default App;
