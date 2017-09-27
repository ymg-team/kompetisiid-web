FROM ubuntu:16.04
MAINTAINER yussandeveloper@gmail.com

RUN export DEBIAN_FRONTEND=noninteractive && set -x \
    && apt-get update -y \
    && apt-get install -y supervisor nodejs npm \
    && ln -s /usr/bin/nodejs /usr/bin/node \
    && apt-get autoremove -y -f \
    && apt-get clean -y 

RUN mkdir -p /usr/src/apps 

COPY conf/etc /etc 
COPY ./ /usr/src/apps/web 

RUN service supervisor start
CMD ["/etc/supervisor/supervisor.sh"]

EXPOSE 1470


