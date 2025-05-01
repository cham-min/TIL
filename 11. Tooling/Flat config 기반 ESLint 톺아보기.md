# 목차

- [ESLint 알아보기](#eslint-알아보기)
- [ESLint 설치하기](#eslint-설치하기)
- [설정 파일 생성하기](#설정-파일-생성하기)
- [설정 가져오기](#설정-가져오기)
- [Configuration object](#configuration-object)
  - [`name`](#name)
  - [`files` & `ignores`](#files--ignores)
- [Ref](#ref)

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

## `name`

설정 객체의 이름으로 에러 메시지와 config 검사기에서 어떤 설정 객체가 사용되었는지 식별하는데 사용된다.

<br>

## `files` & `ignores`

설정 객체가 적용되거나 적용되지 않아야 하는 파일을 지정하는 Glob 패턴의 배열이다. 기본적으로 ESLint는 `**/*.js`, `**/*.cjs`, `**/*.mjs` 패턴에 일치하는 파일들을 검사하는데 해당 패턴은 `ignores`에 명시적으로 제외하지 않는 한 항상 검사된다. 기본 확장자 외의 경우는 `**/*.확장자` 패턴을 지정해주어야 한다. 특히 TypeScript를 사용하는 경우 기본 확장자에 해당하지 않기 때문에 `files: ['**/*.ts', '**/*.cts', '**/*.mts']`와 같은 설정을 추가해야 한다.

`files`와 `ignores` 각 속성을 지정하지 않으면 다른 설정 객체에 일치하는 파일 전체에 적용하게 된다. `files`의 경우 다른 설정 객체의 `files` 값이 없다면 기본값인 `.js`, `.cjs`, `.mjs`가 패턴에 일치하게 되어 모든 JavaScript 파일에 적용된다. 만약 특정 디렉터리의 파일만 적용하고 싶다면 `files: ['src/**/*.js']`와 같이 제한할 수 있다.

`files`없이 `ignores`만 사용할 때 다른 속성(예: `rules`)이 있다면, `files: ['**/*']`로 설정한 것과 같아서 ESLint가 검사하는 모든 파일은 적용하고 `ignores`로 제외된 파일만 적용하지 않는다. `ignores`의 기본값은 `['**/node_modules/', '.git/']`으로 사용자가 `ignores` 값을 작성하더라도 기본값 패턴 뒤에 추가된다.

만약 `ignores` 속성이 다른 속성 없이 단독으로 사용될 경우 해당 패턴은 전역 무시(Global ignores)로 작동하여 모든 설정 객체에 적용된다. 이는 각 설정마다 같은 `ignores`를 작성하지 않아도 된다는 장점이 있다. 반면에 다른 속성(예: `rules`, `files` 등)과 같이 정의한 경우 비전역 무시(Non-global ignores)로 작동한다. 이 경우에는 `ignores`를 작성한 해당 설정 객체에만 `ignores`가 적용된다. 비전역 무시는 `dir/filename.js`, `dir/**`과 같이 특정 파일과 디렉터리 내의 모든 파일만 매칭이 가능하며, 전역 무시는 `dir/`과 같이 디렉터리 자체에 매칭할 수 있다는 특징이 있다.

<br>

# Ref

- [ESLint docs](https://eslint.org/docs/latest/)
