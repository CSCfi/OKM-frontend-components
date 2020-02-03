## OKM/frontend-components

Created for OKM-projects such and Oiva and Kuja

Created with:

- **create-react-app** for creating the base and configurations,
- **TailwindCSS**, **PostCSS** for styling purposes,

## How to use this library

Add dependency with the version you want

```
"okm-frontend-components": "github:CSCfi/OKM-frontend-components#v0.1.7"
```

import components like this

```
import Table from "okm-frontend-components/dist/02-organisms/Table"
```

## How to develop this library

Add components under src/lib/components, following the known (assumed) structure (http://atomicdesign.bradfrost.com/chapter-2/). Make storybook examples to components. Run storybook with `npm run storybook`

Commit your changes in src/ directory.

Build by running `npm run build`. Run `npm install`, commit package.json, package-lock.json and dist/ directory. Increment library version. Try to adhere to semantic versioning. After the work makes it to master, make release as "v0.3.7" or whatever matches your version in github project.

## How to import component from oiva:

- cp -av the desired component and all its missing dependencies to the matching location in this project
- ensure that storybook still works
- make a version and release
- increment version in oiva-frontend and replace local references to the component and its dependencies with library references
- remove component and its dependencies from oiva-frontend
- resolve potential issues

## How to run locally against this library

Replace your dependency source in package.json as "file:../OKM-frontend-components" or whatever is the path to your locally cloned project, instead of "github:CSCfi/OKM-frontend-components#v0.1.7"

To prevent "Invalid hook call" error in the host project, you might need to remove node-modules in OKM-frontend-componentens:
rm -rf node_modules

You need then run "npm install" in OKM-frontend-componentens if more changes are needed to components.
