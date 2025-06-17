import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/auth/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
