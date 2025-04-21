# 목차

- [1. 프로젝트 생성](#1-프로젝트-생성)
- [2. Package 설치](#2-package-설치)
  - [dependencies](#dependencies)
  - [devDependencies](#devdependencies)
    - [Babel](#babel)
    - [Webpack](#webpack)
    - [Development Tools](#devlopment-tools)
- [3. 프로젝트 구조](#3-프로젝트-구조)
- [4. webpack.config.js 설정](#4-webpackconfigjs-설정)
  - [필요한 패키지, 플러그인 가져오기 및 변수 선언](#필요한-패키지-플러그인-가져오기-및-변수-선언)
  - [mode 설정](#mode-설정)
  - [entry 설정](#entry-설정)
  - [output 설정](#output-설정)
  - [module 설정](#module-설정)
  - [resolve 설정](#resolve-설정)
  - [plugins 설정](#plugins-설정)
  - [그 외 infrastructureLogging, devtool, optimization 설정](#그-외-infrastructurelogging-devtool-optimization-설정)
- [5. .babelrc 설정](#5-babelrc-설정)
- [6. manifest.json 설정](#6-manifestjson-설정)

<br>

Create React App은 메타에서 개발한 보일러 플레이트이다. React 프로젝트를 시작할 때 복잡한 설정(라이브러리, 패키지, 웹팩, 바벨, 린트 등) 없이 빠르게 개발을 시작할 수 있도록 도와주는 도구이다. 그러나 CRA는 많은 기본 설정을 내장하고 있기 때문에, 프로젝트가 복잡해지거나 필요한 설정 및 변경 사항이 생기면 기본 설정을 조작하기 어려울 수 있다.

Create React App에서 `npm run eject` 명령어로, CRA의 내장 설정과 스크립트를 직접 제어하고 수정할 수 있지만, 개발 환경을 직접 세팅하면서 빌드 과정을 이해해보고자 한다. [chrome-extension-boilerplate-react](https://github.com/lxieyang/chrome-extension-boilerplate-react) 레포지토리를 참고하여 진행했다.

<br>

# 1. 프로젝트 생성

`init` 명령어를 사용하여 프로젝트를 생성한다. 패키지 이름, 버전, 설명 등을 입력하거나 `npm init -y` 명령어로 기본값으로 **package.json** 파일을 생성할 수 있다.

```bash
$ npm init
```

<br>

**package.json**파일의 `scripts`에 빌드를 위한 `build` 스크립트를 추가한다. Webpack을 사용하여 세팅할 것이기 때문에 `webpack`을 등록한다.

```json
{
  "scripts": {
    "build": "webpack"
  }
}
```

<br>

# 2. Package 설치

## `dependencies`

- `react`
- `react-dom`
- `styled-components`

```bash
$ npm i react react-dom styled-components
```

<br>

## `devDependencies`

### Babel

JavaScript 컴파일러로 최신 JavaScript 문법을 사용하여 코드를 작성하고 이를 오래된 브라우저나 환경에서 실행할 수 있도록 예전 JavaScript 버전으로 변환해주는 역할을 한다. ES6 이상의 문법을 ES5로 변환할 수 있기에 최신 문법을 사용할 수 있으며, 오래된 브라우저에서도 코드가 실행될 수 있다. 코드 변환 외에도 polyfill을 제공하여 오래된 브라우저에서 지원하지 않는 JavaScript API(ex. `Promise`, `Symbol`)를 사용할 수 있게 해준다.

<br>

**Core**

- `@babel/core` : Babel의 변환 로직이 해당 패키지에 포함되어 있어서 해당 패키지 없이는 Babel을 사용할 수 없다. 또한 Babel은 플러그인과 프리셋을 선택하여 사용할 수 있는데, `@babel/core`가 플러그인들을 로드하고 실행하는 역할을 한다.

<br>

**Presets**

- `@babel/preset-env` : 최신 JavaScript 문법을 지원하지 않는 환경에서도 최신 문법을 사용할 수 있도록 ES6+ 문법을 ES5 이하로 트랜스파일한다.
- `@babel/preset-react` : React의 JSX 문법을 JavaScript로 변환하는 프리셋이다.

<br>

**Loaders**

- `babel-loader` : Webpack을 사용하여 프로젝트를 번들링할 때, Babel을 Webpack과 함께 사용하기 위한 로더이다. Webpack이 JavaScript를 번들링하기 전에 Babel을 통해 해당 파일들을 변환하게 된다. 즉, Webpack이 JavaScript 파일을 처리할 때, `babel-loader`는 Babel을 사용하여 지정된 Babel 설정(`.babelrc)에 따라서 파일들을 트랜스파일한다.

<br>

```bash
$ npm i -D @babel/core @babel/preset-env @babel/preset-react babel-loader
```

<br>

### Webpack

**Core**

- `webpack`
- `webpack-cli` : Webpack을 CLI에서 사용하기 위한 도구이다.

```bash
$ npm i -D webpack webpack-cli
```

<br>

**Loaders**

> ⚠️ `file-loader`, `url-loader`는 Webpack v5에서 권장하지 않는다. [asset modules](https://webpack.kr/guides/asset-modules/#root) 기능이 도입되어 대체되었다.

- `css-loader` : CSS 파일을 모듈로 변환한다.
- `style-loader` : `css-loader`에 의해 모듈로 변환된 CSS를 DOM에 동적으로 추가한다.
- `html-loader` : HTML 파일을 모듈로 변환하며, HTML 파일 내의 static assets을 참조하거나 해당 파일을 다른 JavaScript 모듈로 가져올 수 있다.
- `source-map-loader` : 소스 맵을 사용하여 JavaScript 파일을 처리한다. 번들링된 코드와 원본 코드 간 매핑 정보를 제공하여, 런타임에서 오류가 발생했을 때 디버깅을 보다 쉽게 할 수 있도록 도와준다.

```bash
$ npm i -D css-loader style-loader html-loader source-map-loader
```

<br>

**Plugins**

- `clean-webpack-plugin` : 웹팩 빌드 전에 폴더(`dist`, `build`에 자주 사용)를 자동으로 정리(삭제)하는 데 사용된다.
- `copy-webpack-plugin` : 특정 파일이나 디렉터리를 웹팩 빌드 디렉터리로 복사하는 데 사용된다.
- `html-webpack-plugin` : 웹팩 빌드를 위한 HTML 파일을 생성해주는 플러그인이다. 번들링된 JavaScript 파일을 자동으로 HTML에 추가하는 데 사용된다.
- `terser-webpack-plugin` : 웹팩을 통해 생성된 JavaScript 파일을 minify 하는 데 사용된다.
- `@pmmmwh/react-refresh-webpack-plugin` : React Fast Refresh 기능을 웹팩에 통합하는 데 사용된다. 컴포넌트를 수정할 때마다 전체 페이지를 리로드하지 않고 변경 사항을 반영할 수 있다.

```bash
$ npm i -D clean-webpack-plugin copy-webpack-plugin html-webpack-plugin terser-webpack-plugin @pmmmwh/react-refresh-webpack-plugin
```

<br>

**Polyfills**

- `core-js` : 폴리필은 특정 기능이 지원되지 않는 환경에서 그 기능을 사용할 수 있게 해주는 코드를 의미하는데, `core-js`는 JavaScript 표준 라이브러리를 위한 모듈러, 교차 브라우저 지원을 목적으로 하는 폴리필 라이브러리이다. ECMAScript에서 새로운 기능을 추가하면, 오래된 브라우저나 환경에서는 지원되지 않는데 이를 해결하기 위해서 사용한다.

```bash
$ npm i -D core-js
```

<br>

### Devlopment Tools

**Linting & Formatting**

- `eslint`
- `eslint-config-prettier`
- `eslint-config-react-app`
- `prettier`

```bash
$ npm i -D eslint eslint-config-prettier eslint-config-react-app prettier
```

<br>

**React**

- `react-refresh`

```bash
$ npm i -D react-refresh
```

<br>

# 3. 프로젝트 구조

```bash
.
├── package-lock.json
├── package.json
├── src
│   ├── assets
│   │   ├── css
│   │   │   └── reset.css
│   │   └── image
│   │   │   ├── logo.png
│   │   │   ├── icon-128.png
│   │   │   ├── icon-16.png
│   │   │   └── icon-48.png
│   ├── manifest.json
│   └── pages
│       ├── Background
│       │   └── index.js
│       ├── Content
│       │   ├── content.css
│       │   └── index.js
│       ├── Login
│       │   ├── Login.css
│       │   ├── Login.jsx
│       │   ├── index.html
│       │   └── index.jsx
│       └── Popup
│           ├── Popup.css
│           ├── Popup.jsx
│           ├── index.html
│           └── index.jsx
├── utils
│   └── env.js
├── .babelrc
├── .eslintrc
├── .gitignore
├── .prettierrc
└── webpack.config.js
```

<br>

# 4. webpack.config.js 설정

Webpack을 위한 설정파일로 프로젝트의 빌드 과정과 관련된 다양한 설정들을 정의할 수 있다. 입력 파일(entry point), 출력 파일(output), 로더(loaders), 플러그인(plugins), 해석 방식(resolve), 최적화(optimization) 등을 지정할 수 있다.

<br>

## 필요한 패키지, 플러그인 가져오기 및 변수 선언

```javascript
const webpack = require('webpack'),
  path = require('path'),
  env = require('./utils/env'),
  CopyWebpackPlugin = require('copy-webpack-plugin'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const alias = {};
const isDevelopment = process.env.NODE_ENV !== 'production';

const fileExtensions = ['jpg', 'jpeg', 'png', 'gif', 'eot', 'otf', 'svg', 'ttf', 'woff', 'woff2'];
```

<br>

**`alias`**

모듈을 가져올 때 경로 대신 별칭을 사용하여 모듈을 참조할 수 있다. 짧은 문자열 및 별칭을 사용하여 긴 경로나 자주 사용되는 경로를 대체할 수 있다. 지금은 사용하지 않지만 추후에 아래와 같이 변경하여 사용이 가능하다.

```javascript
const alias = {
  '@image': path.resolve(__dirname, 'src/assets/image/'),
};
```

`alias`를 설정하면 프로젝트 내에 다음과 같이 모듈을 간편하게 가져올 수 있다.

```javascript
import logo from '@image/logo.png';
```

<br>

## `mode` 설정

```javascript
const options = {
  mode: process.env.NODE_ENV || 'development',
  // ...
};
```

`mode`는 아래 3가지로 나뉜다.

- `development` : 개발 중 유용한 오류 메시지와 디버깅 정보를 포함하도록 번들이 최적화된다.
- `production` : 코드의 크기를 줄이고 성능을 최적화하기 위하여 압축 및 최소화가 진행된다. 이 때 디버그 정보는 제외된다.
- `none`

`process.env.NODE_ENV`가 정의되지 않거나 *falsy*한 값일 경우 `development`를 사용하고자 했다.

<br>

## `entry` 설정

```javascript
const options = {
  // ... (mode 생략)

  entry: {
    background: path.join(__dirname, 'src', 'pages', 'Background', 'index.js'),
    contentScript: path.join(__dirname, 'src', 'pages', 'Content', 'index.js'),
    popup: path.join(__dirname, 'src', 'pages', 'Popup', 'index.jsx'),
    login: path.join(__dirname, 'src', 'pages', 'Login', 'index.jsx'),
  },
};
```

entry point는 번들링 프로세스가 시작되는 지점이다. 어떤 파일을 기점으로 의존성 트리를 시작해서 생성해야 할지 알려주는 설정으로, 해당 엔트리 포인트에서 시작하여 파일이 의존하는 다른 모듈들을 찾아가며 번들을 생성한다.

현재 진행중인 web-extension 프로젝트의 경우 `background`, `content`, `popup`, `login` 4개의 엔트리 포인트가 존재하여 위와 같이 작성하였다. `entry`의 경우 상황에 맞게 추가하거나 줄이면 된다.

<br>

## `output` 설정

```javascript
const options = {
  // ... (mode, entry 생략)

  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'build'),
    clean: true,
    // publicPath: process.env.ASSET_PATH || "/",
  },
};
```

`output`은 Webpack에서 생성된 번들의 출력 방식을 정의한다.

- `filename` : 번들 파일의 이름 패턴을 정의하였다. `[name]`은 `entry`에서 정의된 키 이름으로 대체된다.
- `path` : 번들 파일이 저장될 디렉토리 절대 경로를 지정하였다. 루트 디렉토리를 의미하는 `__dirname` 아래에 `build` 디렉토리로 설정하였다.
- `clean`은 새로운 빌드가 시작될 때마다 이전 빌드의 출력 파일들을 자동으로 제거할지 여부를 설정할 수 있다.

<br>

## `module` 설정

```javascript
const options = {
  // ... (mode, entry, output 생략)

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
        ],
      },
      {
        test: new RegExp('.(' + fileExtensions.join('|') + ')$'),
        type: 'asset/resource',
        exclude: /node_modules/,
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(js|jsx)$/,
        use: [
          {
            loader: 'source-map-loader',
          },
          {
            loader: require.resolve('babel-loader'),
            options: {
              plugins: [isDevelopment && require.resolve('react-refresh/babel')].filter(Boolean),
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
};
```

`module`은 Webpack에서 처리하는 모듈의 동작 방식을 정의한다. `rules` 배열은 파일에 어떤 로더(loader)를 사용하여 처리할지 지정하는 규칙을 포함한다. 이해를 위해서 위에서 작성한 네 가지 경우 중 두 가지만 살펴보자.

첫 번째로 `test: /\.css$/,` 부분을 살펴보자. CSS 파일을 처리하기 위해서 .css 확장자를 가진 파일에 대해서 css-loader, style-loader 순으로 적용했다(로더의 순서가 중요하며, 뒤에서 앞으로 실행). 우선 css-loader를 통하여 CSS 파일을 모듈화하여 `import`가 가능하도록 했으며, style-loader로 모듈화된 CSS 파일을 DOM에 동적으로 추가하도록 했다.

두 번째로 `test: /\.(js|jsx)$/,` 부분을 살펴보자. JavaScript, JSX 파일을 처리하기 위한 규칙으로 해당 확장자 파일(.js, .jsx)은 source-map-loader, babel-loader가 적용된다.

- **source-map-loader** : 빌드 전인 원래 소스 코드에 매핑하여, 번들링된 코드에서 발생하는 오류의 위치를 원본 코드에서 쉽게 추적할 수 있게 해준다.
- **babel-loader** : `options`를 통해서 추가 설정을 제공할 수 있는데, `plugins`에 바벨 플러그인으로 `react-refresh/babel`을 추가했다. 이는 Hot Module Replacement를 위한 플러그인으로 개발 모드에서만 사용하도록 설정하여, 개발 모드가 아닌 경우 `false`를 반환하도록 했다.

<br>

## `resolve` 설정

```javascript
const options = {
  // ... (mode, entry, output, module 생략)

  resolve: {
    alias: alias,
    extensions: fileExtensions.map((extension) => '.' + extension).concat(['.js', '.jsx']),
  },
};
```

`resolve`의 경우 모듈 해석에 관련된 설정을 정의한다. 예를 들어서 `import`와 같은 방식으로 다른 파일 혹은 패키지를 참조할 때, 참조가 어떤 파일이나 디렉토리를 가리키는지 결정하는 과정이다.

- `alias` : 특정 모듈의 경로를 간단한 문자열로 대체하여 사용할 수 있게 하는 기능이다.
- `extensions` : Webpack이 모듈을 해석할 때 확장자를 생략했을 경우 시도해볼 파일 확장자들의 배열이다. 예를 들어서 `import App from './App'`이 있을 때 기본적으로 `./App.js`를 찾으나 `extensions`에 다른 확장자도 추가되어 있다면, 순서대로 시도하여 해당 파일을 탐색하게 된다.

<br>

## `plugins` 설정

```javascript
const options = {
  // ... (mode, entry, output, module, resolve 생략)

  plugins: [
    isDevelopment && new ReactRefreshWebpackPlugin(),
    new CleanWebpackPlugin({ verbose: false }),
    new webpack.ProgressPlugin(),
    // new webpack.EnvironmentPlugin(['NODE_ENV']),
    new webpack.EnvironmentPlugin({
      // 'NODE_ENV'가 정의되지 않은 경우 'development'를 기본값으로 사용
      NODE_ENV: 'development',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'src/manifest.json',
          to: path.join(__dirname, 'build'),
          force: true,
        },
      ],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'src/pages/Content/content.css',
          to: path.join(__dirname, 'build'),
          force: true,
        },
      ],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'src/assets/web/css',
          to: path.join(__dirname, 'build', 'web', 'css'),
          force: true,
        },
      ],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'src/assets/web/webfonts',
          to: path.join(__dirname, 'build', 'web', 'fonts'),
          force: true,
        },
      ],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'src/assets/image/icon-16.png',
          to: path.join(__dirname, 'build'),
          force: true,
        },
      ],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'src/assets/image/icon-48.png',
          to: path.join(__dirname, 'build'),
          force: true,
        },
      ],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'src/assets/image/icon-128.png',
          to: path.join(__dirname, 'build'),
          force: true,
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'pages', 'Popup', 'index.html'),
      filename: 'popup.html',
      chunks: ['popup'],
      cache: false,
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'pages', 'Login', 'index.html'),
      filename: 'login.html',
      chunks: ['login'],
      cache: false,
    }),
  ].filter(Boolean),
};
```

`plugins`은 빌드 프로세스 중 특정 시점에서 특정 작업을 수행하도록 설계된 자바스크립트 객체로 Webpack 빌드 프로세스를 광범위하게 확장하고 커스터마이징할 수 있다.

플러그인 종류가 다양하지만 web extension 구조에 맞춰서 사용했는데, 예를 들어서 Chrome extension의 경우 `manifest.json` 파일이 루트 디렉토리에 위치해야 한다는 규칙이 있다. 이를 위해서 `CopyWebpackPlugin`을 사용하여 빌드를 진행할 경우 `manifest.json`가 루트 디렉토리에 생성되도록 했다. 마찬가지로 `manifest.json`에서 사용하는 `content`, `icon` 또한 빌드시 루트 디렉토리에 생성되도록 했다.

`HTMLWebpackPlugin`의 경우 `template`을 통해서 HTML 파일을 생성하고, `filename`을 통해서 생성될 파일의 이름을 지정할 수 있다. `chunks`는 해당 HTML 파일에 포함될 번들 파일을 지정한다.

<br>

## 그 외 `infrastructureLogging`, `devtool`, `optimization` 설정

```javascript
const options = {
  // ... (mode, entry, output, module, resolve, plugins 생략)

  infrastructureLogging: {
    level: 'info',
  },
};

if (env.NODE_ENV === 'development') {
  options.devtool = 'cheap-module-source-map';
} else {
  options.optimization = {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
    ],
  };
}

module.exports = options;
```

`infrastructureLogging`을 사용하여 Webpack 런타임 및 플로그인 로깅 동작을 세부적으로 제어할 수 있다. `level` 옵션을 통해 로깅의 레벨을 설정할 수 있다.

- `none` : 로그 출력 X
- `error` : 오류 메시지만 출력
- `warn` : 경고와 오류 메시지를 출력
- `info` : 중요한 정보, 경고, 오류 메시지 출력
- `log` : 일반 로그, 정보, 경고, 오류 메시지 모두 출력
- `verbose` : 모든 로그 출력

`devtool`은 소스 맵의 종류를 지정한다. 소스 맵은 브라우저 개발자 도구에서 최소화된 코드가 아닌 원본 코드를 보여주어 디버깅을 용이하게 한다. `cheap-module-source-map`은 소스 맵을 생성하지만, 원본 소스를 복원하지 않는다. `production` 모드에서는 `cheap-module-source-map` 대신 `source-map`을 사용한다. `source-map`은 소스 맵을 생성하며, 원본 소스를 복원한다. `cheap-module-source-map`은 `source-map`보다 빠르게 빌드되지만, 디버깅이 어려울 수 있다.

개발용(development)이 아닌 배포용(production)으로 빌드할 때 최적화를 위해서 `else`문에 작성했다. `optimization`은 웹팩의 최적화 옵션을 설정하고, `minimize`는 최소화 여부를 결정한다. `minimizer`는 최소화 도구를 지정하고, JavaScript 코드를 최소화하는 `TerserPlugin`을 사용했으며, `extractComments: false`로 주석을 추출하지 않도록 설정하였다.

<br>

# 5. `.babelrc` 설정

`.babelrc`는 Babel의 설정파일이다.

```
{
  "presets": [
    "@babel/preset-react",
    ["@babel/preset-env", { "useBuiltIns": "usage", "corejs": 3 }]
  ]
}

```

Babel은 플러그인 기반으로 동작하며, `presets`는 Babel이 코드를 변환할 때 사용할 플러그인 모음이다.

`@babel/preset-react`는 JSX 및 React 관련 문법을 변환하기 위한 플러그인 모음이다.

`@babel/preset-env`는 최신 JavaScript 문법을 지원되지 않는 브라우저를 위하여 ES5 이하의 문법으로 변환하기 위한 플러그인이다. `useBuiltIns`는 프로젝트에 폴리필을 어떻게 추가할 것인지 지정하기 위해 사용한다.

- `usage` : 코드 내에서 실제로 사용된 기능에 대해서만 자동으로 폴리필을 추가한다.
- `entry` : 프로젝트 엔트리 포인트에 `import 'core-js'`와 같은 구문을 추가하여 가능한 폴리필을 포함한다.
- `false` : 폴리필을 자동으로 추가하지 않으며, 직접 필요한 폴리필을 추가해야 한다.

`corejs`는 `useBuiltIns`가 `usage`일 경우 필요한 폴리필을 어떤 버전의 `core-js`에서 가져올지 지정한다.

<br>

# 6. `manifest.json` 설정

background, content, popup 등의 개발이 끝나면 빌드를 진행하게 되는데 결과는 다음과 같다.

```
build
├── background.bundle.js
├── background.bundle.js.map
├── content.css
├── contentScript.bundle.js
├── contentScript.bundle.js.map
├── icon-128.png
├── icon-16.png
├── icon-48.png
├── login.bundle.js
├── login.bundle.js.map
├── login.html
├── manifest.json
├── popup.bundle.js
├── popup.bundle.js.map
└── popup.html
```

webpack.config.js에서 설정한대로 빌드가 되었음을 확인할 수 있다. 해당 폴더를 Chrome extension에 업로드하게 될텐데 `manifest.json`을 build 결과에 맞춰서 작성해야한다. 대부분 빌드 결과를 루트 디렉토리에 위치 시켰으므로, 별도로 경로를 지정하지 않고 파일명을 입력했다.

```json
{
  "manifest_version": 3,
  "name": "Web extension 이름",
  "version": "1.0.0",
  ...
  "background": {
    "service_worker": "background.bundle.js"
  },
  "action": {
    "default_popup": "popup.html",
    "default_icon": {
      "16": "icon-16.png",
      "48": "icon-48.png",
      "128": "icon-128.png"
    }
  },
  "icons": {
    "16": "icon-16.png",
    "48": "icon-48.png",
    "128": "icon-128.png"
  },
  "content_scripts": [
    {
      "matches": ["<all_urls>", "http://*/*", "https://*/*"],
      "js": ["contentScript.bundle.js"],
      "css": ["content.css"],
      "run_at": "document_end"
    }
  ]
}
```
