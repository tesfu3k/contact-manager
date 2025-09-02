import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <Link
        className="bg-blue-500 px-5 py-2 rounded-md hover:bg-blue-500/60 active:scale-90"
        to="/sign-in"
      >
        Get Started
      </Link>
    </div>
  );
};

export default Home;
