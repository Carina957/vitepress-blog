---
outline: deep
---

# Vscode

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
