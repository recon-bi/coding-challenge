export interface IUserType extends Document {
  username: string;
  password: string;
  roles: {
    type: string[];
    default: [];
  };
  personName?: string;
  email: string;
  phone?: string;
  active?: boolean;
}
