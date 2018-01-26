#!/usr/bin/env bash 

exec supervisord -c /etc/supervisor/supervisor.conf --logfile /dev/null --pidfile /dev/null -u root
