# MUX Artists

### 简述：

本项目收集了具有影响力的50位艺术家的画作，并收集了该50位艺术家的生平，并通过web技术对艺术家进行数据的展示。https://wykxldz.github.io/MUX_Artists/
![MUXworkshop](./MUXworkshop.gif)

## 项目结构

本项目采用python进行数据处理，采用web（html，css， javascript（jquery+d3））进行数据展示



------

**main.py**：

对每位艺术家的每个作品进行聚类选择合适的颜色

对每一位艺术家的国家生成结构化的文件

对每一位艺术家的生平生成结构化的文件

对每一位艺术家的知名画作生成结构化文件

对每一位艺术家的数据之间的映射关系生成结构化文件



**index.html**:
主页面

**js/colordData.js**：
所有艺术品信息

**js/utils.js**:
存储所有的艺术家信息，数据，映射关系及一些基本的函数

**js/main.js**:
采用utils中的数据生成页面，并添加滚轮事件的页面控制

**css/style.css**:
样式表

**best-artworks-of-all-time/images/**：
压缩后图片集合
