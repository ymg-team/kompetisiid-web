cd "/home/webdev/Web/kompetisiid-web"

echo "update code from github branch master..."
git pull origin master

echo "update deps"
yarn install

echo "rebuild app..."
yarn build:prod

echo "restart pm2..."
pm2 restart ki

echo "deploy finished and SITE IS LIVE..."
