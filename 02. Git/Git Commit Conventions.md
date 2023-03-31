# Commit Message

일관되고 직관적이지 않은 내용의 커밋 로그가 누적되면 가독성이 매우 떨어진다. 혼자가 아닌 여러 사람들과 개발을 한다면 상황은 더욱 악화된다. 여러 사람들과 협업할 때 커밋은 기능별로 커밋하면 특정 기능에 대해서만 코드 리뷰를 진행할 수 있어 협업이 수월해진다. 여기에 일관되고 직관적인 내용으로 커밋 메시지를 남긴다면 협업의 효율을 증진시킬 수 있다. 커밋 메시지로 효율을 증진시킬 수 있는 컨벤션에 대해서 정리해보자.
<br>

- [1. AngularJS Commit Conventions](#1-angularjs-commit-conventions)
  - [Subject line](#subject-line)
    - [`<type>`](#type)
    - [`<scope>`](#scope)
    - [`<subject>`](#subject)
  - [Message body](#message-body)
  - [Message footer](#message-footer)
- [2. Gitmoji](#2-gitmoji)
  - [Gitmoji-cli](#gitmoji-cli)

<br>

# 1. AngularJS Commit Conventions

- `<scope>` 부분을 제외하면 Udacity Commit Convention과 동일하다.

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

### Subject line

#### `<type>`

- feat : 새로운 기능 추가
- fix : 버그 수정
- docs : 문서 작성 및 수정
- style : 코드에 영향이 없는 스타일 수정 (세미콜론 누락, 코드 포맷팅 등)
- refactor : 리팩토링
- test : 테스트 코드 작성 및 수정
- chore : 빌드 혹은 패키지 매니저 수정사항

#### `<scope>`

- 선택 사항으로 변경된 부분을 표기
- ex. `README.md` 파일을 수정한 경우, `docs(README.md): <subject>`

#### `<subject>`

- 첫 단어는 대문자가 아닌 소문자로 작성
- 마지막에 온점(.) 금지
- 명령문 형태로 현재형으로 작성. change(o), changes(x), changed(x)

<br>

### Message body

#### `<body>`

- 어떤 점이 달라졌는지 변경한 이유를 포함한 내용을 담는다. 즉, 무엇을? 왜 위주의 내용을 작성한다.

<br>

### Message footer

#### `<footer>`

- close, fix, resolve, ref, relate to(관련 이슈 해결 중, 미해결 경우) 등의 키워드를 사용한다.
- 선택 사항으로 이슈 트래커 ID를 사용한다. 커밋 메세지로 이슈를 자동 종료시킬 수 있다.
- 자세한 내용은 깃허브 공식문서(Link PR to issue)를 참조한다.
  ex. close #321

<br>

# 2. Gitmoji

깃모지는 git + emoji를 합한 합성어이며 커밋 메시지를 작성하는 툴이다. 단순한 커밋 메시지보다 이모지를 사용하면 커밋 메시지를 흝어 볼 때 가독성이 더욱 뛰어난 장점이 있다.

자주 사용할만한 깃모지를 정리했으며 자세한 내용은 [깃모지 사이트](https://gitmoji.dev/)를 참고하자.

| 깃모지 | 의미                            |
| ------ | ------------------------------- |
| 🎨     | 코드의 포맷, 구조 개선          |
| ⚡️    | 성능 향상                       |
| 🔥     | 코드 및 파일 제거               |
| 🐛     | 버그 수정                       |
| 🚑️    | 핫픽스                          |
| ✨     | 새로운 기능 추가                |
| 📝     | 문서 수정 및 추가               |
| 🚀     | 배포 작업                       |
| 💄     | UI 및 디자인 수정 및 추가       |
| 🎉     | 프로젝트 시작 (첫 커밋)         |
| ✅     | 테스트 추가, 수정 통과          |
| 🔒️    | 보안 이슈 수정                  |
| 🔖     | 출시, 버전 태그                 |
| 🚧     | Working In Progress(WIP)        |
| ➕     | dependency 추가                 |
| ➖     | dependency 제거                 |
| ⬇️     | dependencies 다운그레이드       |
| ⬆️     | dependencies 업그레이드         |
| ♻️     | 코드 리팩토링                   |
| 🔧     | configuration 파일 추가 및 수정 |
| ✏️     | 오타 수정                       |
| 💩     | 개선이 필요한 코드를 작성할 때  |
| 🔀     | merge branch                    |
| 🚚     | 자료 이동 및 파일이름 수정      |
| 💬     | 텍스트 혹은 리터럴 추가 및 수정 |
| 🥅     | 에러 수정                       |
| 💫     | 애니메이션 추가 및 수정         |
| ⚰️     | 불필요한 코드 제거              |

<br>

### Gitmoji-cli

- gitmoji-cli를 설치하면 터미널에서 커밋할 때 깃모지를 간단히 적용할 수 있다.

```
$ npm i -g gitmoji-cli
# or
$ brew install gitmoji
```

<br>

- `gitmoji --help` 명령어를 통해 도움말을 확인할 수 있다.

<img width="700" alt="image" src="https://user-images.githubusercontent.com/96946274/203593810-bd7349d4-a43f-4bb5-af0d-d008e90495a4.png">

<br>

- `git commit -m` 명령어 대신 `gitmoji -c` 명령어로 커밋 메시지를 작성한다.
- 방향키로 이모지를 선택하거나 원하는 키워드를 입력하여 해당 이모지 검색이 가능하다.

<img width="700" alt="image" src="https://user-images.githubusercontent.com/96946274/203594740-f251eda1-589f-4ee6-a89d-60d94f2e0fec.png">

<br>

- commit title과 commit message를 이어서 작성하면 완료된다.

<img width="700" alt="image" src="https://user-images.githubusercontent.com/96946274/203597527-9a01f3e6-37b0-4363-8437-28be21097974.png">

<br>

- 깃허브 홈페이지에서 아래와 같은 결과를 확인할 수 있다.

<img width="700" alt="image" src="https://user-images.githubusercontent.com/96946274/203598281-62110dae-d93d-4a12-a8fa-d080d24578ff.png">

<br>

# Ref

- [Udacity Git Commit Message Style Guide](https://udacity.github.io/git-styleguide/)
- [좋은 git commit 메시지를 위한 영어 사전
  ](https://blog.ull.im/engineering/2019/03/10/logs-on-git.html)
- [좋은 git 커밋 메시지를 작성하기 위한 7가지 약속
  ](https://meetup.toast.com/posts/106)
- [Commit Message Conventions
  ](https://gist.github.com/stephenparish/9941e89d80e2bc58a153)
- [AngularJS Git Commit Message Conventions](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit)
- [Gitmoji 사용법 정리 (+깃모지 툴 소개)](https://inpa.tistory.com/entry/GIT-%E2%9A%A1%EF%B8%8F-Gitmoji-%EC%82%AC%EC%9A%A9%EB%B2%95-Gitmoji-cli)
