export type JwtPayload = {
  id: string;
  username: string;
  company: string;
  roles?: string | string[];
};
