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

# 查看当前代理(解决 ssl 链接重置)
env|grep -i proxy
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

# 新建一个分支，并切换到该分支
git checkout -b Fixbug/TJS-123

# 以远程分支为基础新建一个分支，并切换到该分支
git checkout -b feature/todo_12 origin/main

# 新建一个分支，并与指定的远程分支建立追踪关系
git branch --track feature/todo_13 origin/main

# 建立分支的追踪关系(本地有分支，远程没有)
git push --set-upstream origin feature/todo_11

# 推送本地分支到远程
git push origin feature/todo_13:feature/todo_13

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
git push origin :feature/todo_12
git branch -dr origin/feature/todo_12

# 回滚项目版本
git reset --hard d12kansdk

# 强制推送
git push -f

# 推送到远程服务器并关联本地分支
git push -u origin master
```

## revert

```sh
# 修改最后一次提交
git commit --amend

# 回退版本
git reflog # 查看历史版本号，找到要恢复的版本号
git reset --hard [版本号] # 将本地代码回退到指定版本
git push -f # 将本地代码强制提交，覆盖远程git服务器代码
git push --force origin main
```

## End_of_line

```sh
# 查看项目的行尾序列
git ls-files --eol [path]
```

## SSH config

### [生成新的 SSH 密钥](https://docs.github.com/zh/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent#generating-a-new-ssh-key)

```sh
$ ssh-keygen -t ed25519 -C "your_email@example.com"
```

:::tip Tips: 如果你使用的是不支持 Ed25519 算法的旧系统，请使用以下命令：

```sh
$ ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

:::

### 将 SSH 密钥添加到 ssh-agent

1. 确保 ssh-agent 正在运行。

   ::: details 或者你可以考虑自启动 `ssh-agent`

   在 Git for Windows 上自启动 ssh-agent

   可以在打开 bash 或 Git shell 时自动运行 ssh-agent。 复制以下行并将其粘贴到 Git shell 中的 ~/.profile 或 ~/.bashrc 文件中：

   ```sh
   env=~/.ssh/agent.env

   agent_load_env () { test -f "$env" && . "$env" >| /dev/null ; }

   agent_start () {
       (umask 077; ssh-agent >| "$env")
       . "$env" >| /dev/null ; }

   agent_load_env

   # agent_run_state: 0=agent running w/ key; 1=agent w/o key; 2=agent not running
   agent_run_state=$(ssh-add -l >| /dev/null 2>&1; echo $?)

   if [ ! "$SSH_AUTH_SOCK" ] || [ $agent_run_state = 2 ]; then
       agent_start
       ssh-add
   elif [ "$SSH_AUTH_SOCK" ] && [ $agent_run_state = 1 ]; then
       ssh-add
   fi

   unset env
   ```

   :::

   ```sh
   $ eval "$(ssh-agent -s)"
   ```

2. 将 SSH 私钥添加到 ssh-agent。

   ```sh
   $ ssh-add ~/.ssh/id_ed25519
   ```

### SSH 配置方式

- 命令行选项
- 用户配置文件 (~/.ssh/config)
- 系统配置文件 (/etc/ssh/ssh_config)

配置文件可分为多个配置区段，每个配置区段使用 Host 来区分。我们可以在命令行中输入不同的 host 来加载不同的配置段。

对每一个配置项来说，首次获取的参数值将被采用，因此通用的设置应该放到文件的后面，特定 host 相关的配置项应放到文件的前面。

### 常用配置项

- Host

配置项标识了一个配置区段。

**配置项参数值可以使用通配符**：\* 代表 0 ～ n 个非空白字符， ? 代表一个非空白字符，! 表示例外通配。

eg: `Host *`

- HostName

指定远程主机名，可以直接使用数字 IP 地址。如果主机名中包含 `%h` ，则实际使用时会被命令行中的主机名替换。

- IdentityFile

  指定密钥认证使用的私钥文件路径。默认为 `~/.ssh/id_dsa`, `~/.ssh/id_ecdsa`, `~/.ssh/id_ed25519` 或 `~/.ssh/id_rsa` 中的一个。

  文件名称可以使用以下转义符：

  1. '%d' 本地用户目录
  2. '%u' 本地用户名称
  3. '%l' 本地主机名
  4. '%h' 远程主机名
  5. '%r' 远程用户名

  可以指定多个密钥文件，在连接的过程中会依次尝试这些密钥文件。

- Port

指定远程主机端口号，默认为 22 。

- User

指定登录用户名。

- UserKnownHostsFile

指定一个或多个用户认证主机缓存文件，用来缓存通过认证的远程主机的密钥，多个文件用空格分隔。默认缓存文件为： `~/.ssh/known_hosts`, `~/.ssh/known_hosts2`。

### Demo

```txt
Host codeup.aliyun.com
  HostName codeup.aliyun.com
  Port 22
  PreferredAuthentications publickey
  IdentityFile ~/.ssh/codeup_user_ed25519

Host github.com
  HostName github.com
  User git
  Port 22
  PreferredAuthentications publickey
  IdentityFile ~/.ssh/chis_office

Host github_io_deploy
  HostName github.com
  User git
  Port 22
  PreferredAuthentications publickey
  IdentityFile ~/.ssh/github.io_deploy

```

## Submodule

`git submodule` 功能可以让我们在一个仓库中添加另一个仓库作为当前仓库的子仓库。`.submodules` 只是某个仓库某一时刻的一个状态的引用，即某个 `commit` 的引用。

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

- Fetch submodules's update

```sh
$ git submodule update --remote [submodule_name]
```

### Refenerce

- [Git Submodules](https://pengfeixc.com/blogs/developer-handbook/git-submodules)

## Config

### Using Aliases

The syntax for creating an alias is as follows:

```sh
$ git config --global alias.[new-alias] '[original-command]'
```

### Reference

- [Git Submodule Guide](https://phoenixnap.com/kb/git-submodule#ftoc-heading-17)
