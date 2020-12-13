module.exports = {
  '.editorconfig': ['prettier --write'],
  LICENSE: ['prettier --write'],
  '**/*.md': ['markdownlint'],
  '**/*.{css,gql,graphql,html,json,less,md,mdx,scss,vue,yaml,yml}': [
    'prettier --write',
  ],
  '**/*.{js,jsx,ts,tsx}': [
    'import-sort --write',
    'prettier --write',
    "eslint --cache --ext '.js,.jsx,.ts,.tsx' --fix ./src",
    'jest --bail --findRelatedTests',
  ],
  'src/**/*': [
    // Run build without passing changed files to command: https://github.com/okonet/lint-staged/issues/174
    "bash -c 'npm run build'",
  ],
  // The formatting tools are ordered to run sequentially
  concurrent: 'false',
}
