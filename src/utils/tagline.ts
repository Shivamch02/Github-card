import { GitHubUser } from '../types/github';

export const calculateTagline = (user: GitHubUser): string => {
  const { contributions = 0, streak = 0 } = user;
  
  if (contributions >= 1000 && streak >= 30) return 'Grand Master';
  if (contributions >= 500 && streak >= 14) return 'Master';
  if (streak >= 30) return 'Top Ranker';
  if (contributions >= 100 || streak >= 7) return 'Intermediate';
  return 'Newbie';
};