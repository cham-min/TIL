# 목차

- [제너레이터란?](#제너레이터란)
- [제너레이터 함수 정의 방법](#제너레이터-함수-정의-방법)
- [제너레이터 객체](#제너레이터-객체)
- [제너레이터의 활용](#제너레이터의-활용)
- [Ref](#ref)

<br>

# 제너레이터란?

- 코드 블록의 실행을 일시 중지했다가 필요한 시점에 재개할 수 있는 함수

- 제너레이터 함수는 함수 호출자에게 함수 실행의 제어권(일시 중지 및 재개)을 양도할 수 있다.

  - 함수 호출자는 함수를 호출한 이후 함수 실행을 제어할 수 없다.
  - 일반 함수를 호출하면 제어권이 함수에 넘어가고 함수 코드를 일괄 실행하게 된다.

- 제너레이터 함수는 함수 호출자와 양방향으로 함수의 상태를 주고받을 수 있다.
  - 일반 함수의 경우 함수가 실행되는 동안 함수 외부에서 함수 내부로 값을 전달하여 함수의 상태를 변경할 수 없다.
- 제너레이터 함수를 호출하면 제너레이터 객체를 반환한다.
  - 일반 함수를 호출하면 함수 코드를 일괄 실행하고 값을 반환한다.
  - 제너레이터 함수를 호출하면 함수 코드를 실행하는 것이 아니라 이터러블이면서 동시에 이터레이터인 제너레이터 객체를 반환한다.

<br>

# 제너레이터 함수 정의 방법

- 제너레이터 함수는 `function*` 키워드로 선언한다.
- 제너레이터 함수는 화살표 함수로 정의할 수 없다.
- 하나 이상의 `yield` 표현식을 포함한다.

```javascript
// 제너레이터 함수 선언문
function* genDecFunc() {
  yield 1;
}

// 제너레이터 함수 표현식
const genExpFunc = function* () {
  yield 1;
};

// 제너레이터 메서드
const obj = {
  *genObjMethod() {
    yield 1;
  },
};

// 제너레이터 클래스 메서드
class MyClass {
  *genClsMethod() {
    yield 1;
  }
}
```

<br>

# 제너레이터 객체

- 제너레이터 함수를 호출하면 일반 함수처럼 함수 코드 블록을 실행하는 것이 아니라 제너레이터 객체를 생성해 반환한다.
- 반환된 제너레이터 객체는 `Symbol.iterator` 메서드를 상속받는 이터러블이면서 `value`, `done` 프로퍼티를 갖는 이터레이터 리절트 객체를 반환하는 `next` 메서드를 소유하는 이터레이터다.

```javascript
function* genFunc() {
  yield 1;
  yield 2;
  yield 3;
}

const generator = genFunc();

console.log(Symbol.iterator in generator); // true
console.log("next" in generator); // true
```

<br>

제너레이터 객체는 `next` 메서드를 갖는 이터레이터이지만 이터레이터에는 없는 `return`, `throw` 메서드를 갖는다. 제너레이터 객체의 세 개의 메서드를 호출하면 다음과 같이 동작한다.

- `next` 메서드를 호출하면 제너레이터 함수의 `yield` 표현식까지 코드 블록을 실행하고 `yield`된 값을 `value` 프로퍼티 값으로, `false`를 `done` 프로퍼티 값으로 갖는 이터레이터 리절트 객체를 반환한다.
- `return` 메서드를 호출하면 인수로 전달받은 값을 `value` 프로퍼티 값으로, `true`를 `done` 프로퍼티 값으로 갖는 이터레이터 리절트 객체를 반환한다.

```javascript
function* genFunc() {
  try {
    yield 1;
    yield 2;
    yield 3;
  } catch (e) {
    console.error(e);
  }
}

const generator = genFunc();

console.log(generator.next()); // {value: 1, done: false}
console.log(generator.return("End!")); // {value: "End", done: true}
```

<br>

- `throw` 메서드를 호출하면 인수로 전달받은 에러를 발생시키고 `undefined`를 `value` 프로퍼티 값으로, `true`를 `done` 프로퍼티 값으로 갖는 이터레이터 리절트 객체를 반환한다.

```javascript
function* genFunc() {
  try {
    yield 1;
    yield 2;
    yield 3;
  } catch (e) {
    console.log(e);
  }
}

const generator = genFunc();

// next 메서드는 이터레이터 리절트 객체 ({value, done})를 반환한다.
// value 프로퍼티 : 첫 번째 yield 표현식에서 yield된 값 1이 할당.
// done 프로퍼티 : 제너레이터 함수가 끝까지 실행 되었는지 나타내는 boolean 값 할당.
console.log(generator.next()); // {value: 1, done: false}
console.log(generator.throw("Error")); // {value: undefined, done: true}

// 만약 throw를 하지 않고 계속 next 메서드를 호출한다면?
console.log(generator.next()); // {value: 2, done: false}
console.log(generator.next()); // {value: 3, done: false}
console.log(generator.next()); // {value: undefined, done: true}
```

<br>

- 또 다른 예시로 제너레이터 함수의 흐름을 파악해보자.

```javascript
function* genFunc() {
  // yield된 값 1은 이터레이터 리절트 객체의 value 프로퍼티에 할당.
  // x 변수에는 아무 값도 할당되지 않음. x 변수의 값은 next 메서드 두 번째 호출 시 결정
  const x = yield 1;

  // 두 번째 next 메서드 호출 시 전달한 인수 10은 첫 번째 yield 표현식을 할당받는 x 변수에 할당.
  // const x = yield 1;은 두 번째 next 메서드를 호출할 때 완료된다.
  // yield된 값 x + 10은 이터레이터 리절트 객체의 value 프로퍼티에 할당.
  const y = yield x + 10;

  // 세 번째 next 메서드 호출 시 전달한 인수 20은 두 번째 yield 표현식을 할당받는 y 변수에 할당.
  // const y = yield (x + 10);는 세 번째 next 메서드를 호출했을 때 완료된다.
  // 세 번째 next 메서드를 호출하면 함수 끝까지 실행된다.
  // 제너레이터 함수의 반환값인 x + y는 이터레이터 리절트 객체의 value 프로퍼티에 할당.
  // 일반적으로 제너레이터의 반환값은 의미가 없으며 return은 종료의 의미로만 사용해야 한다.
  return x + y;
}

const generator = genFunc(0);

// 처음 호출하는 next 메서드에는 인수를 전달하지 않으며, 만약 전달 시 무시된다.
let res = generator.next();
console.log(res); // {value: 1, done: false}

res = generator.next(10);
console.log(res); // {value: 20, done: false}

res = generator.next(20);
console.log(res); // {value: 30, done: false}
```

<br>

# 제너레이터의 활용

### 무한 제너레이터

```javascript
function* infinite() {
  let index = 0;

  while (true) {
    yield index++;
  }
}

const generator = infinite();

console.log(generator.next().value); // 0
console.log(generator.next().value); // 1
console.log(generator.next().value); // 2
// ...
```

<br>

# Ref

- 모던 자바스크립트 Deep Dive, 이웅모
