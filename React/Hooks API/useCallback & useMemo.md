# 목차

- [useCallback](#usecallback)
  - [useCallback 목적](#usecallback-목적)

<br>

# useCallback

```javascript
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]); // a 혹은 b 변수값이 바뀌었을 때만 새로운 함수를 생성한다.
```

- 메모이제이션된 콜백을 반환한다. 즉 함수를 메모이제이션 하기 위해서 사용하는 hook이다.
- 첫 번째 파라미터에는 생성하고 싶은 함수를, 두 번째 파라미터에는 어떤 값이 바뀌었을 때 함수를 새로 생성할지 명시하는 의존성 배열(dependency array)을 넣는다.
- `useCallback` hook을 사용하면 dependency array 값이 바뀌지 않는 한 만들어 놓은 함수를 계속해서 재사용한다.
  - Memoization : 컴퓨터 프로그램이 동일한 계산을 반복해야 할 때, 이전에 계산한 값을 메모리에 저장함으로써 동일한 계산의 반복 수행을 제거하여 프로그램 실행 속도를 빠르게 하는 기술이다(출처 : [위키백과](https://ko.wikipedia.org/wiki/%EB%A9%94%EB%AA%A8%EC%9D%B4%EC%A0%9C%EC%9D%B4%EC%85%98) ).

<br>

### useCallback 목적

React 컴포넌트 내에 함수가 선언 되어 있다면, 해당 함수는 컴포넌트가 리렌더링될 때마다 **새로 만들어진 함수를 사용**한다. 대부분의 경우 성능 상 큰 문제는 없지만 `useCallback`을 사용하여 렌더링이 자주 발생하거나 렌더링 할 컴포넌트의 개수가 많아질 때 최적화할 수 있다.

<br>
