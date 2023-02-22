---
outline: deep
---

# Node

## volta

::: code-group

```sh [curl]
curl https://get.volta.sh | bash
```

```sh [brew]
brew install volta
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

```text
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

```text
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

```text
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

## npm

```sh
# 查看全局安装的模块
$ npm ls -g --depth 0

# 查看全局安装的模块的详细信息(name, description, version number, github address, official website.)
$ npm ls -l -g --depth 0

# 安装到 `devDependencies` 中
$ npm i dayjs -S

# 安装到 `dependencies` 中
$ npm i dayjs -D
```

![npm-list](./images//npm-list.png)

![npm-list-info](./images/npm-list-info.png)
