

interface Events {
  id: string;
  title: string;
  location: string; 
  date: string;
  info: string;
  members: User
}


interface User {
  id: string;
  firstname: string;
  lastname: string;
  username: string;
  birthday: string;
  address: string;
  privilege: "admin" | "organizer" | "user";
  pfp: Blob;
  coverPhoto: Blob;
  profileTagline: string;
}

