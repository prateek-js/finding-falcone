# findfalcone-ui

This is a sample web app, written in normal Javascript/Jquery, AngularJS and ReactJS. It can be run on a Go Web Server or NodeJS Web Server on Port 4000.


## Pre-requisites 

For running the Go web Server, Go Lang 1.5 should installed to run the go server.

For running the Node JS web Server, NodeJS 0.10 should installed to run the go server.

To start the Go Lang based Server run the command `go run server.go`. The web app will be up on Port 4000

To start the NodeJS based Server run the command `node node-server.js`. The web app will be up on Port 4000. If you find any difficulty in getting this up install the `express` dependency, do run 

```
npm install express -g
```

## What is in the code?

1. `index.html` and `index.js` uses Javascript and JQuery to call the  `/token` and `/find` APIs . Access it with `http://localhost:4000`

2. `angular.html` and `angular.js` uses AngularJS to call the `/token` and `/find` APIs.  Access it with `http://localhost:4000/angular.html`

3. `react.html` and `react.js` uses ReactJS to showcase some HTML built using ReactJS. It calls `/planets` and `/vehicles` APIs.  Access it with `http://localhost:4000/react.html` 

In 1 & 2 above we assume that the Get Token button will be clicked to get back the token and then that token will be used to fill the Request JSON of /find API. This request json data should entered in the textarea and Find button should be clicked to call /find API.


### Note 

This is just a sample web application to test the APIs, and should not be considerd as a solution to the Find Falcone frontend problem in the GeekTrust coding challenge. 






