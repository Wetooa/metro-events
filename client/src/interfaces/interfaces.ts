

interface Event {
  id: string;
  title: string;
  organizer: string;
  organizerId: string;
  location: string; 
  date: string;
  info: string;
  members: EventUser[];
  comments: Comment[];
  createdAt: string;
  votes: number;
  image: Blob;
}

interface Comment {
  id: string;
  userId: string;
  username: string;
  comment: string;
  createdAt: string;
  comments: Comment[];
}


interface User {
  id: string;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  birthday: string;
  address: string;
  privilege: "admin" | "organizer" | "user";
  pfp: Blob;
  coverPhoto: Blob;
  profileTagline: string;
  createdAt: string;
}

interface EventUser extends User {
  joinedAt: string;
}