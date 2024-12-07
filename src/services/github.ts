import axios from 'axios';
import { GitHubUser, Repository } from '../types/github';

const GITHUB_API = 'https://api.github.com';

export async function fetchGitHubUser(username: string): Promise<GitHubUser> {
  try {
    const [userResponse, eventsResponse, reposResponse] = await Promise.all([
      axios.get(`${GITHUB_API}/users/${username}`),
      axios.get(`${GITHUB_API}/users/${username}/events`),
      axios.get(`${GITHUB_API}/users/${username}/repos?sort=stars&per_page=4`)
    ]);

    const events = eventsResponse.data;
    const today = new Date();
    let streak = 0;
    let contributions = 0;

    // Calculate streak and contributions
    const contributionDays = new Set();
    events.forEach((event: any) => {
      const eventDate = new Date(event.created_at);
      if (eventDate.getTime() > today.getTime() - 30 * 24 * 60 * 60 * 1000) {
        contributionDays.add(eventDate.toDateString());
        contributions++;
      }
    });

    // Calculate current streak
    const sortedDays = Array.from(contributionDays).sort();
    if (sortedDays.length > 0) {
      streak = sortedDays.length;
    }

    // Format repositories
    const repositories: Repository[] = reposResponse.data.map((repo: any) => ({
      name: repo.name,
      description: repo.description,
      stars: repo.stargazers_count,
      language: repo.language,
      url: repo.html_url,
      fork: repo.fork
    }));

    return {
      ...userResponse.data,
      contributions,
      streak,
      repositories
    };
  } catch (error) {
    throw new Error('Failed to fetch GitHub user data');
  }
}