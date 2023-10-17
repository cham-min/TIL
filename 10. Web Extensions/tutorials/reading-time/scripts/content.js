const article = document.querySelector("article");

// `document.querySelector`는 선택자가 아무것도 match되지 않으면 null 값을 반환할 수 있다.
if (article) {
  const text = article.textContent;
  const wordMatchRegExp = /[^\s]+/g;
  const words = text.matchAll(wordMatchRegExp);

  // matchAll은 iterator을 반환한다. 배열로 변환하여 단어의 갯수를 구한다.
  const wordCount = [...words].length;
  const readingTime = Math.round(wordCount / 200);
  const badge = document.createElement("p");

  // Use the same styling as the publish information in an article's header
  badge.classList.add("color-secondary-text", "type--caption");
  badge.textContent = `⏱️ ${readingTime} min read`;

  // Support for API reference docs
  const heading = article.querySelector("h1");
  // Support for article docs with date
  const date = article.querySelector("time")?.parentNode;

  // https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentElement
  (date ?? heading).insertAdjacentElement("afterend", badge);
}
