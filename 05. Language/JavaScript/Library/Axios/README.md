# 목차

- [Axios](#axios)
  - [Install](#install)
- [Axios API](#axios-api)
  - [axios(config)](#axiosconfig)
  - [axios(url[, config])](#axiosurl-config)
  - [요청 메서드 명령어](#요청-메서드-명령어)
- [Config](#config)
- [Axios Instance](#axios-instance)
  - [axios.create([config])](#axioscreateconfig)
- [Interceptor](#interceptor)
  - [사용 예시](#사용-예시)
- [Ref](#ref)

<br>

# Axios

node.js와 browser를 위한 `Promise` 기반 HTTP 클라이언트

<br>

### Install

```bash
# npm
$ npm install axios

# yarn
$ yarn add axios
```

<br>

# Axios API

`axios`는 아래와 같은 방법으로 사용한다.

1. `axios(config)`
2. `axios(url[, config])`
3. 요청 메서드 명령어

<br>

### `axios(config)`

- `config`는 `{}`로 감싸야한다.

```javascript
// POST
axios({
  method: 'post',
  url: '/user/123',
  data: {
    firstName: '최',
    lastName: '개발',
  },
});
```

<br>

### axios(url[, config])

```javascript
// GET 요청 전송(기본값)
axios('/user/123');
```

<br>

### 요청 메서드 명령어

- axios.request(config)
- axios.get(url[, config])
- axios.delete(url[, config])
- axios.head(url[, config])
- axios.options(url[, config])
- axios.post(url[, data[, config]])
- axios.put(url[, data[, config]])
- axios.patch(url[, data[, config]])

<br>

# Config

`url`만 필수이며 나머지는 option이다.

```javascript
참고 : https://axios-http.com/kr/docs/req_config

{
  url: '/user',
  method: 'get',
  // `baseURL`은 URL 앞에 붙는다.
  baseURL: 'https://some-domain.com/api',
  // 사용자 지정 헤더
  headers: {},
  // 요청과 함께 전송되는 URL 파라미터
  params: {},
  // 요청 body로 전송될 데이터 (PUT, POST, PATCH, DELETE에서 사용)
  data: {},
  // 요청이 시간 초과될 시간을 지정하며 해당 시간을 초과할 경우 요청을 중단
  timeout: 1000,
  // 자격 증명을 사용하여 사이트 간 액세스 제어 요청을 하는지 여부
  withCredentials: false,
  // 프록시 지정
  proxy: {
    protocol: 'https',
    host: '127.0.0.1',
    port: 9000,
    auth: {},
  },
}
```

<br>

# Axios Instance

사용자 지정 `config`로 새로운 Axios Instance를 만들 수 있다.

<br>

### axios.create([config])

```javascript
const BASE_URL = 'https://www.test.com/';

const instance = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// 생성한 Axios Instance를 아래와 같이 사용한다.
// https://www.test.com/board에 get요청
instance.get('/board');
```

<br>

# Interceptor

- `then`, `catch`로 처리되기 전에 응답을 가로챌 수 있다.

```javascript
// 요청 인터셉터
axios.interceptors.request.use(
  function (config) {
    // 요청 전달되기 전 작업
    return config;
  },
  function (error) {
    // 요청 오류 작업 수행
    return Promise.reject(error);
  }
);

// 응답 인터셉터
axios.interceptors.response.use(
  function (response) {
    // 2xx 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
    // 응답 데이터가 있는 작업 수행
    return response;
  },
  function (error) {
    // 2xx 외의 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
    // 응답 오류가 있는 작업 수행
    return Promise.reject(error);
  }
);
```

<br>

### 사용 예시

```javascript
const customAxios = axios.create({
  baseURL: BASE_URL,
});

customAxios.interceptors.request.use(
  (config) => {
    // 토큰이 있을 때 헤더에 인증을 넣어야 하는 요청이 반복될 때
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
```

<br>

# Ref

- [Axios docs](https://axios-http.com/kr/)
