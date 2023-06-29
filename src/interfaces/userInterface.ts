// Interface para o usuário.
export interface ICreate {
  fullName: string;
  email: string;
  password: string;
  passwordRepeat: string;
  token?: string;
}
