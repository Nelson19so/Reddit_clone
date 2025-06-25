import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function App() {
  const [homepage, setIsHome] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setIsHome(location.pathname === "/");
  }, [location]);
  return <></>;
}

export default App;
