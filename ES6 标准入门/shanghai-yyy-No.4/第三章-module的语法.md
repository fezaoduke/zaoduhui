����ǿ�����վ�����Կ��������ϲ�̫һ����

## module���﷨

ES6 ģ������˼�룬�Ǿ����ľ�̬����ʹ�ñ���ʱ����ȷ��ģ���������ϵ���Լ����������ı�����

ES6 ģ�鲻�Ƕ��󣬶���ͨ��`export`������ʽָ������Ĵ��룬��ͨ��`import`�������롣
���ط�ʽΪ`����Ч`��`����ʱ����`����`��̬����`���� ES6 �����ڱ���ʱ�����ģ����ء�

���ºô���û��̫������
+ ������ҪUMDģ���ʽ�ˣ����������������������֧�� ES6 ģ���ʽ��Ŀǰ��ͨ�����ֹ��߿⣬��ʵ�Ѿ���������һ�㡣
+ ������������� API ������ģ���ʽ�ṩ�����ٱ�������ȫ�ֱ�������navigator��������ԡ�
+ ������Ҫ������Ϊ�����ռ䣨����Math���󣩣�δ����Щ���ܿ���ͨ��ģ���ṩ��

ES6 ��ģ���Զ������ϸ�ģʽ������Ҫ��һ�㣺`ES6 ģ��֮�У������thisָ��undefined������Ӧ���ڶ������ʹ��this��`

### export���� �� import����
����������ļ���ģ�飩�ж�����ˣ���export��������һ���ļ���ģ�飩��ȥ�ã�import����

> һ��ģ�����һ���������ļ������ļ��ڲ������б������ⲿ�޷���ȡ�������ϣ���ⲿ�ܹ���ȡģ���ڲ���ĳ��������
�ͱ���ʹ��export�ؼ�������ñ�����

ʹ��export���Զ�������ͷ���������as���������������ͬ�����һ���壬�����������ȽϷ���֪��������ʲô��
```javascript
export var firstName = 'Michael';
export var lastName = 'Jackson';
export var year = 1958;

----------------

var firstName = 'Michael';
var lastName = 'Jackson';
var year = 1958;

export {firstName, lastName, year};

------------------

function v1() { ... }
function v2() { ... }

export {
  v1 as streamV1,
  v2 as streamV2,
  v2 as streamLatestVersion
};
```
��Ҫ�ر�ע����ǣ�`export����涨���Ƕ���Ľӿڣ�������ģ���ڲ��ı�������һһ��Ӧ��ϵ`��
���Ƿ��ں��ͳһ����������������Ҫʹ��{}����������ʹ�õı�����

����ʹ��`import`ʱ�أ��������õ�����ģ��ı������������ģ��һ�¡�������������Ҳ������as��

```javascript
import { lastName as surname } from './profile';

-------

import {myMethod} from 'util';
```
���ֻ��ģ������������·������ô�����������ļ������� JavaScript �����ģ���λ�á�

ע�⣺`import�����Ǳ���׶�ִ�еģ��ڴ�������֮ǰ��`�������ƺ�������������

Ҳ����ʹ��*����Ϊ`ģ����������`������ģ��������ص��Ǹ������ǿ��Ծ�̬�����ģ����Բ���������ʱ�ı䡣

### export defalut ����

������Ǹ�ģ���Ĭ���������`import`��ʱ�Ϳ��Բ���as�������ˣ�����ֱ�������������Ҳ���Բ���д{}�ˡ�
��Ϊ��Ĭ�����������һ��ģ��ֻ����һ��export default���

��������`����`��ʵ�����һ������default�ı��������������治�ܸ�����������䡣

```javascript
// ��ȷ
export var a = 1;

// ��ȷ
var a = 1;
export default a;

// ����
export default var a = 1;
```

### export��import����д��
�����һ��ģ��֮�У�����������ͬһ��ģ�飬import��������export���д��һ��


```javascript
export { foo, bar } from 'my_module';

// ��ͬ��
import { foo, bar } from 'my_module';
export { foo, bar };

// �ӿڸ���
export { foo as myFoo } from 'my_module';

// �������
export * from 'my_module';

export { es6 as default } from './someModule';

// ��ͬ��
import { es6 } from './someModule';
export default es6;
```

### ��ģ�鳣��

const�����ĳ���ֻ�ڵ�ǰ�������Ч����������ÿ�ģ��ĳ������������ļ�����
����˵һ��ֵҪ�����ģ�鹲�����Բ��������д����

```javascript
// constants.js ģ��
export const A = 1;
export const B = 3;
export const C = 4;

// test1.js ģ��
import * as constants from './constants';
console.log(constants.A); // 1
console.log(constants.B); // 3

// test2.js ģ��
import {A, B} from './constants';
console.log(A); // 1
console.log(B); // 3
```

### import()   

���ó�����

+ �������
```javascript
button.addEventListener('click', event => {
  import('./dialogBox.js')
  .then(dialogBox => {
    dialogBox.open();
  })
  .catch(error => {
    /* Error handling */
  })
});
```
+ ��������
```javascript
if (condition) {
  import('moduleA').then(...);
} else {
  import('moduleB').then(...);
}
```
+ ��̬��ģ��·��
```javascript
import(f())
.then(...);
```
Ҫע����ǣ�import()����ģ��ɹ��Ժ����ģ�����Ϊһ�����󣬵���then�����Ĳ�����
��ˣ�����ʹ�ö���⹹��ֵ���﷨����ȡ����ӿڡ�

```javascript
import('./myModule.js')
.then(({export1, export2}) => {
  // ...��
});
```