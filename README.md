# Template
<img src="https://github.com/user-attachments/assets/ca0d1fb9-4f77-4b3d-9812-7590c4208193" align="right" width="128">

Template for Frontend development. Build a web page using [SolidJS](https://solidjs.com) as frontend framework and
[Deno](https://deno.land) as your backend. Clean architecture. No NodeJS required.


[![Run Linter](https://github.com/JavaScriptPlayground/Template/actions/workflows/lint.yml/badge.svg)](https://github.com/JavaScriptPlayground/Template/actions/workflows/lint.yml)
[![Run Unit Tests](https://github.com/JavaScriptPlayground/Template/actions/workflows/test.yml/badge.svg)](https://github.com/JavaScriptPlayground/Template/actions/workflows/test.yml)
[![Deploy GitHub Pages](https://github.com/JavaScriptPlayground/Template/actions/workflows/deployment.yml/badge.svg)](https://github.com/JavaScriptPlayground/Template/actions/workflows/deployment.yml)

## Overview

- `.gitignore` Git ignore file.
- `deno.json` [Deno configuration](https://docs.deno.com/runtime/manual/getting_started/configuration_file) file. Only
  change this if you know what you are doing.
- `LICENSE` License file.
- `README.md` This file.
- `.github` [GitHub configuration](https://www.freecodecamp.org/news/how-to-use-the-dot-github-repository/) directory.
- `config` Project specific config files (not part of sourcecode).
  - `deno.lock` Lock file for all dependencies.
  - `import_map.json` [Import map](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script/type/importmap) for 
    all imports.
  - `build` Build configuration files.
    - `copy_files_extension_filter.json` JSON array of extensions for files that should be copied to the dist folder.
    - `index.ts` Build configuration for [esbuild](https://esbuild.github.io). Only change this if you know what you are
      doing.
  - `types` Project type declarations.
    - `...` Declaration.
- `doc` Documentation for the page.
  - `...` Doc.
- `src` All sourcecode.
  - `client` Sourcecode for the client.
    - `app` The main app.
    - `components` Generic components for the page.
    - `static` Static assets for the page.
    - `...` Client files.
  - `server` Sourcecode for the server.
    - `...` Server files.
- `test` Tests (no unit tests).
  - `e_to_e` End to End tests for the page.

## Usage
### Getting started
Checkout the template and run initial [`deno task cache`](#tasks). This will cache all the necessary dependencies.
If you still getting import errors, try reloading the "import registries cache".

Next you can build your app using [`deno task build`](#tasks).

After that your app is ready to serve by using [`deno task serve`](#tasks).

### Tasks
Use `deno task <name_of_the_task>`:

- `build` Build the page. *(recommended)*
- `build:watch` Build the page with active file watcher. *(recommended)*
- `build:dev` Build the page for development (without optimization like minification).
- `build:dev:watch` Build the page for development (without optimization like minification) with active file watcher.
- `cache-reload` Cache all dependencies.
- `serve` Serve the build `dist` directory as the page root. *(recommended)*
- `serve:dev` Serve the build `dist` directory as the page root for development (with verbose logging and directory 
  listing enabled).
- `lint` Lint the sourcecode
- `test` Test your sourcecode (all `.test.ts` file will be checked). A junit report gets generated to
  `./reports/report.xml`

### GitHub Workflows
- `deployment.yml` Deploys your current app to GitHub Pages if the name of your repository ends with `.github.io`.
  (Ex. `github.com/foo/foo.github.io`)
- `lint.yml` Lints your sourcecode.
- `test.yml` Runs all the unit tests.

## License

[GPL Version 3.0 Copyright (C) 2025 Max](./LICENSE)
