---
outlint: deep
---

# An Issue Reproduction for `Conflicts with PowerShell`

This document provides steps to reproduce an issue that occurs in the following repository:

- [anyfu/ni](https://github.com/antfu/ni.git)

## Reproduction Steps

1. 当我把 [脚本](https://github.com/antfu/ni/blob/main/README.md#conflicts-with-powershell) 添加到我的 `PowerShell` 配置文件中，尝试修复 `Conflicts with PowerShell`:

    ```sh
    if (-not (Test-Path $profile)) {
      New-Item -ItemType File -Path (Split-Path $profile) -Force -Name (Split-Path $profile -Leaf)
    }

    $profileEntry = 'Remove-Item Alias:ni -Force -ErrorAction Ignore'
    $profileContent = Get-Content $profile
    if ($profileContent -notcontains $profileEntry) {
      $profileEntry | Out-File $profile -Append -Force
    }
    ```

2. 配置在我本地的 `C:\Users\admin\Documents\WindowsPowerShell\Microsoft.PowerShell_profile.ps1` 中时，我的 `VSCode` 终端却是这样的:

    ![image](https://user-images.githubusercontent.com/56385216/225846913-c226fc21-0e6f-4420-814b-112cdb933e4f.png)

3. 而且之前配置的脚本多了这样的文字:

    ![image](https://user-images.githubusercontent.com/56385216/225847116-269e983e-8b1b-4c10-9909-ff5e1b9a80e5.png)

4. 但是，在当我去掉 `$profileEntry` 的单引号之后，就恢复了正常。

    ![image](https://user-images.githubusercontent.com/56385216/225847367-8bf74c8f-c8f8-4cde-a299-5924b10cacc9.png)
