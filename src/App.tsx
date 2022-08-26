import React, { useEffect, useState } from "react";
import Form from "./components/form/Form";
import UserPage from "./components/userPage/UserPage";
import { UserInterface } from "./interfaces/interface";

/* 
Uncomment this to try getting a user via getUser token:

import { useQuery } from "react-query";
import getUser from "./helpers/getUser";*/

const initialUserState: UserInterface = {
  firstName: "",
  lastName: "",
  isLoggedIn: false,
};

const App: React.FC = () => {
  const [userState, setUserState] = useState<UserInterface>(initialUserState);

  // comment this useEffect to try getting user details via getUser token
  useEffect(() => {
    setUserState({
      firstName: localStorage.getItem("firstName") ?? "",
      lastName: localStorage.getItem("lastName") ?? "",
      isLoggedIn: !!localStorage.getItem("token"),
    });
  }, []);

  /* 
  Uncomment this to try getting a user via getUser token:
   
  const token = localStorage.getItem("token") ?? "";
  const { data } = useQuery(["user", token], () => getUser(token), {
    enabled: !!token,
  });

  useEffect(() => {
    if (data) {
      setUserState({
        firstName: data?.data.firstName,
        lastName: data?.data.lastName,
        isLoggedIn: !!localStorage.getItem("token"),
      });
    }
  }, [data]); */

  return (
    <>
      {userState.isLoggedIn ? (
        <UserPage setUserState={setUserState} userState={userState} />
      ) : (
        <Form setUserState={setUserState} />
      )}
    </>
  );
};

export default App;
