#!/bin/sh
envsubst "\${BACKEND_URL}" < /etc/nginx/nginx.conf > /tmp/nginx.conf && mv /tmp/nginx.conf /etc/nginx/nginx.conf

exec "$@"