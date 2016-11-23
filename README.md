## Angular 2 File Upload Form Application
<hr>

This application is designed to demonstrate an Angular 2 application containing a file upload form that
uses a Spring Framework Rest Controller Back End.

The app contains a couple of custom components:
* FileUploadComponent - holds the form used to upload the file and collect metadata on it
* FileUploadDataTableComponent - displays the uploaded file data

### Running the application

```bash
# clone this repo
$ git clone https://github.com/cdoremus/dotsub-fileupload-frontend.git

# change directory
$ cd dotsub-fileupload-frontend

# install the dependencies with npm
$ npm install

# start the server
$ npm start
```
go to [http://localhost:8000](http://localhost:8000) in your browser.

# Table of Contents

* [Getting Started](#getting-started)
    * [Dependencies](#dependencies)
    * [Testing](#testing)
    * [Production](#production)
    * [Documentation](#documentation)
* [Frequently asked questions](#faq)
* [License](#license)

# Getting Started

## Dependencies

What you need to run this app:
* `node` and `npm` (Use [NVM](https://github.com/creationix/nvm))
* Ensure you're running Node (`v5.x.x`+) and NPM (`3.x.x`+)

The npm start script starts a local server using `webpack-dev-server`
which will watch, build (in-memory), and reload for you. The application
can be checked at `http://localhost:8000`.

As an alternative, you can work using Hot Module Replacement (HMR):

* `npm run start:hmr`

And you are all set! You can now modify your components on the fly without having to reload the entire page.

## Testing

#### 1. Unit Tests

* single run: `npm test`
* live mode (TDD style): `npm run test-watch`

  After the tests run, code coverage data can be found in the coverage/html/index.html file.

#### 2. End-to-End Tests (aka. e2e, integration)

* single run:
  * in a tab, *if not already running!*: `npm start`
  * in a new tab: `npm run webdriver-start`
  * in another new tab: `npm run e2e`

* interactive mode:
  * instead of the last command above, you can run: `npm run e2e-live`

## Production

To build the application, run:

* `npm run build`

You can now go to `/dist` and deploy that to your server!

## Documentation

You can generate api docs (using [TypeDoc](http://typedoc.org/)) for your code with the following:

* `npm run docs`

# FAQ

#### How to include external css files such as bootstrap.css ?

Just install the lib and import the css files in [vendor.ts](https://github.com/preboot/angular2-webpack/blob/master/src/vendor.ts). For example this is how to do it with bootstrap:

```sh
npm install bootstrap@next --save
```

And in [vendor.ts](https://github.com/preboot/angular2-webpack/blob/master/src/vendor.ts) add the following:

```ts
import 'bootstrap/dist/css/bootstrap.css';
```

# License

[MIT](/LICENSE)
