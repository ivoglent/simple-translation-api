#!/usr/bin/env bash

echo 'Creating application user and db'

mongo ${APP_DB_NAME} \
        --host localhost \
        --port 27017 \
        -u ${MONGO_INITDB_ROOT_USERNAME} \
        -p ${MONGO_INITDB_ROOT_PASSWORD} \
        --authenticationDatabase admin \
        --eval "db.createUser({user: '${APP_DB_USER}', pwd: '${APP_DB_PASS}', roles:[{role:'dbOwner', db: '${APP_DB_NAME}'}]});"