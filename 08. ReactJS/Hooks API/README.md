# 목차

- [의존성 배열](#의존성-배열)
  - [의존성 배열 잘 설정하기](#의존성-배열-잘-설정하기)

<br>

# 의존성 배열

- A라는 요소가 온전히 동작하기 위해서 B, C, D등 다른 요소를 필요로할 때 A는 B, C, D에 의존하고 있다고 표현한다.
- B, C, D는 A의 의존성이라고 표현할 수 있다.

`useEffect`의 의존성 배열은 effect 함수가 의존하고 있는 요소들의 모음이라고 할 수 있다. 의존이라는 말이 잘 이해되지 않는다면 단순히 effect 함수가 사용하고 있는 외부의 값으로 이해하면 된다.

```javascript
function Component() {
  const [count, setCount] = useState(0);

  const effect = () => {
    document.title = `you clicked ${count} times`;
  };

  useEffect(effect, [count]);
}
```

위 예시에서 `effect` 함수는 `count`라는 외부의 값을 사용하고 있다. 따라서 `effect` 함수의 의존성은 `count`이므로 의존성 배열에 넣어야한다. 이러면 `useEffect`는 리렌더링 이후에 의존성 배열을 검사하여 값들이 변경되었을 경우 새로운 의존성을 가지고 `effect`를 실행시킨다.

<br>

### 의존성 배열 잘 설정하기

`useEffect`에서 버그가 발생하지 않도록 의존성 배열을 잘 설정하고 싶다면 아래 원칙을 지키면된다.

1. 모든 의존성을 빼먹지 말고 의존성 배열에 명시하기
2. 가능하다면 의존성을 적게 만들기

```javascript
// 의존성 나쁜 예시
const [count, setCount] = useState(0);

useEffect(() => {
  const intervalID = setInterval(() => {
    setCount(count + 1);
  }, 1000);

  return () => clearInterval(intervalID);
}, [count, setCount]);
```

```javascript
// `count`대신 함수를 인자로 사용하여 의존성 줄이기
const [count, setCount] = useState(0);

useEffect(() => {
  const intervalID = setInterval(() => {
    setCount((prevCount) => prevCount + 1);
  }, 1000);

  return () => clearInterval(intervalID);
}, [setCount]);
```
