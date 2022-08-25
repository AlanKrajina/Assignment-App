import { FormInterface } from "../interfaces/interface";

const ACTIONS = {
  UPDATE_USERNAME: "update_username",
  UPDATE_PASSWORD: "update_password",
};

const reducer = (
  state: FormInterface,
  action: { type: string; payload: string }
) => {
  switch (action.type) {
    case ACTIONS.UPDATE_USERNAME:
      return {
        ...state,
        username: action.payload,
      };
    case ACTIONS.UPDATE_PASSWORD:
      return {
        ...state,
        password: action.payload,
      };
    default:
      return state;
  }
};

export { reducer, ACTIONS };
