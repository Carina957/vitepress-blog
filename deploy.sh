#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
pnpm build

# 进入生成的文件夹
cd docs/.vitepress/dist

# 如果是发布到自定义域名
# echo 'www.customDomain.com' > CNAME

git init
git branch -m main
git add -A
git commit -m 'deploy: Deploy to GitHub Pages'

# git push -f git@github.com:Carina957/Carina957.github.io.git main
git push -f git@github.com:Carina957/blog.git gh-pages

# github pages
# git push -f git@github.com:Carina957/Carina957.github.io.git main:gh-pages

# 如果发布到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages

cd -
