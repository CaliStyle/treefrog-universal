# treefrog-universal
Treefrog Universal - A minimal boilerplate with productivity set to [11](https://www.youtube.com/watch?v=4xgx4k83zzc).

Angular 2 with universal rendering, latest and greatest from Webpack(Dll and HMR), a Trails.js backend and Sass/Flexbox front-end with routing and API driven development ready to go. What more could you ask for?

### Installation
```sh
$ npm install
```
### Why Universal?

We chose [angular/universal](https://github.com/angular/universal) for server-side rendering and SEO. The result is near instant page load time and a highly scalable and portable [design](https://medium.com/@mjackson/universal-javascript-4761051b7ae9#.c1s5ak8j7).

### Getting Started
```sh
$ npm run build:dll // initially and after any vendor update
$ npm run build
$ npm start
```
### HMR
`npm run build && npm start` in another terminal `npm run server:dev:hmr` navigate to localhost:8080 in the browser to see it.

### Visit Your Browser

http://localhost:3000/

### Updates/Bugs/Features

We will try to keep updating this repository as new releases of the libraries become available, but if something is broken please report an issue or submit a [pull-request] :)
