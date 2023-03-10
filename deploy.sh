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
git commit -m 'deploy'

# 如果你想要部署到 https://<USERNAME>.github.io
# git push -f git@github.com:Carina957/Carina957.github.io.git main
git push -f https://github.com/Carina957/Carina957.github.io.git main

# other branch
# git push -f git@github.com:Carina957/Carina957.github.io.git main:gh-pages

cd -
