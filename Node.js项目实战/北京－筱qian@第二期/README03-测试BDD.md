### 03 Node.js基于Mocha的测试驱动开发TDD 和 行为驱动开发BDD
####测试框架Mocha
    使用测试框架和构建应用程序本身同等重要

TDD的主要思想：
    A 定义一个单元测试 B执行一个单元测试 C 验证这个测试是否通过
    
BDD是基于TDD的，指定了从业务需求角度出发，需要哪些单元测试


1. 安装与理解Mocha
    
    npm install -g mocha@1.16.2
            

2. 理解Mocha的hook机制
    
    hook可以理解为一些逻辑，通常表现为一个函数或者一些声明，党的定的事件触发时hook执行。。Mocha用用一些内置hook，在测试流程的不同时段出发，如在整个测试流程之前触发或在每个独立测试之前触发。
    
    hook,before(),beforeEach(),after(),afterEach(),

    所有的hook都支持异步模式，并不用等到响应返回才完成测试
        
        describe('homepage',function(){
            it('should respond to GET',function(){
                superagent
                    .get('http://localhost:'+port)
                    .end(function(res){
                    expect(res.status).to.equal(200);
                    done()  //一旦加上done参数，就要等到HTTP请求返回响应
                    })
            })
        })

    Mocha支持更传统的TDD接口
    * suite:类似describe
    * test:类似it
    * setup：类似before
    * teardown:类似after
    * suiteSetup : 类似beforeEach
    * suiteTeardown : 类似afterEach

3. assert进行TDD
    assert库是node核心部分，使得他易于访问
    
         1 var assert = require('assert');
         describe('String#split',function(){
                `it('should return an array',function(){`
            `assert(Array.isArray('a,b,c'.split(',')));`
                    `});`
                        `});`
    
4. 断言库Chai
    node的核心模块assert，chai是这个模块的子集
    * 安装 npm install chai
        * Chai的内置方法
            * assert(expressions,message):如果表达式错误，则抛出错误信息
            * assert.fail(actual,expected,[message],[operator]);抛出一个带有实际值、期望值及操作者的错误信息
            * assert.ok(object,[message])
            * assert.notOk(object,[message])
            * assert.equal(actual,expected,[message]);
            * assert.notEqual(actual,expected,[message]);
    