export type Message = {
  id?: string;
  content: string;
  senderId: string;
  receiverId: string;
  timestamp: number;
  imageUrl?: string;
};
