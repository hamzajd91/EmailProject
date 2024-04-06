#!/bin/bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
nvm use default
mkdir -p /opt/sandbox/react-app

# # Download latest .env file
# INSTANCE_DATA=$(curl -s http://169.254.169.254/latest/dynamic/instance-identity/document)
# INSTANCE_ID=$(echo "$INSTANCE_DATA" | python -c "import sys, json; print(json.load(sys.stdin)['instanceId'])")
# REGION=$(echo "$INSTANCE_DATA" | python -c "import sys, json; print(json.load(sys.stdin)['region'])")
# # Get instance tags
# TAGS=$(aws ec2 describe-tags --region "$REGION" --filters "Name=resource-id,Values=$INSTANCE_ID")

# TAGS_DATA=$(python - <<EOF
# import sys, json
# jsonData = json.loads("""$TAGS""")
# tags = jsonData['Tags']
# d = {}
# for tag in tags:
#   d[tag['Key']] = tag['Value']
# print json.dumps(d)
# EOF
# )

# # Create ENV and NODE_ENV environmental variables from tags
# ENV=$(echo "$TAGS_DATA" | python -c "import sys, json; print(json.load(sys.stdin)['NODE_ENV'].lower())")
# export ENV=$ENV
# export NODE_ENV=$ENV

# sudo aws s3 cp s3://s3private.hindsyght.com/.env.$ENV /opt/sandbox/.env --region $REGION

# cd /opt/sandbox/app
# pm2 startOrRestart /opt/sandbox/ecosystem.config.js --only App