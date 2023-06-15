# SSH config

使用 SSH 协议可以连接远程服务器和服务并向它们验证。 利用 SSH 密钥可以连接到 GitHub，而无需在每次访问时都提供用户名和 personal access token。还可以使用 SSH 密钥对提交进行签名。

## [生成新的 SSH 密钥](https://docs.github.com/zh/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent#generating-a-new-ssh-key)

```sh
$ ssh-keygen -t ed25519 -C "your_email@example.com"
```

:::tip Tips: 如果你使用的是不支持 Ed25519 算法的旧系统，请使用以下命令：

```sh
$ ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

:::

## 将 SSH 密钥添加到 ssh-agent

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

## SSH 配置方式

- 命令行选项
- 用户配置文件 (~/.ssh/config)
- 系统配置文件 (/etc/ssh/ssh_config)

配置文件可分为多个配置区段，每个配置区段使用 Host 来区分。我们可以在命令行中输入不同的 host 来加载不同的配置段。

对每一个配置项来说，首次获取的参数值将被采用，因此通用的设置应该放到文件的后面，特定 host 相关的配置项应放到文件的前面。

## 常用配置项

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

## Demo

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
