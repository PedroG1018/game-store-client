import React from "react";
import { Link } from "react-router-dom";

const Account = () => {
  return (
    <>
      <h1>account page</h1>
      <Link to="/new">new item</Link>
    </>
  );
};

export default Account;
