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
Referenced from: {project-path}/{project-name}/package.json
```

<br>

# 해결방안

```bash
yarn add eslint-config-react-app
```
