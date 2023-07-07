---
outline: deep
---

# Node

## ni

[**ni**](https://github.com/antfu/ni) - use the right package manager.

```sh
$ npm i -g @antfu/ni
```

[npm](https://docs.npmjs.com/cli/v6/commands/npm) · [yarn](https://yarnpkg.com) · [pnpm](https://pnpm.js.org/en/) · [bun](https://bun.sh/)

### `ni` - install

```sh
ni

# npm install
# yarn install
# pnpm install
# bun install

nun @types/node

# npm uninstall @types/node
# yarn remove @types/node
# pnpm remove @types/node
```

::: details others

```sh
ni vite

# npm install vite
# yarn add vite
# pnpm add vite

ni @types/node -D

# npm i -D @types/node
# yarn add -D @types/node
# pnpm add -D @types/node

ni -g eslint

# npm install -g eslint
# yarn add global eslint
# pnpm add eslint -g

ni --frozen / nci

# npm ci
# yarn install --frozen-lockfile (Yarn 1)
# yarn install --immutable (Yarn Berry)
# pnpm install --frozen-lockfile
# bun install --no-save


nu

# (not available for bun)
# npm upgrade
# yarn upgrade (Yarn 1)
# yarn up (Yarn Berry)
# pnpm update

nu -i

# (not available for npm & bun)
# yarn upgrade-interactive (Yarn 1)
# yarn up -i (Yarn Berry)
# pnpm update -i
```

:::

### `nr` - run

```sh
nr dev --port=3000

# npm run dev --port=3000
# yarn run dev --port=3000
# pnpm run dev --port=3000
# bun run dev --port=3000

nr
# interactively select the script to run

nr -
# rerun the last command
```

### Config

```ini
; ~/.nirc
; fallback when no lock found
defaultAgent=npm # default "prompt"
; for global installs
globalAgent=npm
```

```bash
# ~/.bashrc
# custom configuration file path
export NI_CONFIG_FILE="$HOME/.config/ni/nirc"
```

<br>

## volta

::: code-group

```sh [curl]
$ curl https://get.volta.sh | bash
```

```sh [brew]
$ brew install volta
```

:::

然后，添加 `volta` 到环境变量：

```sh
source .bash_profile
```

之后，你就可以正常使用 `volta`

::: details 当你在终端运行 `volta` or `volta -h`:

```sh
$ volta
```

```erl
Volta 1.1.1
The JavaScript Launcher ⚡

    To install a tool in your toolchain, use `volta install`.
    To pin your project's runtime or package manager, use `volta pin`.

USAGE:
    volta [FLAGS] [SUBCOMMAND]

FLAGS:
        --verbose    Enables verbose diagnostics
        --quiet      Prevents unnecessary output
    -v, --version    Prints the current version of Volta
    -h, --help       Prints help information

SUBCOMMANDS:
    fetch          Fetches a tool to the local machine
    install        Installs a tool in your toolchain
    uninstall      Uninstalls a tool from your toolchain
    pin            Pins your project's runtime or package manager
    list           Displays the current toolchain
    completions    Generates Volta completions
    which          Locates the actual binary that will be called by Volta
    setup          Enables Volta for the current user / shell
    run            Run a command with custom Node, npm, pnpm, and/or Yarn versions
```

:::

::: details 当你在终端运行 `volta pin node@16`:

```sh
success: pinned node@16.19.1 (with npm@8.19.3) in package.json
```

此时，你的 `package.json` 文件里就会多出一行配置：

```json
"volta": {
  "node": "16.19.1"
}
```

:::

::: details 此外，你还可以运行 `volta ls` 查看 `volta` 已经安装的模块：

```sh
⚡️ Currently active tools:

    Node: v16.19.1 (current @ /Users/xuhao/Downloads/front-end/vitepress/vitepress-blog/
    package.json)
    Yarn: v4.0.0-rc.39 (default)
    Tool binaries available:
        nrm (default)
        pnpm, pnpx (default)
        rimraf (current @ /Users/xuhao/Downloads/front-end/vitepress/vitepress-blog/
    package.json)
        yrm (default)

See options for more detailed reports by running `volta list --help`.
```

:::

## nvm

```sh
# 查看远程服务器上所有的可用版本
nvm ls available

nvm current

nvm install 18.15.0

nvm use 18.15.0

nvm ls
```

## npm

![npm-list](./images/npm-list.png)

![npm-list-info](./images/npm-list-info.png)

```sh
# 查看全局安装的模块
$ npm ls -g --depth 0

# 查看全局安装的模块的详细信息(name, description, version number, github address, official website.)
$ npm ls -l -g --depth 0

# 安装到 `devDependencies` 中
$ npm i dayjs -S

# 安装到 `dependencies` 中
$ npm i dayjs -D

# 查看 `npm` 配置
$ npm config list

# 查看 `npm` 全部配置
$ npm config ls -l
```

### peerDependency

> A peer dependency is a specific version or set of versions of a third-party software library that a module is designed to work with. They’re similar in concept to the relationship between a browser extension and a browser.

避免 `核心依赖库` 依赖的 `模块` 被重复下载的问题，扁平化依赖图。

- 如果用户显式依赖了核心库，则可以忽略各插件的 peerDependencies 声明；
- 如果用户没有显式依赖核心库，则按照插件 peerDependencies 中声明的版本将库安装到项目根目录中；
- 当用户依赖的版本、各插件依赖的版本之间不相互兼容，会报错让用户自行修复。

### --legacy-peer-deps

在 npm v7 中，会默认安装 peerDependencies。然而在很多情况下，这会导致版本冲突，从而中断安装过程。

`–legacy-peer-deps` 标志是在 v7 中引入的，目的是绕过 `peerDependency` 自动安装；它告诉 npm 忽略项目中引入的各个 modules 之间的相同 modules 但不同版本的问题并继续安装，保证各个引入的依赖之间对自身所使用的不同版本 modules 共存。

npm 的 `--legacy-peer-deps` 命令是用于在安装依赖包时启用旧版对等依赖解析算法的选项。

在 npm 7 中，对等依赖解析算法发生了变化，它会忽略与实际依赖不兼容的依赖项。这可能会导致安装失败或不兼容的依赖项被安装。为了解决这个问题，`--legacy-peer-deps` 选项被引入，它允许使用旧版对等依赖解析算法，以避免安装中断或不兼容的依赖项。

可以通过以下命令启用 `--legacy-peer-deps` 选项：

```sh
$ npm install --legacy-peer-deps
```

除此之外，还可以在 npm 配置文件中设置该选项，以使其在所有安装命令中自动启用：

```sh
$ npm config set legacy-peer-deps true
```

如果您想 `--legacy-peer-deps` 默认为所有 npm 安装设置标志，则可以考虑更新 `.npmrc` 文件。

```sh
legacy-peer-deps=true
```

需要注意的是，`--legacy-peer-deps` 它会告诉 npm 完全忽略对等依赖性。从长远来看，这会增加你的依赖解析。

### --force

`--force` 命令是指忽略所有警告强制安装包，这样做可能会造成不可预测的后果，往往用于解决某些包在安装时出现的问题。

通常，我们希望使用该 `--force` 标志，因为这会告诉 npm 在发现冲突的依赖项时尝试设置不同的对等依赖项。

使用 force 仍然不是那么好，因为它会在你的 `node_modules` 文件夹中占用更多的磁盘空间——例如获取不同的版本并将它们存储在本地！

## 查看设备信息

```sh
npx envinfo --system --binaries --browsers

# System:
#   OS: Windows 10 10.0.19044
#   CPU: (12) x64 Intel(R) Core(TM) i5-10400 CPU @ 2.90GHz
#   Memory: 1.13 GB / 7.89 GB
# Binaries:
#   Node: 16.19.0 - C:\Program Files\nodejs\node.EXE
#   Yarn: 1.22.19 - C:\Program Files\nodejs\yarn.CMD
#   npm: 8.19.3 - C:\Program Files\nodejs\npm.CMD
# Browsers:
#   Edge: Spartan (44.19041.1266.0), Chromium (111.0.1661.41)
#   Internet Explorer: 11.0.19041.1202
```

## windows cmd alias

### 创建脚本文件

目录：`C:\Users\admin\cmd_alias.bat`

```sh
@REM GIT
@doskey ph=git push
@doskey fe=git fetch
@doskey pl=git pull
@doskey ga=git add .
@doskey gc=git commit -m
@doskey gbd=git branch -d
@doskey gbD=git branch -D
@doskey gbdr=git branch -dr

@REM PATH
@doskey i=cd D:\i
```

### 增加到注册表

`window + R` 输入 `regedit`

```sh
HKEY_LOCAL_MACHINE\Software\Microsoft\Command Processor\AutoRun
and/or
HKEY_CURRENT_USER\Software\Microsoft\Command Processor\AutoRun
```

找到上述目录下的文件，没有就自己创建，将脚本文件的路径改为该项的字符值即可。

## windows git bash aliases

文件所在路径:

- `D:\Git\Git\etc\bash.bashrc` (在 vscode 默认终端中 alias 生效)
- `D:\Git\Git\etc\profile.d\aliases.sh`
- `D:\Git\Git\etc\.bashrc`
- `D:\Git\Git\etc\.gitconfig`

```sh
# My Custom aliases
alias ls='ls -F --color=auto --show-control-chars'
alias ll='ls -l'
alias i='cd D:\i'
alias ph='git push'
alias fe='git fetch'
alias pl='git pull'
alias ga='git add .'
alias gb='git branch'
alias gc='git commit -m'
alias gcf='git config --global --list'
alias cc='rimraf node_modules'
alias c='clear'
```

生效 `git bash`

```sh
source /d/git/git/etc/profile.d/aliases.sh
```
