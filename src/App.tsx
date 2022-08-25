import React, { useEffect, useState } from "react";
import Form from "./components/form/Form";
import UserPage from "./components/userPage/UserPage";
import { UserInterface } from "./interfaces/interface";

const initialUserState: UserInterface = {
  firstName: "",
  lastName: "",
  isLoggedIn: false,
};

const App: React.FC = () => {
  const [userState, setUserState] = useState<UserInterface>(initialUserState);

  useEffect(() => {
    setUserState({
      firstName: localStorage.getItem("firstName") ?? "",
      lastName: localStorage.getItem("lastName") ?? "",
      isLoggedIn: !!localStorage.getItem("token"),
    });
  }, []);

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
