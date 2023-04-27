# 목차

- [고차 컴포넌트 (HOC, Higher-Order Components)](#고차-컴포넌트-hoc-higher-order-components)
- [고차 컴포넌트의 사용](#고차-컴포넌트의-사용)
  - [인증 페이지](#인증-페이지)
  - [크로스 커팅 문제에 고차 컴포넌트 사용](#크로스-커팅-문제에-고차-컴포넌트-사용)

<br>

# 고차 컴포넌트 (HOC, Higher-Order Components)

- 컴포넌트 로직을 재사용하기 위한 기술
- React의 컴포넌트적 성격에서 나타나는 패턴
- 컴포넌트를 취하여 새로운 컴포넌트를 반환하는 함수
- 고차 컴포넌트는 Redux의 `connect`와 같은 React 라이브러리에서 흔히 쓰인다.

```javascript
const EnhancedComponent = higherOrderComponent(WrappedComponent);
```

<br>

# 고차 컴포넌트의 사용

### 인증 페이지

인증이 필요한 페이지에서 인증 로직을 재사용하거나 데이터를 불러오는 로직을 재사용할 수 있다. 인증이 필요한 페이지에 접근하는 사용자가 인증되지 않으면 로그인 페이지로 redirect하는 HOC를 작성할 수 있다.

```javascript
// src/HOC/AuthHOC.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * 페이지별 접근 인증 HOC
 * @param Component 컴포넌트
 * @param option true: 로그인 유저만 출입 가능한 페이지, false: 비로그인 유저도 출입 가능한 페이지
 * @returns
 */
const AuthHOC = (Component, option) => {
  const AuthChecked = () => {
    const token = localStorage.getItem('access_token');
    const navigate = useNavigate();

    useEffect(() => {
      if (!token) {
        if (option) {
          navigate('/signin');
        }
      } else {
        navigate('/todo');
      }
    }, [navigate, token]);

    return <Component />;
  };

  return AuthChecked;
};

export default AuthHOC;
```

<br>

React Router에서 `element={}` 내에 함수를 넣으면 오류가 발생한다.

```javascript
// src/Router.js
const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route index element={<Navigate to="/signin" />} />
      <Route path="signup" element={AuthHOC(AuthSignup, false)} />
      <Route path="signin" element={AuthHOC(AuthSignin, false)} />
      <Route path="todo" element={AuthHOC(AuthTodo, true)} />
    </Route>
  )
);

/* Warning: Functions are not valid as a React child.
This may happen if you return a Component instead of from render.
Or maybe you meant to call this function rather than return it. */
```

<br>

때문에 아래의 방법으로 컴포넌트를 미리 만들어서 넣어야 한다.

```javascript
// 1. HOC 함수를 export 할 때 적용
const MyComponent = () => {
  return <div>인증이 필요한 페이지</div>;
};

const AuthenticatedComponent = AuthHOC(MyComponent);

export default AuthenticatedComponent;
// export default AuthHOC(MyComponent);

// 2. 미리 HOC 함수를 적용
const AuthSignup = AuthHOC(Signup, false);
const AuthSignin = AuthHOC(Signin, false);
const AuthTodo = AuthHOC(Todo, true);

const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route index element={<Navigate to="/signin" />} />
      <Route path="signup" element={<AuthSignup />} />
      <Route path="signin" element={<AuthSignin />} />
      <Route path="todo" element={<AuthTodo />} />
    </Route>
  )
);
```

<br>

### 크로스 커팅 문제에 고차 컴포넌트 사용

컴포넌트는 React에서 코드 재사용의 기본 단위이다. 동일하지 않지만 대부분의 구현체는 동일하여 반복적인 패턴이 반복되어 이 로직을 한 곳에서 정의하고 로직을 공유할 수 있게하는 추상화가 필요할 때 고차 컴포넌트를 사용한다.
