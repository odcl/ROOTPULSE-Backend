#!/bin/bash
# Colors
CYAN='\033[0;36m'
NC='\033[0m'

echo -e "${CYAN}📊 RootPulse System Status${NC}"
echo "--------------------------"

docker-compose -f deployment/docker-compose.yml ps

echo "--------------------------"
echo "Public Gateway (Kong): http://localhost:8000"
echo "--------------------------"
echo "Interactive API Testing (Scalar):"
echo "IAM:           http://localhost:8000/iam/scalar"
echo "Catalog:       http://localhost:8000/catalog/scalar"
echo "Finance:       http://localhost:8000/finance/scalar"
echo "Membership:    http://localhost:8000/membership/scalar"
echo "Chat:          http://localhost:8000/chat/scalar"
echo "Workflow:      http://localhost:8000/workflow/scalar"
echo "Notifications: http://localhost:8000/notifications/scalar"
echo "Analytics:     http://localhost:8000/analytics/scalar"
echo "--------------------------"
echo "Other Tools:"
echo "Keycloak:     http://localhost:8080"
echo "Kong Admin:   http://localhost:8001"
echo "Meili Search: http://localhost:7700"
