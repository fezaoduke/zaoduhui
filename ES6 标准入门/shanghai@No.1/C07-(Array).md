#7.数组扩展
###Array.from()
将类似数组的对象和可遍历对象转换为数组。

###Array.of()
将一组数组转换为数组。

###数组实例的copyWithin()
将当前数组内指定位置的成员复制到其他位置（会覆盖原有成员），然后返回当前数组。
Array.prototype.copyWithin(target, start = 0, end = this.length)
 * target(必须)：从该位置开始替换数据。
 * start（可选）：从给位置开始读取数据，默认为0。如果为负值，表示倒数。
 * end(可选)：到该位置停止读取数据，默认等于数组长度。如果为负值，表示倒数。

###数组实例的find()和findIndex()

|   |   |
| :--------  | :-------- |
|find|返回第一个符合条件的数组成员，否则返回undefined|
|findIndex|返回第一个符合条件的数组成员的位置，否则返回-1|

###数组实例的fill()
使用指定值在指定位置填充数组。

###数组实例的entries()、keys()和values()
 * entries() 对键值对的遍历
 * keys() 对键名的遍历
 * values() 对键值的遍历

###数组实例的includes()
返回数组是否包含指定的值true/false。

###数组的空位
ES6会将数组的空位转换为undefined。

