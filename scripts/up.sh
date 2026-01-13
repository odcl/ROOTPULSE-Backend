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

# Build the base image first to share layers and fix DNS/APT issues once
echo -e "${BLUE}📦 Building RootPulse Base Image...${NC}"
docker build --network=host -t rootpulse-base -f Dockerfile.base .

# Clean up old containers to avoid port conflicts
echo -e "${BLUE}🧹 Cleaning up old containers...${NC}"
docker-compose -f deployment/docker-compose.yml down

# Run docker-compose from the deployment directory
echo -e "${BLUE}🚀 Bringing up the stack...${NC}"
docker-compose -f deployment/docker-compose.yml up -d --build

echo -e "${GREEN}✅ Stack is coming up! Use ./scripts/logs.sh to monitor progress.${NC}"
