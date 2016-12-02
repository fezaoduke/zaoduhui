### MonsoDB、Mongoskin特性
NoSQL数据库，也叫非关系型数据库，适用于分布式系统。NoSQL数据库比起传统数据库更适合处理大数据。
其实现的关键是数据库实体之间的关系并不存储在数据库本身，转移到了应用层，或者关系对象映射水平（这里是Node.js代码处理的部分）。NoSQL是无模式数据库，对于原型开发和敏捷迭代是近乎完美的。

MongoDB是文档存储NoSQL数据库，而不是健值对和列存储数据库；具有高效率、已扩展和快速之外，MongoDB使用类似javascript的语言开发接口

1. 安装MongoDB
    
    * brew update
    * brew install mongodb
2. 运行MongoDB
    * mkdir -p /data/db
    
MongoDb shell操作命令：
    
    help 
    show dbs
    use db_name
    show collections
    db.collection_name.find(query):查找所有匹配的条件
    db.collection_name.findOne(query):
    db.collection_name.insert(document):插入一条数据
    db.collection_name.save(document);
    db.collection_name.update(query,{$set:data});
    db.collection_name.remove(query);
    printjson(document);
    
3. 通过node.js脚本来连接本地MongoDB步骤

    * 声明依赖关系
    * 定义数据库主机和端口
    * 建立数据库连接
    * 创建数据库文档
    * 输出一个新的文档对象
        
        由于网速太慢，brew install mongodb  一直装不上，不能更好的进行下面操作理解，今天先到这，下次补上