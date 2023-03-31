# 목차

- [useReducer](#usereducer)
  - [dispatch 함수](#dispatch-함수)
  - [reducer 함수](#reducer-함수)
  - [카운터 구현하기](#카운터-구현하기)
- [Ref](#ref)

<br>

# `useReducer`

`useState` 대체 함수로 더 다양한 컴포넌트 상황에 따라 다양한 상태를 다른 값으로 업데이트해 주고 싶을 때 사용하는 Hook이다.

다수의 하윗값을 포함하는 정적 로직을 만드는 경우, 다음 state가 이전 state에 의존적인 경우 `useState`보다 `useReducer`를 선호한다.

```javascript
const [state, dispatch] = useReducer(reducer, initialState, init);
```

- `state` : 컴포넌트에서 사용할 상태
- `dispatch` : 컴포넌트 내에서 상태를 업데이트하기 위한 액션을 발생시키는 함수이다.
- `reducer` : 컴포넌트 외부에서 상태를 업데이트하는 함수로, `state`, `action` 객체를 파라미터로 받아 새로운 상태를 반환한다.
- `initialState` : 초기 상태 값
- `init` : 초기 함수로 상태를 지연 생성하기 위해서 사용한다.

<br>

### `dispatch` 함수

- 리듀서 함수에 전달할 액션(action) 객체를 받으며, 액션(action) 객체는 어떤 행동인지 나타내는 `type` 속성과 행동과 관련된 `데이터(payload)`를 담고 있다.

```javascript
<button onClick={() => dispatch({ type: "INCREMENT" })}>+</button>
```

<br>

### `reducer` 함수

- `dispatch` 함수에 의해 실행되며, 현재 상태(state), 액션(action) 객체를 파라미터로 받아 새로운 상태를 반환해주는 함수이다.
- `dispatch` 함수에 action을 넘기면, 리듀서 함수가 액션에 따라서 상태를 변경한다. 이때 리듀서 함수에는 액션에 따라 어떻게 변해야 하는지 정의한다.

```javascript
function reducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };
    case "DECREMENT":
      return { count: state.count - 1 };
    default:
      throw new Error("Unhandled Action");
    // useReducer Hook 에서는 일반적으로 위와 같이.
    // Redux reducer 에서는 state를 그대로 반환한다. => return state;
  }
}
```

<br>

### 카운터 구현하기

```javascript
const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };
    case "DECREMENT":
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({ type: "DECREMENT" })}>-</button>
      <button onClick={() => dispatch({ type: "INCREMENT" })}>+</button>
    </>
  );
}
```

<br>

# Ref

- [리액트 공식문서](https://ko.reactjs.org/docs/hooks-reference.html#usereducer)
- [벨로퍼트와 함께하는 모던 리액트](https://react.vlpt.us/redux/01-keywords.html)
- [React Hooks: useReducer 사용법, DaleSeo](https://www.daleseo.com/react-hooks-use-reducer/)
- [[React] 7. React hooks[3] - useReducer란?
  , 갓대희의 작은공간](https://goddaehee.tistory.com/311)
