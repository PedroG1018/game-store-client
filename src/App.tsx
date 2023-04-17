import React, { FunctionComponent } from "react";
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
import Account from "./pages/Account";

const Layout: FunctionComponent = () => {
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
          {["nintendo", "playstation", "xbox", "sega"].map((platform) => (
            <Route path={platform} element={<Platform children={platform} />} />
          ))}
        </Route>
        <Route path="/account" element={<Account />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
