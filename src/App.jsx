import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Signup } from "./pages/Signup";
import Login from "./pages/Login";
import MultifactorAuth from "./pages/MultifactorAuth";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/two-step-auth" element={<MultifactorAuth />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
