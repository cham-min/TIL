# 목차

- [useRef](#useref)
- [사용 예시](#사용-예시)
  - [값을 저장할 때](#값을-저장할-때)
  - [DOM 요소에 접근할 때](#dom-요소에-접근할-때)

<br>

# `useRef`

인자로 넣은 `value`는 `ref`의 `current`에 저장된다.

```javascript
const ref = useRef(value);
console.log(ref); // { current: value }
```

<br>

`ref`의 `current` 값은 변경이 가능하다.

```javascript
ref.current = 'study'; // { current: 'study' }
```

반환된 `ref`는 전 생애주기를 통해 유지된다. 컴포넌트가 렌더링 되어도 unmount되기 전까지 값을 그대로 유지한다.

<br>

# 사용 예시

### 값을 저장할 때

> 원하지 않는 렌더링으로부터 자유로워진다.

- `state`의 경우 상태가 변경되면 렌더링하여 컴포넌트 내 변수 값을 초기화시킨다. 이때 일반 변수에 할당된 값은 초기값으로 초기화되며, `ref`는 `ref`의 값을 유지하고 있다.
- `ref`의 경우 값이 변경되어도 컴포넌트가 리렌더링되지 않아서 화면상 값이 유지된다. 즉, 변화는 감지되어야 하지만 렌더링은 발생시키면 안되는 경우 유용하다.

<br>

### DOM 요소에 접근할 때

- `input` 태그를 클릭하지 않아도 `focus()`를 주고싶은 경우
