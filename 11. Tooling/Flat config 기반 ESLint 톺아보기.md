# 목차

- [ESLint 알아보기](#eslint-알아보기)
- [ESLint 설치하기](#eslint-설치하기)
- [설정 파일 생성하기](#설정-파일-생성하기)
- [설정 가져오기](#설정-가져오기)
- [Configuration object](#configuration-object)
  - [`name`](#name)
  - [`files` & `ignores`](#files--ignores)
  - [`extends`](#extends)
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

```javascript
// eslint.config.js

import { defineConfig } from "eslint/config";

export default defineConfig([
  globalIgnores([".config/", "dist/", "tsconfig.json"]), // globalIgnores() 헬퍼 함수로 전역 무시를 명시할 수 있음
  {
    ignores: [".config/", "dist/", "tsconfig.json"] // ignores를 제외한 다른 속성이 없기 때문에 전역 무시로 작동
  },
  { ... }, // 첫 번째 설정 객체의 ignores를 자동으로 상속받음
  {
    ignores: [".config/**", "dir1/script1.js"], // 이 객체 또한 첫 번째 설정 객체의 ignores를 자동으로 상속받음
    rules: { ... } // 다른 속성이 존재하므로 비전역
  },
]);
```

<br>

## `extends`

설정 객체는 `extends` 속성에 직접 정의한 설정 객체, 설정 객체를 담은 배열, 플러그인에 정의된 설정 이름과 같은 형태의 값을 넣어 다른 설정을 상속할 수 있다. 해당 속성을 통해서 기존 설정을 가져올 수 있으며 추가로 커스터마이징이 가능해진다.

```javascript
{
  extends: [
    "plugin:react/recommended", // 문자열
    {
      rules: {
        semi: "error", // 추가 규칙
      },
    }, // 구성 객체
    [
      // 구성 배열
      {
        rules: {
          quotes: ["error", "single"],
        },
      },
    ],
  ],
}
```

<br>

플러그인의 설정을 사용하려면 먼저 `plugins` 속성에 지정되어 있어야 한다. ESLint 플러그인은 미리 정의된 설정을 export할 수 있다. 해당 설정은 문자열 형식으로 참조하면 된다.

```javascript
// eslint.config.js
// 예시 1
import examplePlugin from 'eslint-plugin-example';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.js'],
    plugins: {
      example: examplePlugin, // 플러그인을 먼저 등록
    },
    extends: ['example/recommended'], // example 플러그인의 recommended 설정 불러오기
  },
]);
```

```javascript
// eslint.config.js
// 예시 2
import pluginExample from 'eslint-plugin-example';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.js'],
    plugins: {
      example: pluginExample,
    },
    extends: [pluginExample.configs.recommended], // 직접 객체를 넣어줌
  },
]);
```

<br>

미리 정의된 설정을 사용하는 예시를 살펴보자. ESLint는 `js/recommended`, `js/all` 두 가지 설정을 제공하고 있다. `js/recommended`의 경우는 모든 사람들이 사용하는 걸 권장하는 권고 규칙을 사용하며, `js/all`의 경우는 ESLint의 모든 규칙을 활성화하지만 버전 변경시 매번 설정이 바뀌기 때문에 프로덕션에서 사용하는걸 권장하지 않는 편이다.

```javascript
// eslint.config.js
import js from '@eslint/js';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.js'],

    // js 플러그인을 등록
    plugins: {
      js,
    },

    // js/recommended 설정을 확장
    extends: ['js/recommended'],

    // 추가적인 규칙 덮어쓰기
    rules: {
      'no-unused-vars': 'warn', // 미사용 변수는 에러가 아닌 경고 처리
    },
  },
]);
```

<br>

공유 가능한 설정 패키지 사용 예시를 살펴보자. 공유 가능한 설정은 `npm` 패키지 형태로 되어있고 하나의 ESLint 설정 객체 또는 배열을 내보내는 구조이다. 이러한 패키지들은 일반적으로 다른 프로젝트에서도 재사용이 되도록 만들어져 있다.

```bash
$ npm install eslint-config-example --save-dev
```

`eslint.config.js` 파일에서 해당 패키지를 가져와서 사용이 가능하다.

```javascript
// eslint.config.js

import exampleConfig from 'eslint-config-example'; // 공유 설정 불러오기
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.js'], // JS 파일에만 적용
    extends: [exampleConfig], // 불러온 공유 설정을 적용
    rules: {
      'no-unused-vars': 'warn', // 추가로 규칙 커스터마이징도 가능
    },
  },
]);
```

<br>

설정에는 네이밍 컨벤션이 있다. `name` 속성이 필수는 아니지만, 공유 설정을 만들 때에는 각 설정 객체마다 `name` 지정이 권장된다. 앞서 말했듯이 `name` 속성은 ESLint config inspector가 어떤 설정 객체가 사용되고 있는지를 구분하기 위해서 사용되고 있다. 이름을 지정하면 유지보수나 디버깅이 용이해진다는 장점이 있다. 규칙은 아래와 같다.

- 일반적으로 이름은 설정의 용도를 설명
- 설정이 속한 공유 설정 패키지 이름 또는 플러그인 이름을 prefix로 붙이고 `/`를 구분자로 사용

```javascript
// 공유 설정 객체에 `name` 부여

export default {
  configs: {
    recommended: {
      name: 'example/recommended', // 권장 설정
      rules: {
        'no-unused-vars': 'warn',
      },
    },
    strict: {
      name: 'example/strict', // 엄격한 설정
      rules: {
        'no-unused-vars': 'error',
      },
    },
  },
};
```

```javascript
// 배열로 구성된 설정 객체에 `name` 부여

export default {
  configs: {
    strict: [
      {
        name: 'example/strict/language-setup', // 언어 설정 파트
        languageOptions: {
          ecmaVersion: 2024,
        },
      },
      {
        name: 'example/strict/sub-config', // 특정 파일 대상 세부 설정
        file: ['src/**/*.js'],
        rules: {
          'no-unused-vars': 'error',
        },
      },
    ],
  },
};
```

<br>

# Ref

- [ESLint docs](https://eslint.org/docs/latest/)
