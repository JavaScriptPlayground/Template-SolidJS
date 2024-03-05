# Template
Template for Frontend development. Build a web page using [Lit](https://lit.dev) and [Deno](https://deno.land).

## Overview

- `.gitignore` Git ignore file.
- `build.config.ts` Build configuration for [esbuild](https://esbuild.github.io). Only change this if you know what you
  are doing.
- `deno.jsonc` [Deno configuration](https://docs.deno.com/runtime/manual/getting_started/configuration_file) file. Only
  change this if you know what you are doing.
- `deno.lock` Lock file for all dependencies.
- `LICENSE` License file.
- `README.md` This file.
- `tsconfig.json` TypeScript configuration file. Only change this if you know what you are doing.
- `.github` [GitHub configuration](https://www.freecodecamp.org/news/how-to-use-the-dot-github-repository/) directory.
- `deps` External dependencies. This should mimic the url structure of the dependency.
  - `lit.ts` Lit element dependency.
  - `lit` Lit element sub-dependencies.
    - `decorators.ts` Lit decorators dependency.
  - `...` Dependencies.
- `docs` Documentation for the page.
- `src` All sourcecode.
  - `client` Sourcecode for the client.
    - `index.html` Page itself.
    - `_assets` Page assets like images, vector graphics, etc.
      - `favicon.svg` Favicon for the page
      - `...` Assets.
    - `_components` Page components/elements.
      - `...` Components/Elements.
    - `_scripts` Page scripts. This directory must have a index.ts file as entry point.
      - `index.ts` Page script entry file.
      - `...` Scripts.
    - `_styles` Page styles. This directory must have a index.scss file as entry point.
      - `index.scss` Page style entry file.
      - `...` Styles.
    - `...` A subpage as a folder containing the same folder structure as `client`. `...` can have any name. It is
      recommended to not start with a `_` as these directories are reserved for the page itself.
- `test` Tests (no unit tests).
  - `e_to_e` End to End tests for the page.

## Usage

### Tasks

Use `deno task <name_of_the_task>`:

- `build` Build the page. *(recommended)*
- `build:watch` Build the page with active file watcher. *(recommended)*
- `build:dev` Build the page for development (without optimization like minification).
- `build:dev:watch` Build the page for development (without optimization like minification) with active file watcher.
- `serve` *Not implemented yet (currently does nothing)*
- `lint` Lint the sourcecode
- `test` Test your sourcecode (all `.test.ts` file will be checked). A junit report gets generated to `./report.xml`
