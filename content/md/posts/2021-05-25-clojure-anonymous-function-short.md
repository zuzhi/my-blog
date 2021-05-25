{:title "Clojure 匿名函数的简写形式"
 :layout :post
 :tags  ["clojure"]}

```clojure
(#(+ 1 %) 1)                       ; return 2
(#(println "hello," %) "world")    ; print "hello, world"
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
(fn [x] (+ 1 x))                             ; 等价于：#(+ 1 %)
(fn [message] (println "hello," message))    ; 等价于：#(println "hello," %)
```

`%` 用于表示单个形参。多个形参使用 `%1`, `%2`, `%3` 并以此类推，`%&` 用来表示剩余(remaining)/可变(variadic)形参。


<br><br><br>

---

See Also:

- [Learn Clojure - Functions](https://clojure.org/guides/learn/functions)
