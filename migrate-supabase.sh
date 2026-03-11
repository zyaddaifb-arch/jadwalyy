#!/bin/bash
# =================================================================
# Supabase Region Migration Automator
# =================================================================
# This script automates moving your Jadwaly database from its current
# region (likely US-East) to Frankfurt (eu-central-1) for MENA latency.
#
# PREREQUISITES:
# 1. Install Supabase CLI: npm i -g supabase
# 2. Login to Supabase CLI: supabase login
# 3. Create a NEW empty project in Supabase dashboard, select "Frankfurt" region.
# =================================================================

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}=== Jadwaly Supabase Performance Migration ===${NC}"
echo "We are going to dump your old DB and push it to the new one."
echo ""

# 1. Ask for Source DB URL
read -p "Enter your OLD (current) Supabase DB URL (postgres://postgres.[old-ref]...): " OLD_DB_URL
if [ -z "$OLD_DB_URL" ]; then
    echo -e "${RED}Error: Old DB URL is required.${NC}"
    exit 1
fi

# 2. Ask for Target DB URL
read -p "Enter your NEW (Frankfurt) Supabase DB URL (postgres://postgres.[new-ref]...): " NEW_DB_URL
if [ -z "$NEW_DB_URL" ]; then
    echo -e "${RED}Error: New DB URL is required.${NC}"
    exit 1
fi

echo -e "\n${GREEN}[1/3] Dumping Schema and Data from Old Project...${NC}"
supabase db dump --db-url "$OLD_DB_URL" -f schema_and_data_dump.sql

if [ $? -ne 0 ]; then
    echo -e "${RED}Error: Failed to dump database. Check your credentials.${NC}"
    exit 1
fi

echo -e "\n${GREEN}[2/3] Restoring Schema and Data to New Project (Frankfurt)...${NC}"
# Use psql to restore the dumped file directly to the new database
psql "$NEW_DB_URL" -f schema_and_data_dump.sql

if [ $? -ne 0 ]; then
    echo -e "${RED}Error: Failed to restore database. Ensure psql is installed.${NC}"
    exit 1
fi

echo -e "\n${GREEN}[3/3] Migration completed!${NC}"
echo "================================================================="
echo "ACTION REQUIRED:"
echo "1. Go to your local .env.local file"
echo "2. Replace NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY with the NEW project credentials."
echo "3. Update SUPABASE_SERVICE_ROLE_KEY if applicable."
echo "4. IMPORTANT: Recreate your Storage Buckets ('avatars') manually in the new project dashboard and enable RLS policies for them."
echo "================================================================="
