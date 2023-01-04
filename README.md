# fast-delete

A userscript to speed up deletion of repos/projects where verification is needed.

Note: You need Violentmonkey / Tampermonkey etc.

[Install](https://github.com/jakob-kruse/fast-delete/raw/main/dist/fast-delete.user.js)

# Supported

- GitHub.com
- Fly.io

Note that support might break, if the website updates.

## Development / Building

The userscript is written in Typescript and bundled by tsup.

### Clone this repo

```bash
git clone https://github.com/jakob-kruse/fast-delete
```

### Install Dependencies

```bash
pnpm install
```

### Develop

Rebuilds on changes to the source files.

```bash
pnpm dev
```

### Build

Build the userscript once.

```bash
pnpm build
```
