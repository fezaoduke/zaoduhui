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


============================================================

* mongodb基本概念
    
    * 数据库  database
    
            MongoDB中多个文档组成集合，同样多个集合可以组成数据库。一个MongoDB实例可以承载多个数据库，数据库名可以是满足以下条件的任意UTF-8字符串
             - 不能是空字符串("")- 不能含有''(空格)、.、$、/、\和\0(空字符 - 应全部小写 - 最多64字节
    * 集合    collection 数据库表／集合
    
            集合是一组文档。如果说MongoDB中的文档类似于关系型数据库中的行，那么集合就如同表。
    * 文档    document  数据记录行／文档
            
            多个键及其关联的值有序地放置在一起便是文档。 在js里，文档表示为对象：{"greenting" : "Hello,world!"}.MongoDB不单区分类型，也区分大小写，还有，MongoDB的文档不能有重复的键，
    * 字段／域 field
    * 索引     index        
    * 主键     primary key  MongoDb自动将_id字段设置为主键
    
    
* 补下安装步骤，踩了好久的路，最好不要用命令行下载，会下好久也不成功。。。

    1. 官网下载https://www.mongodb.com/cn压缩包并解压
    2. 终端移到相应目录 
            
            mv -n ~/Downloads/mongodb-osx-x86_64-2.4.6 ~/Usr/local/mongodb/
            没权限的话，在前面加 sudo
    3. 创建根目录下的/data/db目录
    
            sudo mkdir -p /data/db
    4. 设置权限
            
            sudo chown -R yourname /data
            
    5. 启动mongodb服务
    
            cd /Usr/local/mongodb/bin
            ./mongod
            
    6. 连接
    
            另起一个终端窗口
            cd /Usr/local/mongodb/bin
            ./mongo
            
* 数据类型－MongoDB支持的数据类型
 
            String : 这是最常用的数据类型来存储数据。在MongoDB中的字符串必须是有效的UTF-8。
            
            Integer : 这种类型是用来存储一个数值。整数可以是32位或64位，这取决于您的服务器。
            
            Boolean : 此类型用于存储一个布尔值 (true/ false) 。
            
            Double : 这种类型是用来存储浮点值。
            
            Min/ Max keys : 这种类型被用来对BSON元素的最低和最高值比较。
            
            Arrays : 使用此类型的数组或列表或多个值存储到一个键。
            
            Timestamp : 时间戳。这可以方便记录时的文件已被修改或添加。
            
            Object : 此数据类型用于嵌入式的文件。
            
            Null : 这种类型是用来存储一个Null值。
            
            Symbol : 此数据类型用于字符串相同，但它通常是保留给特定符号类型的语言使用。
            
            Date : 此数据类型用于存储当前日期或时间的UNIX时间格式。可以指定自己的日期和时间，日期和年，月，日到创建对象。
            
            Object ID : 此数据类型用于存储文档的ID。
            
            Binary data : 此数据类型用于存储二进制数据。
            
            Code : 此数据类型用于存储到文档中的JavaScript代码。
        
####MongoDB基本命令
* use
        
        MongoDB use DATABASE_NAME 用于创建数据库。该命令将创建一个新的数据库，如果它不存在，否则将返回现有的数据库。
* dropDatabase()

        MongoDB db.dropDatabase() 命令是用来删除一个现有的数据库。dropDatabase() 命令的基本语法如下：
        db.dropDatabase()
        
* drop()

        MongoDB 的 db.collection.drop() 是用来从数据库中删除一个集合。
* insert()

        要插入数据到 MongoDB 集合，需要使用 MongoDB 的 insert() 或 save() 方法
* find()

        要从MongoDB 查询集合数据，需要使用MongoDB 的 find() 方法。db.COLLECTION_NAME.find()
        
* pretty()

        结果显示在一个格式化的方式，可以使用 pretty() 方法.db.col.find().pretty()
        
* Limit()

        要限制 MongoDB 中的记录，需要使用 limit() 方法。 limit() 方法接受一个数字型的参数，这是要显示的文档数。>db.COLLECTION_NAME.find().limit(NUMBER) 





    