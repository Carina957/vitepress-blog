---
outline: deep
---

# Git

Git is a free and open source distributed version control system designed to handle everything from small to very large projects with speed and efficiency.

Git is easy to learn and has a tiny footprint with lightning fast performance. It outclasses SCM tools like Subversion, CVS, Perforce, and ClearCase with features like cheap local branching, convenient staging areas, and multiple workflows.

:::tip Translate
Git 是一个免费的开源分布式版本控制系统，旨在快速高效地处理从小型项目到大型项目的所有内容。 Git 易于学习，占用空间小，性能快如闪电。 它超越了 Subversion、CVS、Perforce 和 ClearCase 等 SCM 工具，具有廉价的本地分支、方便的临时区域和多个工作流等特性。
:::

## 初始化一个 `git` 仓库

```sh
git init
git branch -m main
echo '# Hello Git!' > README.md
git add .
git commit -m 'First Commit'
git remote add origin git@github.com:xxx
git push -m origin main
```

## 配置账号信息

```sh
# 查看全局账号信息
git config --global --list

# 查看本地账号信息
git config --local -l

# 查看系统账号信息
git config --system -l

# 配置账号
git config --global user.name 'xxx'

# 配置邮箱
git config --global user.email 'xxx@foxmail.com'

# 重置 git 配置
git config --global --unset https.proxy
```

## 管理仓库

```sh
# 查看远程仓库
git remote -v

# 删除远程仓库
git remote rm origin

# 增加远程仓库
git remote add origin git@github.com:xxx
```

## 分支

```sh
# 修改全局默认分支
git config --global init.defaultBranch main

# 重置全局默认分支配置
git config --global --unset init.defaultBranch

# 修改当前分支
git branch -M main

# 列出所有分支
git branch -a

# 列出所有本地分支
git branch

# 列出所有远程分支
git branch -r

# 新建一个分支，但是依然停留在当前分支
git branch dev

# 以远程分支为基础新建一个分支，并切换到该分支
git checkout -b feature/todo_12 origin/main

# 新建一个分支，并与指定的远程分支建立追踪关系
git branch --track feature/todo_13 origin/main

# 建立分支的追踪关系(本地有分支，远程没有)
git push --set-upstream origin feature/todo_11

# 建立分支的追踪关系(本地没有有分支，远程有)
git checkout --track origin/branch_name

# 切换到指定分支，并更新工作区
git checkout develop

# 切换到上一个分支
git checkout -

# 合并指定分支到当前分支
git merge feature/todo_14

# 删除分支
git branch -d feature/todo_12

# 强制删除分支 表示 `--delete --force`
git branch -D feature/todo_12

# 删除远程分支
git push origin --delete feature/todo_12
git branch -dr origin/feature/todo_12

# 回滚项目版本
git reset --hard d12kansdk

# 强制推送
git push -f

# 推送到远程服务器并关联本地分支
git push -u origin master
```
