# 목차

- [Memoization](#memoization)
- [useCallback](#usecallback)
  - [useCallback 목적](#usecallback-목적)
- [useMemo](#usememo)
  - [useMemo 목적](#usememo-목적)
- [Ref](#ref)

<br>

# Memoization

`useCallback`, `useMemo`를 학습하기에 앞서 메모이제이션을 우선 이해해야 했다. 메모이제이션이란 컴퓨터 프로그램이 동일한 계산을 반복해야 할 때, 이전에 계산한 값을 메모리에 저장함으로써 동일한 계산의 반복 수행을 제거하여 프로그램 실행 속도를 빠르게 하는 기술이다(출처 : [위키백과](https://ko.wikipedia.org/wiki/%EB%A9%94%EB%AA%A8%EC%9D%B4%EC%A0%9C%EC%9D%B4%EC%85%98) ).

<br>

# `useCallback`

```javascript
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]); // a 혹은 b 변수값이 바뀌었을 때만 새로운 함수를 생성한다.
```

- 메모이제이션된 콜백을 반환한다. 즉 함수를 메모이제이션 하기 위해서 사용하는 hook이다.
- 첫 번째 파라미터에는 사용하고 싶은 함수를, 두 번째 파라미터에는 어떤 값이 바뀌었을 때 함수를 새로 생성할지 명시하는 의존성 배열(dependency array)을 넣는다.
- `useCallback` hook을 사용하면 dependency array 값이 바뀌지 않는 한 만들어 놓은 함수를 계속해서 재사용한다.

<br>

### `useCallback` 목적

React 컴포넌트 내에 함수가 선언 되어 있다면, 해당 함수는 컴포넌트가 리렌더링될 때마다 **새로 만들어진 함수를 사용**한다. 대부분의 경우 성능 상 큰 문제는 없지만 `useCallback`을 사용하여 렌더링이 자주 발생하거나 렌더링 할 컴포넌트의 개수가 많아질 때 최적화할 수 있다.

<br>

# `useMemo`

```javascript
const memoizedValue = useMemo(() =>
  computeExpensiveValue(a, b);
, [a, b]);
```

- `useCallback`과 비슷하지만 메모이제이션된 함수를 반환하는 대신 메모이제이션된 **값**을 반환한다.
- `useMemo`를 사용하여 컴포넌트 내부에서 발생하는 연산을 최적화할 수 있다.

<br>

### useMemo 목적

컴포넌트 리렌더링이 일어났을 때, 값이 바뀌지 않는 경우에는 함수를 호출할 필요가 없다. 예를 들어서 덧셈을 계산하는 함수가 있을 때, `x + y`를 반환한다고 해보자. 여기서 `x`와 `y`의 값이 바뀌지 않는다면, 렌더링 할때마다 계산을 한다면 낭비이다.

`useMemo` 훅은 위와 같은 작업을 최적화할 수 있고, 렌더링 과정에서 특정 값이 바뀌었을 때만 연산을 실행하고, 바뀌지 않았다면 이전에 연산했던 결과를 다시 사용한다.

<br>

# Conclusion

> `useCallback`과 `useMemo`는 컴포넌트가 렌더링 될 때마다 불필요한 연산을 하지 않기 위한다는 점이 동일하며, `useCallback`은 '함수'를 매 번 생성하지 않고 재사용하기 위해서, `useMemo`는 '값'이 바뀌지 않으면 연산된 결과를 재사용 한다는 점의 차이가 있었다.

<br>

# Ref

- [리액트 공식문서](https://ko.reactjs.org/docs/hooks-reference.html#usecallback)
- 리액트를 다루는 기술, 김민준(VELOPERT)
