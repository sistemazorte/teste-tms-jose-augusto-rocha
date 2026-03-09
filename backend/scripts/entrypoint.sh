#!/bin/sh
set -e

cd /var/www/html

if [ ! -f .env ] && [ -f .env.example ]; then
  cp .env.example .env
fi

export DB_HOST="${DB_HOST:-db}"

composer install --no-interaction --prefer-dist

php artisan optimize:clear
php artisan migrate --force
php artisan db:seed --force

exec php artisan serve --host=0.0.0.0 --port=8000
