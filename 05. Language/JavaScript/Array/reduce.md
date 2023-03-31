# Array.prototype.reduce()

`reduce` 메서드는 자신을 호출한 배열을 모든 요소를 순회하며 인수로 전달받은 리듀서 함수(이하 콜백 함수)를 반복 호출한다. 그리고 콜백 함수의 반환값을 다음 순회 시에 콜백 함수의 첫 번째 인수로 전달하면서 콜백 함수를 호출하여 하나의 결과 값을 만들어 반환한다. 이때 원본 배열은 변경되지 않는다.

리듀서 함수(콜백 함수)는 네 개의 인자를 가진다.

1. 누산기 (acc)
2. 현재값 (cur)
3. 현재 인덱스 (idx)
4. 원본 배열 (src)

리듀서 함수의 반환 값은 누산기에 할당되고, 누산기는 순회 중 유지되므로 최종 결과는 하나의 값이 된다.

<br>

# 구문

```
배열.reduce(callback[, initialValue])
```

### 매개변수

1. `callback`

   배열의 각 요소에 대해 실행할 함수, 네 가지 인수를 받는다.

   - `accumulator`  
     누산기는 콜백의 반환값을 누적한다. 콜백의 이전 반환값 또는 `initialValue` 값을 제공한 경우 `initialValue`의 값이다.

   - `currentValue`  
     처리할 현재 요소이다.

   - `currentIndex` (optional)  
     처리할 현재 요소의 인덱스이며 `initialValue`를 제공한 경우 0, 아니면 1부터 시작한다.

   - `array` (optional)  
     `reduce()`를 호출한 배열

2. `initialValue` (optional)

   `callback` 최초 호출에 첫 번째 인수에 제공하는 값으로 초기값을 제공하지 않으면 배열의 첫 번째 요소를 사용한다. 빈 배열에서 초기값 없이 `reduce()`를 호출하면 `TypeError`가 발생한다.

<br>

# 작동 방식

```javascript
const sum = [1, 2, 3, 4].reduce(
  (accumulator, currentValue, index, array) => accumulator + currentValue,
  0
);

console.log(sum); // 10
```

| 구분         | accumulator | currentValue | index | array        | 콜백 함수의 반환값              |
| ------------ | ----------- | ------------ | ----- | ------------ | ------------------------------- |
| 첫 번째 순회 | 0 (초기값)  | 1            | 0     | [1, 2, 3, 4] | 1 (accumulator + currentValue)  |
| 두 번째 순회 | 1           | 2            | 1     | [1, 2, 3, 4] | 3 (accumulator + currentValue)  |
| 세 번째 순회 | 3           | 3            | 2     | [1, 2, 3, 4] | 6 (accumulator + currentValue)  |
| 네 번째 순회 | 6           | 4            | 3     | [1, 2, 3, 4] | 10 (accumulator + currentValue) |

<br>

# 사용 예시

### 배열 총합 구하기

```javascript
const arr = [0, 1, 2, 3];

const sumArr = arr.reduce((acc, cur) => acc + cur, 0);
console.log(sumArr); // 6

// 추가: 객체 배열 합산
const arr = [{ x: 1 }, { x: 2 }, { x: 3 }];

const sumArr = arr.reduce((acc, cur) => acc + cur.x, 0);
console.log(sumArr); // 6
```

### 배열 평균 구하기

```javascript
const arr = [1, 2, 3, 4];

const average = arr.reduce((acc, cur, i, { length }) => {
  return i === length - 1 ? (acc + cur) / length : acc + cur;
}, 0);

console.log(average); // 2.5
```

| 구분         | acc        | cur | 반환        |
| ------------ | ---------- | --- | ----------- |
| 첫 번째 순회 | 0 (초기값) | 1   | 0 + 1       |
| 두 번째 순회 | 1          | 2   | 1 + 2       |
| 세 번째 순회 | 3          | 3   | 3 + 3       |
| 네 번째 순회 | 6          | 4   | (6 + 4) / 4 |

### 배열 최대값, 최소값 구하기

```javascript
const arr = [1, 2, 3, 4];

const max = arr.reduce((acc, cur) => (acc > cur ? acc : cur), 0);
console.log(max); // 4

const min = arr.reduce((acc, cur) => (acc < cur ? acc : cur), 0);
console.log(min); // 1
```

### 중첩 배열 평탄화

```javascript
const arr = [1, [2, 3], 4, [5, 6]];

const flatten = arr.reduce((acc, cur) => acc.concat(cur), []);

console.log(flatten); // [1, 2, 3, 4, 5, 6]
```

| 구분         | acc          | cur    | 반환               |
| ------------ | ------------ | ------ | ------------------ |
| 첫 번째 순회 | [ ] (초기값) | 1      | [1]                |
| 두 번째 순회 | [1]          | [2, 3] | [1, 2, 3]          |
| 세 번째 순회 | [1, 2, 3]    | 4      | [1, 2, 3, 4]       |
| 네 번째 순회 | [1, 2, 3, 4] | [5, 6] | [1, 2, 3, 4, 5, 6] |

### 배열 중복 제거

```javascript
let arr = [1, 2, 1, 2, 3, 4, 3, 4];

let result = arr.sort().reduce((acc, cur) => {
  const length = acc.length;
  if (length === 0 || acc[length - 1] !== cur) {
    acc.push(cur);
  }
  return acc;
}, []);

console.log(result); // [1,2,3,4]
```

| 구분           | acc          | cur | 반환         |
| -------------- | ------------ | --- | ------------ |
| 첫 번째 순회   | [ ] (초기값) | 1   | [1]          |
| 두 번째 순회   | [1]          | 1   | [1]          |
| 세 번째 순회   | [1]          | 2   | [1, 2]       |
| 네 번째 순회   | [1, 2]       | 2   | [1, 2]       |
| 다섯 번째 순회 | [1, 2]       | 3   | [1, 2, 3]    |
| 여섯 번째 순회 | [1, 2, 3]    | 3   | [1, 2, 3]    |
| 일곱 번째 순회 | [1, 2, 3]    | 4   | [1, 2, 3, 4] |
| 여덟 번째 순회 | [1, 2, 3, 4] | 4   | [1, 2, 3, 4] |

- `includes()`를 활용하여 간단하게 줄이는 방법도 있다.

```javascript
let arr = [1, 2, 1, 2, 3, 4, 3, 4];

let result = arr.reduce((acc, cur, idx) => {
  if (!acc.includes(cur)) acc.push(cur);
  return acc;
}, []);
```

<br>

# Ref

- [MDN : Array.prototype.reduce()
  ](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)
- 모던 자바스크립트 Deep Dive
