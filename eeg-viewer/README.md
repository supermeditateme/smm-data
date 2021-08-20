# EEG viewer


### Running demo in browser

If you just want to run EEG Viewer locally, you can launch supplied demo app in your browser. Serve directory `./demo` by any convenient means and navigate to `/index.html` in your browser: example EEG visualization will open. Drag'n'drop `.edf` file on top of demo app to view its EEG visualization; drag'n'drop `.csvr` annotation file on top of EEG visualization to overlay with annotations.

Commonly available options for serving demo app are:
  - Python:
    ```sh
    cd demo
    python -m SimpleHTTPServer
    ```
  - NodeJS:
    ```sh
    npm i
    npm run demo
    ```


### Using as a library/widget

EEG Viewer comes in bundled and unbundled versions, with module formats: ES6, CommonJS and IIFE.

If your web app does not use React, consume EEG Viewer with all dependencies bundled: 
- either `import` or `require` appropriate es6/cjs module as your build system dictates, 
- or simply add `<script>` tag to web page that points to `./dist/bundled/iife/main.min.js`.

If you have React app, you can consume unbundled version from corresponding `./dist/unbundled/` subdirectory to save space.

Make sure your application has Font Awesome css included in html file (for example from [CDN](https://www.bootstrapcdn.com/fontawesome/)), and also add `<link>` to stylesheet located at `./dist/css/eeg_viewer.min.css`.

### Developing

##### Prepare environment

1. Install nodejs (if needed)
  - For MacOS X:
    ```sh
    brew install nodejs
    ```
  - For Ubuntu
    ```sh
    sudo apt-key adv --keyserver keyserver.ubuntu.com --recv 68576280
    sudo apt-add-repository "deb https://deb.nodesource.com/node_8.x $(lsb_release -sc) main"
    sudo apt update
    sudo apt install nodejs
    ```

2. Install project dependencies
    ```sh
    npm i
    ```

##### Build and run server

Live reload included.

```sh
npm start
```

Served at port 8080

##### Build production version

Builds to `./dist` .

```sh
npm build:release
```

##### Publish new version

For project developers. This will bump version, build changelog, tag branch, build './dist' folder, commit and push to git and publish to npm.

```sh
npm run release
```
