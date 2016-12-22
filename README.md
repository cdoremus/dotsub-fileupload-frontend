# Angular 2 File Upload Form Application

This application is designed to demonstrate an Angular 2 application containing a
file upload form that also collects file metadata (title, description, file name
and creation date).

This application is paired with a Spring Framework Rest Controller back end
to persist the uploaded file and metadata (found in the fileupload-demo-backend repository).

## Running the Angular 2 application

Prior to running the application, you need to start the back-end web service
(see Readme.md in the fileupload-demo-backend repository).

```bash
# clone this repo
$ git clone https://github.com/cdoremus/fileupload-demo-angular2.git

# change directory
$ cd fileupload-demo-angular2

# install the dependencies with npm
$ npm install

# start the server
$ npm start
```
The application should then be running at [http://localhost:8000](http://localhost:8000).

# Application Structure and Design

This application uses Angular 2 and is build using components and structured according to best
practices outlined in the [Angular 2 Style Guide](https://angular.io/styleguide).

The flow of application use is done in the following steps

1. The user browses to the home page and is displayed a form to upload a file.
  * if any file upload records are present in the backend database, an Uploaded Files table containing those records is shown at the bottom of the page.
2. The user selects a file to upload.
  * selection of the file triggers an Http request to the back end to upload the file and create the file metadata record in the backend database.
3. The user is shown the metadata form and asked to enter the file title and description.
  * upon display, the metadata form is populated with the file record ID, file name and record creation date. This data is shown in read-only fields.
4. After filling out the metadata form, the user submits the form and the Uploaded Files table is refreshed
with the new data record.

In addition, informational or error messages are displayed at the top of the form
when appropriate.

File uploading and metadata persistence is done in two steps to make sure that the file
is successfully uploaded before the database record is finalized. This allows for the resubmission
of the file and deletion of metadata from previously failed submissions.

The Angular 2 app contains the following components:
* `HomeComponent` - encapsulates the home page displayed when the application is
first accessed. It holds the FileUploadComponent and FileDataTableComponent components.
It contains a method that responds to a fileRecordsChanged event of the FileUploadComponent
(uploadedFileRecordsChanged()) to update its fileDataList field that it supplies as an input value
to the FileDataTableComponent.

* `FileUploadComponent` - holds the form used to upload the file and collect metadata on it.
Upon component load and metadata submission a call is made to get all file records and
an event (fileRecordsChanged) is fired when the records return from the backend to
notify its parent (the HomeComponent) about the data.

* `FileUploadDataTableComponent` - a presentational/dumb component that displays the uploaded
file data in a table. It contains a fileDataList input property that provides data for
the table from its parent component (HomeComponent).

* `AboutComponent` - contains the About page content which introduces the application to the user
and displays the application's requirements.

The front-end application uses the following technologies:
- Angular 2 - A comprehensive front-end JavaScript framework that includes routing,
dependency injection (DI) and Http services.
- TypeScript - a type-safe extension of JavaScript that Angular 2 uses for DI and other functions.
- Rxjs - a Reactive Extention JavaScript library used by the Angular 2 Http service.
- Tslint - for linting the TypeScript
- Jasimine - to write unit and end-to-end tests
- Karma and Protractor - to run unit and end-to-end tests
- Istanbul - for unit test code coverage reportss
- SASS - a CSS preprocessor that uses variables, functions and mixins
- Bootstrap - a CSS library used to aid form layout and function in this app
- npm - to install the application dependenceis and run scripts
- Webpack - to process the code, manage dependencies and bundle the application HTML, JavaScript and CSS.


# Application Development Details

* [Getting Started](#getting-started)
    * [Dependencies](#dependencies)
    * [Testing](#testing)
    * [Linting](#linting)
    * [Production](#production)
* [License](#license)
* [Acknowlegements](#acknowlegements)

# Getting Started

## Dependencies

What you need to run this app:
* `node` (`version 5.x.x+`) and `npm` (`version 3.x.x+`)

The `npm start` script starts a local server using `webpack-dev-server`
which will build (in-memory), and reload the application.
The application should be then be running at [http://localhost:8000](http://localhost:8000).

To run the Webpack server in watch mode, run the following script instead of `npm start`:
```bash
npm run watch
```
An alternative way to run the application is to use Hot Module Replacement (HMR):
  ```bash
npm run start:hmr
  ```

This allows modification of components on the fly without having to reload the entire page.

## Testing

#### 1. Unit Tests

* single run: `npm test`
* live mode (TDD style): `npm run test-watch`

  After the tests run, code coverage reports can be found in the `coverage/html/index.html` file.


#### 2. End-to-End Tests (aka. e2e, integration)

* single run:
  * in a tab, *if not already running!*: `npm start`
  * in a new tab: `npm run webdriver-start`
  * in another new tab: `npm run e2e`

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Automated unit tests are written in Jasmine and run using the Karma test runner.

* interactive mode:
  * instead of the last command above, you can run: `npm run e2e-live`

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; End-to-end tests are written in Jasmine and run using the Protractor tool
## Linting

  Linting is done using the [tslint](https://github.com/palantir/tslint) tool with [codelyzer](https://github.com/mgechev/codelyzer) rules added to
  check for best practices defined in the [Angular 2 Style Guide](https://angular.io/styleguide).

  Tslint runs before all unit test runs (`npm test`) with linting output printed to the console. To manually run tslint, enter the following at the command line:
  ```
npm run lint
  ```

## Production

To build the application, run:

  ```
npm run build
  ```

The deployable application will be found in the `/dist` folder.

## License

[MIT](/LICENSE)

## Acknowlegements

This project used the [angular2-webpack](https://github.com/preboot/angular2-webpack) starter.
