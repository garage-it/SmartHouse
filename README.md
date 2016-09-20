# SmartHouse

Installation:
* install mongodb & pm2
* install all required dependencies
* configure enviroment (If default configuration is not suitable)
* run mongodb
* run the script

Install pm2 globally
```sh
$ npm install pm2 -g
```

Install minimal required project dependencies:
```sh
# Download dependencies and build frontend part
$ npm install --production
```

To start mongodb:
```sh
$ sudo service mongodb start
```

To start backend:
```sh
$ npm start
```

Start options:
    --mock -will start broker with mock data
    --port <n> -will start backend on specified port (8080 is default)
    --node -will start jobs via node, but not pm2

Example (start backend with mock data):
```sh
$ npm start -- --mock
```

To get list of all options start backend via node exec:
```sh
$ npm run index
```

To stop backend:
```sh
$ npm stop
```

To get status:
```sh
$ npm run status
```

## Configure enviroment :
Via environment variables, by creating
.evn file – otherwise default settings will apply

### Mongo DB configuration:
    * MONGO_DB = 'mongodb://localhost/db'    

### PATH to other libraries distribution:
    * SH_PATH_FRONTENT_DIST = './node_modules/smart-house-frontend/dist'
    * PATH_BACKEND_CMD = './node_modules/smart-house-backend'
    * PATH_BROKER_CMD = './node_modules/smart-house-broker'

### WEB Configuration:
    * SH_WEB_PORT='80'

### MQTT Configuration:
    * MQTT_PORT='1883'
    * MQTT_HOST_NAME='localhost'
    * MQTT_USER_NAME='USERNAME'
    * MQTT_PASSWORD='PASSWORD'
