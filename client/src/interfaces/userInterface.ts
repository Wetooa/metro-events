


interface LoginFormInputs {
  email: string;
  password: string;
}

interface RegisterFormInputs extends LoginFormInputs {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  birthday: string;
  address: string;

  pfp?: string;
  coverPhoto?: string;
  info?: string;
}

interface User extends Omit<RegisterFormInputs, "password" | "pfp" | "coverPhoto" | "info"> {
  pfp?: Blob;
  coverPhoto?: Blob;
  info?: string;

  id: string;
  privilege: "admin" | "organizer" | "user";
  createdAt: string;
}


interface EventUser extends User {
  joinedAt: string;
}
