## About

Web app that will generate a Cloud Foundry manifest file to simplify the cf push command for your application.

## Usage

Fill out the form and click the generate button.  Copy and past the resulting manifest text into a file called
manifest.yml and save it in the root of your application.  Your cf push command will automatically
find the manifest file and use the values within it to deploy your application.

## Getting The Source

    git clone https://github.com/phopper-pivotal/cf-manifest-generator.git

## Building and Deploying

This project uses Maven to build and deploy the app, so you must have Maven installed and configured on
your machine.  You can follow the simple [instructions](http://maven.apache.org/download.cgi) out on the 
Maven site to install Maven.

Once you have Maven installed, run this command from the root of the project to build the code.

    mvn package

To run the application locally run

    mvn -P run

Then open your favorite browser and navigate to http://localhost:8080.

You can also deploy this application to Cloud Foundry deployment.  To deploy the application
to CF

    cf push

## Dependencies

For sever side dependencies see the pom.xml file in the root of the repository.

Client side dependencies can be found below.

* [Bootstrap 3.1.1](http://getbootstrap.com/)
* [JQuery 1.11](http://jquery.com/)
* [Typeahead.js 10.2](https://github.com/twitter/typeahead.js/)
* [typeahead.js-bootstrap3.less](https://github.com/hyspace/typeahead.js-bootstrap3.less)