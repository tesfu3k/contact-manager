import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  /**
   * a state to take {name:"", email: "", password: ""}
   * when the input onChnage update the state
   * input value name onChnage
   * when you onClick the button conosle.log(userData)
   */
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  // const handleNameChange = (e) => {
  //   const { value } = e.target;
  //   setUserData({ ...userData, name: value });
  // };

  const handleOchange = (e) => {
    const { value, name } = e.target;

    setUserData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleOnClick = async () => {
    // input data validation
    // send data into the data base

    if (!userData.name || !userData.email || !userData.password)
      return toast.error("Enter all reqired data");

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/sign-up`,
        userData,
        {
          validateStatus: (status) => status < 500,
          withCredentials: true,
        }
      );
      if (data.success) {
        navigate("/sign-in");
        return toast.success(data.message);
      }
      if (!data.success) return toast.error(data.message);
      /**
       * data.success == true toast.success(data.message)
       * !data.success == true toast.error(data.message)
       */
    } catch (err) {
      toast.error(
        err.message || "Something went wrong. Please try again later"
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
            <label htmlFor="name">Name</label>
            <input
              id="name"
              className="border rounded-md border-gray-300 px-2"
              type="text"
              name="name"
              placeholder="Enter your Name"
              onChange={handleOchange}
              value={userData.name}
            />
          </div>
          <div className="flex flex-col mt-4">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              className="border rounded-md border-gray-300 px-2"
              type="text"
              placeholder="Enter your Email"
              name="email"
              onChange={handleOchange}
              value={userData.email}
            />
          </div>
          <div className="flex flex-col mt-4">
            <label htmlFor="pass">Password</label>
            <input
              id="pass"
              className="border rounded-md border-gray-300 px-2"
              type="password"
              placeholder="Enter your Password"
              name="password"
              onChange={handleOchange}
              value={userData.password}
            />
          </div>

          <button
            onClick={handleOnClick}
            className="bg-green-700 my-4 rounded-md text-white py-1 px-3 cursor-pointer hover:bg-green-700/40 active:scale-90"
          >
            Sign up
          </button>
          <div className="flex gap-4">
            <p>Already have an account ?</p>
            <Link to="/sign-in">Sign In</Link>
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

export default SignUp;
