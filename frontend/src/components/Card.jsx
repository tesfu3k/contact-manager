import axios from "axios";
import { Mail, Pencil, Phone, Trash } from "lucide-react";
import toast from "react-hot-toast";
const Card = ({ contact, setChange }) => {
  const handleDelete = async () => {
    try {
      await axios.delete("http://localhost:5052/api/contacts/" + contact._id);
      setChange((prev) => prev + 1);
      toast.success("Contact deleted successfully!");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong while deleting contact"
      );
    }
  };
  return (
    <div className="border border-gray-300 rounded-lg shadow-lg hover:shadow-2xl transition-all hover:scale-110 p-2">
      <div>
        <h1 className="text-lg font-semibold">
          {contact.firstName} {contact.lastName}
        </h1>
        <p className="">{contact.email}</p>
        <p className="">{contact.phone}</p>
      </div>
      <div className="flex gap-2 items-center py-2">
        {" "}
        <button
          onClick={handleDelete}
          className="bg-red-400/20 size-8 rounded-full flex justify-center items-center cursor-pointer hover:bg-red-400/40 active:scale-95 transition-all "
        >
          <Trash className="size-5 text-red-600" />
        </button>
        <button className="bg-blue-400/20 size-8 rounded-full flex justify-center items-center cursor-pointer hover:bg-blue-400/40 active:scale-95 transition-all ">
          <Pencil className="size-5 text-blue-600" />
        </button>
        <a
          href={`tel:${contact.phone}`}
          className="bg-green-400/20 size-8 rounded-full flex justify-center items-center cursor-pointer hover:bg-green-400/40 active:scale-95 transition-all "
        >
          <Phone className="size-5 text-green-600" />
        </a>
        <a
          href={`mail to:${contact.email}`}
          className="bg-yellow-400/20 size-8 rounded-full flex justify-center items-center cursor-pointer hover:bg-yellow-400/40 active:scale-95 transition-all "
        >
          <Mail className="size-5 text-yellow-600" />
        </a>
      </div>
    </div>
  );
};

export default Card;
