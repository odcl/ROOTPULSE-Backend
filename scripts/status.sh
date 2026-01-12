#!/bin/bash
# Colors
CYAN='\033[0;36m'
NC='\033[0m'

echo -e "${CYAN}📊 RootPulse System Status${NC}"
echo "--------------------------"

docker-compose -f deployment/docker-compose.yml ps

echo "--------------------------"
echo "Public Ports:"
echo "IAM:        http://localhost:8001"
echo "Catalog:    http://localhost:8002"
echo "Finance:    http://localhost:8003"
echo "Membership: http://localhost:8004"
echo "Chat:       http://localhost:8005"
echo "Workflow:   http://localhost:8006"
echo "Notifications: http://localhost:8007"
echo "Keycloak:   http://localhost:8080"
echo "Kong Admin: http://localhost:8001"
echo "Meili:      http://localhost:7700"
