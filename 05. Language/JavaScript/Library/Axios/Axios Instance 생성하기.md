# 목차

- [Axios Instance](#axios-instance)
- [Interceptors](#interceptors)
  - [Request Interceptors](#request-interceptors)
  - [Response Interceptors](#response-interceptors)
- [장점](#장점)
- [사용 예시](#사용-예시)
- [Ref](#ref)

<br>

# Axios Instance

Axios Instance는 전역 설정된 `axios` 객체를 커스터마이징하여 사용할 수 있는 객체로 아래의 특징을 갖는다.

- `axios.create` 메서드를 사용하여 인스턴스를 생성하고, 이 메서드는 설정 객체를 인수로 받는다.
- 설정 객체에서는 `baseURL`, `headers`, `timeout` 등의 설정을 변경할 수 있다.

```javascript
const customAxios = axios.create({
  baseURL: 'https://api.example.com',
});
```

<br>

위 코드를 통해서 `https://api.example.com`이라는 기본 URL을 가진 `axios` 인스턴스를 생성했다. 해당 인스턴스를 통해서 API를 요청하면, 요청 URL 앞에 자동으로 `https://api.example.com`이 추가된다.

```javascript
customAxios.post('/login').then((res) => {
  console.log('login success');
});

// 위 코드는 ‘https://api.example.com’에 POST 요청을 보낸다.
```

<br>

# Interceptors

Axios Interceptors는 요청, 응답을 전송하기 전에 가로채서 처리하는 기능을 제공하며 두 가지 타입이 있다.

### Request Interceptors

- 요청을 서버에 보내기 전에 가로채며 인증 토큰을 요청에 추가하거나, 요청 헤더를 수정하는 등의 작업을 수행할 수 있다.

```javascript
axios.interceptors.request.use(
  (config) => {
    // 헤더에 인증 토큰 추가
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
```

<br>

### Response Interceptors

- 서버로부터 응답을 받은 후에 응답을 가로채며 응답 데이터를 변환하거나, 특정 HTTP 상태 코드에 대해 전역적으로 에러를 처리하는 등의 작업을 수행할 수 있다.

```javascript
axios.interceptors.response.use(
  (response) => {
    // 응답 데이터를 변환하거나 가공
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      // 401 응답에 대한 전역 처리
      logoutUser();
    }
    return Promise.reject(error);
  }
);
```

<br>

# 장점

- 인스턴스를 사용하여 공통된 설정이 필요한 여러 요청에 대해 코드를 간략화할 수 있다.
- 특정 인스턴스에 대해서만 인터셉터 설정이 가능하다.

<br>

# 사용 예시

### 기존 코드

```typescript
// src/hooks/useLoginForm.ts

const MOCK_SERVER_URL = 'https://api.example.com';

async function loginUser(credential: UserForm) {
  const response = await axios.post(`${MOCK_SERVER_URL}/login`, credentials);
  return response.data;
}

const useLoginForm = () => {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  const loginMutation = useMutation(loginUser, {
    onSuccess: () => {
      // 로그인 성공 후 처리할 로직
    },
    onError: () => {
      // 로그인 실패 시 처리할 로직
    },
  });

  const handleChange = (key: keyof UserForm) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({
      ...userInfo,
      [key]: event.target.value,
    });
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginMutation.mutate(userInfo);
  };

  return {
    ...userInfo,
    handleIdChange: handleChange('id'),
    handlePwChange: handleChange('pw'),
    handleLogin,
  };
};

export default useLoginForm;
```

위 코드는 로그인을 위한 비즈니스 로직들을 작성한 Custom Hook이다. 해당 코드를 작성하며 다음과 같은 고민을 하게 되었다.

- 추후에 게시글 관련 개발을 진행할 때에도 같은 API 경로를 작성할 것 같다(재사용성 고려).
- API와 관련된 내용은 관심사를 분리하여 가독성과 유지 보수성을 높이고 싶었다.

<br>

### 개선 코드

```typescript
// src/data/constant.ts

export const BASE_URL = 'https://생략';
```

```typescript
// src/lib/customAxios.ts

import axios from 'axios';

import BASE_URL from '../data/constant';

const customAxios = axios.create({
  baseURL: BASE_URL,
});

customAxios.interceptors.request.use(
  (config) => {
    const token = getToken(TOKEN_KEY);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },

  (error) => {
    removeToken(TOKEN_KEY);
    return Promise.reject(error);
  }
);

export default customAxios;
```

```typescript
// src/api/authAPI.ts

import customAxios from '../lib/customAxios';
import { UserForm } from '../types/auth';

const authAPI = () => {
  const signin = async (userInfo: UserForm) => {
    const { data } = await customAxios.post('/login', userInfo);
    return data;
  };

  return { signin };
};

export default authAPI();
```

```typescript
// src/hooks/useLoginForm.ts

const useLoginForm = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  const loginMutation = useMutation(loginUser, {
    onSuccess: () => {
      // 로그인 성공 후 처리할 로직
      navigate('/main');
    },
    onError: () => {
      // 로그인 실패 시 처리할 로직
    },
  });

  const handleChange = (key: keyof UserForm) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({
      ...userInfo,
      [key]: event.target.value,
    });
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginMutation.mutate(userInfo);
  };

  return {
    ...userInfo,
    handleIdChange: handleChange('id'),
    handlePwChange: handleChange('pw'),
    handleLogin,
  };
};

export default useLoginForm;
```

<br>

# Ref

- [Axios Docs](https://axios-http.com/kr/docs/instance)
