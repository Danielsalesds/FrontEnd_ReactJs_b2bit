export type Avatar = {
  id: number;
  high: string;
  medium: string;
  low: string;
};

export type User = {
  id: number;
  name: string;
  email: string;
  is_active: boolean;
  avatar: Avatar;
  type: string;
  created: string;
  modified: string;
  role: string;
};
