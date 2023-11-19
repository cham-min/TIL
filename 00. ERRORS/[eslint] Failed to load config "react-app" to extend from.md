# 목차

- [개요](#개요)
- [에러 과정](#에러-과정)
  - [CRA 프로젝트 생성](#cra-프로젝트-생성)
  - [파일 수정 시 에러 발생](#파일-수정-시-에러-발생)
- [해결방안](#해결방안)

<br>

# 개요

CRA로 프로젝트를 생성하고 발생한 eslint 오류에 관하여 정리한다

<br>

# 에러 과정

### CRA 프로젝트 생성

```bash
$ yarn create react-app {project-name}
```

<br>

### 파일 수정 시 에러 발생

```bash
[eslint] Failed to load config "react-app" to extend from.
Referenced from: {project-path}/package.json
```

<br>

# 해결방안

1. [stackoverflow - Failed to load config "react" to extend from](https://stackoverflow.com/questions/63912721/)
2. [github - yarnpkg issue](github.com/yarnpkg/berry/issues/8#issuecomment-732536482)

"create-react-app doesn't add eslint-config-react-app as a dependency, until it's fixed you need to manually add it. yarn add eslint-config-react-app"

```bash
yarn add eslint-config-react-app
```

<br>

### 요약

CRA는 `eslint-config-react-app`을 dependency로 추가하지 않는다. 따라서 수동으로 추가해야 한다.
