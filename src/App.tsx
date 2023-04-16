import React from "react";
import Home from "./pages/Home";
import {
  BrowserRouter,
  Link,
  Outlet,
  Route,
  Routes,
  useRoutes,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Platform from "./pages/Platform";
import Footer from "./components/Footer";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          {["nintendo", "playstation", "xbox", "sega"].map((path) => (
            <Route path={path} element={<Platform />} />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
