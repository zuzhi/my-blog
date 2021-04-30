{:title "Docker, Docker Compose, and Kubernetes"
 :layout :post
 :tags  ["docker", "microservices", "kubernetes"]
 :toc false}

使用*容器*(Container)部署*服务*(Service)是一种现代的部署*服务*的方式之一, 最基础的运行*容器*的方式是使用 `docker run` 命令, 但是这种方式是不可靠的, 虽然 Docker engine 也提供了一些基本的管理功能, 比如当*容器* crash 或者当服务器重启时能自动重启*容器*, 但是这并不能处理机器 crash 的情况.

另一个问题是*服务*通常并不独立存在, 而是会依赖于其他服务, 比如依赖数据库和消息代理(Message Broker).

Docker Compose 能将*服务*和其依赖作为一个整体单元来部署和取消部署(undeploy), 也就是能够启动和停止**一组***容器*, 这在开发环境中非常有用, 但是仍然没有解决机器 crash 的问题, 这样的部署仍然是不可靠的.

想要可靠的部署*服务*, 就需要上 Docker 编排框架(Docker orchestration framework)了. 比如 **Kubernetes**.

	可靠是什么？
	会具体表现为一些特性, 包括滚动升级, 回滚部署, 零停机部署等等.
	另外, 稳定的服务也需要能够根据负载的变化动态调整节点数量.

...

### Docker 编排框架(Docker Orchestration Framework)

Docker orchestration framework 将一组机器变成了一个资源池. 你只需要告诉它你要运行你*服务*的 N 个实例, 剩下的就交给它了.

### Functions

...

### Kubernetes

#### Components

Pod = set of containers

Node = Pod + Kubelet + Kube-Proxy
Master = API Server + Scheduler + Controller Management

Kubernetes = Master + Node

从组件的角度出发, 并且自下而上的看 Kubernetes 的构成, 其实还是很清晰的.

#### Concepts/Objects

...


#### Kubernetes 实战

示例应用是一个...
我们遵循Kubernetes的最佳实践, 创建一个集群...

- Create a Cluster
- Deploy an App
- Scale
- Update

### What's Next?

示例应用并不能..., 现实情况是, 你有一个稳定运行的单体服务, 虽然它在开发, 测试和部署方面都还算简单, 但是
有一些问题亟待解决, 如何从单体应用过渡到微服务, 这是一个非常大的话题, 后续文章我们将从DevOps和微服务架构
两方面来讨论.

### 参考

- [Microservices Patterns, Chris Richardson](https://microservices.io/book)
- [Kubernetes Documentation](https://kubernetes.io/docs/home/)
