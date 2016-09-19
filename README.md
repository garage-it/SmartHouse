# SmartHouse

Installation:
* install mongodb & pm2
* install all required dependencies
* configure enviroment (If default configuration is not suitable)
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

## Configure enviroment :
Via environment variables, by creating
.evn file – otherwise default settings will apply

### Mongo DB configuration:
    * SH_MONGO_DB = 'mongodb://localhost/db'    

### PATH to other libraries distribution:
    * SH_PATH_FRONTENT_DIST = './node_modules/smart-house-frontend/dist'
    * SH_PATH_BACKEND_CMD = './node_modules/smart-house-backend'
    * SH_PATH_BROKER_CMD = './node_modules/smart-house-broker'

### WEB Configuration:
    * SH_WEB_PORT='80'

### MQTT Configuration:
    * SH_MQTT_PORT='1883'
    * SH_MQTT_HOST_NAME='localhost'
    * SH_MQTT_USER_NAME='USERNAME'
    * SH_MQTT_PASSWORD='PASSWORD'
