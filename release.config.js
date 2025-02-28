const ref = process.env.GITHUB_REF;
const branch = ref.split('/').pop();

module.exports = {
  branches: [
    'main',
    { name: 'dev', prerelease: 'beta' },
    { name: 'rc', prerelease: true },
    { name: 'hotfix', prerelease: true },
    { name: 'release-*', prerelease: true },
  ],

  plugins: [
    [
      '@semantic-release/commit-analyzer',
      {
        preset: 'conventionalCommits',
        releaseRules: [
          { type: 'build', release: 'patch' },
          { type: 'chore', release: 'patch' },
          { type: 'ci', release: 'patch' },
          { type: 'docs', release: false },
          { type: 'feat', release: 'minor' },
          { type: 'fix', release: 'patch' },
          { type: 'perf', release: 'patch' },
          { type: 'refactor', release: false },
          { type: 'style', release: false },
          { type: 'test', release: 'patch' },
        ],
        presetConfig: {
          types: [
            { type: 'build', section: 'Build System' },
            { type: 'chore', section: 'Chores' },
            { type: 'ci', section: 'CI Configuration' },
            { type: 'docs', section: 'Documentation' },
            { type: 'feat', section: 'Features' },
            { type: 'fix', section: 'Bug Fixes' },
            { type: 'perf', section: 'Performance Improvements' },
            { type: 'refactor', section: 'Code Refactoring' },
            { type: 'style', section: 'Styles' },
            { type: 'test', section: 'Tests' },
          ],
        },
      },
    ],
    '@semantic-release/release-notes-generator',
    [
      '@semantic-release/changelog',
      {
        changelogFile: `CHANGELOG_${branch}.md`,
      },
    ],
    [
      "@semantic-release/npm",
      {
        "npmPublish": false  // This updates package.json but skips publishing
      }
    ],
    [
      "@semantic-release/git",
      {
        assets: ["package.json", `CHANGELOG_${branch}.md`],
        message: "chore(release): ${nextRelease.version} [skip ci]"
      }
    ],
  ],
};