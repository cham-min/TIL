# 목차

- [redux-saga](#redux-saga)
  - [redux-saga 설치](#redux-saga-설치)
  - [redux-saga 원리](#redux-saga-원리)

<br>

# redux-saga

리덕스 사가는 앱의 부수 작용(비동기 데이터 페칭)을 보다 쉽게 관리하고, 효율적이고, 테스트하기 쉽고, 오류를 더 잘 처리하는 것에 초점이 맞춰진 라이브러리이다. 기존 요청을 취소 처리하거나 여러 API를 순차적으로 호출하는 비동기 작업을 다루는 상황에 유용하다. 리덕스 사가는 아래의 특징을 가지고 있다.

- 액션을 모니터링하고 있다가, 특정 액션이 발생하면 이에 따라 특정 작업을 하는 방식으로 사용한다.

- redux-thunk로 못하는 다양한 작업을 수행할 수 있다.
  - 비동기 작업을 할 때 기존 요청을 취소 처리
  - 특정 액션이 발생했을 때 이에 따라 다른 액션이 디스패치, 혹은 자바스크립트 코드 실행
  - 웹소켓을 사용하는 경우 Channel 기능을 사용하여 효율적으로 코드 관리
  - API 요청이 실패했을 때 재요청하는 작업

<br>

### redux-saga 원리

리덕스 사가는 Generator를 사용하여 비동기 흐름을 쉽게 읽고, 쓰고, 테스트할 수 있다. Generator를 통해 모니터링이 어떻게 이루어지는지, redux-saga의 모니터링 방식을 이해해보자.

```javascript
function* watchGenerator() {
  console.log("모니터링 시작");
  while (true) {
    const action = yield;
    if (action.type === "HELLO") {
      console.log("안녕");
    }
    if (action.type === "BYE") {
      console.log("잘가");
    }
  }
}

const watch = watchGenerator();
watch.next(); // 모니터링 시작, {value: undefined, done: false}
watch.next({ type: "HELLO" }); // 안녕, {value: undefined, done: false}
watch.next({ type: "BYE" }); // 잘가, {value: undefined, done: false}
```

<br>

# Ref

- [redux-saga 공식문서](https://redux-saga.js.org/docs/About)
- [벨로퍼트와 함께하는 모던 리액트](https://react.vlpt.us/redux-middleware/10-redux-saga.html)
