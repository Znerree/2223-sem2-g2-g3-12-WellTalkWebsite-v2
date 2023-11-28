export type Post = {
  id: number;
  title: string;
  content: string;
  photoContent: string;
  activeBtn: string;
  showEdit?: () => void;
  showDeleteModal?: () => void;
  saveChanges?: () => void;
  photoData: File;
  counselor: {
    id: number;
    firstName: string;
    lastName: string;
    userType: string;
  };
};

export type Author = {
  id: number;
  firstName: string;
  lastName: string;
  userType: string;
};
