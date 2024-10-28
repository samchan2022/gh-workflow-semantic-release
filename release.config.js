const changelogFile = process.env.CHANGELOG_FILE
console.log("changelogFile", changelogFile);
module.exports = {
  repositoryUrl: "https://github.com/samchan2022/gh-workflow-semantic-release",
  branches: [
    "main",
    { "name": "dev", "prerelease": true, "channel": "dev" },
    { "name": "stg", "prerelease": true, "channel": "stg" },
  ],
  plugins: [
    [
      "@semantic-release/commit-analyzer",
      {
        // Custom configuration for commit analysis
        releaseRules: [
          { type: "feat", release: "minor" }, // New features should trigger a minor version bump
          { type: "fix", release: "patch" },  // Fixes should trigger a patch version bump
          { type: "perf", release: "patch" }, // Performance improvements should trigger a patch version bump
          { type: "BREAKING CHANGE", release: "major" }, // Breaking changes should trigger a major version bump
          { type: "chore", release: false }, // Chore commits don't trigger a release
          { type: "docs", release: false },  // Documentation updates don't trigger a release
          { type: "style", release: false }, // Style changes don't trigger a release
          { type: "refactor", release: false } // Refactors don't trigger a release
        ],
        preset: "conventionalcommits" // Ensure conventional commits style
      }
    ],
    "@semantic-release/release-notes-generator", // Generate release notes
    [
      "@semantic-release/changelog",
      {
        "changelogFile": changelogFile
      }
    ],
    "@semantic-release/github", // Create GitHub releases
    // [
    //   "@semantic-release/git", // Commit updated changelog and version files
    //   {
    //     assets: ["package.json", "CHANGELOG.md"],
    //     message: "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}"
    //   }
    // ]
  ],
  preset: "conventionalcommits"
};

