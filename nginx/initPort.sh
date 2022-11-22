#!/bin/sh

port=${PORT:-80}

sed -i.bak -e 's/$PORT/'"${port}"'/g' /etc/nginx/conf.d/default.conf