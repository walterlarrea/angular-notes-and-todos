export type Note = {
  content: string;
  createdAt: string;
  id: string;
  title: string;
  userId: string;
};

export type NoteToCreate = Omit<Note, 'id' | 'createdAt' | 'userId'> & {
  userId: string | null;
};
