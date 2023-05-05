# 목차

- [ESLint](#eslint)
- [Prettier](#prettier)
- [설치](#설치)
  - [eslint-config-prettier](#eslint-config-prettier)
- [설정](#설정)
  - [.eslintrc](#eslintrc)
  - [.prettierrc](#prettierrc)
- [실행](#실행)
  - [Prettier 실행](#prettier-실행)
  - [ESLint 실행](#eslint-실행)
- [Husky](#husky)
  - [Git Hook 도입](#git-hook-도입)
  - [Husky 설치](#husky-설치)
  - [Git Hook 추가하기](#git-hook-추가하기)
- [lint-staged](#lint-staged)
  - [lint-staged 설정](#lint-staged-설정)
- [Ref](#ref)

<br>

# ESLint

> ESLint is an open source project that helps you find and fix problems with your JavaScript code. It doesn't matter if you're writing JavaScript in the browser or on the server, with or without a framework, ESLint can help your code live its best life.

- 일관성 있고 에러를 피할 수 있는 코드를 작성하기 위해서 만들어진 코드 분석 툴
- 작성된 코드를 분석하여 불필요, 보안 위배, 버그 여지가 있는 코드를 알림
- 커스터마이징을 허용하기 때문에 필요한 규칙을 설정 가능

<br>

# Prettier

- 코드 포맷터로 스타일에 대한 시간 및 에너지 절약
- 스타일에 대한 토론이 줄고, 중요한 개발에 집중이 가능
- 많은 언어들을 지원하고 있음 (JavaScript, TypeScript, HTML, CSS, ...)

<br>

# 설치

```bash
# eslint
$ npm install eslint --save-dev

# prettier
$ npm install prettier --save-dev

# eslint-config-prettier
$ npm install eslint-config-prettier --save-dev
```

### eslint-config-prettier

- Prettier와 충돌하는 ESLint 규칙(포맷팅)을 비활성화하는 데 도움이 되는 ESLint 구성
- ESLint는 코드 스타일 규칙을 적용하며, Prettier는 코드 스타일을 자동으로 지정
- ESLint에 포맷팅에 관련한 규칙이 포함되어 있어 Prettier와 일부 충돌하므로 `eslint-config-prettier`를 사용하여 호환되도록 조정

<br>

# 설정

- 설치 완료 후 팀원 간 규칙 설정 필요

<br>

### .eslintrc

- 아래 명령어을 사용하면 문답 형식을 통해서 간편한 `.eslintrc` 설정이 가능

```bash
$ npm init @eslint/config
```

- root 디렉토리에 `.eslintrc` 파일 생성
- 커스터마이징 할 수 있는 부분이 많고 언어별 환경별로 설정할 수 있어 다소 복잡함
- 다른 사람들이 정의해둔 config를 설치하여 확장해서 사용이 가능

```javascript
/* 필요한 내용 기록
 * 1. "env": {},
 * 1.1 https://eslint.org/docs/latest/use/configure/language-options
 *
 * 2. "extends": [],
 * 2.1 eslint plugin + rule을 종합하여 만든 것
 * 2.2 eslint:recommended => https://eslint.org/docs/latest/rules 활성화 목록 확인
 * 2.3 eslint-config-{???} => https://www.npmjs.com/search?q=eslint-config 정의된 config 검색
 *                         => 장착할 때 eslint-config- 부분을 제외하고 '{}' 부분만 삽입
 *                         => ex) eslint-config-airbnb 설치 시 - "extends": ['airbnb'],
 *
 * 3. "plugins": [],
 * 3.1 eslint 추가 룰 규정 가능 => ex) eslint-plugin-react : react 룰 규정 가능
 * 3.2 eslint-plugin-{???} => https://www.npmjs.com/search?q=eslint-plugin 정의된 plugin 검색
 *
 * 3. "rules": {},
 * 3.1 https://eslint.org/docs/latest/rules 규칙 목록 확인
 * 3.2 'off': 규칙 비활성화, 'warn': 경고 발생, 'error': 에러 발생
 *
 * 5. "ignorePatterns": [],
 *
 */

// 사용하려고 만든 코드 => `npm i eslint-config-airbnb eslint-config-prettier` 필요
{
  "extends": ["airbnb", "prettier"],
  "rules": {
    "no-console": ["warn", { "allow": ["warn", "error", "info"] }], // console 경고
    "no-multiple-empty-lines": "error", // 여러 줄 공백 금지
    "dot-notation": "error", // dot notation 사용
  }
}
```

<br>

### .prettierrc

- `.prettierrc.확장자` 파일을 루트 디렉토리에 저장
- `.prettierignore` 파일을 통해 적용하지 않을 파일 설정 가능(option)
- 확장자는 JSON, YAML, JS, TOML등 다양하게 지원

```json
{
  "printWidth": 100,
  "tabWidth": 2,
  "semi": true,
  "singleQuote": true,
  "arrowParens": "always"
}
```

<br>

# 실행

> VSCode에서 저장만해도 실행되는 ESLint, Prettier를 굳이 CLI로 진행하는 이유는 팀원이 Editor 설정을 건드려서 ESLint, Prettier를 적용하지 않는 상황이 생길 수도 있다. 팀원 전체가 의식적으로 설정을 하지 않더라도 ESLint, Prettier가 자동으로 실행될 수 있도록 자동화를 해보고자 한다.

### Prettier 실행

- [Prettier CLI](https://prettier.io/docs/en/cli.html)
- 조건 : 에디터 포맷팅 설정(VSCode는 formatOnSave) 해제

<br>

파일을 작성하고 저장하면 설정한 Prettier대로 코드가 반영되지 않음을 확인할 수 있다. 아래 CLI 명령어를 통해서 Prettier를 실행할 수 있다.

```bash
# 현재 위치의 모든 파일에 prettier 적용
$ npx prettier .
```

<br>

위 명령어의 결과로 실제 파일에는 반영되지 않고, 터미널에 format 되었을 때 어떤 결과가 나올지 출력된다. 개발자가 직접 파일에 formatting 결과를 넣어서 저장을 해줘야한다.

```bash
# formatting을 진행하고 결과를 파일에 적용시켜 저장
$ npx prettier --write .
```

<br>

하나의 파일을 수정하고 `npx prettier --write .` 명령을 수행하면 변경하지 않은 파일까지 재포맷팅되는 것을 확인할 수 있다. 변경되지 않은 파일까지 해당 명령어를 수행하는 동작은 불필요하다.

```bash
# 기존에 포맷팅한 정보를 저장을 하고 바뀐 내용만 수정
$ npx prettier --write --cache .
```

<br>

코드를 작성할 때마다 명령어를 길게 쳐야한다는 번거로움도 생긴다. 명령어를 타이핑하는 과정을 줄이고 싶다면 `package.json`의 `scripts`에 단축어를 등록하면 된다. scripts의 특징 중 하나는 `npx` 명령어를 제외하더라도 알아서 `node_modules`를 탐색하고 실행한다.

```json
{
  "scripts": {
    "format": "prettier --write --cache ."
  }
}
```

```bash
# 아래 명령어를 통해서 prettier를 적용할 수 있게 되었다.
$ npm run format
```

<br>

### ESLint 실행

```bash
# 해당 디렉토리 모든 파일 eslint 검사 실행
$ npx eslint .

# 변화가 있는 파일만 검사 실행
$ npx eslint --cache .
```

ESLint 경우 캐시 파일이 루트에 `.eslintcache`로 저장되며 Prettier의 경우 `node_modules`내에 cache 파일이 저장된다. 따라서 `.eslintcache`파일은 따로 `.gitignore`에 등록할 필요가 있다.

<br>

마찬가지로 `package.json`에 명령어를 등록하여 자동화해보자.

```json
{
  "scripts": {
    "format": "prettier --write --cache .",
    "lint": "eslint --cache ."
  }
}
```

```bash
$ npm run lint
```

<br>

# Husky

> commit을 진행할 코드는 formatting, push를 진행할 코드는 lint를 자동으로 적용해보자.

- [Husky docs](https://typicode.github.io/husky/#/)
- Git Hook 설정을 쉽게 설정해주는 라이브러리
- 팀원 개개인이 `npm install` 만 수행하더라도 사전에 설정한 Git Hook을 적용시킬 수 있다.

<br>

### Git Hook 도입

- Git에서 특정 이벤트가 발생하기 이전과 이후에 Hook 동작을 실행할 수 있게하는 것
- Git Hook 설정은 까다로우며, 팀원들이 repo를 다운로드 받고 매뉴얼하게 사전 과정을 수행해야 hook 실행이 보장
- **Husky**라이브러리를 통해 Git Hook을 간단하게 설정할 수 있다.

<br>

### Husky 설치

```bash
# 설치
$ npm install husky --save-dev

# 생성된 pre-commit, pre-push 파일 기반으로 Git hook 활성화
$ npx husky install
```

`npx husky install` 명령어로 husky에 등록된 hook을 `.git`에 적용시킬 수 있다. 해당 작업을 수행하지 않으면 git hook이 적용되지 않으므로 모든 개발자가 실행해야 하는 명령어다.

<br>

```javascript
{
  "scripts": {
    /**
     * scripts life cycle operation order
     * https://docs.npmjs.com/cli/v9/using-npm/scripts
     */
    "postinstall": "husky install"
    "format": "prettier --write --cache .",
    "lint": "eslint --cache ."
  }
}
```

클론을 진행한 개발자가 `npm install` 명령어만 입력해도 자동으로 `npx husky install`이 수행되도록 `postinstall`로 설정한다.

<br>

### Git Hook 추가하기

```bash
# 명령어
$ npx husky add <file> [cmd]

# commit 이전 npm run format 자동 실행
$ npx husky add .husky/pre-commit "npm run format"

# push 이전 npm run lint 자동 실행
$ npx husky add .husky/pre-push "npm run lint"
```

<br>

# lint-staged

- [lint-staged docs](https://github.com/okonet/lint-staged)

Husky를 사용하여 commit을 진행하고 `git status`로 확인해보면 modified된 파일(unstaged)이 여전히 남아있다. `git commit` 명령어를 입력한 후 어떤 흐름이 있었을까

1. 커밋 전 변경된 파일 존재 - staged
2. 커밋 명령어 실행 - `git commit -m "커밋메시지"`
3. git hook pre-commit 동작 - `npm run format`
4. prettier로 포맷팅된 파일 존재 - unstaged
5. 커밋 완료

포맷팅된 파일을 다시 커밋해야되는 문제가 발생하므로 Husky는 lint-staged와 함께 사용한다. lint-staged는 staged 파일에 특정 동작을 수행할 수 있다. 즉, 전체 파일에 대해서 `pre-commit` hook을 수행하는게 아닌 staged된 파일에 `pre-commit`등의 hook을 수행할 수 있게된다.

<br>

또한 lint-staged는 staged된 파일에 git hook명령을 수행하고 다시 `git add`할 필요없이 자동으로 unstaged 파일을 staged로 올린 후 commit 혹은 push를 수행해준다.

<br>

### lint-staged 설정

`package.json`은 아래와 같이 설정했다.

```json
"scripts": {
  "postinstall": "husky install",
  "lint": "eslint --cache .",
  "format": "prettier --write --cache .",
  "precommit": "lint-staged",
  "prepush": "npm run lint && npm run format"
},
"lint-staged": {
  "*.{js,jsx,ts,tsx}": [
    "npm run format"
  ]
},
```

<br>

git hook에는 아래와 같이 등록하였다.

```bash
# 커밋 전에는 prettier로 포맷팅만 진행
# list-staged를 활용하여 수정된 unstaged 파일까지 커밋
$ npx husky add .husky/pre-commit "npm run precommit"

# 푸쉬 전에는 prettier & eslint 검사 진행
# 푸쉬할 때에는 stage 걱정이 없으므로 list-staged가 아닌 스크립트 사용
$ npx husky add .husky/pre-push "npm run prepush"
```

<br>

# Ref

- [eslint docs](https://eslint.org/)
- [prettier docs](https://prettier.io/)
- [Husky docs](https://typicode.github.io/husky/#/)
- [lint-staged docs](https://github.com/okonet/lint-staged)
- [gabia library](https://library.gabia.com/contents/8492/)
- wanted preonboarding internship
