# ExampleTestingApplication

This project is designed to provide an introduction to unit testing to developers new to testing.
Features and content have been chosen in order to provide basic but solid examples of
components/services/classses/guards/resolvers/pipes/etc to test.

The application uses the excellent [Star Wars API](https://swapi.co/) to fetch a list of Star Wars
characters and display them to the user. Each character card also contains a list of all movies they
featured in, with a link to a page with more detail on eaxch movie.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically
reload if you change any of the source files.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io). By default code
coverage reports will be generated in /coverage as well as outputting an overview in the CLI.

Test coverage is globally set to 90% minumum on all branches, functions, statements, and lines.
Tests will fail if these minimum thresholds are not met. These settings can be adjusted in the
`karma.conf.js` file under the `coverageIstanbulReporter` section. You can find more coverage
options [here](https://www.npmjs.com/package/karma-coverage-istanbul-reporter).

The test coverage report is updated every time the tests are run - you can find the full detailed
report by opening `/coverage/example-testing-application/index.html` in your browser.

A typical development workflow would be to run `ng serve` in one terminal pane/window and `ng test`
in another. Incremental recompiles are very quick allowing the developer to quickly see test suite
status as well as the development build of the application while making changes.

## TODO(jriall):
- Add testing resources links to README.
- Add comments to all tests.
- Add pre-commit hook.
