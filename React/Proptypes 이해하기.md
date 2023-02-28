# 목차

- [Proptypes를 이용한 타입 체크](#proptypes를-이용한-타입-체크)
  - [타입별 PropTypes 설정 예시](#타입별-proptypes-설정-예시)
- [Ref](#ref)

<br>

# Proptypes를 이용한 타입 체크

리액트에서 제공하는 라이브러리(`prop-types`)이다. TypeScript과 같이 타입체킹 역할을 수행하지만, 자바스크립트로만 개발을 진행할 때 React에서 propTypes 속성을 통해 빌트인 타입 체킹이 가능하다.

```javascript
// prop-types 패키지에서 PropTypes 객체를 임포트해야 한다.
import PropTypes from "prop-types";

const Greeting = ({ name }) => {
  return <h1>Hello, {name}</h1>;
};

Greeting.propTypes = {
  name: PropTypes.string,
};
```

부모로 부터 받은 `name`인자가 `string`타입이 아닌 경우 콘솔창에 경고가 출력된다. 이는 성능상의 이유로 개발 모드에서만 체크된다.

<br>

### 타입별 PropTypes 설정 예시

```javascript
import PropTypes from "prop-types";

MyComponent.propTypes = {
  // JavaScript 타입
  optionalArray: PropTypes.array,
  optionalBool: PropTypes.bool,
  optionalFunc: PropTypes.func,
  optionalNumber: PropTypes.number,
  optionalObject: PropTypes.object,
  optionalString: PropTypes.string,
  optionalSymbol: PropTypes.symbol,

  // 렌더링 될 수 있는 모든 것(numbers, strings, elements, array)
  optionalNode: PropTypes.node,

  // 리액트 element (ex. const element = <h1>hello</h1>;)
  optionalElement: PropTypes.element,

  // prop이 클래스의 인스턴스인 경우
  optionalMessage: PropTypes.instaceof(Message),

  // enum array 값 중 하나를 만족
  optionalEnum: PropTypes.oneOf(["News", "Photos"]),

  // 여러 타입 중 하나의 객체를 만족
  optionalUnion: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(Message),
  ]),

  // 특정 타입만 포함하는 배열, 아래의 경우 숫자형만 들어있는 배열을 만족한다. ([1, 2, 3])
  optionalArrayOf: PropTypes.arrayOf(PropTypes.number),

  // 객체의 속성 값의 타입이 모두 같게 정의
  optionalObjectOf: PropTypes.objectOf(PropTypes.number),

  // 객체의 속성 값 타입별로 정의
  optionalObjectWithShape: PropTypes.shape({
    color: PropTypes.string,
    fontSize: PropTypes.number,
  }),

  // 필요한 값인 경우 isRequired를 붙인다.
  requiredFunc: PropTypes.func.isRequired,

  // 모든 데이터 타입을 허용하는 경우
  requiredAny: PropTypes.any.isRequired,
};
```

<br>

# Ref

- [React 공식문서](https://reactjs-kr.firebaseapp.com/docs/typechecking-with-proptypes.html)
