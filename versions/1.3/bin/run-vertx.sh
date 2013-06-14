#!/usr/bin/env sh

export VERTX_HOME=$(dirname $0)/../vert.x-1.3.1.final

echo "PWD: $PWD"
echo "VERTX_HOME: $VERTX_HOME"

export TORQUEBOX_HOST="bam.keynote.projectodd.org"

$VERTX_HOME/bin/vertx run  ./server.js  -cluster -cluster-port 9123 -cluster-host ${env.OPENSHIFT_VERTX_IP} -advertise-port ${env.OPENSHIFT_VERTX_VERTX_PROXY_PORT} -advertise-host ${env.OPENSHIFT_VERTX_PROXY_IP}
