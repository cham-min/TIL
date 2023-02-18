# 목차

- [Redux Wrapper for Next.js](#redux-wrapper-for-nextjs)
  - [등장 배경](#등장-배경)
  - [설치](#설치)
  - [사용 방법](#사용-방법)
- [Ref](#ref)

<br>

# Redux Wrapper for Next.js

- [Redux Wrapper for Next.js(github)](https://github.com/kirill-konshin/next-redux-wrapper)
- Next.js와 Redux를 한 번에 가져오는 [HOC](https://github.com/cham-min/TIL/blob/main/React/Pattern/Higher-Order%20Components.md)이다.

<br>

### 등장 배경

React에서는 하나의 Redux store가 존재하지만, Next.js에서는 유저가 요청할 때마다 새로운 Redux store를 생성한다. 여기서 next-redux-wrapper는 모든 페이지에 제공되는 하나의 Redux store를 생성하여 같은 상태를 관리하기 위해 사용된다.

또한 Next.js의 `getInitialProps`에서(현재는 `getStaticProps`, `getStaticPaths`, `getSeverSideProps`를 사용하지만) Redux `Store`에 접근하기 위해서는 next-redux-wrapper가 필요하다.

<br>

### 설치

```bash
npm install next-redux-wrapper react-redux --save
```

- `next-redux-wrapper`는 `react-redux`를 필요로하며, peer dependency로 의존하고 있다.

<br>

### 사용 방법

공식문서 사용 예시

- store.js

  ```javascript
  import { createStore } from "redux";
  import { createWrapper, HYDRATE } from "next-redux-wrapper";

  // create your reducer
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

  // create a makeStore function
  const makeStore = (context) => createStore(reducer);

  // export an assembled wrapper
  export const wrapper = createWrapper(makeStore, { debug: true });
  ```

실전 사용 예시

- store/configureStore.js

  ```javascript
  const { createStore } from 'redux';
  const { createWrapper } from 'next-redux-wrapper';

  const configureStore = () => {
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
  - `pages/_app`에서 모든 페이지를 한 번에 감싸는 것을 권장한다. 그렇지 않으면 잠재적인 Race Condition(여러 개의 프로세스가 공유 자원에 동시 접근할 때 실행 순서에 따라 결과값에 영향을 줄 수 있는 상태)으로 인해서 다른 컴포넌트를 렌더링 하는 동안 컴포넌트를 업데이트 할 수 없다.

<br>

- reducers/index.js

  ```javascript
  import { HYDRATE } from "next-redux-wrapper";
  import { combineReducers } from "redux";

  import user from "./user";
  import post from "./post";

  const rootReducer = combineReducers({
    index: (state = {}, action) => {
      switch (action.type) {
        case HYDRATE:
          console.log("HYDRATE", action);
          return {
            ...state,
            ...action.payload,
          };

        default:
          return state;
      }
    },
    user,
    post,
  });

  export default rootReducer;
  ```

  - `getStaticProps` 혹은 `getServerSideProps`를 가진 페이지를 열 때마다 `HYDRATE` 액션이 디스패치된다. `getStaticProps`와 `getServerSideProps`에서도 Redux store에 접근 가능하도록 하기 위한 처리이다.
  - 분리한 reducer는 `combineReducer`를 사용하여 합친다.

<br>

# Ref

- [next-redux-wrapper 깃허브](https://github.com/kirill-konshin/next-redux-wrapper)
- [React로 NodeBird SNS 만들기, 인프런](https://www.inflearn.com/course/%EB%85%B8%EB%93%9C%EB%B2%84%EB%93%9C-%EB%A6%AC%EC%95%A1%ED%8A%B8-%EB%A6%AC%EB%89%B4%EC%96%BC)
