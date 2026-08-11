export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
};

export interface userResponse {
  total: number;
  skip: number;
  limit: number;
  users: User[];
}