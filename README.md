## ESPReact
I'm working on many different ESP8266 projects, and because I'm a front end developer I'd like to use react on daily bases to update the UI of my devices. I'd looked around, and found that there isn't any real React based web server tutorial. Here you can find my quick solution. The current build is around .5MB GZIPped. Small enough for an ESP device.

I've created a minimal implementation of a casual ESP8266 UI based on:
- [ReactJS](https://reactjs.org/)
- [UIkit CSS boilerplate](https://getuikit.com/)
- [ES6](https://developer.mozilla.org/en-US/docs/Web/JavaScript/New_in_JavaScript/ECMAScript_2015_support_in_Mozilla)
- [Skeleton](https://getskeleton.com/) a minimal UI boilerplate also attached if needed

## Table of content
- [ESPReact](#espreact)
- [Table of content](#table-of-content)
  - [Installation](#installation)
  - [About the backend](#about-the-backend)
  - [React-router](#react-router)
    - [Hash Router](#hash-router)
  - [API calls](#api-calls)
  - [UIkit](#uikit)
  - [Build Hacking](#build-hacking)
  - [Gzip Optimization](#gzip-optimization)
  - [How to test gzipped files easily](#how-to-test-gzipped-files-easily)
  - [How to move to ESP8266](#how-to-move-to-esp8266)
  - [Final thoughts](#final-thoughts)
  - [Next steps](#next-steps)
  - [How to contribute](#how-to-contribute)
- [From original Create React App documentation](#from-original-create-react-app-documentation)
  - [Available Scripts](#available-scripts)

### Installation
To get the base package clone the git library:

`git clone https://github.com/montyx99/espReact.git`

Step into the cloned folder:
`cd espReact`

Install the packages:
`yarn install`

Then run:
`yarn start`

### About the backend
I'm implemented a [backend solution](https://github.com/montyx99/EspWs) too to host the current files. You can use to test the espReact.

### React-router
React router is used to handle PWA/SPA like routing. I've thought about many different routers to use, but all of them have issues, that I didn't like, so I've made my decision to use the robust (I know this is huge) router. If someone has the capability to integrate another router, just contribute, and provide a good solution

#### Hash Router
This is very important in case of ESP devices. The webserver, that I use is a modified [ESP8266Webserver](https://github.com/esp8266/Arduino/tree/master/libraries/ESP8266WebServer). This cannot handle normal browser routing as I experienced. This is the reason why I use the HashRouter in the code

### API calls
You can find a very beginner API call in the [Config](./src/views/config/config.js) component.

### UIkit
I've tried many different UI framework, like Preact, Skeleton, etc. Finally I've chosen the UIkit, because this is:
- Lightweight enough for ESP devices
- Modular. You need to import the needed modules with SCSS
- Easy to customize with SCSS
You can find great examples in [index.scss](./src/style/index.scss), and other SCSS files both on global, and component level. The UI currently is ugly, and most of the functionality are useless. These are for only demo reasons. Demonstrate, how can you use the SCSS customization in case of UIkit

### Build Hacking
This is a very important topic. The React uses an excellent bundling solution during the build process.
**BUT** this is really bad in case of SPIFFS usage of the ESP8266. The SPIFFS can store files which has no longer full path than 32 characters. Also there is no possible way to create folders on the SPIFFS storage. So I had to hack the [webpack.config.js](./webpack.config.js) of the react-scripts package. You can find the custom webpack.config.js file in the root of my repo. You need to overwrite that you can find in the `node_modules/react-scripts/config` folder. This will eliminate the chunk string and the hash from the name of every affected files, and all files will be built into the same folder level. !!! You need to update this manually later. Do not forget about it !!!

### Gzip Optimization
This is very important to know, all modern browser (including mobile browsers) can handle gzipped files. My backend can provide gzip files. You can run the following commands to build and gzip all files:
`yarn build` will build the files into the `build` folder
`gzip -r ./build` from the root of the espReact folder will gzip all files one-by-one. This can be served by the backend. Check how to test it in the next chapter

If someone knows how can it be done on Windows, please let me know and I'm going to update Readme :)

### How to test gzipped files easily
The dev dependecies contains an easy to use simple http server, called `http-serve`. Use the following command to test your application from the espReact root folder:
`http-serve --gzip`
Then follow the instructions given by the `http-serve`.

### How to move to ESP8266
I know only the steps for my devices, the ESP8266. My ordered ESP32 devices are not arrived yet, so I cannot test it. But I think (hope) this will be the same.
1. First you need to create a `data` folder in the root of your arduino project.
2. Copy over the gzipped files to the `data` folder, except the preacache-manifest file. This is too long, and not used in our case.
3. Use the steps from the [tutorial](https://www.instructables.com/id/Using-ESP8266-SPIFFS/) of [Steve Quinn](https://www.instructables.com/member/SteveQuinn/). Thanks Steve, great job! :)

### Final thoughts
I know, this is not the prettiest codebase on the Earth. This was done in one single night, but I thought that this will be a great starting point to work together on a better final package for the Makers. I hope that this will be a great help for everyone. I appreciate every feedback, new found issues, and contribution.

**Happy coding**

### Next steps
- Solve every opened issues will come
- API calls (in progress, backend ready)
- Authentication (backend code in progress)
- Find contributors to clean up and maintain the code
- Modularization
- - Find easy way to change UIkit to another UI framework
- - Solve to use another routers

### How to contribute
Please send a [mail](mailto:monty.whisp@gmail.com), or find me on discord: MonitQ#7059

## From original Create React App documentation
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

