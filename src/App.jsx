import "./App.css";
import { Routes, Route } from "react-router-dom";
import HabitsPage from "./pages/HabitsPage";
function App() {
  return (
    <>
      <Routes>
        <Route path="/habits" element={<HabitsPage />} />
      </Routes>
    </>
  );
}

export default App;
