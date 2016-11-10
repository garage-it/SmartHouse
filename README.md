# SmartHouse
<span class="badge-npmversion"><a href="https://npmjs.org/package/smart-house" title="View this project on NPM"><img src="https://img.shields.io/npm/v/badges.svg" alt="NPM version" /></a></span>

## Installation:
* Install nodejs v5.x.x, npm, mongodb
* configure enviroment (If default configuration is not suitable)
* run mongodb
* run the script

Install package with minimal required project dependencies:
```sh
# Download dependencies and build frontend part
$ npm install -g smart-house
```

To start mongodb as a service:
```sh
$ sudo service mongodb start
```

## How to use:
- To start backend:
```sh
$ smart-house start
```

Start options:
-    --mock -will start broker with mock data
-    --port <n> -will start backend on specified port (8080 is default)
-    --node -will start jobs via node, but not pm2
-    --log -start process in node mode and out broker logs

Example (start backend with mock data and console output):
```sh
$ smart-house start -- --mock --log
```

- To get help (list of all commands & options) :
```sh
$ smart-house
```

- To stop backend:
```sh
$ smart-house stop
```

- To get status:
```sh
$ smart-house status
```

## How to configure environment :
To override default configuration (listed below):
- set custom environment variables
- change created .smart-house-rc file at your user directory

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
