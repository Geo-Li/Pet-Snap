export type Image = {
    id: string;
    url: string;
    width: number;
    height: number;
    name: string;
    createdAt: number;
    updatedAt: number;
    userId: string;
    likes: Record<string, boolean>;
    comments: Record<string, Comment>;
}