#!/bin/sh

DEMO_PATH=${DEMO_PATH:-'/game_logs'}
DEMO_PATTERN=${DEMO_PATTERN:-'*demo.txt'}
DEMO_MINIMUM_MINUTES=${DEMO_MINIMUM_MINUTES:-1440}

DEMO_FILES=$(find $DEMO_PATH -mmin +$DEMO_MINIMUM_MINUTES  -name $DEMO_PATTERN)

for DEMO_FILE in $DEMO_FILES
do
        echo "Compressing demo file: ${DEMO_FILE}"
        gzip $DEMO_FILE
done