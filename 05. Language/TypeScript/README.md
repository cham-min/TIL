# 목차

- [TypeScript](#typescript)
- [패키지 설치](#패키지-설치)
  - [추가할만한 패키지](#추가할만한-패키지)
    - [tsx](#tsx)
- [TypeScript 컴파일](#typescript-컴파일)
  - [컴파일러 옵션](#컴파일러-옵션)
  - [tsconfig.json 만들기](#tsconfigjson-만들기)
  - [자동 컴파일](#자동-컴파일)
- [Ref](#ref)

<br>

# TypeScript

- Microsoft에 의해서 개발 및 관리되고 있는 오픈소스 프로그래밍 언어로 JavaScript의 Superset이다.
- 타입을 추가하여 발생하는 에러를 초기 개발 과정에서 발견할 수 있으며 추가적인 오류 검사를 제공한다.
- 브라우저와 같은 자바스크립트 환경에서 실행할 수 없다. 컴파일러로서 작성한 코드를 자바스크립트로 컴파일한다.

<br>

# 패키지 설치

```bash
# typescript - https://www.typescriptlang.org/download
# @types/node - node.js에서 제공하는 내장 기능(예: console) 타입 정의
$ npm install typescript @types/node --save-dev
```

`typescript` 패키지를 설치하면 `tsc` 명령어를 통해서 컴파일러를 실행시킬 수 있다.

```bash
# tsc 버전 확인을 통하여 설치가 정상적으로 되었는지 확인
$ npx tsc --version
```

<br>

## 추가할만한 패키지

### tsx

원래 `.ts` 파일을 `tsc` 명령어로 컴파일하여 `.js`파일을 생성한 후 `node` 명령어로 `.js`파일을 실행한다. 이 과정을 `tsx [파일경로/파일명]` 명령어로 컴파일과 실행을 동시에 진행하여 타입스크립트 코드를 바로 실행할 수 있도록 해준다.

<br>

# TypeScript 컴파일

```shell
$ npx tsc [파일경로/파일명]
```

<br>

## 컴파일러 옵션

`tsconfig.json` 파일에 TypeScript 코드를 어떻게 컴파일할지 지정한다. 컴파일 주요 옵션은 아래와 같다.

- `target`: 컴파일될 JavaScript의 버전(ES5, ES6, ES2020 등)
- `module`: 컴파일될 JavaScript의 모듈 시스템 방식(commonjs, ES6 등)
- `lib`: 사용할 수 있는 라이브러리 정의 (ES2015 등)
- `outDir`: 컴파일된 파일이 출력될 디렉토리
- `strict`: 엄격한 타입 체크 활성화

<br>

## tsconfig.json 만들기

```bash
$ npx tsc --init
```

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "outDir": "dist",
    // "strict": true,
    "moduleDetection": "force",
    "skipLibCheck": true
  },
  "include": ["src"]
}
```

<br>

## 자동 컴파일

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
