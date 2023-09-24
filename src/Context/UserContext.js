import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const myContext = createContext();

const UserContext = ({ children }) => {
  const [userData, setUserData] = useState([]);
  const [postedData, setPostedData] = useState({
    id: Math.floor(Math.random() * 1000),
    name: "",
    username: "",
    email: "",
    phone: "",
    website: "",
  });
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      if (response.data) {
        setUserData(response.data);
      }
    } catch (err) {
      console.log({ error: err });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const values = {
    userData: userData,
    setUserData: setUserData,
    postedData: postedData,
    setPostedData: setPostedData,
  };

  return <myContext.Provider value={values}>{children}</myContext.Provider>;
};

export default UserContext;
