export interface GitHubUser {
  login: string;
  avatar_url: string;
  name: string;
  bio: string;
  location?: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  contributions?: number;
  streak?: number;
  repositories?: Repository[];
}

export interface Repository {
  name: string;
  description: string | null;
  stars: number;
  language: string | null;
  url: string;
  fork: boolean;
}

export type Tagline =
  | "Grand Master"
  | "Master"
  | "Top Ranker"
  | "Intermediate"
  | "Newbie";
