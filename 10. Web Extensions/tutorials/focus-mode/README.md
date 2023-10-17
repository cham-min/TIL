### ⚠️ Chrome for Developers를 참고하여 학습한 자료입니다.

### 목적

- Extension service worker를 이벤트 조정자로 사용하기
- `activeTab` 권한을 통해 사용자 개인정보 보호하기
- 사용자가 extension toolbar icon을 클릭할 때 코드 실행하기
- Scripting API를 사용하여 스타일시트 삽입 및 제거하기
- 키보드 단축키로 코드 실행하기

참고 링크 : https://developer.chrome.com/docs/extensions/mv3/getstarted/tut-focus-mode/

<br>

# manifest.json

```json
{
  "manifest_version": 3,
  "name": "Focus Mode",
  "description": "Enable focus mode on Chrome's official Extensions and Chrome Web Store documentation.",
  "version": "1.0",

  "icons": {
    "16": "images/icon-16.png",
    "32": "images/icon-32.png",
    "48": "images/icon-48.png",
    "128": "images/icon-128.png"
  },

  "background": {
    "service_worker": "background.js"
  },

  "action": {
    "default_icon": {
      "16": "images/icon-16.png",
      "32": "images/icon-32.png",
      "48": "images/icon-48.png",
      "128": "images/icon-128.png"
    }
  },

  "permissions": ["activeTab", "scripting"],

  "commands": {
    "_execute_action": {
      "suggested_key": {
        "default": "Ctrl+B",
        "mac": "Command+B"
      }
    }
  }
}
```

<br>

## 코드 톺아보기

### icons

Extension의 전반적인 아이콘을 정의한다. Chrome 웹 스토어와 같은 곳에서 extension을 나타내는 아이콘, 관리자 페이지에서의 아이콘 등을 나타낸다.

<br>

### action

> 💡 **default_icon** : Extension의 툴바에 나타나는 아이콘을 정의한다. 사용자가 해당 아이콘을 클릭하면 `chrome.action`에서 정의된 동작이 수행된다. 확장 프로그램의 상태나 동작에 따라 툴바 아이콘을 동적으로 변경하고 싶을 때 `chrome.action.setIcon()`과 같은 메서드를 사용할 수 있다. 이때 `default_icon`에서 지정한 아이콘이 기본값으로 사용된다.

```javascript
// background.js
chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({
    text: 'OFF',
  });
});
```

background.js에 action 등록했으면, extension action을 활성화해야 한다. extension action은 툴바 아이콘을 제어한다. 따라서 사용자가 action을 클릭할 때마다 어떤 코드를 실행하게 되거나 팝업을 표시하게 된다.
확장 액션을 선언하기 위해 다음 코드를 추가해보자.

```json
{
  ...
  "action": {
    "default_icon": {
      "16": "images/icon-16.png",
      "32": "images/icon-32.png",
      "48": "images/icon-48.png",
      "128": "images/icon-128.png"
    }
  },
  ...
}
```

<br>

### permissions

사용자의 개인정보 보호를 위해서 `activeTab` 권한을 사용한다. `activeTab` 권한은 현재 활성화된 탭에서 코드를 일시적으로 실행하는 능력을 부여한다. 현재 탭의 민감한 정보에 접근하는 것도 허용한다.

이 권한은 사용자가 extension을 호출할 때 활성화된다. 이 경우, 사용자는 extension action을 클릭하여 extension을 호출한다.

`activeTab` 권한은 사용자가 사용하고 있는 탭에서 extension을 실행하기로 명확하게 선택할 수 있게 해주므로, 이는 사용자의 개인정보를 보호한다. 다른 이점으로는 권한 경고를 트리거하지 않는다는 점이다.

`activeTab` 권한을 사용하려면 manifest 권한 배열에 추가해야 한다.

```json
{
  ...
  "permissions": ["activeTab"],
  ...
}
```

<br>

**Extension에서 `activeTab` 권한을 활성화하는 사용자의 상호작용은 무엇이 있을까?**

- 키보드 단축기 조합 누르기
- 컨텍스트 메뉴 항목 선택하기
- 주소 입력창(omnibox)에서 제안 수락하기
- Extension popup 열기

<br>

### scripting

Scripting API를 사용하여 스타일시트를 삽입하거나 제거할 수 있다. 우선 manifest.json에 `scripting` 권한을 선언하여 시작한다.

- `chrome.scripting.insertCSS` : CSS 삽입
- `chrome.scripting.removeCSS` : CSS 제거
- `chrome.scripting.executeScript()` : JavaScript 삽입

```json
{
  ...
  "permissions": ["activeTab", "scripting"],
  ...
}
```

```javascript
// background.js 내용 일부

if (nextState === 'ON') {
  // 사용자가 extension을 활성화하면, CSS를 삽입한다.
  await chrome.scripting.insertCSS({
    files: ['focus-mode.css'],
    target: { tabId: tab.id },
  });
} else if (nextState === 'OFF') {
  // 사용자가 extension을 비활성화하면, CSS를 제거한다.
  await chrome.scripting.removeCSS({
    files: ['focus-mode.css'],
    target: { tabId: tab.id },
  });
}
```

<br>

### Assign a keyboard shortcut

```json
{
  ...
  "commands": {
    "_execute_action": {
      "suggested_key": {
        "default": "Ctrl+B",
        "mac": "Command+B"
      }
    }
  }
}
```

`_execute_action`키는 `action.onClicked()` 이벤트와 동일한 코드로 실행되므로 추가적인 코드는 불필요하다.
