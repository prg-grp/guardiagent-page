# Local Development and Preview

This website is built with Next.js, React, TypeScript, and Tailwind CSS. It uses pnpm to manage its dependencies.

These instructions support:

* macOS
* Linux

## First-Time Setup

### 1. Install Node.js

This project requires Node.js 20.9 or newer. The following commands install Node.js 24 through `nvm`.

Open a terminal and run:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.5/install.sh | bash
```

Load `nvm` in the current terminal:

```bash
source "$HOME/.nvm/nvm.sh"
```

Install and activate Node.js 24:

```bash
nvm install 24
nvm use 24
```

Set Node.js 24 as the default version:

```bash
nvm alias default 24
```

Verify the installation:

```bash
node --version
npm --version
```

The Node.js version should begin with `v24`.

When opening a new terminal, `nvm` should load automatically. If the `nvm` command is not found, run:

```bash
source "$HOME/.nvm/nvm.sh"
```

### 2. Install pnpm

This project is configured to use pnpm version `10.18.3`.

Install it globally:

```bash
npm install --global pnpm@10.18.3
```

Verify the installation:

```bash
pnpm --version
```

The command should print:

```text
10.18.3
```

## Install the Project

Install the project dependencies from the root of this repository:

```bash
pnpm install
```

You normally need to run this command only after initially downloading the project or when its dependencies change.

## Start a Local Development Preview

Start the Next.js development server:

```bash
pnpm dev
```

When the server is ready, open this address in your browser:

```text
http://localhost:3000
```

Changes made to files in directories such as `app`, `components`, `hooks`, `lib`, and `styles` should automatically appear in the browser.

Stop the server by returning to the terminal and pressing:

```text
Ctrl + C
```

## Preview the Production Build

Before pushing your changes and deploying the website, test the optimized production version locally.

First, stop the development server if it is running.

Create the production build:

```bash
pnpm build
```

If the build completes successfully, start the production server:

```bash
pnpm start
```

Open the following address:

```text
http://localhost:3000
```

This production preview is closer to the version that will be deployed than the development server.

Stop it by pressing:

```text
Ctrl + C
```

## Recommended Workflow

### While developing

Start the development server:

```bash
pnpm dev
```

Review your changes at:

```text
http://localhost:3000
```

### Before pushing

Stop the development server and test the production build:

```bash
pnpm build
pnpm start
```

Review the website again at:

```text
http://localhost:3000
```

After confirming that everything works, stop the server and push your changes:

```bash
git status
git add .
git commit -m "Update website"
git push
```

## Available Commands

| Command        | Description                           |
| -------------- | ------------------------------------- |
| `pnpm install` | Installs the project dependencies     |
| `pnpm dev`     | Starts the development server         |
| `pnpm build`   | Creates an optimized production build |
| `pnpm start`   | Runs the production build             |
| `pnpm lint`    | Runs ESLint checks                    |

The `pnpm start` command must be run after a successful `pnpm build`.

## Use a Different Port

The website uses port `3000` by default.

If port `3000` is already being used, start the development server on port `3001`:

```bash
pnpm dev -- --port 3001
```

Then open:

```text
http://localhost:3001
```

To run the production preview on port `3001`:

```bash
pnpm build
pnpm start -- --port 3001
```


## Troubleshooting

### `nvm: command not found`

Load `nvm` manually:

```bash
source "$HOME/.nvm/nvm.sh"
```

Then try:

```bash
nvm use 24
```

### `pnpm: command not found`

Install the pnpm version used by the project:

```bash
npm install --global pnpm@10.18.3
```

### Port 3000 is already in use

Run the server on another port:

```bash
pnpm dev -- --port 3001
```

### The production server does not start

Create the production build first:

```bash
pnpm build
pnpm start
```

### Dependencies are not working correctly

Delete the installed dependencies and generated Next.js files:

```bash
rm -rf node_modules .next
```

Reinstall the dependencies:

```bash
pnpm install
```

Restart the development server:

```bash
pnpm dev
```

### Changes do not appear in the browser

Stop the server with `Ctrl + C`, clear the Next.js cache, and restart it:

```bash
rm -rf .next
pnpm dev
```
