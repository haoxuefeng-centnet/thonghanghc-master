# api
> 项目所有请求管理文件夹
### 书写规范
一个页面对应一个js文件， 如用户管理-> admin.js

接口名称规范：驼峰命名法

``
export const userLogin = params => req.reqPost('/login', { ...params })
``