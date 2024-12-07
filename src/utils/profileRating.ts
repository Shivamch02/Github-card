import { GitHubUser } from "../types/github";

interface ProfileRating {
  score: number;
  message: string;
  level: "beginner" | "intermediate" | "advanced" | "expert";
}

export function calculateProfileRating(user: GitHubUser): ProfileRating {
  const {
    public_repos = 0,
    followers = 0,
    contributions = 0,
    streak = 0,
    repositories = [],
  } = user;

  // Calculate base score
  let score = 0;

  // Repository quality score (max 30 points)
  const repoScore = Math.min(public_repos * 2, 40);
  score += repoScore;

  // Follower impact (max 20 points)
  const followerScore = Math.min(Math.log2(followers + 1) * 5, 20);
  score += followerScore;

  // Contribution consistency (max 30 points)
  const contributionScore = Math.min(contributions * 0.5, 40);
  score += contributionScore;

  // Streak bonus (max 20 points)
  // const streakScore = Math.min(streak * 2, 20);
  // score += streakScore;

  // Repository stars bonus
  if (repositories) {
    const totalStars = repositories.reduce((sum, repo) => sum + repo.stars, 0);
    const starScore = Math.min(Math.log2(totalStars + 1) * 2, 20);
    score += starScore;
  }

  // Normalize score to 100
  score = Math.min(Math.round(score), 100);

  // Determine level
  let level: ProfileRating["level"];
  if (score >= 80) level = "expert";
  else if (score >= 60) level = "advanced";
  else if (score >= 40) level = "intermediate";
  else level = "beginner";

  // Generate personalized message
  let message = "";

  if (level === "expert") {
    if (streak > 30) {
      message =
        "You're an exceptional developer with remarkable consistency! Your long streak shows incredible dedication.";
    } else if (followers > 500) {
      message =
        "You're a highly influential developer with a strong following. Your work inspires many!";
    } else {
      message =
        "Outstanding profile! You've achieved excellence across all aspects of GitHub development.";
    }
  } else if (level === "advanced") {
    if (public_repos > 30) {
      message =
        "You're a prolific creator with an impressive portfolio of repositories!";
    } else if (contributions > 500) {
      message =
        "Your consistent contributions show great dedication to the community!";
    } else {
      message =
        "Great work! You're making significant impact in the developer community.";
    }
  } else if (level === "intermediate") {
    if (streak > 7) {
      message =
        "You're building good coding habits with your consistent contributions!";
    } else if (public_repos > 10) {
      message =
        "You're actively building your portfolio. Keep creating and sharing!";
    } else {
      message = "You're making steady progress in your development journey!";
    }
  } else {
    if (public_repos > 0) {
      message =
        "Welcome to GitHub! You've taken your first steps into open source.";
    } else {
      message =
        "Welcome! Your GitHub journey is just beginning. Start by creating your first repository!";
    }
  }

  return {
    score,
    message,
    level,
  };
}
