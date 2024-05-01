SHELL := /bin/bash
BASEDIR := $(shell dirname $(realpath $(lastword $(MAKEFILE_LIST))))

# Settings
PROJECT := life-captain
APPLICATION := $(PROJECT)-api
INFRASTRUCTURE := $(PROJECT)-database $(PROJECT)-database-migration

# Targets (application)
DOCKER_ENVIRONMENT := ENVIRONMENT=docker source ./scripts/environment.sh
DOCKER_COMPOSE := $(DOCKER_ENVIRONMENT) && docker compose -p $(PROJECT) -f $(BASEDIR)/scripts/docker/docker-compose.yml
DOCKER_VOLUMES := -v "$(BASEDIR)/src:/home/src" -v "$(BASEDIR)/tests:/home/tests" -v "$(BASEDIR)/prisma:/home/prisma"

start:
	$(DOCKER_COMPOSE) run $(APPLICATION) yarn start

start-dev:
	$(DOCKER_COMPOSE) run $(DOCKER_VOLUMES) $(APPLICATION) yarn start:dev

start-infra:
	$(DOCKER_COMPOSE) up $(INFRASTRUCTURE)

test:
	$(DOCKER_COMPOSE) run $(DOCKER_VOLUMES) $(APPLICATION) yarn test

lint-type:
	$(DOCKER_COMPOSE) run $(DOCKER_VOLUMES) $(APPLICATION) yarn lint:type

lint-style:
	$(DOCKER_COMPOSE) run $(DOCKER_VOLUMES) $(APPLICATION) yarn lint:style

# Targets (database)
LOCAL_ENVIRONMENT := source ./scripts/environment.sh
PRISMA := $(LOCAL_ENVIRONMENT) && npx prisma

db-deploy:
	$(PRISMA) migrate deploy

db-migrate:
	read -r -p 'Migration name: ' migrationName && $(PRISMA) migrate dev --name "$migrationName"

db-explore:
	$(PRISMA) studio

.PHONY: start start-dev start-infra test lint-type lint-style db-deploy db-migrate db-explore
