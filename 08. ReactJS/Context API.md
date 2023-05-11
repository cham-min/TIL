# 목차

- [Context API](#context-api)
  - [Context 생성하기](#context-생성하기)
  - [Provider](#provider)
  - [Context 읽어오기](#context-읽어오기)
- [예시](#예시)
- [Ref](#ref)

<br>

# Context API

- React에서 제공하는 API로 컴포넌트들에게 동일한 Context(맥락)을 전달하는데 사용한다. 즉 여러 컴포넌트들에게 동일한 값을 접근할수도록 만들어주는 API라고 할 수 있다.
- Context API와 `useState`, `useReducer`를 통해서 전역 상태관리와 같은 형태로 사용할 수 있다.
- React가 데이터를 전달하는 원칙은 부모 컴포넌트에서 자식 컴포넌트에게 데이터를 전달하는 단방향성이다. 단방향성은 애플리케이션의 안정성과 흐름을 단순화하는데 유용하지만, 많은 단계를 거쳐서 자식 컴포넌트에 데이터를 전달해야 한다는 단점이있다.
- 컴포넌트 구조를 잘 설계하고 합성을 적극적으로 활용하여 데이터를 넘겨야하는 상황을 만들지 않는 것이 최선이지만, 이것으로 해결되지 않을 때 Context API를 사용할 수 있다.

<br>

### Context 생성하기

- `createContext`를 통해서 새로운 Context를 생성할 수 있다.
- `createContext`함수를 호출하면 Context 객체가 리턴된다.
- 함수를 호출할 때 default 값을 인자로 전달할 수 있다.
- default 값은 Context의 초기값이 아니라, 다른 컴포넌트가 Context에 접근하려고 하지만 Provider로 감싸져있지 않은 상황에 사용될 값이다.

```javascript
const ColorContext = createContext({ color: 'black' });
```

<br>

### Provider

- Context 객체에는 Provider라는 프로퍼티가 있으며 리액트 컴포넌트이다. Provider 컴포넌트를 이용해서 만들어진 Context의 특정한 값을 전달한다.
- Provider는 `value` props를 가지고 있으며, `value`에 할당된 값을 Provider 컴포넌트 하위에 있는 어떤 컴포넌트에서라도 접근할 수 있는 기능이있다.

<br>

### Context 읽어오기

- `useContext()`라는 내장 Hook을 사용하여 Context value에 접근할 수 있다.
- `useContext()` 파라미터로는 어떤 Context를 사용할지 전달한다.

```javascript
const color = useContext(ColorContext);

// `useContext`의 결과는 Context의 default 값이다.
console.log(color); // { color: 'black' }
```

<br>

# 예시

```javascript
import { createContext, useState } from 'react';

const ColorContext = createContext({
  state: { color: 'black', subcolor: 'red' },
  actions: {
    setColor: () => {},
    setSubcolor: () => {},
  },
});

export const ColorProvider = ({ children }) => {
  const [color, setColor] = useState('black');
  const [subcolor, setSubcolor] = useState('red');

  const value = {
    state: { color, subcolor },
    actions: { setColor, setSubcolor },
  };
  return (
    <ColorContext.Provider value={value}>{children}</ColorContext.Provider>
  );
};

export default ColorContext;
```

위와 같이 Context와 Provider를 생성하고 Context value를 사용할 컴포넌트 상단에 감싸준다.

```javascript
function App() {
  return (
    <ColorProvider>
      <div>
        <SelectColors />
        <ColorBox />
      </div>
    </ColorProvider>
  );
}
```

<br>

하위 컴포넌트에서는 데이터를 props로 전달받지 않고 `useContext` Hook을 사용하여 값을 꺼내서 사용할 수 있다.

```javascript
const { state } = useContext(ColorContext);
const { actions } = useContext(ColorContext);
```

<br>

# Ref

- 리액트를 다루는 기술(VELOPERT)
- [원티드 프리온보딩 인턴십 강의](https://codesandbox.io/s/context-advanced-etst2w?file=/src/ThemeContext.js:258-268)
