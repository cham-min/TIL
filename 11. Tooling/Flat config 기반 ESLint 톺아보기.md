# 목차

- [ESLint 설치하기](#eslint-설치하기)

<br>

# ESLint 설치하기

```bash
$ npm install eslint --save-dev # ESLint 코어 설치
```

공식문서 [Manual Set Up](https://eslint.org/docs/latest/use/getting-started#manual-set-up)에서는 `@eslint/js`까지 설치하라고 작성되어 있다. 이는 `v8.x`까지 사용되던 `.eslintrc`의 중첩 기반의 설정 구조(예: `"extends": "eslint:recommended"`)와 관련된 내용이다. `v9.0.0`부터는 `.eslintrc.js` 방식에서 `eslint.config.js`와 같은 새로운 포맷인 flat config 시스템을 사용하게 되었다. 이에 따라서 설정 방식이 변경되어 더이상 이전처럼 `eslint:recommended`, `eslint:all`을 flat config에서 사용할 수 없게 됐으며, `@eslint/js` 패키지로 대체되었다. 해당 내용은 공식문서의 ["eslint:recommended" and "eslint:all" no longer accepted in flat config](https://eslint.org/docs/latest/use/migrate-to-9.0.0#-eslintrecommended-and-eslintall-no-longer-accepted-in-flat-config)에서 확인할 수 있다.
