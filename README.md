# olecode-vue3
olecode 是一个类似在线判题系统（OJ）的服务。简单来说，它能帮用户判断提交的代码写得对不对。现在学编程的人越来越多，大家写了代码后都想知道自己写得好不好、对不对。“欧代码”就是专门干这个事儿的。不管你用的是 Java、Python 还是 C++这些编程语言写的代码，只要提交给 olecode，它就能很快告诉你有没有写错。

## generate api
```
openapi --input http://192.168.1.102:8991/api/v2/api-docs--output ./generated --client axios

```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
