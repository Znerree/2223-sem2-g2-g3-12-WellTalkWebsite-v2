export type Post = {
  id: number;
  title: string;
  content: string;
  photoContent: string;
  activeBtn: string;
  photoData: File;
  counselor: {
    id: number;
    firstName: string;
    lastName: string;
    userType: string;
  };
  updatePost: (postId: number, post: Post) => void;
};

export type Author = {
  id: number;
  firstName: string;
  lastName: string;
  userType: string;
};
