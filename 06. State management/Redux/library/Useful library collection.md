# 목차

- [불변성 관련](#불변성-관련)
  - [Immer](#immer)
- [더미데이터 관련](#더미데이터-관련)
  - [Faker](#faker)
- [효율성 관련](#효율성-관련)
  - [Redux Toolkit](#redux-toolkit)

<br>

# 불변성 관련

### [Immer](https://immerjs.github.io/immer/)

- 불변성을 편하게 다룰 수 있도록 도와주는 패키지이다.

#### Without Immer

```javascript
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_COMMENT_SUCCESS: {
      const postIndex = state.mainPosts.findIndex(
        (v) => v.id === action.data.postId
      );
      const post = { ...state.mainPosts[postIndex] };
      post.Comments = [dummyComment(action.data.content), ...post.Comments];
      const mainPosts = [...state.mainPosts];
      mainPosts[postIndex] = post;
      return {
        ...state,
        mainPosts,
        addCommentLoading: false,
        addCommentDone: true,
      };
    }
    default:
      return state;
  }
};
```

#### With Immer

```javascript
const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case ADD_COMMENT_SUCCESS:
        const post = draft.mainPosts.find((v) => v.id === action.data.postId);
        post.Comments.unshift(dummyComment(action.data.content));
        draft.addCommentLoading = false;
        draft.addCommentDone = true;
        break;
      default:
        break;
    }
  });
};
```

<br>

# 더미데이터 관련

### [Faker](https://fakerjs.dev/)

- 테스트, 개발용으로 dummy data를 편리하게 만들고 싶을 때 사용한다.

```javascript
$ npm install @faker-js/faker --save-dev
$ yarn add @faker-js/faker --dev

import { faker } from "@faker-js/faker";

const randomName = faker.name.fullName(); // Rowan Nikolaus
const randomEmail = faker.internet.email(); // Kassandra.Haley@erich.biz
```

<br>

# 효율성 관련

### [Redux Toolkit](https://redux-toolkit.js.org/)

<br>

### [react-virtualized](https://github.com/bvaughn/react-virtualized)

- 대량의 리스트, 정형 데이터를 효율적으로 렌더링하기 위한 리액트 컴포넌트이다.
- Infinity Scroll을 구현한 경우, 사용자가 화면을 계속 내려서 메모리가 쌓이면, 메모리가 나가는 경우가 있다. 이럴 때 `react-virtualized`를 사용하여 데이터가 많이 로딩되어도 화면에 보이는 일부만 그려주고 나머지는 메모리에 저장한다.
