#!/bin/bash

# Configuration
PROJECT_ROOT=$(pwd)
BACKEND_DIR="$PROJECT_ROOT/backend"
FRONTEND_DIR="$PROJECT_ROOT/frontend"

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Results array
results=()

# Helper to kill port
kill_port() {
    local port=$1
    local pid=$(lsof -t -i :$port)
    if [ -n "$pid" ]; then
        echo -e "${YELLOW}Cleaning up port $port (PID $pid)...${NC}"
        kill -9 $pid 2>/dev/null
    fi
}

run_task() {
    local name=$1
    local dir=$2
    local cmd=$3
    
    echo -e "${YELLOW}Running $name...${NC}"
    cd "$dir" || exit 1
    
    # Run command and capture exit code
    if eval "$cmd"; then
        echo -e "${GREEN}✓ $name passed${NC}"
        results+=("${GREEN}PASS${NC} | $name")
    else
        echo -e "${RED}✗ $name failed${NC}"
        results+=("${RED}FAIL${NC} | $name")
    fi
    echo ""
}

echo "=========================================="
echo "      VACATION PROJECT QA RUNNER         "
echo "=========================================="
echo ""

# Pre-cleanup
kill_port 3001
kill_port 5173

# 0. Initialize Database
run_task "Database Initialization" "$BACKEND_DIR" "npx ts-node src/2-utils/init-db.ts"

# 1. Backend Lint/Typecheck
run_task "Backend Lint (Typecheck)" "$BACKEND_DIR" "npm run lint"

# 2. Backend Tests
run_task "Backend Tests" "$BACKEND_DIR" "npm test"

# 3. Frontend Lint
run_task "Frontend Lint" "$FRONTEND_DIR" "npm run lint"

# 4. Frontend Typecheck
run_task "Frontend Typecheck" "$FRONTEND_DIR" "npm run typecheck"

# 5. Frontend Unit Tests
run_task "Frontend Unit Tests" "$FRONTEND_DIR" "npm test"

# 6. E2E Tests (Starting servers in background)
echo -e "${YELLOW}Preparing E2E Tests (Starting servers)...${NC}"

# Start Backend with DISABLE_LIMITER=true to avoid 429 in tests
cd "$BACKEND_DIR" || exit 1
# Re-init DB right before E2E to ensure clean state after backend tests
npx ts-node src/2-utils/init-db.ts
export DISABLE_LIMITER=true
npm run dev > /tmp/backend.log 2>&1 &
BACKEND_PID=$!

# Start Frontend
cd "$FRONTEND_DIR" || exit 1
npm run dev > /tmp/frontend.log 2>&1 &
FRONTEND_PID=$!

# Helper to wait for port
wait_for_port() {
    local port=$1
    local name=$2
    local timeout=30
    local count=0
    echo -n "Waiting for $name on port $port..."
    while ! lsof -i :$port > /dev/null; do
        sleep 1
        count=$((count + 1))
        if [ $count -ge $timeout ]; then
            echo -e "${RED} Timeout waiting for $name${NC}"
            return 1
        fi
        echo -n "."
    done
    echo -e "${GREEN} Ready!${NC}"
}

# Wait for servers to be ready
wait_for_port 3001 "Backend" || (kill $BACKEND_PID $FRONTEND_PID 2>/dev/null && exit 1)
wait_for_port 5173 "Frontend" || (kill $BACKEND_PID $FRONTEND_PID 2>/dev/null && exit 1)
echo "Servers are ready. Waiting 5 seconds for warm-up..."
sleep 5

run_task "Cypress E2E Tests" "$FRONTEND_DIR" "npx cypress run"

# Final Cleanup
echo "Cleaning up processes..."
kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
kill_port 3001
kill_port 5173

echo "=========================================="
echo "           QA SUMMARY                    "
echo "=========================================="
for result in "${results[@]}"; do
    echo -e "$result"
done
echo "=========================================="

# Exit with error if any task failed
for result in "${results[@]}"; do
    if [[ $result == *"FAIL"* ]]; then
        exit 1
    fi
done
exit 0
