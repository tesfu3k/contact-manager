import axios from "axios";
import { useEffect, useState } from "react";
import Card from "./Card";

const Body = ({ dep, setDep }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const loadContact = async () => {
      const { data } = await axios.get("http://localhost:5052/api/contacts", {
        withCredentials: true,
      });
      setData(data.data.contacts);
    };
    loadContact();
  }, [dep]);
  console.log(data);
  return (
    <div className="bg-white m-10 rounded-4xl p-10 ">
      <div className="grid gap-4 grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data.map((contact) => (
          <Card key={contact._id} contact={contact} setChange={setDep} />
        ))}
      </div>
    </div>
  );
};

export default Body;
