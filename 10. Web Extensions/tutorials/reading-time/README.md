### ⚠️ Chrome for Developers를 참고하여 학습한 자료입니다.

### 목적

- Extension manifest 개념
- Extension에서 사용되는 아이콘 크기
- Content scripts를 사용하여 페이지에 코드 주입하는 방법
- match 패턴 사용하는 방법
- extension 허가

참고 링크 : https://developer.chrome.com/docs/extensions/mv3/getstarted/tut-reading-time/

<br>

# manifest.json

```json
{
  "manifest_version": 3,
  "name": "Reading time",
  "version": "1.0",
  "description": "Add the reading time to Chrome Extension documentation articles",

  "icons": {
    "16": "images/icon-16.png",
    "32": "images/icon-32.png",
    "48": "images/icon-48.png",
    "128": "images/icon-128.png"
  },

  "content_scripts": [
    {
      "js": ["scripts/content.js"],
      "matches": [
        "https://developer.chrome.com/docs/extensions/*",
        "https://developer.chrome.com/docs/webstore/*"
      ]
    }
  ]
}
```

<br>

## 코드 톺아보기

### manifest

확장 프로그램에 대한 정보를 추가하며, extension에서 유일하게 꼭 필요한 파일이다. 이 파일에는 extension에 대한 중요한 정보가 담겨있다. 프로젝트의 루트에 `manifest.json` 파일을 생성하고 다음과 같은 코드를 추가할 수 있다.

```json
{
  "manifest_version": 3,
  "name": "Reading time",
  "version": "1.0",
  "description": "Add the reading time to Chrome Extension documentation articles"
}
```

위와 같은 키들은 extension에 대한 기본 메타데이터를 포함하고 있으며, extension이 확장 페이지에서 어떻게 표시되는지와 Chrome 웹 스토어에 게시될 때 어떻게 표시되는지를 제어한다.

<br>

### icons

개발 중에는 아이콘이 선택적이지만, Chrome 웹 스토어에 extension을 배포하려는 경우에는 필수이다. Extension 페이지와 같은 곳에서 사용되기 때문이다.

`images` 폴더를 생성하고 안에 아이콘을 배치하고, 아이콘을 선언하기 위해서 `manifest.json`에 다음 코드를 추가한다.

```json
{
  ...
  "icons": {
    "16": "images/icon-16.png",
    "32": "images/icon-32.png",
    "48": "images/icon-48.png",
    "128": "images/icon-128.png"
  }
  ...
}
```

PNG 파일을 추천하지만, SVG 파일을 제외한 다른 형식의 파일도 허용된다.

<br>

### Content script

Extension은 페이지의 내용을 읽고 수정하는 스크립트를 실행할 수 있다. 이러한 스크립트를 Content script라고 하며, 호스트 페이지나 다른 확장 프로그램의 스크립트와 충돌 없이(Isolated World) JavaScript 환경을 변경할 수 있다.

`content.js`라는 Content script를 등록하기 위해서 `manifest.json`에 다음과 같이 등록해야 한다.

```json
{
  ...
  "content_scripts": [
    {
      "js": ["scripts/content.js"],
      "matches": [
        "https://developer.chrome.com/docs/extensions/*",
        "https://developer.chrome.com/docs/webstore/*"
      ]
    }
  ]
}
```

```javascript
// scripts/content.js

const article = document.querySelector('article');

if (article) {
  // ...
}
```

`matches` 필드에는 하나 이상의 match 패턴이 포함될 수 있다. 이는 브라우저가 어떤 사이트에 content script를 주입할지 식별하게 한다. 패턴은 세가지 부분으로 구성되어 있으며 `<scheme>://<host><path>`와 같은 형태를 나타낸다. 패턴에 `*` 문자를 포함할 수 있다.
