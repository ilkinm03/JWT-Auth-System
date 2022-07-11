export type Signup = (
  fullName: string,
  emailOrPhone: string,
  password: string,
  confirmPassword: string
) => Promise<void>;

export type QuerySignup = {
  fullName: string;
  email?: string;
  phone?: string;
  role?: string;
  password: string;
};