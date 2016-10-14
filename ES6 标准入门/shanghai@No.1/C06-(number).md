#6.数值扩展

###二进制和八进制表示法
 * 二进制前缀0b/0N
 * 八进制前缀0o/0o
 
###Number.isFinite(),Number.isNaN()
 * Number.isFinite() 检查一个数值是否非无穷
 * Number.isNaN() 检查一个值是否为NaN
 
###Number.parerInt(),Number.parseFloat()
ES6将全局方法parserInt()和parseFloat()移植到了Number对象上，行为保持不变。

###Number.isInteger()
判断一个值是否为整数。

**注**：3和3.0被视为同一值，都为整数。

###Number.EPSILON
最小常量，用于为浮点数计算设置一个误差范围。

###安全整数和Number.isSafeInteger()
安全整数：在-2^{53}到2^{53}内的整数。

**注**：在验证运算结果时，需要同时验证参与运算的没一个值。

###Math对象的扩展
 * Math.trunc() 去除一个数的小数部分，返回整数部分
 * Math.sign() 判断一个数是正数（+1），负数（-1），还是零（0/-0）
 * Math.cbrt() 计算一个数的立方根
 * Math.clz32() 方法一个数的32位无符号整数形式有多少的前导0
 * Math.imul()　返回两个数以32位带符号整数形式相乘的结果，也是一个32位带符号整数
 * Math.fround() 返回一个数的单精度浮点数形式
 * Math.hypot() 方法所有参数的平方和的平方根
 * 对数方法
	* Math.expm1() 返回e^x-1
	* Math.log1p() 返回ln(1+x)
	* Math.log10() 返回以10为底的x的对数
	* Math.log2() 返回以2为底的x的对数

###指数运算符 
2 ** 2 = 4
