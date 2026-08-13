import React, { useState, useEffect } from 'react';
import { FiGithub, FiStar, FiGitBranch, FiUsers, FiExternalLink, FiRefreshCw, FiAlertCircle } from 'react-icons/fi';
import { profileData } from '../data/dashboard';

export default function GitHubWidget() {
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchGitHubData = async () => {
    setLoading(true);
    setError(false);
    try {
      // Check session storage cache first to avoid rate limiting
      const cachedProfile = sessionStorage.getItem('github_profile');
      const cachedRepos = sessionStorage.getItem('github_repos');

      if (cachedProfile && cachedRepos) {
        setProfile(JSON.parse(cachedProfile));
        setRepos(JSON.parse(cachedRepos));
        setLoading(false);
        return;
      }

      // Fetch user profile
      const profileRes = await fetch(`https://api.github.com/users/${profileData.githubUsername}`);
      if (!profileRes.ok) throw new Error('Failed to fetch GitHub profile');
      const profileDataJson = await profileRes.json();

      // Fetch recent repos
      const reposRes = await fetch(`https://api.github.com/users/${profileData.githubUsername}/repos?sort=updated&per_page=4`);
      if (!reposRes.ok) throw new Error('Failed to fetch GitHub repos');
      const reposDataJson = await reposRes.json();

      setProfile(profileDataJson);
      setRepos(reposDataJson);

      sessionStorage.setItem('github_profile', JSON.stringify(profileDataJson));
      sessionStorage.setItem('github_repos', JSON.stringify(reposDataJson));
    } catch (err) {
      console.warn('GitHub API Fetch Error:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGitHubData();
  }, []);

  return (
    <div className="glass-card rounded-2xl p-5 border border-white/10 flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
            <FiGithub size={20} />
          </div>
          <div>
            <h2 className="text-base font-bold text-white tracking-tight">GitHub Activity</h2>
            <p className="text-xs text-zinc-400">@{profileData.githubUsername}</p>
          </div>
        </div>
        <a
          href={profileData.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors bg-purple-500/10 px-2.5 py-1.5 rounded-lg border border-purple-500/20"
        >
          <span>Open GitHub</span>
          <FiExternalLink size={12} />
        </a>
      </div>

      {/* Body state management */}
      {loading ? (
        <div className="space-y-3 py-2 animate-pulse">
          <div className="grid grid-cols-3 gap-2">
            <div className="h-12 bg-white/5 rounded-xl" />
            <div className="h-12 bg-white/5 rounded-xl" />
            <div className="h-12 bg-white/5 rounded-xl" />
          </div>
          <div className="h-16 bg-white/5 rounded-xl" />
          <div className="h-16 bg-white/5 rounded-xl" />
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center py-6 text-center space-y-3">
          <FiAlertCircle size={32} className="text-amber-400" />
          <div>
            <p className="text-sm font-semibold text-zinc-200">GitHub API Rate Limit / Offline</p>
            <p className="text-xs text-zinc-400 mt-1 max-w-xs">
              Unable to reach GitHub API directly right now. You can visit profile on GitHub.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={fetchGitHubData}
              className="flex items-center gap-1.5 text-xs font-medium text-zinc-300 bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg border border-white/10 transition-colors"
            >
              <FiRefreshCw size={12} />
              Retry
            </button>
            <a
              href={profileData.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-purple-400 bg-purple-500/10 hover:bg-purple-500/20 px-3 py-1.5 rounded-lg border border-purple-500/20"
            >
              Open GitHub Profile
            </a>
          </div>
        </div>
      ) : (
        <div className="space-y-4 flex-1 flex flex-col justify-between">
          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-2">
            <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 text-center">
              <span className="block text-xs text-zinc-400 font-medium">Public Repos</span>
              <span className="text-lg font-bold text-white">{profile?.public_repos ?? 14}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 text-center">
              <span className="block text-xs text-zinc-400 font-medium">Followers</span>
              <span className="text-lg font-bold text-white">{profile?.followers ?? 28}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 text-center">
              <span className="block text-xs text-zinc-400 font-medium">Following</span>
              <span className="text-lg font-bold text-white">{profile?.following ?? 12}</span>
            </div>
          </div>

          {/* Recent Repos */}
          <div>
            <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
              Recent Repositories
            </h3>
            <div className="space-y-2">
              {repos.length > 0 ? (
                repos.map((repo) => (
                  <a
                    key={repo.id}
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-purple-500/30 transition-all group"
                  >
                    <div className="flex flex-col truncate pr-2">
                      <span className="text-xs font-bold text-zinc-200 group-hover:text-purple-300 truncate">
                        {repo.name}
                      </span>
                      <span className="text-[10px] text-zinc-400 truncate">
                        {repo.description || repo.language || 'Public Repository'}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-[11px] text-zinc-400 shrink-0">
                      <span className="flex items-center gap-1">
                        <FiStar size={11} className="text-amber-400" />
                        {repo.stargazers_count}
                      </span>
                      <span className="flex items-center gap-1">
                        <FiGitBranch size={11} className="text-purple-400" />
                        {repo.forks_count}
                      </span>
                    </div>
                  </a>
                ))
              ) : (
                <div className="text-xs text-zinc-400 text-center py-3">No recent repositories available.</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
