# webbootcamp
webbootcamp project.

注：IE11下测试querySelctor() api不兼容，以及flex布局在edge和IE11下都不兼容

### 作业完成情况 99%：
1. “我的班级”页面：
    - 读取本地json文件数据
2. “创建班级”页面：
    - 表单提交数据校验（正则）
    - 表单提交失败提示
    - 表单提交保存数据至本地json文件
3. “班级详情”页面：
    - 根据班级id读取本地json数据，动态获取班级成员列表
    - 老师、学生和家长选项卡切换，动态加载成员数据
    - 搜索功能：姓名模糊搜索，全拼和首字母拼音搜索

### 项目启动：
访问index.html文件即可，若出现未加入班级，则按以下步骤打开json-server模拟数据

1. 安装json-server
`npm install json-server -g`
2. 在根目录下，运行json-server
`npm run mock`
3. 打开 localhost:3000 页面访问项目 

