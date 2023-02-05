# useEffect Hook
- `Web`을 만들다 보면 화면에 보일 수 있는 데이터를 서버에서 받아오기도 해야하고, `state`가 바뀔 때 마다 함수를 실행 시키거나, `Event Listener`를 달았다가 해제하는 등의 동작이 필요할 때 사용할 것이다.

## Side Effect

#### 1-1. Rendering in React
- React에서 함수 컴포넌트의 `rendering`이란 `state`, `props` 기반으로 UI요소를 그려내는 행위이다.
  - `(state, props) => UI` 라고 표현할 수 있다.
  - `rendering` 결과물은 UI 요소, 즉 화면에 JSX 문법으로 무엇이 나타날지 적어둔 `Component`이다.
<br>

#### 1-2. Side Effect
- 컴퓨터 과학에서 함수가 결과값 이외에 다른 상태를 변경시킬 때 `부작용`이 있다고 말한다.
- 함수가 어떤 동작을 할 때, `input` - `output` 이외의 다른 값을 조작한다면, 이 함수에는 `Side Effect`(부수효과)가 있다고 표현한다.

```React
{/* input을 받아 output을 내는 본질적인 함수로 side effect가 없는 순수함수 */}
const sumOne = (num) => {
  return num+1;
}

{/* console창은 외부의 값이다. 외부 요소에 접근, 읽기, 수정은 모두 side effect에 해당 */}
const sumOne = (num) => {
  console.log("num = ", num);
  return num+1;
}

{/* 당연히 함수 내에 외부의 값 plusNum을 읽었으니 side effect */}
const plusNum = 30;
const sumNum = (num) => {
  num + plusNum;
}
```
- 위 코드 처럼 함수의 결과값 이외의 다른 상태를 변경시키는 행위는 `side effect`에 해당한다.
- 함수 컴포넌트에서의 `side effect`는 렌더링이 아닌 외부 세계에 영향을 주는 어떠한 행위이다.
- 대표적으로 `Data Fetching`, `DOM에 직접 접근`(ex. *Event Listener등록*), `구독`(ex. *setInterval*)이 있다. 이들은 모두 컴포넌트에서 꼭 필요한 대표적인 `side effect`이다.

## useEffect
<blockquote>"React의 순수한 함수적인 세계에서 명령적인 세계로의 탈출구로 생각하세요." - React 공식문서</blockquote>

- 위 인용구에서 순수한 세계란 렌더링(`input` => `output`)을 의미하고, 렌더링 이외에 일으켜야 하는 `side effect`를 일으킬 탈출구로 `useEffect`를 사용하라는 의미이다.

#### 2-1. useEffect
- `side effect`들을 함수의 `body`(render)에서 실행시키면 안된다.
  - 함수 컴포넌트의 리턴 값은 UI 요소며, `state`, `props` 변화가 있을 때마다 함수가 실행된다. 이 말은 매 렌더링 때마다 함수 `body`에 있는 로직이 실행 된다는 의미이다.
  - 렌더링과 무관한 로직이 렌더링 과정에서 실행되기 때문에 렌더링 자체에 영향을 주기 때문에 성능에 악영향을 끼친다.
- `side effect`를 일으키기 적당한 장소로 `useEffect hook`을 제공한다.
- `useEffect`는 `side effect`를 렌더링 이후에 발생시킨다(`useLayoutEffect` 예외)
  - 즉, `useEffect` 내의 코드는 `html` 렌더링 이후에 동작한다.
  - 어려운 연산, 서버에서 데이터 가져오는 작업 등을 `useEffect`에 작성하면 효율적으로 웹 페이지를 보여줄 수 있다.

#### 2-2. Rendering Cycle with useLayoutEffect
- *참고 : `useEffect`이 등장하기 전(클래스 함수), 기존에 컴포넌트`Lifecycle`에 간섭하려면 아래 코드를 사용했다.*
```
class life extends React.Component {
  componentDidMount() {
    // 컴포넌트 페이지에 장착시
  }
  componentDidUpdate() {
    // 컴포넌트 업데이트시
  }
  componentWillUnmount() {
    // 컴포넌트가 필요 없을시
  }
}
```
- `useEffect`는 두 번째 인자에 감지할 값을 배열로 넘겨주면 해당 값들이 변경되었을 때만 실행되게 할 수 있다.
```
import { useEffect } from "react"

{/* useEffect(실행시킬 동작, [타이밍])*/}

// 매 Rendering 마다 Side Effect가 실행되어야 하는 경우
useEffect(() => {
  // SIDE EFFECT
})

// Side Effect가 첫 Rendering 이후 한 번 실행되고, 이후 특정 값(value)의 업데이트(state 변경시) 감지했을 때 실행되어야 하는 경우
useEffect(() => {
  // SIDE Effect
}, [value])

// Side Effect가 첫 Rendering 이후 한 번 실행되고, 이후 어떤 값의 업데이트도 감지하지 않도록 해야 하는 경우
useEffect(() => {
  // SIDE EFFECT
}, [])

useEffect(() => {
    return() => {
      // 코드 : useEffect 동작 이전에 실행되는 부분
    }
})
```
#### 함수 컴포넌트 렌더링 순서
  1. 컴포넌트가 렌더링 된다. 최초로 진행되는 렌더링은 브라우저에 처음으로 이 컴포넌트가 보여졌다는 의미로 `mount`라고 표현한다.
  2. `useEffect` 첫 번째 인자로 넘겨준 함수 `callback`함수가 실행된다 => `side effect`
  3. `state`나 `props`가 변경된 경우, `re-render`된다.
  4. `useEffect`는 두 번째 인자에 들어 있는 **의존성 배열**을 체크한다.
      - 만약 두 번째 인자에 아무 값도 넘기지 않거나, 배열에 들어있는 값 중 하나라도 업데이트 된 것이 있다면 첫 번째 인자로 넘겨준 `callback`이 실행된다. => `side effect`
      - 빈 배열이라면, 아무런 동작하지 않는다.
  5. 만약 앞서 일으킨 `effect`에서 `state`나 `props`를 변경시켰다면 `re-render` 반복
  6. 컴포넌트가 필요 없어지면 화면에서 사라진다. 컴포넌트가 브라우저 화면에서 사라졌다는 의미로 `unmount`라고 표현한다.

## Cleanup Effect

#### 3.1 Render → Effect Callback → Clean Up
- 앞서 발생한 `Side Effect`를 정리할 필요가 있을 때 사용한다.
```
useEffect(() => {
  function handleScroll() {
    console.log(window.scrollY)
  }
  document.addEventListener("scroll", handleScroll)
}, [])
```
- 해당 이벤트를 구현하는 페이지를 벗어나면 위 이벤트는 더 이상 필요없다. 이 경우 발생시킨 `Effect`를 정리해야 하는데 이 때마다 `Cleanup Effect`를 일으킬 수 있도록 `useEffect`안에 해당 로직을 정리하는 동작을 정의하면 된다.
```
useEffect(() => {
  function handleScroll() {
    console.log(window.scrollY)
  }
  document.addEventListener("scroll", handleScroll)
  return () => {
    document.removeEventListener("scroll", handleScroll)
  }
}, [])
```
## 순서 이해하기
```
const App = () => {
  const [count, setCount] = useState(0);

  console.log("render", count);

  useEffect(() => {
    console.log("useEffect Callback", count);
    return () => {
      console.log("cleanUp", count);
    });
  }, [count]);

  return <div onClick={() => setCount(count + 1)}>CLICK</div>;
};

export default Foo;

{*/
render, 0
useEffect Callback, 0

// 클릭

render, 1
cleanUp, 0
useEffect Callback, 1
*/}
```
![React Hook Flow Diagram](https://user-images.githubusercontent.com/96946274/168824183-1b411751-04cd-4139-b09a-3ccea7a5a0ca.png)
