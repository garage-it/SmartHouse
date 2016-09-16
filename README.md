# SmartHouse

Installation:
* install mongodb & pm2
* install all required dependencies
* run the script

Install pm2 globally
```sh
# Will download dependencies and will build frontend part
$ npm install pm2 -g
```

Install minimal required project dependencies:
```sh
# Download dependencies and build frontend part
$ npm install --production
```

To start backend:
```sh
$ npm start
```

To start backend in mock mode:
```sh
$ npm run start-mock
```

To stop backend:
```sh
$ npm stop
```

To get status:
```sh
$ npm run status
```
