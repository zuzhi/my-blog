{:title "从容自信地使用 Emacs"
 :layout :post
 :tags ["emacs"]
 :draft true
 :slug "emacs-confident"
 :hide true}

由于 `Emacs` 有着相当陡峭的学习曲线，从我最早接触 Emacs 到现在的情况来看，要能够达到**会用 Emacs**依然需要非常漫长的时间。

每次学习 Emacs 教程后，由于**缺乏练习**，命令忘得很快，隔了一久之后输入 `emacs -nw` **从终端打开** Emacs 之后脑子里一片空白，除了能用 `C-f/b` `C-a/e` `C-n/p` 移动光标上下左右之外<sup>[1]</sup>，其他一个命令都想不起来。

如果我是要编辑文件，大部分时候我都会打开 `Sublime Text`，而使用 Sublime Text 的感觉是从容不迫的。首先，使用 `Cmd-o` 唤起文件选择窗口，`Cmd-Shift-g` 输入要去到的目录，如果是要编辑单个文件，那就选择文件，如果是要打开文件夹，就选择文件夹，这时 Sublime Text 窗口的侧边栏就会出现文件目录，通过 `Cmd-p` 唤起 Go to Anything，这是一个对当前目录进行模糊搜索的功能，可以快速找到想要编辑的文件，然后就可以开始编辑了。编辑文件的过程也很轻松，简单说就是通过一系列熟悉的命令操作来辅助编辑，这些命令包括： `Cmd-f` 查找，`Cmd-g` 查找下一个，`Cmd-Shift-g` 查找上一个，`Cmd-Alt-f` 查找替换（包括这时通过点击正则图标激活使用正则表达式查找），`Cmd-Shift-f` 在文件目录范围的文件内容中查找，`Cmd-c` `Cmd-v` 复制粘贴，`Cmd-z` `Cmd-Shift-z` Undo/Redo，`Cmd-s` 保存文件等等。

当然除了基础的导航和编辑命令之外，`Cmd-Shift-p` 唤起 Package Control，输入 `pci` 安装插件包也是比较熟悉的操作，也就是 Sublime Text 是易拓展的，比如我目前安装的插件包就有 `Emmet`, `Babel`, `View in Browser` 等。

最近我发现其实正常使用**图形界面**的 Emacs 相对来说还是容易的，用熟悉的 `Cmd-o` 可以打开文件，用 `Cmd-c` 和 `Cmd-v` 复制粘贴，`Cmd-z` 一样是 undo（虽然 `Cmd-Shift-z` 不是 redo）, `Cmd-f` 可以查找， `Cmd-g` 可以查找下一个（虽然 `Cmd-Shift-g` 不是查找上一个），`Cmd-s` 也同样能保存文件 。也就是说使用基础的导航和编辑命令，是可以轻松使用 Emacs 编辑文件的，这样也就没有那么大的使用压力了。

至于要真正**从容自信**的使用 Emacs，除了上面说的这些，恐怕真的需要好好梳理总结一下使用 Sublime Text 时涉及的操作，然后做到使用 Emacs 能做相同的事了。

## I. 写文章

| Action     | Sublime Text   | Emacs       | 与 ST 相比 Emacs 是否易用 |
| ---------- | -------------- | ----------- | ----------------------- |
| 打开文件夹   | `C-o`          | `C-x d`     |  Same                  |
| 侧栏显示目录 | 显示            | 无          |  No                    |
| 跳转到文件  | `C-p`, `C-n/p`  | `C-x C-f`   |  No                    |


**Emacs 的问题**

跳转文件不方便

**优化**

已经一番搜索调研，`Projectile` + `Ivy` 应该能满足相同的需求，`Projectile` 的主要特性有：

- jump to a file in project
- jump to a project buffer
- ...
- jump to recently visited files in the project
- switch between projects you have worked on
- ...
- grep (search) in project
- run shell commands in a project (e.g. make, lein)
- support for multiple minibuffer completion/selection libraries (ido, ivy, helm and the default completion system)

`Projectile` 提供跳转到项目文件，按项目管理文件夹，项目之间切换等功能，另外，它还支持像 `ivy` 这样的补全/选择库。

Ivy 是一个补全/选择库，它会展示一个候选结果列表，这样能很好地辅助快速查找到文件。

按照对应官网的配置将 `Projectile` 和 `Ivy` 配置好之后，使用 `S-p f` 打开目录下任一文件，项目目录就被 `Projectile` 收藏了，后面通过 `S-p f` 就能快速打开工作目录以及搜索文件了。

不过 ivy 默认没有开启对 fuzzy search 的支持，通过[这个方法](https://oremacs.com/2016/01/06/ivy-flx/)修改以支持 fuzzy fearch.


#### Notes:
 
[1]: 因为这些命令在 macOS 系统的大部分应用里都可以使用，我每天都在用，可以说已经形成肌肉记忆了。
