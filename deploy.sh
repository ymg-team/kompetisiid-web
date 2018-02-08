echo "update code from gitlab..."
git pull origin master

echo "rebuild app..."
rm -rf dist-client -rf dist-server && unzip dist-server.zip && unzip dist-client.zip

echo "restart pm2..."
pm2 restart ki

echo "deploy finished and SITE IS LIVE..."