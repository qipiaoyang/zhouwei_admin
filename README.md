### 1. 目录结构
```
├── admin                      # 打包后存放的文件夹(默认已经忽略)
├── admin.zip                  # 上传至服务器的zip包
├── build                      # 构建相关
├── mock                       # 项目mock 模拟数据
├── public                     # 静态资源
│   │── favicon.ico            # favicon图标
│   └── index.html             # html模板
├── src                        # 源代码
│   ├── api                    # 所有请求
│   │   │── common             # api页面通用请求(如获取用户信息，全局权限等)
│   │   │── moduleName         # api页面各模块请求
│   ├── assets                 # 主题 字体等静态资源
│   ├── components             # 全局公用组件
│   │   │── common             # 全局共用基础组件的封装
│   │   │── moduleName         # 全局共用的业务组件
│   ├── directive              # 全局指令
│   ├── filters                # 全局 filter
│   ├── icons                  # 项目所有 svg icons
│   ├── layout                 # 全局 layout
│   ├── router                 # 路由
│   ├── store                  # 全局 store管理
│   ├── styles                 # 全局样式
│   ├── utils                  # 全局公用方法
│   ├── views                  # views 所有页面
│   ├── App.vue                # 入口页面
│   ├── main.js                # 入口文件 加载组件 初始化等
│   ├── permission.js          # 权限管理
│   └── setting.js             # 默认配置管理
├── .eslintrc.js               # eslint 配置项
├── .babelrc                   # babel-loader 配置
├── vue.config.js              # vue-cli 配置
├── postcss.config.js          # postcss 配置
└── package.json               # package.json
```


### 2. 运行以及打包

1. 本地开发命令

```
yarn run dev                   # 运行开发环境命令
yarn run test                  # 运行测试环境命令
yarn run prod                  # 运行生产环境命令
```

2. 打包命令

```
yarn run build:dev                   # 打包开发环境包命令
yarn run build:test                  # 运行测试环境包命令
yarn run build:prod                  # 运行生产环境包命令
yarn run build:zip                   # 压缩zip命令
```

### 3. 项目开发基本规范

1.  public 

    public文件夹为所有页面共用文件夹，里面__只允许存在index.html以及icon文件__,其他所有文件通过按需加载去引入。

2.  src/api

    api文件夹存放所有api请求，我们按模块/页面(如admin/admin_group_manager.js)来存储,
    各模块api里面方法与store/modules里面方法一一对应
 
3.  assets

    存放所有的静态资源，比如(fonts、image等等)

4.  components

    components文件夹存放所有共用组件，我们按__基础组件以及业务组件__来划分
    
5.  directive ————  存放全局指令

6.  filters   ————  存放全局过滤函数

7.  icons     ————  项目所有 svg icons

8.  layout    ————  全局 layout

9.  router    ————  全局路由配置文件

10. store     ————  全局状态管理器

11. styles    ————  全局共用的样式

12. utils     ————  全局公用工具函数

    公用工具函数分为以下几种：

        1. 存储函数  封装所有跟浏览器存储相关的函数(比如设置用户信息，获取用户信息、token等)
        2. 常量配置  配置了项目里面所有的常量（常量命名全部大写）
        3. 转换函数  封装了项目所需的转换函数
        4. 网关     所有请求的入口以及出口，所有关于http协议或者其他的协议的封装
        5. 环境配置  根据不同的开发环境，配置不同的请求地址
        6. 正则配置  配置了全局的正则表达式


13. views     ————  视图层

    视图层按模块/页面/页面子组件的形式来存放文件，比如（mall/about/index、add、edit）
    __原则上每个页面不能超过300行代码，超出300行代码是肯定可以拆分成子组件的__

    
14. .babelrc  ————  babel配置文件

15. vue.config ————  vue-cli配置文件

16. postcss.config  ————  postcss配置文件

17. package.json  ————  全局npm包配置

    __npm包不能使用latest等非固定版本，所有的项目用到的包必须是固定版本__



### 4. 组件封装规范

##### 4.1 基础组件的封装

    1. 无状态化
    2. 粒子化
    3. 不能带有业务功能
    4. 参数需要指定具体类型以及默认值

#### 4.2 业务组件的封装

    业务组件要按照单一职责原则，一个业务组件只具备一个相应的功能

### 5. 状态管理器的规范

    1. mutations命名全大写以下划线_相连
    2. action命名以小驼峰法命名且具有可读性（getAboutList、removeAboutImage、setAboutVisible等等），
    3. action的方法与api里面的方法保持一致性
    4. 所有的action方法必须有相关的注释，注释的规则参考（store/modules/about.js）