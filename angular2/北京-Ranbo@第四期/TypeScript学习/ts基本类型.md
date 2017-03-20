### TypeScript类型
1. Enum类型  
它是Number类型的子类，用来枚举用户定义的类型
```javascript
enum Color {Red, Green, Blue};
let c: Color = Color.Green;
```  
默认情况下，从0开始为元素编号。 你也可以手动的指定成员的数值。  
2. object类型
- array类型
与js中的数组类似，但是typescript里面数组中的元素类型必须相同。及对于给定的数组，里面不能容纳类型不同的元素。
```javascript
let primse: number[] = [];//只能是number的
let anyArr: any[] = [];//里面可以包含任意类型
```  
- function类型  
对于函数类型ts中唯一修改的内容就是函数参数的类型和返回值的类型，定义方法如下：
```javascript
function human(name: string, age: number): boolean {
    return false;//如果返回值不是void类型，就必须要return 值
}
//箭头函数的类型定义方式
const human: (name: string, age: number) => boolean = (name,age) => {
    return fasle;
}
```
- class类型  
ts中的类和es6所提供的类比较相似。但是ts修改了类型声明并且创建了更多语法糖：
```javascript
class Human {
    static totalPeople = 0;
    _name: string;
    constructor(name) {
        this._name = name;
        Human.totalPeople += 1;
    }
}
```    
访问修饰符 ts支持以下访问修饰符：    
public：所有定义成public的属性和方法都可以在任何地方进行访问。  
private：所有定义成private的属性和方法都只能在类定义内部进行访问。   
protected： 所有定义成protected的属性和方法可以从类定义内部进行访问，也可以从子类中访问。  
> angular2 中类中的属性和方法默认都是public类型。。。  

3. 定义接口  
编程语言中子类的概念允许我们把所有子类的实例当成相同的对象看待，这是基于这样一种观点：这些子类都是某个一般化对象的特殊版本。
但是这不意味着这些对象必须是同一个类的实例，或者这些对象的接口是完全相同的。这些对象可能只有一些共同的属性，但在特殊的上下文
里面他们依然被当成相同的对象看待。