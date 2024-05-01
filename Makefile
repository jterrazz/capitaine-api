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

build:
	docker build . -t $(APPLICATION)

start:
	$(DOCKER_COMPOSE) run $(APPLICATION) npm run start

start-dev:
	$(DOCKER_COMPOSE) run $(DOCKER_VOLUMES) $(APPLICATION) npm run start-dev

start-infra:
	$(DOCKER_COMPOSE) up $(INFRASTRUCTURE)

test:
	$(DOCKER_COMPOSE) run $(DOCKER_VOLUMES) $(APPLICATION) npm run test

lint-type:
	$(DOCKER_COMPOSE) run $(DOCKER_VOLUMES) $(APPLICATION) npm run lint-type

lint-style:
	$(DOCKER_COMPOSE) run $(DOCKER_VOLUMES) $(APPLICATION) npm run lint-style

# Targets (database)
LOCAL_ENVIRONMENT := source ./scripts/environment.sh
PRISMA := $(LOCAL_ENVIRONMENT) && npx prisma

db-deploy:
	$(PRISMA) migrate deploy

db-migrate:
	read -r -p 'Migration name: ' migrationName && $(PRISMA) migrate dev --name "$migrationName"

db-explore:
	$(PRISMA) studio

.PHONY: build start start-dev start-infra test lint-type lint-style db-deploy db-migrate db-explore
