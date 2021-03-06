#!/bin/bash
BASE_DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
SHARED_FOLDER="$BASE_DIR/report"

unamestr=`uname`

USER_ID=`id -u`
DOCKER_TEST_IMAGE="headless/testing:1"

START=$SECONDS

# Read only volume - source code
SOURCES_VOLUME=" -v $BASE_DIR:/src "

# node_modules volume
NODE_MODULES_VOLUME=" -v /src/node_modules "

# npm repository volume
NPM_REPO_VOLUME=" -v $HOME/.npm_docker:/npm "

REPORT_OUTPUT="$SHARED_FOLDER"
mkdir -p "$REPORT_OUTPUT"
REPORT_VOLUME=" -v $REPORT_OUTPUT:/src/report"

# Out folder, where the test results will be copied
OUT_VOLUME=" -v $SHARED_FOLDER:/out "
echo "USER_ID=$USER_ID"
echo "SERVER_HOSTNAME=$SERVER_HOSTNAME"

# main host IP
if [ -z "$SERVER_HOSTNAME" ]; then
  SERVER_HOSTNAME="$SERVER_HOSTNAME"
fi
# default server IP to localhost
if [ -z "$DISPLAY_SIZE" ]; then
  DISPLAY_SIZE="1280x800x16"
fi

ENV=" -e SERVER_HOSTNAME=$SERVER_HOSTNAME -e GRUNT_OPTIONS=$GRUNT_OPTIONS -e DISPLAY_SIZE=$DISPLAY_SIZE"
echo ENV=$ENV

# default result code
RESULT=0

MODE="${1}"



if [ "$RESULT" == 0 ]; then
	echo "Launching tests..."
	if [[ "$unamestr" == 'Darwin' ]]; then
	    if [ -z "${MODE}" ]; then
	        echo "---docker should run from UAT---"
	        docker run  --privileged --link webserver:webserver --rm  -t $SOURCES_VOLUME $ENV $NODE_MODULES_VOLUME $OUT_VOLUME $NPM_REPO_VOLUME $REPORT_VOLUME $DOCKER_TEST_IMAGE
	    else
	        echo "---docker should run from local ---"
	        docker run  --privileged --rm  -t $SOURCES_VOLUME $ENV $NODE_MODULES_VOLUME $OUT_VOLUME $NPM_REPO_VOLUME $REPORT_VOLUME $DOCKER_TEST_IMAGE

	    fi
	else
	    echo "docker run  --privileged --rm  -t $SOURCES_VOLUME $ENV $NODE_MODULES_VOLUME $OUT_VOLUME $NPM_REPO_VOLUME $REPORT_VOLUME $DOCKER_TEST_IMAGE $USER_ID"
	    docker run  --privileged --link webserver:webserver --rm  -t $SOURCES_VOLUME $ENV $NODE_MODULES_VOLUME $OUT_VOLUME $NPM_REPO_VOLUME $REPORT_VOLUME $DOCKER_TEST_IMAGE $USER_ID
#	    docker run  --privileged --link webserver:webserver --rm  -t $SOURCES_VOLUME $ENV $NODE_MODULES_VOLUME $OUT_VOLUME $NPM_REPO_VOLUME $REPORT_VOLUME $DOCKER_TEST_IMAGE $USER_ID
    fi
	if [ "$?" -ne 0 ]; then
    RESULT=1
	fi
else
	echo "Failed to launch logu container, skipping tests..."
fi


#docker rm -fv "$TEST_CONTAINER_NAME" &> /dev/null
echo "Done."

echo "Finished in $((SECONDS-START)) sec."
exit "$RESULT"

