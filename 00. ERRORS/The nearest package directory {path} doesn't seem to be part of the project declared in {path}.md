# 목차

- [개요](#개요)
- [에러 과정](#에러-과정)
  - [yarn 설치](#yarn-설치)
  - [yarn 버전 변경](#yarn-버전-변경)
  - [CRA 프로젝트 생성](#cra-프로젝트-생성)
  - [에러 발생](#에러-발생)
- [해결방안](#해결방안)

<br>

# 개요

yarn을 설치하여 `yarn create react-app {project-name}`으로 프로젝트 생성시 오류가 발생된 건에 관하여 정리한다.

<br>

# 에러 과정

### yarn 설치

```bash
$ sudo corepack enable
```

<br>

### yarn 버전 변경

```bash
$ yarn set version canary
$ yarn -v # 4.0.2
```

<br>

### CRA 프로젝트 생성

```bash
$ yarn create react-app {project-name}
```

<br>

### 에러 발생

```bash
Usage Error: The nearest package directory ({path}) doesn't seem to be part of the project declared in {path}.
```

<br>

# 해결방안

https://github.com/yarnpkg/berry/issues/2212

"The error happens when you have a yarn.lock (or package.json) file higher up in the filetree, at that point Yarn thinks you're in a workspace you haven't declared and throws."

<br>

https://github.com/yarnpkg/berry/issues/4362

1. `ls /Users/<username>`; check that there is no `yarn.lock` or `package.json` files, if there are delete them.
2. `cd ~/Documents`
3. `mkdir my-project && cd`
4. `yarn init`
5. `yarn`
6. `ls /Users/<username>`; the `yarn.lock` and `package.json` files are regenerated

<br>

### 요약

에러 메시지를 읽어보면 "**가장 가까운 패키지 디렉토리 `{path}`는 `{path}`에 선언된 프로젝트의 일부로 보이지 않는다**"라고 되어있다. 이는 파일트리 상위에 `yarn.lock` 혹은 `package.json`이 있을 때 발생하며, yarn이 선언되지 않은 워크스페이스에 있다고 판단하여 에러를 발생시킨다고 한다. 따라서 상단에 해당 파일이 있는지 확인하고 삭제하여 해결할 수 있었다.
