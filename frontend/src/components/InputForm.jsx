import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
const InputForm = ({ setDep }) => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "09",
  });

  const handleChange = (e) => {
    const { value, name } = e.target;
    // console.log(data[name]);
    // console.log(value);
    setData((prev) => ({ ...prev, [name]: value }));
  };

  // const handleOnClick = async () => {
  //   if (!data.firstName || !data.email || !data.phone)
  //     return toast.error("Please fill out the form first!");
  //   try {
  //     const res = await fetch("http://localhost:5052/api/contacts", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(data),
  //     });
  //     const result = await res.json();
  //     toast.success(result.message);
  //     setData({ firstName: "", lastName: "", email: "", phone: "" });
  //   } catch (error) {
  //     toast.error(error.message);
  //   }

  //   /*
  //   check
  //   send the data to the api
  //   */
  // };

  const handleOnClick = async () => {
    if (!data.firstName || !data.email || !data.phone) {
      return toast.error("Please fill out the form first!");
    }

    try {
      await axios.post("http://localhost:5052/api/contacts", data);
      setDep((prev) => prev + 1);
      // axios automatically parses JSON response
      toast.success("Contact saved successfully!");

      // Optional: reset form
      setData({ firstName: "", lastName: "", email: "", phone: "" });
    } catch (error) {
      console.error("Error saving contact:", error);

      // axios puts backend errors in error.response
      toast.error(
        error.response?.data?.message ||
          "Something went wrong while saving contact"
      );
    }
  };

  return (
    <div className="bg-white m-10 rounded-4xl p-4 ">
      <h1 className="text-center font-semibold text-2xl">Creat New Contact</h1>
      <div className="flex flex-col lg:flex-row items-center">
        {" "}
        <div className="grid items-center justify-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-5 mt-4 flex-1 lg:pr-4">
          <input
            className="bg-gray-300/30 border border-gray-400 rounded-md px-4 py-1 "
            type="text"
            placeholder="First Name"
            name="firstName"
            value={data.firstName}
            onChange={handleChange}
          />
          <input
            className="bg-gray-300/30 border border-gray-400 rounded-md px-4 py-1 "
            type="text"
            placeholder="Last Name"
            onChange={handleChange}
            name="lastName"
            value={data.lastName}
          />

          <input
            type="text"
            placeholder="Email"
            className="bg-gray-300/30 border border-gray-400 rounded-md px-4 py-1 "
            onChange={handleChange}
            name="email"
            value={data.email}
          />
          <input
            type="text"
            placeholder="Phone Number"
            className="bg-gray-300/30 border border-gray-400 rounded-md px-4 py-1"
            onChange={handleChange}
            name="phone"
            value={data.phone}
          />
        </div>
        <button
          className="bg-green-600 w-[70%] py-2 rounded-2xl text-white font-bold mb-4 lg:mb-0 lg:max-w-[110px] hover:opacity-60 cursor-pointer active:scale-80 active:opacity-100 transition-all duration-300"
          onClick={handleOnClick}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default InputForm;
