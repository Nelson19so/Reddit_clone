import { Link } from "react-router-dom";

function PageNoteFound() {
  return (
    <div
      className="w-[100%] h-[100vh] flex justify-center flex-col"
      style={{ alignItems: "center" }}
    >
      <h1 className="text-4xl font-bold">404 :(</h1>
      <p className="text-xl text-black">Page Not found</p>
      <div
        className="flex justify-center gap-5 mt-4"
        style={{ alignItems: "center" }}
      >
        <Link to={-1}>Go back</Link>
        <Link to="/">
          <button className="bg-amber-500 text-white pl-2 pr-2 p-1">
            Return to Home
          </button>
        </Link>
      </div>
    </div>
  );
}

export default PageNoteFound;
