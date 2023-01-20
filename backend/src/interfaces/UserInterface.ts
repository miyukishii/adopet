export default interface IUser {
  email: string;
  password: string;
  fullName: string;
  state: string;
  token: string;
  avatar: string;
  favorites?: any;
}