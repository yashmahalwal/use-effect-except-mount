
# useEffect Except Mount
Customised React useEffect hook that does not run on mount.

## The problem
useEffect hook allows you to perform side effects with function components. It runs the specified effect whenever its depenencies change.

   ```javascript
   useEffect(() => {
	// Side effect
}, [...dependencies])
   ```

But it also runs whenever the component mounts. Sometimes that is not desirable. A universal solution to avoid running effect on mount is to use refs. That is exactly what this hook does.

## Usage

 1. Installation
 2. Using it in your code


### Installation
Hook has a peer dependency on `React 17.01`. If you use `React 16.x`, it might be a good idea to upgrade to `17.x`. This version has no breaking changes. It also makes your application ready for future major versions.

```bash
npm i react use-effect-except-mount
```
### Using it in your code
The hook has exactly same signature as the `useEffect` hook.

```javascript
import useEffectExceptMount from "use-effect-except-mount";

const Component: React.FC = () => {
	useEffectExceptMount(() => {
		// Side effect
	}, [...dependencies])

	// Other rendering logic
}
```

## Source code structure
This section is for developers who wish to work upon the existing source code. The structure is pretty straightforward. Code is written mainly in **TypeScript**.  You can start by cloning the repository and running
```bash
npm i react # Getting peerDependency
npm i # Getting all devDependencies
```

There are three components to the source code:

### 1. The hook logic
This code resides in [`src/index.ts`](./src/index.ts).  It simply exports a function with same signature as `useEffect`. Built version resides in [`lib/index.js`](./lib/index.js).

### 2. The test cases
This code resides in [`__tests__/index.tsx`](./__tests__/index.tsx). Code is with written using Jest.

### 3. The demo
This is a bundled web application powered by **parcel**. Source code resides in [`example`](./example) folder . Built code resides in [`docs`](./docs) and is deployed on GitHub pages.

Following are the supported commands:
1. **npm test**: Run the test cases
2. **npm run build** : Build the hook logic
3. **npm  run parcel-build**: Build the demo
4. **npm run parcel-start**: Run the demo is development mode.
