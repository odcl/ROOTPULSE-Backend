#!/bin/bash
# Simple log aggregator
# Usage: ./scripts/logs.sh [service_name]

if [ -z "$1" ]; then
  echo "Aggregating logs from ALL services..."
  docker-compose -f deployment/docker-compose.yml logs -f --tail 100
else
  echo "Streaming logs for service: $1..."
  docker-compose -f deployment/docker-compose.yml logs -f --tail 100 "$1"
fi
