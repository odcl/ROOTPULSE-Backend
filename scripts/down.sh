#!/bin/bash
# Colors
RED='\033[0;31m'
NC='\033[0m'

echo -e "${RED}🛑 Stopping RootPulse Stack...${NC}"

docker-compose -f deployment/docker-compose.yml down

echo -e "${RED}✅ All services stopped.${NC}"
