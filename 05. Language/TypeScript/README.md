# 목차

- [TypeScript](#typescript)
- [TypeScript 설치](#typescript-설치)
- [TypeScript 컴파일](#typescript-컴파일)
  - [자동 컴파일](#자동-컴파일)
- [Ref](#ref)

<br>

# TypeScript

- Microsoft에 의해서 개발 및 관리되고 있는 오픈소스 프로그래밍 언어로 JavaScript의 Superset이다.
- 타입을 추가하여 발생하는 에러를 초기 개발 과정에서 발견할 수 있으며 추가적인 오류 검사를 제공한다.
- 브라우저와 같은 자바스크립트 환경에서 실행할 수 없다. 컴파일러로서 작성한 코드를 자바스크립트로 컴파일한다.

<br>

# [TypeScript 설치](https://www.typescriptlang.org/download)

```shell
npm install typescript --save-dev
```

<br>

# TypeScript 컴파일

```shell
tsc [파일명]
```

<br>

### 자동 컴파일

- 컴파일 과정에 제외할 파일은 `tsconfig.json`에서 지정한다.

```shell
# 단일 파일 저장 시 자동 컴파일
tsc [파일명] --watch # tsc [파일명] -w

# 디렉토리 전체 컴파일
tsc --init # tsconfig.json 생성
tsc # 전체 컴파일
tsc --watch # 저장시 자동으로 전체 컴파일

# 컴파일 제외는 tsconfig.json에서 관리
"exclude": ["파일명"]
```

<br>

# Ref

- [TypeScript docs](https://www.typescriptlang.org/)
