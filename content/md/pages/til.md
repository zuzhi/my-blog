{:title "Today I Learned"
 :page-index 0}

## 2023-08-10

可选链运算符 (?.) (Optional chaining) 允许读取位于连接对象链深处的属性的值，而不必明确验证链中的每个引用是否有效。在引用为空 (nullish) (null 或者 undefined) 的情况下不会引起错误，该表达式短路返回值是 undefined。

该运算符还可以与*函数*调用一起使用，如果给定的函数不存在，则返回 undefined。

```js
const adventurer = {
  name: 'Alice',
  cat: {
    name: 'Dinah',
  },
};

const dogName = adventurer.dog?.name;
console.log(dogName);
// Expected output: undefined

console.log(adventurer.someNonExistentMethod?.());
// Expected output: undefined
```

## 2023-08-03

使用 jq 给 json 文件增加字段

superset 前端部分的文档里讲, 如果你要取消 Scarf 的 telemetry 可以在 package.json 添加如下配置

```json
{
  // ...
  "scarfSettings": {
    "enabled": false
  }
  // ...
}
```

如果我想不打开文件直接在命令行完成增加字段的操作的话, 研究了一下可以用下面的命令

```bash
cat package.json | jq '.scarfSettings += {"enabled": false}' | tee package.json
```

## 2023-07-31

使用苹果自带的英文输入法无法使用键重复, 原因是按住键盘上的某个字母键，会显示[重音符菜单](https://support.apple.com/zh-cn/guide/mac-help/mh27474/mac)。可以使用下面的命令将其关闭:
```sh
defaults write NSGlobalDomain ApplePressAndHoldEnabled -bool false
```

## 2023-07-30

In Git, when you run a `git pull` command, it combines two actions: `git fetch` and `git merge`. If you want to avoid unnecessary merge commits, you can use `git fetch` followed by `git rebase` instead of `git pull`.

## 2023-07-29

使用 awk 可以对输出内容进行操作, 例如 `docker compose ps | awk '{print $1}'` 可以只显示第一列 NAME.

## 2023-07-19

JSONPath is a query language for JSON, similar to XPath for XML.
