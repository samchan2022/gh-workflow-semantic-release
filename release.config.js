module.exports = {
  repositoryUrl: "https://github.com/samchan2022/gh-workflow-semantic-release",
  branches: ["main"],
  plugins: [
    "@semantic-release/commit-analyzer", // Analyze commit messages to determine version bump
    "@semantic-release/release-notes-generator", // Generate release notes
    "@semantic-release/changelog", // Update changelog file
    "@semantic-release/github", // Create GitHub releases
    [
      "@semantic-release/git", // Commit updated changelog and version files
      {
        assets: ["package.json", "CHANGELOG.md"],
        message: "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}"
      }
    ]
  ],
  preset: "conventionalcommits"
};

