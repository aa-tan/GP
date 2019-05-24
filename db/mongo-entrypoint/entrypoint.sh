#!/usr/bin/env bash
echo "Creating mongo users..."
mongo admin --host localhost -u XX -p XX --eval "db.createUser({user: 'gp_user', pwd: 'gp_pass', roles: [{role: 'readWrite', db: 'gp'}]});" 
