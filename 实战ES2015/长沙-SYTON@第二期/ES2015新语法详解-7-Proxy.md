## 13、Proxy
元编程（Meta-programming）是一种高级的编程概念，概念为一个程序可以对另外一个程序进行读取、转换，甚至在第二个程序运行的时候对其进行修改。其重点在于，一个程序的内容、运行环境和配置都不变的情况下可以通过其他程序对其进行读取或修改。
Getter/Setter也属于元编程概念，下面是一个Getter/Setter的例子：
```
const obj = {
    _name: '',
    prefix: '',
    get name() {return this.prefix + this._name},
    set name(str) { this._name = str }
}

//program2
obj.name = 'ES2015';
console.log( obj.name );    // 'ES2015'
obj.prefix = 'Hello ';
console.log( obj.name );    // 'Hello ES2015'
```

###　使用语法
Proxy是以一种包装器的形式使用，通过设置行为监听方法来捕获程序对对应对象的行为
```
new Proxy ( target, handler)
// target : 需要被包装的对象
// handler: 用于监听目标对象行为的监听器
```

#### handler.has
has监听方法来监听程序通过in语句来检查一个字符串或数字是否为该Proxy对象中某个属性的属性键的过程。
```
const p = new Proxy( {}, {
    has(target, prop) {
        console.log(`Checking "${prop}" is in the target or not .`);
        return true;
   }
});
console.log( 'foo' in p );    // Checking "foo" is in the target or not .
```
两种情况会抛出TypeError错误：
1. 当目标对象被其他程序通过Object.preventExtensions()禁用了属性拓展，而且被检查的属性确实存在于目标对象时，该监听方法不能返回false；
2. 当被检查的属性键存在于目标对象中，且该属性的configurable配置是false时，监听方法不能返回false。

#### handler.get
Getter只能对已知的属性键进行监听，而无法对所有属性读取行为进行拦截。Proxy可以通过设定get监听方法，拦截和干涉目标对象的所有属性读取行为。
```
const obj = { foo: 1};
const p = new Proxy( obj, {
    get (target, prop) {
        console.log(`Programing is trying to fetch the property "${prop}". `);
        return target[prop];
   }
});
// 书中有误（page120）
p.foo;    //Programing is trying to fetch the property "foo". 
p.something;    // Programing is trying to fetch the property "something".     
```
注意： 当目标对象被读取属性的configurable和writable属性都为false的时候，监听方法最后返回的值必须和目标对象的原属性一致。

#### handler.set
监听目标对象的所有属性赋值行为
```
const obj = { };
const p = new Proxy( obj, {
    set (target, prop,value) {
        console.log(`Stting value "${value}" on the key "${prop}" in the target object. `);
        target[prop] = value;
        return true;
   }
});
p.foo = 1;    // Stting value "1" on the key "foo" in the target object. 
```
注意： set监听方法要求返回一个布尔值结果来使引擎知道这次属性值是否被赋值成功，如果返回false就会抛出一个错误。

#### handler.apply
Proxy的目标对象也可以是函数，apply监听方法可以监听其调用行为。

#### handler.construct
Proxy可以将类作为目标对象，监听其通过new语句来生产新实例的行为，同样也适用于构造函数。
```
class Foo{}
const p = new Proxy(Foo, {
    construct(target, args, newTarget) {
        return { arguments: args }
   }
})
const obj = new p(1,2,3);
console.log(obj.arguments);    // [1,2,3]
```

### 创建可解除的Proxy对象
```
const obj = { foo: 10 };
const revocable = Proxy.revocable(obj, {
    get (target, prop) {
        return 20;
   }
});
const proxy = revocable.proxy;
console.log( proxy.foo );     // 20

revocable.revoke();
console.log(proxy.foo);    // Uncaught TypeError: Cannot perform 'get' on a proxy that has been revoked(…)
```
Proxy.revocable(target,handler) 会返回一个带有两个属性的对象，其中一个proxy便是该函数生成的可解除Proxy对象，而另一个revoke则是将刚才的Proxy对象解除的解触方法

### 使用场景
+ 只读视图
```
function readOnly (data) {
    const NOPE = () =>{
        throw new TypeError('Cannot modify the readonly data.')
   }
    return new Proxy(data,{
        get (target, prop) {
            const result = target[prop];
            if (Object(result) === result) { 
               return new Proxy(result, {
                    set: NOPE,
                    deleteProperty: NOPE,
                    setPropertyOf: NOPE,
                    preventExtensions: NOPE,
                    defineProperty: NOPE
               }) 
           }
            return result
       }
   })
}

const data = {foo: {bar: 1},num: 10}
const readonlydata = readOnly(data)
readonlydata.num = 100;    // 100
readonlydata.foo.bar = 2;    // Uncaught TypeError: Cannot modify the readonly data.(…)
```