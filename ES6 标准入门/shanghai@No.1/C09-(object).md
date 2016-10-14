#9.对象的扩展

###属性的简洁表示法

声明对象时，只写属性名，不写属性值，属性值等于属性名所代表的变量。

###属性名表达式

|形式|例子|
| ----- | ----- |
|.|obj.foo = true;|
|[]|obj['a'+'bc'] = 123;|
|字面量|var obj = { foo： true;}|
|属性名表达式|var obj = { ['a'+'cc']: 123, \['h'+'ello'\] () {console.log('hello')}}|

注：属性名表达式与简洁表示法不能同时使用。

###方法的name属性

函数的name属性返回该函数的函数名。

特例：
 * bind方法创造的函数，name返回bound加上原函数名
 * Function构造函数创造的函数，name返回“anonymous”
 * 对象的方法是一个Symbol值，name返回这个Symbol值的描述

###Object.is(vaule1, vaule2)

 用来比较两个值是否严格相等，与===行为基本一致

###Object.assign(target, source1, source2...)

 用来将源对象(source)的所有可枚举属性赋值到目标对象(target)
  * 如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性。
  * 对于嵌套的对象，替换而不是添加。
  * Object.assign可用于处理数组。

###属性的可枚举性

对象的每个属性都有一个描述对象，用于控制该属性的行为。

Object.getOwnPropertyDescriptor()可以获取该属性的描述对象。

描述对象的enumerable属性称为“可枚举性”，如果该属性为false，表示某些操作会忽略当前属性。

eg:
  * for ... in循环：只遍历对象自身的和继承的可枚举属性
  * Object.keys(): 返回对象自身的所有可枚举属性的键名
  * JSON.stringify(): 只串行化对象自身的可枚举属性
  * Object.assign()： 只复制对象自身的可枚举属性 （ES6）
  * Reflect.enumerate()： 返回所有for...in循环会遍历的属性 （ES6）

###属性的遍历
 * for...in: 循环遍历对象自身的和继承的可枚举属性（不含Symbol属性）
 * Object.keys(): 返回对象自身的所有可枚举属性的键名（不含Symbol属性）
 * Object.getOwnPropertyNames: 返回对象自身的所有属性（不含Symbol属性，包含不可枚举属性）
 * Object.getOwnPropertySymbols：返回对象自身的所有Symbol属性
 * Reflect.ownKeys: 返回对象自身的所有属性
 * Reflect.enumerate()： 返回所有for...in循环会遍历的属性

### prototype对象
* \_\_proto\_\_属性（前后各两个下换线）

用来读取或设置当前对象的prototype对象

* Object.setPrototypeOf()

与__proto__作用相同，用于设置一个对象的prototype对象

* Object.getPrototypeOf()

与Object.setPrototypeOf()配套，用于读取一个对象的prototype对象

