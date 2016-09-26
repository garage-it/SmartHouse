# SmartHouse

## Installation:
* Install nodejs v5.x.x, npm, mongodb & pm2
* Install all required dependencies
* configure enviroment (If default configuration is not suitable)
* run mongodb
* run the script

Install pm2 globally
```sh
$ npm install pm2 -g
```

Install package with minimal required project dependencies:
```sh
# Download dependencies and build frontend part
$ git clone https://github.com/garage-it/SmartHouse.git
$ cd SmartHouse
$ npm install
```

To start mongodb as a service:
```sh
$ sudo service mongodb start
```

## How to use:
- To start backend:
```sh
$ npm start
```

Start options:
    --mock -will start broker with mock data
    --port <n> -will start backend on specified port (8080 is default)
    --node -will start jobs via node, but not pm2
    --log -start process in node mode and out broker logs

Example (start backend with mock data and console output):
```sh
$ npm start -- --mock --log
```

- To get help (list of all commands & options) :
```sh
$ npm run index
```

- To stop backend:
```sh
$ npm stop
```

- To get status:
```sh
$ npm run status
```

## How to configure environment :
To override default configuration (listed below):
- set custom environment variables
- create .evn file based on .env.example

### Mongo DB configuration:
    * MONGO = 'mongodb://localhost/db'    

### PATH to other libraries distribution:
    * SH_PATH_FRONTENT_DIST = './node_modules/smart-house-frontend/dist'
    * PATH_BACKEND_CMD = './node_modules/smart-house-backend'
    * PATH_BROKER_CMD = './node_modules/smart-house-broker'

### WEB Configuration:
    * PORT='80'

### MQTT Configuration:
    * MQTT_PORT='1883'
    * MQTT_HOST_NAME='localhost'
    * MQTT_USER_NAME='USERNAME'
    * MQTT_PASSWORD='PASSWORD'
