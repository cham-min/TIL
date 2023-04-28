### value 속성만 지정하지는 않았는가?

React에서는 `value` 속성만 지정하면 값이 입력되지 않는 현상이 있다. `value` 속성으로만 값을 제어할 수 있는 권한이 있으며, 사용자에게는 권한이 없어서 값이 입력되지 않는다.

해당 문제는 `onChange` 함수를 사용하여 `input`을 수정할 수 있는 상태로 만들어서 손쉽게 해결이 가능하다.

```javascript
const [email, setEmail] = useState('');

const onChangeEmail = useCallback((e) => {
  setEmail(e.target.value);
}, []);

return (
  <input
    value={email}
    onChange={onChangeEmail}
    ...
  />
);
```

<br>

### input 태그에 없는 속성을 사용하지는 않았는가?

```javascript
const signUp = () => {
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
  });

  const handleChange = ({ target }) => {
    setUserInfo((prev) => ({ ...prev, [target.name]: target.value }));
  };

  return (
    <input
      type="email"
      value={userInfo.email}
      onChange={handleChange}
      placeholder="이메일을 입력해주세요"
      required
    />
    // 패스워드 input태그는 생략...
  );
};
```

`handleChange` 함수에서는 `target`을 사용하여 `email`의 값을 바꾸려했다.

`handleChange` 함수내에 콘솔을 출력하는 명령문을 넣고 `input`태그내에 글을 입력할 때마다 아래와 같이 똑같은 결과를 계속 확인할 수 있다.

```javascript
const handleChange = ({ target }) => {
  setUserInfo((prev) => ({ ...prev, [target.name]: target.value }));
  console.log(target);
};

// target 결과
<input type="email" placeholder="이메일을 입력해주세요" required="" class="sc-cjERFW fKYQGa" value="">
```

<br>

위 결과를 통해서 `onChange` 이벤트는 일어나고 있음을 확인할 수 있었다. 하지만 `handleChange` 함수에서 `target.name`과 `target.value`를 이용하여 `input`에 입력된 값을 변경하려는데 `input`에는 `name` 속성이 없었다.

따라서 `handleChange` 함수가 작동해도 `target.name`이라는 키는 기존에 존재하지 않아서 계속 새로운 키(공백)와 값(입력한 한 글자)을 만들어냈다.

그리고 `target.value`는 `userInfo.email`의 현 상태를 가져오는 것인데 `userInfo.email`의 상태는 업데이트되지 않으므로 `input` 태그는 계속 공백을 유지했다.

`input` 태그는 계속 공백을 유지하므로 `target.name`이 만들어낸 공백 키에도 글자가 이어지지 않고 공백이 이어지는 악순환을 확인할 수 있었다.
