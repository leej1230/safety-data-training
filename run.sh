if [ $( docker ps -a | grep database-training-web | wc -l ) -gt 0 ]; then
    docker-compose up
else
    COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 docker-compose -p database-training-web build
    docker-compose up
fi

# COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 docker-compose build
# docker-compose up