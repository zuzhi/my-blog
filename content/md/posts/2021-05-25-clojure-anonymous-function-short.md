{:title "Clojure 匿名函数的简写形式"
 :layout :post
 :klipse true
 :tags ["clojure"]
 :slug "clojure-anonymous-function"}

```clojure
(#(+ 1 %) 1)                       ; 返回 2
(#(println "hello," %) "world")    ; 打印 "hello, world"
```

上面是对两个 Clojure 匿名函数简写形式的调用，非常简洁，很有意思。


Clojure 匿名函数的标准写法是这样：

```clojure
;;    params         body
;;   ---------  -----------------
(fn  [message]  (println message) )
```

所以上面两个函数使用标准写法是这样的：

```clojure
(fn [x] (+ 1 x))
(fn [message] (println "hello," message))
```

使用简写形式就变成了：

```clojure
#(+ 1 %)
#(println "hello," %)
```

其中 `%` 用于表示单个参数。多个参数使用 `%1`, `%2`, `%3` 并以此类推，`%&` 用来表示剩余参数。

这个形式和函数调用非常像，看起来就像是函数调用前面加了个 `#` 号而已。这种相似性能让你更快地了解匿名函数被调用时发生了什么。

当然，由于是匿名函数，总是要在声明时调用的，也就回到最上面我们看到的调用形式了。

## 上手试试

试试在下面的代码框中定义并调用匿名函数吧。

```klipse-clj
;; 下面是一个示例. 你可以修改或删除重写.
;; 其中 #(* % %) 是求给定参数平方的匿名函数
(map #(* % %) (range 1 10))
```



#### Notes

[1] [Learn Clojure - Functions - Anonymous Functions](https://clojure.org/guides/learn/functions#_anonymous_functions)

[2] [Brave Clojure - Do Things - Anonymous Functions](https://www.braveclojure.com/do-things/#Anonymous_Functions)
