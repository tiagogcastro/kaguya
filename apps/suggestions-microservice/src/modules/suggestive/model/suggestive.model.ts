export interface SuggestiveModel {
  id?: string;

  authUserId: string;
  email: string;
  username: string;

  name?: string;
  avatar?: string;

  created_at?: string;
  updated_at?: string;
}