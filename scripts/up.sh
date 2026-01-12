#!/bin/bash
# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🚀 Starting RootPulse Stack (Development Mode)...${NC}"

# Check for Docker
if ! [ -x "$(command -v docker-compose)" ]; then
  echo 'Error: docker-compose is not installed.' >&2
  exit 1
fi

# Run docker-compose from the deployment directory
docker-compose -f deployment/docker-compose.yml up -d --build

echo -e "${GREEN}✅ Stack is coming up! Use ./scripts/logs.sh to monitor progress.${NC}"
