export type Role = {
  id: string;
  name: string;
  permission: number;
  created_at: string;
  updated_at: string;
}

export type User = {
  id: string;
  name?: string | null;
  email: string;
  avatar: string | null;
  avatar_url: string | null;
  username: string;
  enabled: boolean;
  created_at: string;
  updated_at: string;
  user_roles: Role[];
};

export interface TrailData {
  id: string;
  slug: string;
  
  name: string;
  description: string;

  avatar?: string;
  avatar_url?: string;

  user_trail: {
    progress: number;
    enabled: boolean;
  } | null;

  _count: {
    playlists: number;
    users: number;
    lessons: number;
  };

  created_at: string;
  updated_at: string;
}

export interface PlaylistData {
  id: string;
  slug: string;
  trail_id: string;
  
  name: string;
  description: string;

  avatar?: string;
  avatar_url?: string;

  user_playlist: {
    progress: number;
  } | null;

  created_at: string;
  updated_at: string;
}

export interface BlockData {
  id: string;
  slug: string;
  playlist_id: string;

  name: string;

  lessons: LessonData[];

  user_block: {
    progress: number;
  } | null;
    
  created_at: string;
  updated_at: string;
}

export interface LessonData {
  id: string;
  slug: string;
  block_id: string;

  name: string;
  description: string;
  link: string;

  completed: boolean;
  state: "none" | "liked" | "disliked";

  _count?: {
    dislikes: number;
    likes: number;
    views: number;
  };
      
  created_at: string;
  updated_at: string;
}
