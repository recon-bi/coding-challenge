export type IUserType = {
  username: string;
  password: string;
  roles: string[];
  personName?: string;
  email: string;
  phone?: string;
  active?: boolean;
};

export type RoleType = {
  role: string;
  description: string;
};

export type PasswordValidationType = {
  hasLength: boolean;
  hasUpper: boolean;
  hasLower: boolean;
  hasSpecial: boolean;
  hasNumber: boolean;
  hasNoIllegals: boolean;
  passwordMatch: boolean;
};
