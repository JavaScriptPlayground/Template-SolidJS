# Template
Template for Frontend development.

## Overview

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
    - `...` A subpage as a folder containing the same folder structure as `client`. `...` can
      have any name. It is recommended to not start with a `_` as these directories are reserved for the page itself.
- `test` Tests (no unit tests).
  - `e_to_e` End to End tests for the page.
