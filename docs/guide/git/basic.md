---
outline: deep
---

# Git

Git is a free and open source distributed version control system designed to handle everything from small to very large projects with speed and efficiency.

Git is easy to learn and has a tiny footprint with lightning fast performance. It outclasses SCM tools like Subversion, CVS, Perforce, and ClearCase with features like cheap local branching, convenient staging areas, and multiple workflows.

:::tip Translate
Git 是一个免费的开源分布式版本控制系统，旨在快速高效地处理从小型项目到大型项目的所有内容。 Git 易于学习，占用空间小，性能快如闪电。 它超越了 Subversion、CVS、Perforce 和 ClearCase 等 SCM 工具，具有廉价的本地分支、方便的临时区域和多个工作流等特性。
:::

## Init repo

```sh
git init
git branch -m main
echo '# Hello Git!' > README.md
git add .
git commit -m 'First Commit'
git remote add origin git@github.com:xxx
git push -m origin main
```

## Config info

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

# 查看当前代理(解决 ssl 链接重置)
env|grep -i proxy
```

## Remote repo

```sh
# 查看远程仓库
git remote -v

# 删除远程仓库
git remote rm origin

# 增加远程仓库
git remote add origin git@github.com:xxx
```

## Branch

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

# 查看本地分支与远程分支的映射关系
git branch -vv

# 新建一个分支，并与指定的远程分支建立追踪关系
git branch --track feature/todo_13 origin/main

# 新建一个分支，但是依然停留在当前分支
git branch dev

# 删除分支
git branch -d feature/todo_12

# 强制删除分支 表示 `--delete --force`
git branch -D feature/todo_12

# 拉取远程分支并创建本地分支(采用此种方法建立的本地分支会和远程分支建立映射关系)
git checkout -b feature/todo-14 origin/feature/todo-14

# 建立当前分支与远程分支的映射关系
git branch -u origin/main

# 撤销本地分支与远程分支的映射关系
git branch --unset-upstream

# 建立分支的追踪关系(本地有分支，远程没有)

git branch --set-upstream-to origin/todo_12

# 建立分支的追踪关系(本地没有分支，远程有)
git checkout --track origin/branch_name

# 建立分支的追踪关系(本地有分支，远程没有)
git push --set-upstream origin feature/todo_11
git push -u origin feature/todo_11

# 推送本地分支到远程
git push origin feature/todo_13:feature/todo_13

# 新建一个分支，并切换到该分支
git checkout -b Fixbug/TJS-123

# 以远程分支为基础新建一个分支，并切换到该分支
git checkout -b feature/todo_12 origin/main

# 切换到指定分支，并更新工作区
git checkout develop

# 切换到上一个分支
git checkout -

# 删除远程分支
git push origin --delete feature/todo_12
git push origin :feature/todo_12
git branch -dr origin/feature/todo_12

# 推送到远程服务器并关联本地分支
git push -u origin master

# 拉取

git pull
git pull origin develop

# 拉取不相关历史的分支

git pull origin [branch_name] --allow-unrelated-histories

# 拉取仓库最新状态

git fetch

# 合并指定分支到当前分支
git merge feature/todo_14
git merge origin/develop

# 回滚项目版本
git reset --hard d12kansdk

# 强制推送
git push -f
```

## Revert

```sh
# 修改最后一次提交
git commit --amend

# 回退版本
git reflog # 查看历史版本号，找到要恢复的版本号
git reset --hard [版本号] # 将本地代码回退到指定版本
git push -f # 将本地代码强制提交，覆盖远程git服务器代码
git push --force origin main
```

## Resolve conflict

```sh
$ git merge origin/[branch_name]
```

## Submodule

`git submodule` 功能可以让我们在一个仓库中添加另一个仓库作为当前仓库的子仓库。`.submodules` 只是某个仓库某一时刻的一个状态的引用，即某个 `commit` 的引用。

### Commands

- Check the status of the submodules

  ```sh
  $ git submodule status
  ```

- Add submodule

  ```sh
  $ git submodule add [submodule_url]
  ```

- Init & update submodules

  Add `--recursive` suffix to indicate nestde submodules.

  ::: code-group

  ```sh [full]
  $ git submodule init && git submodule update
  ```

  ```sh [abb]
  $ git submodule update --init
  ```

  ```sh [nested-sub abb]
  $ git submodule update --init --recursive
  ```

  ```sh [remote]
  $ git submodule update --remote --recursive
  ```

  :::

- Clone repo, init and update submodules(include nested submodules)

  ```sh
  $ git clone [repo_name] --recurse-submodules
  ```

- Pull repo, include nested submodules

  ```sh
  $ git pull --recurse-submodules
  ```

- Fetch submodules update

  ```sh
  $ git submodule update --remote [submodule_name]
  ```

- Unload submodule

  ::: code-group

  ```sh [deinit]
  $ git submodule deinit [submodule_name] --force
  ```

  ```sh [rm]
  $ git rm [submodule_name]
  ```

  :::

### Git aliases

The syntax for creating an alias is as follows:

```sh
$ git config --global alias.[new-alias] '[original-command]'
```

### Reference

- [Git Submodules](https://pengfeixc.com/blogs/developer-handbook/git-submodules)
- [Git Submodule Guide](https://phoenixnap.com/kb/git-submodule#ftoc-heading-17)

## .gitignore

在 `.gitignore` 文件中，可以使用以下通配符：

- \*：匹配任意数量的字符，包括斜杠（/）。
- ?：匹配任意单个字符，不包括斜杠（/）。
- \*\*：匹配任意数量的字符，包括斜杠（/）。可以用于匹配多级目录。

例如：

```sh
# 忽略所有 .log 文件
*.log

# 忽略所有以 .tmp 结尾的文件
*/*.tmp

# 忽略所有以 .txt 结尾的文件，但不包括 doc 目录下的 txt 文件
*.txt
!doc/*.txt

# 忽略所有 build 目录及其子目录下的文件
build/

# 忽略所有 .zip 和 .tar.gz 文件
*.zip
*.tar.gz

# 忽略所有 src 子目录 libs 目录下的 .js 文件
src/**/libs/*.js
```
