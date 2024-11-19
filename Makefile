all:
	docker-compose up -d

server_run:
	docker build -t "ftp_server" .
	docker run -p 1000:3000 ftp_server

