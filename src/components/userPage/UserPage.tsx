import { UserInterface } from "../../interfaces/interface";

interface Props {
  setUserState: React.Dispatch<React.SetStateAction<UserInterface>>;
  userState: UserInterface;
}

const UserPage: React.FC<Props> = ({ setUserState, userState }) => {
  const logout = () => {
    localStorage.clear();
    setUserState({
      firstName: "",
      lastName: "",
      isLoggedIn: false,
    });
  };

  return (
    <div className="w-full max-w-xl m-auto h-screen flex flex-col	justify-center">
      <div className="bg-white shadow-2xl rounded px-8 pt-6 pb-8 mb-4 h-1/4 flex flex-col	justify-between animate-fade ">
        <div className="mb-2 h-16">
          <label className="block text-gray-700 text-lgmb-2 text-center">
            First Name
          </label>
          <p className="text-lg italic text-center mt-2 font-bold ">
            {userState.firstName}
          </p>
        </div>
        <div className="mb-2 h-16">
          <label className="block text-gray-700 text-lg mb-2 text-center">
            Last Name
          </label>
          <p className="text-lg italic text-center mt-2 font-bold">
            {userState.lastName}
          </p>
        </div>
        <button
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-28 self-center"
          type="button"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserPage;
