docker run --name nginx -p 8050:80 -v /usr/local/nginx/nginx.conf:/etc/nginx/nginx.conf -v /usr/local/nginx/www/:/usr/share/nginx/html/ -v /usr/local/nginx/logs/:/var/log/nginx/ -v /usr/local/nginx/conf/:/etc/nginx/conf.d --privileged=true -d nginx
docker run --name nginx -p 80:80 -v /usr/local/nginx/nginx.conf:/etc/nginx/nginx.conf -v /usr/local/nginx/www/:/usr/share/nginx/html/ -v /usr/local/nginx/logs/:/var/log/nginx/ -v /usr/local/nginx/conf/:/etc/nginx/conf.d --privileged=true -d nginx
docker run -d -p 80:80  --name webapp -v /usr/local/nginx/www:/usr/share/nginx/html -v /usr/local/nginx/conf/nginx.conf:/etc/nginx/nginx.conf -v/usr/local/nginx/logs:/var/log/nginx nginx