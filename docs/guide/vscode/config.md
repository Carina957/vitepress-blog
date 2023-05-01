---
outline: deep
---

# Vscode

## Window TODO Highlight

```json
{
  "todohighlight.isEnable": true,
  "todohighlight.isCaseSensitive": true,
  "todohighlight.exclude": [
    "**/node_modules/**",
    "**/uni_modules/**",
    "**/bower_components/**",
    "**/dist/**",
    "**/build/**",
    "**/.vscode/**",
    "**/.github/**",
    "**/_output/**",
    "**/*.min.*",
    "**/*.map",
    "**/.next/**"
  ],
  "todohighlight.include": [
    "**/*.vue",
    "**/*.js",
    "**/*.jsx",
    "**/*.ts",
    "**/*.tsx",
    "**/*.html",
    "**/*.php",
    "**/*.css",
    "**/*.scss",
    "**/*.less",
    "**/*.md"
  ],
  "todohighlight.keywords": [
    "FIXME:",
    {
      "text": "REVIEW:",
      "backgroundColor": "#000080",
      "overviewRulerColor": "#000080"
    },
    {
      "text": "DEBUG:",
      "backgroundColor": "#DC143C",
      "overviewRulerColor": "#DC143C"
    },
    {
      "text": "TODO:",
      "backgroundColor": "#ffab00",
      "overviewRulerColor": "#ffab00"
    },
    {
      "text": "NOTE:",
      "backgroundColor": "#7FFFAA",
      "overviewRulerColor": "#7FFFAA"
    },
    {
      "text": "HACK:",
      "backgroundColor": "#000",
      "overviewRulerColor": "#000"
    }
  ],
  "todohighlight.defaultStyle": {
    "color": "#fff",
    "backgroundColor": "#ffab00",
    "overviewRulerColor": "#ffab00",
    "cursor": "pointer",
    "border": "1px solid transparent",
    "borderRadius": "5px",
    "isWholeLine": false
  }
}
```

## Windows Git Bash 作为默认终端

```json
"terminal.integrated.profiles.windows": {
  "PowerShell": {
    "source": "PowerShell",
    "icon": "terminal"
  },
  "Command Prompt": {
    "path": [
      "${env:windir}\\Sysnative\\cmd.exe",
      "${env:windir}\\System32\\cmd.exe"
    ],
    "args": [],
    "icon": "terminal"
  },
  "Git-Bash": {
    "path": "D:\\Git\\Git\\bin\\bash.exe",
    "args": [],
    "icon": "broadcast",
    "color": "terminal.ansiGreen"
    // "source": "Git Bash"
  }
},
"terminal.integrated.defaultProfile.windows": "Git-Bash",
```
