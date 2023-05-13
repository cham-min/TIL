# 목차

- [CRA](#cra)
- [React `src` 구조](#react-src-구조)

<br>

# CRA

```bash
npx create-react-app [프로젝트명]
```

<br>

# React `src` 구조

```bash
.
├── docs
├── public
└── src
    ├── __tests__ # test code.
    ├── api
    ├── assets # image, css, font file.
    ├── components
    │   ├── __tests__
    │   ├── form
    │   └── ui
    ├── constant
    ├── context # react context file.
    ├── data # store item, theme information(JSON), constant.
    ├── features
    ├── hooks
    ├── layouts # sidebar, navbar, container, etc.
    ├── lib
    ├── pages
    │   └── __tests__
    ├── services # code for interfacing with any external API (auth service, data loading & save).
    ├── styles
    └── utils # utility functions (formatters, etc.)
```

- `__tests__` 폴더의 경우 규모가 커지면 다른 폴더의 하위에서 관리될 수 있다.
- `constant` 폴더의 경우 `data` 폴더 하위에서 관리될 수 있다.
- `context` 폴더의 경우 상태 관리 라이브러리에 따라서 바뀐다(store, reducer, ...).
- `features`의 경우 규모가 큰 경우 사용하며, `pages`에 페이지별 구분을 하며 `features`에 기능별로 컴포넌트를 분리해둔다.
- `services`, `api`의 구분이 api가 상위인 경우도 있었고, services가 상위인 경우도 있어서 구분이 모호하다. 아래의 구조로 사용하는 경우도 찾을 수 있었다.
  ```bash
    react-project
    ├── api
    │   ├── services
    │   │   ├── Board.js
    │   │   ├── User.js
    │   │   └── ...
    │   ├── auth.js
    │   └── index.js
  ```

<br>

# Ref

- [How To Structure React Projects From Beginner To Advanced](https://blog.webdevsimplified.com/2022-07/react-folder-structure/)
