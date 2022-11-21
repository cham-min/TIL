# 간단한 깃허브 마크다운 사용방법 정리

## 1. Header

- `#` 기호로 `<h1>` 부터 `<h6>` 까지 제목을 표현할 수 있다.

```
# H1
## H2
### H3
#### H4
##### H5
###### H6
```

# H1의 모양 입니다.

## H2의 모양 입니다.

### H3의 모양 입니다.

#### H4의 모양 입니다.

##### H5의 모양 입니다.

###### H6의 모양 입니다.

<br>

## 2. BlockQuote

- `>` 기호로 인용문구를 나타낼 수 있다.
- 인용문구 내에 인용문구를 추가하는 중첩 인용문이 가능하다.
- 인용문구 내에서 다른 마크다운 요소를 사용할 수 있다.

```
> 인용문구
>> 중첩된 인용문구
>>> 중첩된 인용문구 2
```

> 인용문구
>
> > 중첩된 인용문구
> >
> > > 중첩된 인용문구 2

```
> Title
>> - chapter1
>>> `What is Markdown?`
```

> Title
>
> > - Chapter 1
> >   > `What is Markdown?`

<br>

## 3. List

- 순서 있는 목록

```
1. one
2. two
3. three
```

1. one
2. two
3. three
   <br>

- 순서 없는 목록

```
- one
    - two
        - three

-(hyphen), *(asterisks), +(plus sign) 모두 가능!
```

- one
  - two
    - three

* one
  - two
    - three

- one
  - two
    - three

<br/>

## 4. Code block

- inline 코드 강조
- grave (\`)로 감싸면 `<pre>`, `<code>`로 변환된다.

`<pre>안녕!</pre>`

<pre>안녕!</pre>
<br>

`<code>안녕!</code>`  
<code>안녕!</code>  
<br>

- block 코드 강조
- \``` 이용하기
<pre>

```
코드입력
```

</pre>

<br>

## 5. horizen

- `<hr/>`, `***`, `---`를 통해서 수평선을 만들 수 있다.

---

<br>

## 6. Link

- 참조링크
<pre>
[Github][GithubLink]
[GithubLink]: https://github.com/
</pre>

[Github][githublink]

[githublink]: https://github.com/

<br/>

- 외부링크
<pre>
[Github](https://github.com/)
</pre>

[Github](https://github.com/)

<br/>

- 자동연결 : 일반 URL, E-mail은 자동으로 적절한 링크 생성

```
<http://google.com>
<google@google.com>
```

<br/>

## 7. Emphasis

- `<em>`, `<strong>`, `<del>` 태그로 변환된다.

```
Italic : *글자* 혹은 _글자_
Bold : **글자** 혹은 __글자__
Strikethrough : ~~글자~~
Underscore : <u>밑줄</u>
```

_Italic_

**Bold**

~~Strikethrough~~

<u>Underscore</u>

<br>

## 8. Image

```
![이미지명](URL)
```

- 크기 지정 없으므로 `<img width="" height=""></img>` 이용  
  <br>

## 9. Checkbox

```
- [ ] 빈 체크박스 입니다.
- [x] 체크박스 입니다.
```

- [ ] 빈 체크박스 입니다.
- [x] 체크박스 입니다.

<br>

## 10. Table

```
|제목|내용|왼쪽정렬예시|중앙정렬예시|오른쪽정렬예시|
|---|---|:---|:---:|---:|
|본문내용1|본문내용2|본문내용3|본문내용4|본문내용5|
|본문내용1|본문내용2|본문내용3|본문내용4|본문내용5|
|본문내용1|본문내용2|본문내용3|본문내용4|본문내용5|
```

| 제목      | 내용      | 왼쪽정렬예시 | 중앙정렬예시 | 오른쪽정렬예시 |
| --------- | --------- | :----------- | :----------: | -------------: |
| 본문내용1 | 본문내용2 | 본문내용3    |  본문내용4   |      본문내용5 |
| 본문내용1 | 본문내용2 | 본문내용3    |  본문내용4   |      본문내용5 |
| 본문내용1 | 본문내용2 | 본문내용3    |  본문내용4   |      본문내용5 |

<br>

## 그 외

- 줄 바꿈을 하려면 문장 마지막에 띄어쓰기 2회 혹은 `<br>`
