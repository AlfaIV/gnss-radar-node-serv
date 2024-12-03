export .env

all:
	docker-compose up -d

docker_run:
	docker build -t "ftp_server" .
	docker run -p 1000:3000 ftp_server

ftp_connect:
	ftp localhost

send_test_request:
	./testRequest.sh

server_run:
	node ./src/server.js