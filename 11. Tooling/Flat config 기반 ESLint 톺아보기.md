# 목차

- [ESLint 알아보기](#eslint-알아보기)
- [ESLint 설치하기](#eslint-설치하기)
- [설정 파일 생성하기](#설정-파일-생성하기)
- [설정 가져오기](#설정-가져오기)
- [Configuration object](#configuration-object)

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

# 설정 파일 생성하기

ESLint 설정 파일 네이밍은 아래 규칙을 따라서 프로젝트의 root에 위치해야 한다. 여러 개의 ESLint 설정 파일이 있는 경우, ESLint는 JavaScript 파일을 TypeScript 파일보다 우선시하며 우선순위는 아래와 같다.

1. `eslint.config.js`
2. `eslint.config.mjs`
3. `eslint.config.cjs`
4. `eslint.config.ts`
5. `eslint.config.mts`
6. `eslint.config.cts`

<br>

# 설정 가져오기

대분의 경우 ESLint 설정 파일을 새로 작성하지 않고 기존에 작성된 predefined config(예: `eslint:recommended`), sharable config(예: `eslint-config-airbnb`)를 가져와서 필요한 규칙을 오버라이드하여 설정하는게 일반적이다.

다른 모듈에서 설정 객체를 가져올 때에는 `config` 파일의 배열에 삽입하면 된다. JavaScript 추천 규칙을 사용하려면 아래와 같이 작성하면 된다.

```javascript
import jseslint from '@eslint/js';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  jseslint.configs.recommended,
  {
    rules: {
      'no-console': 'warn',
    },
  },
]);
```

<br>

# Configuration object

ESLint 설정 파일은 `defineConfig()` 헬퍼를 사용하여 Configuration object(이하 설정 객체)를 포함하는 설정 배열을 정의한다. 설정 객체는 ESLint가 파일을 실행할 때 필요한 정보를 아래와 같은 속성으로 구성된다.

```javascript
// eslint.config.js

import { defineConfig } from 'eslint/config';

export default defineConfig({
  // Configuration object
  {
    name: "",
    files: [],
    ignores: [],
    extends: [],
    languageOptions: {
      ecmaVersion: 6, // 2022(연도) | 6(버전)
      sourceType: "", // "module" | "commonjs" | "script"
      globals: {},
      parser: "",
      parserOptions: {},
    },
    linterOptions: {
      noInlineConfig: false, // true | false
      reportUnusedDisableDirectives: "warn", // "off" | "warn" | "error"
      reportUnusedInlineConfigs: "off", // "off" | "warn" | "error"
    },
    processor: "",
    plugins: {},
    rules: {},
    settings: {},
  },
  {}, // 설정 객체 추가 가능
})
```

만약 여러 개의 설정 객체를 작성하여 하나의 파일에 동시에 적용될 경우 CSS처럼 cascade되어 나중에 정의된 설정이 우선되어 덮어쓴다.

<br>

# Ref

- [ESLint docs](https://eslint.org/docs/latest/)
