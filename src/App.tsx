import React, { FunctionComponent, useContext } from "react";
import Home from "./pages/Home";
import {
  BrowserRouter,
  Link,
  Outlet,
  Route,
  Routes,
  useRoutes,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Platform from "./pages/Platform";
import Footer from "./components/Footer";
import Account from "./pages/Account";
import Login from "./pages/Login";
import { Props } from "@headlessui/react/dist/types";
import { AuthContext } from "./context/AuthContext";

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
  const { currentUser } = useContext(AuthContext);
  const RequireAuth = ({ children }: { children: any }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="login" element={<Login />} />
          <Route
            index
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
          {["nintendo", "playstation", "xbox", "sega"].map((platform) => (
            <Route path={platform} element={<Platform children={platform} />} />
          ))}
          <Route path="account" element={<Account />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
