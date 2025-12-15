import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";

import Home from "./pages/Home";
import About from "./pages/About";
import Programs from "./pages/Programs";
import Mentorship from "./pages/Mentorship";
import GetInvolved from "./pages/GetInvolved";
import Media from "./pages/Media";
import Events from "./pages/Events";
import Network from "./pages/Network";
import Resources from "./pages/Resources";
import Contact from "./pages/Contact";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/mentorship" element={<Mentorship />} />
        <Route path="/get-involved" element={<GetInvolved />} />
        <Route path="/media" element={<Media />} />
        <Route path="/events" element={<Events />} />
        <Route path="/network" element={<Network />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Layout>
  );
}
