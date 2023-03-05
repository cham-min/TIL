# 목차

- [API Reference](#api-reference)
  - [Middleware API](#middleware-api)
    - [createSagaMiddleware(options)](#createsagamiddlewareoptions)
  - [Effect creators](#effect-creators)
    - [take(pattern)](#takepattern)
    - [take(channel)](#takechannel)
    - [takeEvery(pattern, saga, ...args)](#takeeverypattern-saga-args)
    - [takeLatest(pattern, saga, ...args)](#takelatestpattern-saga-args)
    - [all([...effects])](#alleffects)
    - [put(action)](#putaction)
    - [call(fn, ...args)](#callfn-args)
    - [fork(fn, ...args)](#forkfn-args)
    - [cancel(task)](#canceltask)
    - [select(selector, ...args)](#selectselector-args)
    - [throttle(ms, pattern, saga, ...args)](#throttlems-pattern-saga-args)
    - [debounce(ms, pattern, saga, ...args)](#debouncems-pattern-saga-args)
- [Ref](#ref)

<br>

# API Reference

## Middleware API

### `createSagaMiddleware(options)`

리덕스 미들웨어를 생성하고 리덕스 스토어에 사가를 연결할 때 사용한다.

```javascript
// configureStore.js
import createSagaMiddleware from "redux-saga";
import reducer from "./path/to/reducer";

export default function configureStore(initialState) {
  const sagaMiddleware = createSagaMiddleware();
  return {
    ...createStore(
      reducer,
      initialState,
      applyMiddleware(/* other middleware, */ sagaMiddleware)
    ),
    runSaga: sagaMiddleware.run,
  };
}
```

```javascript
// main.js
import configureStore from "./configureStore";
import rootSaga from "./sagas";

const store = configureStore();
store.runSaga(rootSaga);
```

<br>

## Effect creators

- 아래의 각 함수는 일반적인 JavaScript 객체를 반환하며 어떤 실행도 하지 않으며, 실행은 미들웨어에 의해 수행된다.
- 미들웨어는 각 Effect 객체를 검토하여 적절한 액션을 수행한다.

<br>

### `take(pattern)`

> 간단하게 말해서 액션을 대기하는 함수이다. 예시로 take('LOG_IN', logIn)의 경우, LOG_IN 액션을 기다리다 실행되면 logIn 함수를 실행한다.

스토어에서 지정된 액션을 대기하도록 미들웨어에 지시하는 Effect 객체를 생성한다. 제너레이터는 매치되는 패턴의 액션이 디스패치 될 때 까지 일시 중단된다.

`yield take(pattern)`의 결과는 디스패치된 액션의 객체이다. `pattern`은 다음 규칙을 따라서 해석된다.

- 만약 인자없이 `take`가 호출되거나 `*`로 호출되면 디스패치된 모든 액션들이 매치된다. 예를 들어서 `take()`는 모든 액션들과 매치된다.
- function인 경우, `pattern(action)`이 참일 때 액션이 매치된다. 예를 들어서 `take(action => action.entities)`는 truthy한 `entities`필드를 가진 모든 액션들과 매치된다.
- String인 경우, 액션은 `action.type === patern`일 때 매치된다. 예를 들어서 `take(INCREMENT_ASYNC)`
- array인 경우, 배열의 각 항목은 앞서 언급한 규칙과 일치하며, 문자열과 함수가 섞인 배열도 지원된다.

미들웨어는 특별한 액션인 `END`를 제공한다. 만약 `END`액션을 디스패치하면 `take` Effect 객체에 의해서 차단된 모든 사가들이 지정된 패턴과 관계없이 종료된다. 종료된 사가에 여전히 실행중인 fork된 작업이 있는 경우 모든 하위 작업들이 종료될 때까지 대기하다가 종료된다.

<br>

### `take(channel)`

`take(channel)` 함수는 미들웨어에게 지정된 채널로부터 메시지를 기다리도록 지시하는 Effect 객체를 생성한다. 이 함수를 호출하면 생성된 Generator는 해당 채널에서 지정된 메시지가 발생할 때까지 일시 중지된다. 지정된 채널이 이미 닫혀있다면, `take(pattern)`함수와 마찬가지로 Generator를 즉시 종료시킨다.

> 여기서 채널은 task간 메시지를 주고받기 위한 객체이다. 보낸 메시지를 관심있는 Receiver가 요청할때까지 메시지는 대기하고 해당 메시지가 사용할 수 있을때까지 Receiver는 대기한다. 채널은 비동기적인 메시지 전송을 담당하며, 이를 활용하여 Redux-Saga에서 복잡한 비동기 로직을 쉽게 처리할 수 있다.

<br>

### `takeEvery(pattern, saga, ...args)`

> while(true) { yield take() }문은 동기적으로 동작하지만, takeEvery() 함수는 비동기적으로 동작한다. while문은 직관적이지 않기 때문에 takeEvery() 함수를 많이 사용한다.

`takeEvery()`함수는 지정된 패턴에 매칭되는 액션이 Store에 디스패치될 때마다 saga를 생성하고 실행한다. 예를 들어서 `takeEvery('FETCH_DATA', fetchData)`함수를 호출하면, `FETCH_DATA`액션이 발생할 때마다 `fetchData` saga가 생성되고 실행된다.

`takeEvery()` 함수는 `take()` 함수와 마찬가지로 Effect 객체를 생성하지만, 내부적으로 루프를 돌면서 액션을 계속 감시하고, 새로운 액션이 발생하면 새로운 saga를 생성하여 실행한다.

- `pattern`(String | Array | Function) : 패턴에 대한 자세한 내용은 `take(pattern)`을 보면서 이해하고, 지정된 패턴에 매칭되는 액션을 대상으로 한다.
- `saga`(Function) : 생성할 saga 함수이며, Generator 함수로 작성된다.
- `args`(Array<any>) : saga 함수에 전달될 추가 인자이다. `takeEvery` 함수는 인자 리스트에 액션을 추가하는데, saga 함수 가장 마지막 인자로 액션이 전달된다.

예시

```javascript
import { takeEvery } from "redux-saga/effects"

function* fetchUser(action) {
  ...
}

function* watchFetchUser() {
  yield takeEvery('USER_REQUESTED', fetchUser)
}
```

- `takeEvery` 함수를 사용하여 `USER_REQUESTED` 액션에 대해 `fetchUser` 작업을 시작할 수 있도록 `watchFetchUser` 제너레이터 함수를 생성한다.
- Redux Store에서 `USER_REQUESTED` 액션이 디스패치되면, `watchFetchUser` 함수가 이를 감지하여 `fetchUser` 함수를 호출한다.

추가

`takeEvery` 함수는 `take`와 `fork`를 사용하여 구현된 고수준 API이다. 만약 `takeEvery`를 하위 수준의 이펙트를 사용하여 구현한다면 아래와 같다.

```javascript
const takeEvery = (patternOrChannel, saga, ...args) =>
  fork(function* () {
    while (true) {
      const action = yield take(patternOrChannel);
      yield fork(saga, ...args.concat(action));
    }
  });
```

`takeEvery` 함수는 동시에 여러 액션을 처리할 수 있다. 예를 들어서 위 예시에서 `USER_REQUESTED` 액션이 디스패치 되면 이전의 `fetchUser` 작업이 끝나지 않더라도 새로운 `fetchUser` 작업이 시작된다. 만약 사용자가 버튼을 연속으로 빠르게 두 번 클릭하면, 첫 번째 클릭으로 시작된 `fetchUser` 작업이 끝나지 않았음에도 두 번째 클릭으로 새로운 `USER_REQUESTED` 액션이 디스패치 되어서 새로운 `fetchUser` 작업이 시작된다.

하지만 `takeEvery` 함수는 작업의 응답 순서를 보장하지 않는다. 작업의 응답 순서를 보장하기 위해서는 `takeLatest`를 사용해야 한다.

<br>

### `takeLatest(pattern, saga, ...args)`

> `takeEvery()`의 경우 사용자가 연속으로 두 번 클릭한 경우, 전부 요청이 가지만 `takeLatest()`의 경우 사용자가 앞서 몇 번을 클릭하더라도 이미 완료되지 않은 요청 중 가장 최근에 보낸 요청만 서버에 전송된다(이미 완료된 요청은 취소되지 않는다). 가장 최근에 실행된 task만 수행하는 `takeLatest()`와 반대로 가장 처음에 실행된 task를 수행하는 함수는 `takeLeading()`이다.

`takeLatest` 액션Store에서 디스패치된 각 액션에 대해 `pattern`과 일치하는지 확인하고, 매칭되는 액션에 대해 새로운 saga task를 시작한다. 이전에 시작된 saga task가 아직 실행 중인 경우, 새로운 task가 시작됨에 따라 이전 task는 자동으로 취소된다.

- `pattern`(String | Array | Function) : `take(pattern)` 내용을 참조
- `saga`(Function) : Generator 함수이다.
- `args`(Array<any>) : 시작된 task에 전달할 인자이다. `takeLatest`는 인자 목록에 들어오는 액션을 추가한다. 액션은 saga 함수에 제공되는 마지막 인자가 된다.

예시

```javascript
import { takeLatest } from `redux-saga/effects`

function* fetchUser(action) {
  ...
}

function* watchLastFetchUser() {
  yield takeLatest('USER_REQUESTED', fetchUser)
}
```

위 예시는 `takeLatest` 함수를 사용하여 `USER_REQUESTED` 액션이 디스패치될 때마다 `fetchUser` task를 시작하는 코드이다.

`takeLatest` 함수는 이전에 시작된 task가 아직 실행 중인 경우, 새로운 task가 시작됨에 따라 이전 task를 자동으로 취소한다. 만약 사용자가 연속해서 여러 개의 `USER_REQUESTED` 액션을 빠르게 트리거할 경우, 가장 최근에 트리거된 액션만 실행되고 나머지는 무시된다.

`watchLastFetchUser` 제너레이터 함수는 `takeLatest` 함수를 사용하여 `USER_REQUESTED` 액션을 감시하고, 이 액션이 발생하면 `fetchUser` task를 시작한다. 최근에 디스패치된 액션에 대한 처리만 보장한다.

추가

```javascript
const takeLatest = (patternOrChannel, saga, ...args) =>
  fork(function* () {
    // 가장 최근에 시작된 task를 저장한다.
    let lastTask;
    while (true) {
      const action = yield take(patternOrChannel);
      if (lastTask) {
        yield cancel(lastTask);
      }
      lastTask = yield fork(saga, ...args.concat(action));
    }
  });
```

위 코드는 `takeLatest` 함수를 구현하는 방법의 예시이다. `takeLatest` 함수는 `take`와 `fork`를 사용하여 구현된 고수준 API이다. 액션을 감지할 `patternOrChannel`, 실행할 task인 `saga`, 그리고 `args` 배열을 매개변수로 받는다.

무한루프를 실행하여 `take(patternOrChannel)`로부터 액션을 기다린다. 액션이 발생하면 `lastTask`가 이미 존재하면, 이전에 시작된 task를 `cancel` 함수를 이용하여 취소한다. 그리고 새로운 task를 `fork` 함수를 이용하여 시작한다. `lastTask` 변수에는 새로 시작된 task를 할당한다. 이를 통해서 `takeLatest` 함수는 가장 최근에 실행된 task만 수행하도록 보장한다.

<br>

### `all([...effects])`

- 미들웨어에게 여러 개의 Effect를 병렬적으로 실행하고, 모든 Effect가 완료될 때까지 기다리는 Effect 객체를 생성한다.
- 이 함수는 `Promise.all`과 유사한 동작을 한다.

예시

```javascript
import { fetchCustomers, fetchProducts } from './path/to/api'
import { all, call } from `redux-saga/effects`

function* mySaga() {
  const [customers, products] = yield all([
    call(fetchCustomers),
    call(fetchProducts)
  ])
}
```

위 예시에서 `fetchCustomers`와 `fetchProducts` 두 개의 API 호출을 병렬로 실행하고, 두 API 호출이 모두 완료될 때까지 기다린다. 이 때 `call` Effect를 사용하여 blocking call을 수행한다. 이후 `all` 함수를 호출한 결과를 배열 형태로 받아 `customers`와 `products`라는 변수에 할당한다. 두 API 호출이 모두 완료되면 해당 결과를 배열 형태로 받을 수 있게 된다.

<br>

### `put(action)`

- 액션을 디스패치하는 함수
- 미들웨어가 스토어에 액션 디스패치를 예약하는 Effect 객체를 생성한다.
- 해당 디스패치는 즉시 발생하지 않을 수 있고 다른 태스크가 saga 태스크 큐에서 먼저 실행되고 있거나 진행중인 경우 더욱 그렇다.

<br>

### `call(fn, ...args)`

- 미들웨어에게 `fn`함수를 `args`를 인자로 호출하도록 지시하는 Effect 객체를 생성한다.
- `fn`(Function) : Generator 함수 또는 일반 함수로 Promise를 반환하거나 다른 값을 반환한다.
- `args`(Array<any>) : `fn`에 전달될 값의 배열이다.

<br>

### `fork(fn, ...args)`

> call과 fork의 차이점은 call은 동기 함수 호출(blocking)로 요청을 보내고 결과가 반환될 때까지 기다리며, fork는 비동기 함수 호출(non-blocking)로 요청을 보내고 반환과 상관없이 다음 코드가 실행된다.

- 미들웨어에게 `fn`함수를 non-blocking으로 호출하도록 지시하는 Effect 객체를 생성한다.
- `fn`(Function) : Generator 함수 또는 일반 함수로 Promise를 반환한다.
- `args`(Array<any>) : `fn`에 전달할 값의 배열이다.
- `fork` 함수는 Task 객체를 반환한다.

`fork`는 `call`과 마찬가지로 일반 함수와 제너레이터 함수 둘 다 호출할 수 있다. 하지만 `fork`는 호출 후에도 미들웨어가 Generator를 일시 중지하지 않는다. 대신 `fn`이 호출되면 즉시 Generator가 재개된다.

자식 태스크에서 발생한 에러는 자동으로 부모로 전파된다. fork된 태스크 중에서 처리되지 않은 에러가 발생하면, 해당 자식 태스크에서 발생한 에러로 인해 부모 태스크가 취소되며, 부모의 실행트리도 모두 취소된다.fork된 태스크의 취소는 아직 실행 중인 모든 fork 태스크를 자동으로 취소한다.

<br>

### `cancel(task)`

- 미들웨어에게 이전에 fork된 태스크를 취소하도록 지시하는 Effect 객체를 생성한다.
- `task`(Task) : 이전 `fork` 호출에서 반환된 Task 객체
- 해당 Effect 객체가 실행되면 미들웨어는 해당 Task가 실행 중인 Generator 함수를 취소하고, 자식 task도 재귀적으로 취소한다. task가 이미 완료되었다면 해당 Effect는 아무런 효과가 없다.

<br>

### `select(selector, ...args)`

- 미들웨어에게 현재 스토어의 상태에서 제공된 셀렉터를 호출하도록 지시하는 effect를 생성한다. 이는 `selector(getState(), ...args)` 결과를 반환한다.
- `selector`(Function) : `(state, ...args) => args` 형태의 함수로, 현재 상태(state)와 선택적으로 일부 인자를 가져와 현재 스토어 상태의 일부를 반환한다.
- `args`(Array<any>) : getState 이외에도 셀렉터에 선택적으로 전달할 인자배열이다.

`select()` 함수가 인자 없이 호출될 경우(ex. `yield select()`) 이펙트는 전체 state를 반환하며(`getState()` 결과와 같다), 매개변수가 주어질 경우 `selector(getState(), ...args)`를 실행하여 스토어의 현재 상태의 일부를 반환한다.

<br>

### `throttle(ms, pattern, saga, ...args)`

> `takeLatest`의 경우 서버에 요청을 연달아 두 번 보내는 경우, 요청을 취소하지 않고, 응답 두 개 중에서 한 개를 취소하여 한 번만 보낸다. 프론트 입장에서는 가장 마지막 요청만 보낸 것으로 보이나 서버의 입장은 다르다는 의미이다. 서버에서는 데이터가 두 번 저장되어서 같은 데이터가 두 번 저장되어 있는지 확인해야 한다. 이는 처음엔 정상적으로 동작한 것처럼 보이나 새로고침을 하면 서버에는 두 개의 데이터가 있으므로, 화면에도 두 개의 데이터가 있는 경우를 볼 수 있다. 이를 해결하기 위해서 `throttle()` 함수를 사용한다. 그렇지만 특수한 경우(ex. 요청이 많아서 DDoS 공격이 될 것 같을 때)를 제외하고 대부분 `takeLatest()`를 사용하고 중복된 데이터는 서버측에서 해결하는 편이다.

- `pattern`과 일치하는 스토어에 액션이 디스패치될 때마다 saga 함수를 실행한다.
- `throttle()` 함수는 버퍼링을 통해 하나의 액션만 처리하며 동시에 `ms` 동안 새로운 태스크를 생성하지 않는다.
- 특정 시간 동안 들어오는 액션을 무시하고 현재 처리 중인 태스크를 완료할 수 있다.
- `ms`(Number) : 액션이 처리를 시작한 후 무시할 시간
- `pattern`(String | Array | Function) : `take(pattern)`과 동일
- `saga`(Function) : Generator 함수
- `args`(Array<any>) : 실행할 태스크에 전달될 인자. `throttle`은 들어오는 액션을 인자 리스트에 추가한다.

예시

```javascript
import { call, put, throttle } from `redux-saga/effects`

function* fetchAutocomplete(action) {
  const autocompleteProposals = yield call(Api.fetchAutocomplete, action.text)
  yield put({type: 'FETCHED_AUTOCOMPLETE_PROPOSALS', proposals: autocompleteProposals})
}

function* throttleAutocomplete() {
  yield throttle(1000, 'FETCH_AUTOCOMPLETE', fetchAutocomplete)
}
```

위 코드에서 `FETCHED_AUTOCOMPLETE` 액션이 발생하면 `fetchAutocomplete` 태스크를 생성하는데, `throttle` 함수를 사용하여 이 태스크가 일정 시간 동안 여러번 생성되지 않도록 제어한다(`throttle` 함수가 연속적인 `FETCH_AUTOCOMPLETE`을 무시하여 서버에 요청을 flood하지 못하도록 함)

추가

```javascript
const throttle = (ms, pattern, task, ...args) =>
  fork(function* () {
    // 패턴에 맞는 액션을 처리할 채널 throttleChannel을 생성한다.
    const throttleChannel = yield actionChannel(pattern, buffers.sliding(1));

    while (true) {
      // 무한 루프를 돌면서 throttleChannel에서 액션을 받아온다.
      const action = yield take(throttleChannel);

      // 받아온 액션을 fork 함수를 이용하여 task 함수에 전달한다.
      yield fork(task, ...args, action);

      // ms 매개변수로 지정된 시간동안 대기하기 위해 delay 함수를 호출한다.
      yield delay(ms);
    }
  });
```

위 코드는 `take`, `fork`, `actionChannel`을 이용하여 구현된 고수준 API인 `throttle` 구현 방법이다. `throttle`은 일정 시간 동안 하나의 액션만 처리하도록 제한하는 기능을 제공한다. `ms` 매개변수로 지정된 시간 동안 `pattern`에 맞는 액션을 하나만 처리하도록 구현된다. 해당 기능을 통해서 처리되지 않은 액션이 쌓이는 것을 방지하고, 코드의 안정성을 높일 수 있다.

<br>

### `debounce(ms, pattern, saga, ...args)`

> 디바운싱과 쓰로틀링의 차이 : [쓰로틀링과 디바운싱, 제로초](https://www.zerocho.com/category/JavaScript/post/59a8e9cb15ac0000182794fa)

- Store에서 `pattern`과 일치하는 액션이 마지막으로 발생한 이후 `ms` 시간이 경과할 때까지 액션이 발생하지 않으면, 해당 액션을 처리하는 `saga`를 실행하는 함수이다.
- 해당 함수는 액션이 완전 settle될 때까지 `saga`를 호출하지 않도록 하여 안정성을 높인다.
- `ms` : 마지막 액션이 발생한 이후로 기다려야 할 시간을 지정한다.
- `pattern` : `take(pattern)` 참조
- `saga` : 호출할 Generator 함수이다.
- `...args` : 시작된 태스크에 전달할 인자의 배열이다. `debounce`는 입력된 액션을 인자 목록에 추가한다(액션은 saga에 제공되는 가장 마지막 인자이다).

예시

```javascript
import { call, put, debounce } from `redux-saga/effects`

function* fetchAutocomplete(action) {
  const autocompleteProposals = yield call(Api.fetchAutocomplete, action.text)
  yield put({type: 'FETCHED_AUTOCOMPLETE_PROPOSALS', proposals: autocompleteProposals})
}

// 1초 동안 FETCH_AUTOCOMPLETE 이벤트가 발생하지 않을 때마다 fetchAutocomplete를 호출하는 제너레이터.
function* debounceAutocomplete() {
  yield debounce(1000, 'FETCH_AUTOCOMPLETE', fetchAutocomplete)
}
```

위 코드는 `FETCH_AUTOCOMPLETE` 이벤트가 발생한 후 1초간 이벤트가 발생하지 않으면 `fetchAutocomplete` saga를 호출하는 예제이다.

<br>

# Ref

- [Redux-Saga docs](https://redux-saga.js.org/docs/api)
- [React로 NodeBird SNS 만들기, 제로초](https://www.inflearn.com/course/%EB%85%B8%EB%93%9C%EB%B2%84%EB%93%9C-%EB%A6%AC%EC%95%A1%ED%8A%B8-%EB%A6%AC%EB%89%B4%EC%96%BC)
