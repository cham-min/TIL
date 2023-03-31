# 목차

- [고차 컴포넌트 (HOC, Higher-Order Components)](#고차-컴포넌트-hoc-higher-order-components)
- [고차 컴포넌트의 사용](#고차-컴포넌트의-사용)
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

# 고차 컴포넌트의 사용

### 크로스 커팅 문제에 고차 컴포넌트 사용

컴포넌트는 React에서 코드 재사용의 기본 단위이다. 동일하지 않지만 대부분의 구현체는 동일하여 반복적인 패턴이 반복되어 이 로직을 한 곳에서 정의하고 로직을 공유할 수 있게하는 추상화가 필요할 때 고차 컴포넌트를 사용한다.
