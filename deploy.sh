echo "update code from gitlab..."
git pull origin master

echo "rebuild app..."
yarn build:prod

echo "restart pm2..."
pm2 restart ki

echo "deploy finished and SITE IS LIVE..."