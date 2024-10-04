all:
	docker-compose up --build -d

down:
	docker-compose down --rmi all

fclean: down
	docker system prune -af

dev:
	docker-compose -f docker-compose-dev.yml up --build -d

dev_down:
	docker-compose -f docker-compose-dev.yml down --rmi all


re: fclean all
