import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import CreateEvent from "./pages/CreateEvent.jsx";
import UpdateEvent from "./pages/UpdateEvent.jsx";
import DeleteEvent from "./pages/DeleteEvent.jsx"; // Import the new DeleteEvent component
import ViewEvent from "./pages/ViewEvent.jsx"; // Import the new ViewEvent component
import AdminLogin from "./pages/AdminLogin.jsx"; // Import the new AdminLogin component

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Index />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/update-event/:id" element={<UpdateEvent />} />
      <Route path="/delete-event/:id" element={<DeleteEvent />} /> {/* Add the new route */}
      <Route path="/view-event/:id" element={<ViewEvent />} /> {/* Add the new route */}
      <Route path="/admin-login" element={<AdminLogin />} /> {/* Add the new route */}
      </Routes>
    </Router>
  );
}

export default App;
