# 목차

- [Link](#link)
- [Link props](#link-props)
  - [Require](#require)
  - [Optional](#optional)
- [With URL Object](#with-url-object)
- [Conclusion](#conclusion)
- [Ref](#ref)

<br>

# Link

`next/link`로 exported된 `Link` 컴포넌트를 사용해서 경로 전환이 가능하다.

`pages` 디렉토리 내에 다음 파일들이 있다고 가정해보자.

- `pages/index.js`
- `pages/profile.js`
- `pages/signup.js`

각 페이지에 대한 링크를 아래와 같이 설정할 수 있다.

```javascript
import Link from "next/link";

function Home() {
  return (
    <ul>
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        <Link href="/profile">Profile</Link>
      </li>
      <li>
        <Link href="/signup">Signup</Link>
      </li>
    </ul>
  );
}

export default Home;
```

<br>

# Link props

### Require

- `href` : 이동할 URL, 경로를 설정한다.

<br>

### Optional

- `as` : 브라우저 URL 바에 표시될 경로를 지정한다.
- `legacyBehavior` : child가 반드시 `<a>`태그가 되도록 설정한다. 기본 값은 `false`이다.

  ```javascript
  function Legacy() {
    return (
      <Link href="/profile" legacyBehavior>
        <a>Profile</a>
      </Link>
    );
  }

  export default Legacy;
  ```

- `passHref` : `href` 프로퍼티를 `Link` 자식에게 강제로 전달하며, 기본값은 `false`이다. `Link`의 자식이 `<a>`태그로 감싸인 커스텀 컴포넌트라면 `Link`에 `passHref`를 추가해야 한다. 만약 styled-components 라이브러리를 사용하고 있다면 필요한 프로퍼티다. 이것을 사용하지 않으면 `<a>`태그는 `href` attribute를 가지지 않을 것이며, 사이트 접근성, SEO에 영향을 끼칠 것이다.

  ```javascript
  import Link from "next/link";
  import styled from "styled-components";

  const RedLink = styled.a`
    color: red;
  `;

  function NavLink({ href, name }) {
    return (
      <Link href={href} passHref legacyBehavior>
        <RedLink>{name}</RedLink>
      </Link>
    );
  }

  export default NavLink;
  ```

- `prefetch` : 기본 값은 `true`이며, 백그라운드에서 페이지를 미리 가져온다. 초기 혹은 스크롤을 통한 뷰포트에 있는 `<Link />`가 미리 로드된다. `prefetch={false}`를 통해서 prefetch를 비활성화 할 수 있다.
- `replace` : history stack에 새로운 url을 추가하지 않는다. `Link` 컴포넌트는 기본적으로 새로운 URL을 history stack에 추가한다. `replace` prop을 사용하여 새 항목을 추가하지 못하도록 할 수 있다. 기본 값은 `false`이다.
- `scroll` : 페이지 전환 후 페이지 상단으로 스크롤 이동할지 설정한다. 기본 값은 `true`이다. 이 기능을 사용하지 않으려면 `scroll={false}`를 작성한다.
- `shallow` : `getStaticProps`, `getServerSideProps`, `getInitialProps`를 사용하지 않고 현재 페이지의 경로를 업데이트 하는지 설정한다. 기본 값은 `false`이다.

<br>

# With URL Object

`Link`는 URL 객체도 받을 수 있으며, 자동으로 URL 문자열을 생성하도록 포맷한다.

```javascript
import Link from "next/link";

function Home() {
  return (
    <ul>
      <li>
        <Link
          href={{
            pathname: "/about",
            query: { name: "test" },
          }}
        >
          About us
        </Link>
      </li>
    </ul>
  );
}

export default Home;
```

<br>

# Conclusion

> next/link에 관한 내용을 공식문서로 읽으면, 제일 상단에 진도를 나가기 이전에 Routing 소개를 먼저 읽어볼 것을 권하는 문장이 쓰여져 있다. next.js를 알게 된 후, 라우팅을 직접 지정해주지 않아도 된다는 장점이 눈에 띄였다. Next.js의 라우팅에 관한 내용에 대해서 정리해볼 필요가 있겠다는 생각이 든다.

<br>

# Ref

- [Next.js 공식문서](https://nextjs.org/docs/api-reference/next/link)
