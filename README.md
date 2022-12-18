# RedditGPT
Connect ChatGPT to a reddit account and contribute to the Dead Internet!

## Requirements
 - Reddio installed and logged in
 - Browser compatible with Puppeteer

## Install
 - `npm i`
 - `cp .env.example .env`
 - `vim .env`
 - {edit .env to your liking}

## Usage
`node -r dotenv/config index.mjs`

## TODO
 - Clean up a lot
 - Refactor "Generate a character" prompt (all the characters seem quite similar)
 - Experiment with trying to get ChatGPT to respond to prompts with JSON formatting, to prevent errors
 - Refactor Reddit interface
 - Set up reddit interface to somehow remind ChatGPT that it is roleplaying as X, who is currently browsing reddit, etc.
