# Notes App

A minimal notes app written in React and TypeScript.

Aiming to do a small set of things really really well. So simple the software doesn't even have a name.

- Simple
- Keyboard navigable
- Markdown
- Fast
- Platform agnostic

And ideally

- Vim mode
- Offline
- Shareable content
- Command palette

## Configuration

Configure environment variables

```sh
cp .env.template .env
nvim .env
```

Use your JavaScript package manager of choice, I use [pnpm](https://pnpm.io/motivation)

```sh
pnpm install
```

Generate types with

```sh
pnpm types:generate
```

Build the icon set with

```sh
pnpm icons:generate
```

## Development

```sh
pnpm dev:web # or `dev`
# or
pnpm dev:desktop
```

## Compilation

```sh
pnpm build:web # or `build`
# or
pnpm build:desktop
```

## Contribution

Contributions are welcome, please open an issue or a pull request.

## License

See [LICENSE.md](/LICENSE.md)
