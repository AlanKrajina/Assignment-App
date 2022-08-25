import axios from "axios";
import { FormInterface } from "../interfaces/interface";

const fetchUser = async (form: FormInterface) => {
  const user = JSON.stringify({
    username: form.username,
    password: form.password,
  });

  const customConfig = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await axios.post(
    "https://api.getcountapp.com/api/v1/authenticate",
    user,
    customConfig
  );
  return response;
};

export default fetchUser;
