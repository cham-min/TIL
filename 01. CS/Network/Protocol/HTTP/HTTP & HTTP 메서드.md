# 목차

- [HTTP](#http)
  - [HTTP 장점](#http-장점)
  - [HTTP 단점](#http-단점)
  - [HTTP State](#http-state)
  - [HTTPS](#https)
- [HTTP Method](#http-method)
  - [GET](#get)
  - [POST](#post)
    - [Content-Type 헤더 종류](#content-type-헤더-종류)
  - [PUT](#put)
  - [PATCH](#patch)
  - [GET vs POST](#get-vs-post)
- [Ref](#ref)

<br>

# HTTP

- HyperText Transfer Protocol의 약자이다.
- 웹상에서 데이터를 주고받기 위한 프로토콜로 웹에서 이루어지는 모든 데이터 교환의 기초이다.
- 클라이언트-서버 프로토콜로 수신자 측에 의해 요청이 초기화되는 프로토콜이다.

<br>

### HTTP 장점

- 통신간 연결 상태 처리나 상태 정보를 관리할 필요가 없어서 서버 디자인이 간단하다.
- 각각의 HTTP 요청에 독립적으로 응답을 보내주면 된다.

<br>

### HTTP 단점

- 이전 통신의 정보를 모르기 때문에 매번 인증을 해야한다.
- 위 단점을 해결하기 위해서 쿠키나 세션을 사용해서 데이터를 처리한다.
- 평문(암호화되지 않은 정보를 암호화하지 않고 전송 또는 저장된 데이터) 통신이기 때문에 도청이 가능하다.

<br>

### HTTP State

- 상태 정보를 저장하지 않는 Stateless 특징과 클라이언트 요청에 맞는 응답을 보낸 후 연결을 끊는 Connectionless 특징을 갖는다.
- 서버 입장에서는 접속 유지에 대한 요구가 적어서 불특정 다수를 상대로하는 서비스에 적합하다.
- Session을 사용하여 사용자의 상태 정보(어떤 기능을 수행했는지)를 서버에서 확인할 수 있는 기능을 만들수 있다.

<br>

### HTTPS

- HTTP는 평문 통신하는 프로토콜이기에 중요한 정보를 주고 받으면 3자에게 조회될 수 있다.
- 위 문제를 해결하기 위해서 HTTP에 SSL(Secure Socket Layer)을 추가한 HTTPS가 등장했다.
- HTTP는 TCP와 직접 통신하고, HTTPS는 SSL과 통신 후 SSL이 TCP와 통신하여 암호화 증명서, 안전성 보호를 이용할 수 있다.

<br>

# HTTP Method

- 클라이언트 요청 목적에 따라서 적절한 HTTP 메서드를 사용한다.
- 클라이언트가 서버에게 사용자 요청의 목적을 알리는 수단이다.

| HTTP 메서드 | 설명                  | 사용 예시              |
| ----------- | --------------------- | ---------------------- |
| GET         | 데이터 조회 요청      | 페이지 접속, 정보 검색 |
| POST        | 데이터 생성 요청      | 회원가입, 글쓰기       |
| PUT         | 전체 데이터 수정 요청 | 회원정보 수정          |
| PATCH       | 일부 데이터 수정 요청 | 게시글 수정            |
| DELETE      | 데이터 삭제 요청      | 회원정보 삭제          |

<br>

### GET

- 전달하고 싶은 데이터는 쿼리스트링을 통해서 전달한다.
- 쿼리스트링 외에 바디를 통해서 데이터를 전달할 수 있지만, 서버에서 따로 구성해야하기 때문에 지원하는 곳이 많지 않아 권장하지 않는다.
- 조회할 때 `POST`를 사용할 수 있지만, `GET` 메서드가 캐싱이 가능하여 `GET`을 사용하는 것이 유리하다.

<br>

### POST

- 메시지 바디를 통해서 서버로 요청 데이터를 전달하면 서버가 해당 요청 데이터를 처리하여 업데이트한다.
- 전달된 데이터를 신규 리소스 등록이나 프로세스 처리에 이용한다.
- 데이터를 `GET`하는데 있어서 `JSON`으로 조회 데이터를 넘겨야하는 애매한 경우 `POST`를 사용한다.

<br>

#### Content-Type 헤더 종류

1. `Content-Type: application/x-www-form-urlencoded`
   - Form 내용을 HTTP 메시지 바디를 통해서 전송(key=value, 쿼리 파라미터 형식)
   - 전송 데이터를 url encoding 처리
2. `Content-Type: multipart/form-data`
   - 파일 업로드와 같은 바이너리 데이터 전송 시 사용
   - 다른 종류의 여러 파일과 `Form`의 내용 함께 전송 가능
3. `Content-Type: application/json`
   - TEXT, XML, JSON 데이터 전송 시 사용

<br>

### PUT

- 리소스를 대체(수정)하는 메서드
- 요청 메시지에 리소스가 있으면 덮어쓰고, 없으면 새로 생성한다.
- 데이터를 대체해야 하므로 클라이언트가 리소스의 구체적인 전체 경로를 지정해 보내주어야 한다.

<br>

### PATCH

- 리소스를 일부만 변경하는 메서드
- `PATCH`를 지원하지 않는 서버에서는 `POST`를 사용할 수 있다.

<br>

### GET vs POST

- `GET`은 데이터를 조회하기 위한 방식으로 데이터를 헤더에 추가하여 전송하는 방식이다.
- `GET`은 URL에 데이터가 노출되므로 보안이 중요한 데이터를 포함해서는 안된다.
- `POST`는 데이터를 추가 또는 수정하기 위해서 사용하는 방식으로 데이터를 바디에 추가하여 전송하는 방식이다.
- `POST`는 URL에 데이터가 노출되지 않아서 `GET` 방식보다는 비교적 안전하다.

<br>

# Ref

- [HTTP 개요, MDN](https://developer.mozilla.org/ko/docs/Web/HTTP/Overview)
- [HTTP 메서드 종류 & 요청 흐름 정리](https://inpa.tistory.com/entry/WEB-%F0%9F%8C%90-HTTP-%EB%A9%94%EC%84%9C%EB%93%9C-%EC%A2%85%EB%A5%98-%ED%86%B5%EC%8B%A0-%EA%B3%BC%EC%A0%95-%F0%9F%92%AF-%EC%B4%9D%EC%A0%95%EB%A6%AC)
