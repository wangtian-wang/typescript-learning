# vue3-ts-cms

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

## DefinePlugin
```js
    这些变量是通过 definePlugin设置的全局变量      BASE_URL
    当对应不同的开发环境时候，需要设置不同的URL
    在根目录下面设置.env开头的文件 DefinedPlugin 会自动根据开发境去读取 设置的URL   定义的变量必须以VUE_APP_开头
        .env.development 开发环境
        .env.production
        .env.test
    这些配置文件 会被DefinePlugin读取，合并到配置文件里面
    vue-cli 对于 webpack做了封装 所以里面有设置的base_url的值为''


```

## vue-cli mode 
```js
   configureWebpack: {
    resolve: {
      alias: {
        components: '@/components'
      }
    },
    mode: 'production'
  },
  为啥在这里设置的mode不生效呢？也不能去加载对应环境的.env文件
  但是执行npm run build 的时候，就能去成功的加载对应环境的文件呢？？？？？？


js
