# 목차

- [Redux Wrapper for Next.js](#redux-wrapper-for-nextjs)
  - [등장 배경](#등장-배경)
  - [설치](#설치)
- [next-redux-wrapper 예시](#next-redux-wrapper-예시)
  - [공식문서 사용 예시](#공식문서-사용-예시)
  - [실전 사용 예시](#실전-사용-예시)
- [Ref](#ref)

<br>

# Redux Wrapper for Next.js

- [Redux Wrapper for Next.js(github)](https://github.com/kirill-konshin/next-redux-wrapper)
- Next.js와 Redux를 한 번에 가져오는 [HOC](https://github.com/cham-min/TIL/blob/main/React/Pattern/Higher-Order%20Components.md)이다.

<br>

### 등장 배경

React에서는 하나의 Redux store가 존재하지만, Next.js에서는 유저가 요청할 때마다 새로운 Redux store를 생성한다. 여기서 next-redux-wrapper는 모든 페이지에 제공되는 하나의 Redux store를 생성하여 같은 상태를 관리하기 위해 사용된다.

또한 Next.js의 `getInitialProps`에서(현재는 `getStaticProps`, `getStaticPaths`, `getSeverSideProps`를 사용) Redux `Store`에 접근하기 위해서는 next-redux-wrapper가 필요하다.

<br>

### 설치

```bash
npm install next-redux-wrapper react-redux --save
```

- `next-redux-wrapper`는 `react-redux`를 필요로하며, peer dependency로 의존하고 있다.

<br>

# next-redux-wrapper 예시

### 공식문서 사용 예시

- store.js

  ```javascript
  import { createStore } from "redux";
  import { createWrapper, HYDRATE } from "next-redux-wrapper";

  // 리듀서에는 반드시 HYDRATE 액션 핸들러가 있어야 한다.
  const reducer = (state = { tick: "init" }, action) => {
    switch (action.type) {
      case HYDRATE:
        return { ...state, ...action.payload };
      case "TICK":
        return { ...state, tick: action.payload };
      default:
        return state;
    }
  };

  // Redux의 createStore()를 사용하여 저장소(store)를 생성한다.
  const makeStore = (context) => createStore(reducer);

  // next-redux-wrapper의 createWrapper 함수를 통해서 저장소(store)를 생성한다.
  export const wrapper = createWrapper(makeStore, { debug: true });
  ```

  `makeStore` 함수가 호출될 때 Next.js 컨텍스트가 제공되고 `getStaticProps` 혹은 `getServerSideProps` 컨텍스트가 될 수 있다. 어떤 라이프사이클 함수를 래핑할 것인지에 따라서 달라진다. 아래 실전 예시 pages/index.js에선 `getServerSideProps`로 감싸보았다.

  Next.js에서 Redux를 사용할 때 `createWrapper`함수를 사용하여 Redux Store 인스턴스를 생성할 수 있다.

  첫 번째 인수로 받은 `makeStore`는 호출될 때마다 새로운 저장소를 반환한다. `createWrapper` 함수가 `makeStore`를 메모이제이션 할 필요 없도록 자동으로 처리해준다.

  두 번째 파라미터는 선택적으로 아래 두 가지를 받는다.

  - `debug`(boolean) : 디버그 로깅이 활성화 여부
  - `serializeState` and `deserializeState` : 리덕스 상태(state)를 직렬화, 역직렬화하는 커스텀 함수

<br>

### 실전 사용 예시

- store/configureStore.js

  ```javascript
  const { createStore } from 'redux';
  const { createWrapper } from 'next-redux-wrapper';

  import reducer from "../reducers";

  const configureStore = () => {
    const sagaMiddleware = createSagaMiddleware();
    const middlewares = [sagaMiddleware]
    const enhancer = process.env.NODE_ENV === 'production'
      ? compose(applyMiddleware(...middlewares))
      : composeWithDevTools(applyMiddleware(...middlewares))
    const store = createStore(reducer, enhancer);
    return store;
  };

  const wrapper = createWrapper(configureStore, {
      debug: process.env.NODE_ENV === 'development',
  });
  ```

  - `debug`(optional, boolean) : 디버그 로깅을 가능하도록 한다. `true`이면 redux에 대해서 더욱 자세한 설명을 확인할 수 있다.

<br>

- pages/\_app.js

  ```javascript
  import wrapper from "../store/configureStore";

  const App = () => {
    // 생략
  };

  export default wrapper.withRedux(App);
  ```

  - store를 \_app.js로 가져와서 `wrapper.withRedux()` HOC로 감싼다.
  - next-redux-wrapper 6버전 이후로 자동으로 `<Provider>`로 감싸기 때문에 해당 부분은 생략한다.
  - `pages/_app`에서 모든 페이지를 한 번에 감싸는 것을 권장한다. 그렇지 않으면 잠재적인 Race Condition으로 인해서 다른 컴포넌트를 렌더링 하는 동안 컴포넌트를 업데이트 할 수 없다.
    - Race Condition : 여러 개의 프로세스가 공유 자원에 동시 접근할 때 실행 순서에 따라 결과값에 영향을 줄 수 있는 상태

<br>

- reducers/index.js

  ```javascript
  import { HYDRATE } from "next-redux-wrapper";
  import { combineReducers } from "redux";

  import user from "./user";
  import post from "./post";

  const rootReducer = (state, action) => {
    switch (action.type) {
      case HYDRATE:
        console.log("HYDRATE", action);
        return action.payload;
      default: {
        const combinedReducer = combineReducers({
          user,
          post,
        });
        return combinedReducer(state, action);
      }
    }
  };

  export default rootReducer;
  ```

  - 공식문서 사용 예시에서 설명했듯이, 리듀서에는 `HYDRATE`를 포함한다.
  - `getStaticProps` 혹은 `getServerSideProps`를 가진 페이지를 열 때마다 `HYDRATE` 액션이 디스패치된다. `getStaticProps`와 `getServerSideProps`에서도 Redux store에 접근 가능하도록 하기 위한 처리이다.
  - 분리한 reducer는 `combineReducer`를 사용하여 합친다.

<br>

- pages/index.js

  ```javascript
  import React from "react";
  import { END } from "redux-saga";
  import axios from "axios";

  import wrapper from "../store/configureStore";

  // 메인 페이지를 그리는 컴포넌트 생략!

  // 메인 페이지를 그리기 전에 아래 코드가 서버에서 먼저 실행된다.
  // 데이터를 우선 채우고, 화면을 그리게된다.
  export const getServerSideProps = wrapper.getServerSideProps(
    (store) =>
      async ({ req }) => {
        // const cookie = req ? req.headers.cookie : "";
        // axios.defaults.headers.Cookie = "";
        // if (req && cookie) {
        //  axios.defaults.headers.Cookie = cookie;
        // }
        store.dispatch({
          type: LOAD_MY_INFO_REQUEST,
        });
        store.dispatch({
          type: LOAD_POSTS_REQUEST,
        });
        // 아래 두 코드는 서버 응답이 올 때까지 saga를 멈춘다.
        // 디스패치 결과가 프론트에서 바로 돌아오는 게 아니라 백엔드에서 응답받은 완성된 데이터 결과를 받을 수 있다.
        store.dispatch(END);
        await store.sagaTask.toPromise();
      }
  );
  ```

  - store/configureStore.js에서 생성한 `wrapper` 저장소에 `getInitialProps`, `getServerSideProps`, `getStaticPaths`, `getStaticProps` 라이프사이클 함수를 붙인다.
  - `getServerSideProps`내에서 `dispatch`로 실행된 결과는 리듀서의 `case HYDRATE:`로 전달되어 실행된다.

<br>

# Ref

- [next-redux-wrapper 깃허브](https://github.com/kirill-konshin/next-redux-wrapper)
- [React로 NodeBird SNS 만들기, 인프런](https://www.inflearn.com/course/%EB%85%B8%EB%93%9C%EB%B2%84%EB%93%9C-%EB%A6%AC%EC%95%A1%ED%8A%B8-%EB%A6%AC%EB%89%B4%EC%96%BC)
