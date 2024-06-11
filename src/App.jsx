import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import CreateEvent from "./pages/CreateEvent.jsx";
import UpdateEvent from "./pages/UpdateEvent.jsx";
import DeleteEvent from "./pages/DeleteEvent.jsx";
import ViewEvent from "./pages/ViewEvent.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Index />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/update-event/:id" element={<UpdateEvent />} />
      <Route path="/delete-event/:id" element={<DeleteEvent />} />
      <Route path="/view-event/:id" element={<ViewEvent />} />
      <Route path="/admin-login" element={<AdminLogin />} />
      </Routes>
    </Router>
  );
}

export default App;
