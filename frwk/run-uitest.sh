#!/bin/bash
BASE_DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
SUITE=""

thisScript="${0}"
scriptName=${thisScript##*/}

SERVER_HOSTNAME="${1}"
PORT="${2}"
MODE="${2}"
SUITE="--suite=${3}"



t_usage()
{
    echo
    echo "Usage: ${scriptName} [options] <SERVER_HOSTNAME> <MODE>"
	echo "Environment variables:"
	echo "   SERVER_HOSTNAME , if running with local docker, the server ip is 192.168.59.103"
#	echo "   SERVER_PORT , default is 3000"
	echo "   MODE: local or leave it empty if running from teamcity UAT"
	echo "   SUITE_NAME (NOT TESTED YET, without assignment, run test:e2e grunt task by default)"
    echo
    exit -1
} # t_usage


if [ -z "${SERVER_HOSTNAME}" ] ; then
#if [ -z "${SERVER_HOSTNAME}" ] || [ -z "${PORT}" ]; then
    t_usage
fi


SERVER_URL=${SERVER_HOSTNAME}

cd $BASE_DIR

SERVER_HOSTNAME="${SERVER_URL}" BROWSER=chrome DISPLAY_SIZE=1280x800x16 GRUNT_OPTIONS="$SUITE" ./run-in-docker.sh ${MODE}
