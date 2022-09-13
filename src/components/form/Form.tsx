import React, { useReducer, useState } from "react";
import { useMutation } from "react-query";
import fetchUser from "../../helpers/fetchApi";
import { FormInterface, UserInterface } from "../../interfaces/interface";
import { ACTIONS, reducer } from "../../reducers/reducer";
import debounce from 'lodash.debounce';

interface Props {
  setUserState: React.Dispatch<React.SetStateAction<UserInterface>>;
}

const initialFormState: FormInterface = {
  username: "",
  password: "",
};

const Form: React.FC<Props> = ({ setUserState }) => {
  const [formState, dispatch] = useReducer(reducer, initialFormState);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const { mutate } = useMutation(
    (variables: { form: FormInterface }) => fetchUser(variables.form),
    {
      onSuccess: (data) => {
        localStorage.setItem("token", data?.data.token);

        // comment next two lines to use getUser data for user details
        localStorage.setItem("firstName", data?.data.user.firstName);
        localStorage.setItem("lastName", data?.data.user.lastName);

        setUserState({
          firstName: data?.data.user.firstName,
          lastName: data?.data.user.lastName,
          isLoggedIn: true,
        });
      },
      onError: (error: any) => {
        setErrorMessage(error.response.data.errorMessage);
        setTimeout(function () {
          setErrorMessage("");
        }, 2500);
      },
    }
  );

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
    actionType: string
  ) => {
    dispatch({
      type: actionType,
      payload: e.target.value,
    });
  };

  const submitDetails = () => {
    if (
      /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
        formState.username
      )
    ) {
      mutate({ form: formState });
    } else {
      setErrorMessage("Invalid username email format");
      setTimeout(function () {
        setErrorMessage("");
      }, 2500);
    }
  };

  return (
    <div className="w-full max-w-xl m-auto h-screen flex flex-col	justify-center">
      <form className="bg-white shadow-2xl rounded px-8 pt-6 pb-8 mb-4 h-1/3 flex flex-col	justify-between animate-fade ">
        <div className="mb-2 h-16">
          <label className="block text-gray-700 text-lg font-bold mb-2 text-center">
            Username
          </label>
          <input
            className="focus:bg-white focus:border-gray-700 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Username..."
            onChange={debounce((e) => handleInputChange(e, ACTIONS.UPDATE_USERNAME), 500)}
          />
          {formState.username === "" && (
            <p className="text-red-500 text-xs italic text-center mt-2">
              Username field required.
            </p>
          )}
        </div>
        <div className="mb-2 h-16">
          <label className="block text-gray-700 text-lg font-bold mb-2 text-center">
            Password
          </label>
          <input
            className="focus:bg-white focus:border-gray-700 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Password..."
            onChange={debounce((e) => handleInputChange(e, ACTIONS.UPDATE_PASSWORD), 500)}
          />
          {formState.password === "" && (
            <p className="text-red-500 text-xs italic text-center">
              Password field required.
            </p>
          )}
        </div>
        <div className="flex items-center justify-center h-12">
          {errorMessage === "" ? (
            <button
              className={`${
                formState.password === "" || formState.username === ""
                  ? "bg-red-500"
                  : "bg-blue-500"
              } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
              type="button"
              onClick={submitDetails}
              disabled={formState.password === "" || formState.username === ""}
            >
              Login
            </button>
          ) : (
            <p className="text-red-500 text-base italic text-center">
              {errorMessage}
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Form;
