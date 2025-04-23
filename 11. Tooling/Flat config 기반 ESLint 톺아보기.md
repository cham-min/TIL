# 목차

- [ESLint 알아보기](#eslint-알아보기)
- [ESLint 설치하기](#eslint-설치하기)

<br>

# ESLint 알아보기

ESLint는 JavaScript의 표준 스펙인 ECMAScript와 프로그래밍에서 코드 오류를 찾아주는 도구인 Lint의 합성어이다. 설정 가능한 JavaScript 린터인 ESLint는 JavaScript 코드에서 오류(예: 잠재적 런타임 오류, 모범 사례, 코드 스타일 등)를 찾아내고 수정하는 데 도움을 준다.

<br>

# ESLint 설치하기

```bash
$ npm install eslint --save-dev # ESLint 코어 설치
```

공식문서 [Manual Set Up](https://eslint.org/docs/latest/use/getting-started#manual-set-up)에서는 `@eslint/js`를 포함하여 설치하도록 작성되어 있다. 이는 `v8.x`까지 사용되던 `.eslintrc`의 중첩 기반의 설정 구조(예: `"extends": "eslint:recommended"`)와 관련된 내용이다.

`v9.0.0`부터는 `.eslintrc.js` 방식에서 `eslint.config.js`와 같은 새로운 포맷인 flat config 시스템을 사용하게 되었다. 이에 따라서 설정 방식이 변경되어 더이상 이전처럼 `eslint:recommended`, `eslint:all`을 사용할 수 없게 됐으며, flat config에서는 `@eslint/js` 패키지로 대체되었다. 공식문서의 ["eslint:recommended" and "eslint:all" no longer accepted in flat config](https://eslint.org/docs/latest/use/migrate-to-9.0.0#-eslintrecommended-and-eslintall-no-longer-accepted-in-flat-config)에서 확인할 수 있다.

<br>

# Ref

- [ESLint docs](https://eslint.org/docs/latest/)
