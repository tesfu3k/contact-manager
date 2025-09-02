import axios from "axios";
import { Pencil, X } from "lucide-react";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

/**
 * button click -  state update true <-> false
 * div
 */

const FormEditer = ({ contact, setChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [update, setUpdate] = useState({
    firstName: contact.firstName,
    lastName: contact.lastName,
    email: contact.email,
    phone: contact.phone,
  });

  const onchangeHandeler = (e) => {
    const { value, name } = e.target;

    setUpdate((prev) => ({ ...prev, [name]: value }));
  };
  const onClickHandeler = async () => {
    if (!update.firstName || !update.email || !update.phone)
      return toast.error("please enter valid contact information");
    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/contacts/${contact._id}
          `,
        update,
        { withCredentials: true }
      );
      toast.success("Contacts updated successfully");
      setChange((a) => a + 1);
      setIsOpen(false);
    } catch {
      toast.error("Something went wrong!");
    }
  };
  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-400/40 size-8 rounded-full flex justify-center items-center cursor-pointer hover:bg-blue-400/40 active:scale-95 transition-all "
      >
        <Pencil className="size-5 text-blue-600" />
      </button>

      {isOpen && (
        <div className="fixed top-0 right-0 left-0 bottom-0 bg-black/20 z-50 flex items-center justify-center">
          {/* a div centered by the parent flex element and positioned in the center and hae bg of white p-5 roudning  */}
          <div className="bg-white p-5 rounded-md w-full max-w-md">
            <div className="flex items-center justify-between">
              <h1 className="text-lg font-semibold">Update your contact</h1>
              <button onClick={() => setIsOpen(false)}>
                <X className="text-red-700 size-4 cursor-pointer" />
              </button>
            </div>
            <div className="">
              <div className="grid items-center gap-4 mt-4">
                <input
                  className="bg-gray-300/30 border border-gray-400 rounded-md px-4 py-1"
                  type="text"
                  placeholder="First Name"
                  name="firstName"
                  onChange={onchangeHandeler}
                  value={update.firstName}
                />
                <input
                  className="bg-gray-300/30 border border-gray-400 rounded-md px-4 py-1"
                  type="text"
                  placeholder="Last Name"
                  name="lastName"
                  onChange={onchangeHandeler}
                  value={update.lastName}
                />
                <input
                  className="bg-gray-300/30 border border-gray-400 rounded-md px-4 py-1"
                  type="text"
                  placeholder="Email"
                  name="email"
                  onChange={onchangeHandeler}
                  value={update.email}
                />
                <input
                  className="bg-gray-300/30 border border-gray-400 rounded-md px-4 py-1"
                  type="text"
                  placeholder="Phone"
                  name="phone"
                  onChange={onchangeHandeler}
                  value={update.phone}
                />
              </div>
              <button
                onClick={onClickHandeler}
                className="bg-green-600 w-full rounded-2xl text-white font-bold py-2 my-5 cursor-pointer hover:opacity-60 active:scale-80"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormEditer;
