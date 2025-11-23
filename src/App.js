import { BrowserRouter , Link , Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import Contact from "./pages/Contact";
import Explore from "./pages/Explore";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Search from "./pages/Search";
import SongDetails from "./pages/Song-details";



function App() {
  return (
 <BrowserRouter>
      <Routes>
         <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/register" element={<Register />} />
                <Route path="/search" element={<Search />} />
                <Route path="/song-details" element={<SongDetails />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
