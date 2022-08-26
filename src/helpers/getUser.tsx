import axios from "axios";

const getUser = async (token: string) => {
  const customConfig = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };

  const response = await axios.get(
    "https://api.getcountapp.com/api/v1/users/me",
    customConfig
  );
  return response;
};

export default getUser;
