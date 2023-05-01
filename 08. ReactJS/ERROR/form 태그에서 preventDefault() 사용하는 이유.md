## 왜 form 태그에서 preventDefault()를 사용하지 않으면 전송되지 않을까?

우선 `<form>`은 사용자로부터 값을 입력받는 양식을 만들기 위해서 사용한다. 아래 태그 중 필요한 것을 선택하여 조합할 수 있다.

- `<input>`
- `<textarea>`
- `<button>`
- `<select>`
- `<option>`
- `<optgroup>`
- `<fieldset>`
- `<label>`
- `<output>`

사용자의 입력을 가져오기 위해서 아래 `<form>`에는 `onSubmit` 이벤트와 `<form>`하위에 `<button>`을 작성하여 제출 동작을 감지하도록 했다.

```javascript
const signForm = () => {
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
  });

  const handleChange = ({ target }) => {
    setUserInfo((prev) => ({ ...prev, [target.name]: target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // 서버와 통신하는 코드 작성
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">이메일</label>
        <input
          name="email"
          type="email"
          value={userInfo.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="password">패스워드</label>
        <input
          name="password"
          type="password"
          value={userInfo.password}
          onChange={handleChange}
        />
      </div>
      <div>
        <button type="submit" />
      </div>
    </form>
  );
};
```

하지만 submit 이벤트가 발생할 때 호출되는 `handleSubmit` 함수에 `preventDefault()` 메서드를 사용하지 않으면 서버에 값을 제대로 전송하지 못하는 경우를 확인할 수 있다. 왜 `preventDefault()`를 작성하지 않으면 데이터를 의도했던대로 전송하지 못할까? MDN에서 정의한 `Event.preventDefault()`를 살펴보자.

> `Event` 인터페이스의 `preventDefault()` 메서드는 어떤 이벤트를 명시적으로 처리하지 않은 경우, 해당 이벤트에 대한 기본 동작을 실행하지 않도록 지정한다. - 출처 : [mdn web docs](https://developer.mozilla.org/ko/docs/Web/API/Event/preventDefault)

<br>

여기서 `preventDefault()`를 사용하여 값을 제출할 때 의도하지 않은 기본 동작을 없애고자 한다는 힌트를 얻을 수 있었다. 어떤 기본동작을 없애고자 했는지부터 말하자면 `submit` 이벤트이다. `submit` 이벤트는 양식을 제출하는 고유 동작으로 페이지 이동, 새로고침이 발생한다. 이때 `preventDefault()` 메서드를 사용하여 새로고침이 발생하여 데이터가 전송되지 않던 것을 해결할 수 있다.
