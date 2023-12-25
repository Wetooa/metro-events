
export interface Event {
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
