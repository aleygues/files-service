#!/bin/sh
docker-compose -f docker-compose.main.yml down && \
    docker-compose -f docker-compose.main.yml pull && \
    docker-compose -f docker-compose.main.yml up -d;