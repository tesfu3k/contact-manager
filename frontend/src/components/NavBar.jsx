import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import axios from "axios";
import toast from "react-hot-toast";

const NavBar = () => {
  /**
   * get the {user, setUser} info from the useContext
   * create layout left and right using justify-between in the left text and in the right email button to sighout
   * when the button clicked call the /api/auth/signout
   * after success then setUser(null)
   */

  const { user, setUser } = useContext(AuthContext);
  const handleSignOut = async () => {
    try {
      await axios.get("http://localhost:5052/api/auth/sign-out", {
        withCredentials: true,
      });
      setUser(null);
      toast.success("Sign out successfully");
    } catch {
      toast.error("something went wrong, Please try again later");
    }
  };
  return (
    <div className="bg-white flex items-center justify-between p-4">
      <h1 className="font-bold text-lg text-green-400">Contact Manager</h1>
      <div className="flex gap-2">
        <p className="">{user.email}</p>
        <button
          onClick={handleSignOut}
          className="bg-red-600 text-white rounded-md px-3 py-1 cursor-pointer hover:bg-red-600/70 active:scale-95"
        >
          Sign out
        </button>
      </div>
    </div>
  );
};

export default NavBar;
