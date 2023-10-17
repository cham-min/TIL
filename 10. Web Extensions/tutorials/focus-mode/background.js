// [background.js 및 service worker]
// Extensions는 background에서 extension's service worker를 사용하여
// 브라우저 이벤트를 모니터링할 수 있다. Service workers는 이벤트를 처리하기 위해 로드되며,
// 더 이상 필요하지 않을 때 종료되는 특수한 JavaScript 환경이다.

chrome.runtime.onInstalled.addListener(() => {
  // service worker가 가장 처음으로 반응할 이벤트는 `runtime.onInstalled()`이다.
  // 해당 메소드로 extension에서 초기 상태를 설정하거나 설치 시 일부 작업을 완료할 수 있다.
  // 하지만 이번 프로젝트의 경우, 두 개의 states만 처리하기 때문에 확장자가 ON인지 OFF인지 추적하기 위해
  // action의 badge 텍스트를 사용한다.
  chrome.action.setBadgeText({ text: "OFF" });
});

// 현재 탭 상태 추적
// 사용자가 extension action을 클릭 후, extension은 URL이 문서와 일치하는지 확인한다.
// 다음으로, 현재 탭의 상태를 확인하고 다음 상태를 설정한다.
const extensions = "https://developer.chrome.com/docs/extensions";
const websotre = "https://cdeveloper.chrome.com/docs/webstore";

chrome.action.onClicked.addListener(async (tab) => {
  if (tab.url.startsWith(extensions) || tab.url.startsWith(webstore)) {
    // action badge를 검색하여 extension이 ON인지 OFF인지 확인한다.
    const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
    // next state는 항상 opposite이다.
    const nextState = prevState === "ON" ? "OFF" : "ON";

    // action badge를 next state에 업데이트한다.
    await chrome.action.setBadgeText({
      tabId: tab.id,
      text: nextState,
    });

    // manifest.json에 scripting 권한을 선언했다면
    if (nextState === "ON") {
      // 사용자가 extension을 활성화하면, CSS를 삽입한다.
      await chrome.scripting.insertCSS({
        files: ["focus-mode.css"],
        target: { tabId: tab.id },
      });
    } else if (nextState === "OFF") {
      // 사용자가 extension을 비활성화하면, CSS를 제거한다.
      await chrome.scripting.removeCSS({
        files: ["focus-mode.css"],
        target: { tabId: tab.id },
      });
    }
  }
});
