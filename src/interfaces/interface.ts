interface UserInterface {
  firstName: string;
  lastName: string;
  isLoggedIn: boolean;
}

interface FormInterface {
  username: string;
  password: string;
}

export type { UserInterface, FormInterface };
