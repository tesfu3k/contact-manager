import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { AuthContext } from "../context/authContext";
const SignIn = () => {
  /**
   * use state {email: "", password: ""}
   * handleChange to handle the change from the input to the use state
   * for each input email password set name, value, onChange
   * for the button onClick send the request to the backend api /api/auth/sign-in
   * console.log(the data)
   */
  const { setUser } = useContext(AuthContext);
  const [regUser, setRegUser] = useState({
    email: "",
    password: "",
  });

  // const handleOnChange = (e) => {
  //   const { name, value } = e.target;
  //   setRegUser((prev) => {
  //     return { ...prev, [name]: value };
  //   });
  // };

  const handleEmailOnChange = (e) => {
    const { value } = e.target;
    setRegUser({ ...regUser, email: value });
  };

  const handlePassOnchenge = (e) => {
    const { value } = e.target;
    setRegUser({ ...regUser, password: value });
  };

  const handleOnClick = async () => {
    if (!regUser.email || !regUser.password)
      return toast.error("Enter all reqired data");

    try {
      const { data } = await axios.post(
        "http://localhost:5052/api/auth/sign-in",
        regUser,
        {
          validateStatus: (status) => status < 500,
          withCredentials: true, //to send and recive cookies
        }
      );

      if (data.success) {
        setUser(data.data.user); // update the user data
        return toast.success(data.message);
      }
      if (!data.success) return toast.error(data.message);
      //
    } catch (error) {
      toast.error(
        error.message || "Something went wrong. Please try again later"
      );
    }
  };

  return (
    <div className="h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 h-full">
        <div className="border flex flex-col items-center justify-center">
          <h1 className="text-xl font-bold">Get Started</h1>
          <p className="">Welcome - Let's creat your account </p>

          <div className="flex flex-col mt-4">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              className="border rounded-md border-gray-300 px-2"
              type="text"
              placeholder="Enter your Email"
              value={regUser.email}
              onChange={handleEmailOnChange}
            />
          </div>
          <div className="flex flex-col mt-4">
            <label htmlFor="pass">Password</label>
            <input
              id="pass"
              className="border rounded-md border-gray-300 px-2"
              type="password"
              placeholder="Enter your Password"
              value={regUser.password}
              onChange={handlePassOnchenge}
            />
          </div>

          <button
            onClick={handleOnClick}
            className="bg-green-700 my-4 rounded-md text-white py-1 px-3 cursor-pointer hover:bg-green-700/40 active:scale-90"
          >
            Sign in
          </button>
          <div className="flex gap-4">
            <p>Don't you have an account ?</p>
            <Link to="/sign-up">Sign up</Link>
          </div>
        </div>
        <div className="hidden md:block h-full">
          <img
            src="https://cdn.dribbble.com/userupload/42701083/file/original-336eccb62b19a429102310f41e3aead6.jpg?resize=1024x768&vertical=center"
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
