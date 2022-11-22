# Fork한 저장소를 원본 저장소 최신 커밋으로 반영하기

<img width="700" alt="image" src="https://user-images.githubusercontent.com/96946274/203351787-435c1f4c-af17-4f86-bca5-a04251ddc5e8.png">

코딩을 하다보면 `Fork`를 통해서 본인 저장소에서 작업하다가 `Fork`했던 저장소 최신 커밋을 반영해야 하는 경우가 발생한다. 아래 과정을 통해 해결해보자.

[1. 원본 저장소 remote 등록](#1-원본-저장소-remote-등록)  
[2. 원격 저장소 최신 commit 가져오기](#원격-저장소-최신-commit-가져오기)

<br>

# Github

<img width="1005" alt="스크린샷 2022-11-22 오후 5 20 28" src="https://user-images.githubusercontent.com/96946274/203354240-d2354bcc-e66b-4cc0-bd48-f310f8308688.png">

- `Fork`해온 원본 저장소(이하 원본 저장소)에 커밋이 추가되면, 깃허브에는 본인의 저장소가 원본 저장소의 `main`보다 1개의 커밋이 뒤떨어져 있다고 나온다.
  <br>

# 1. 원본 저장소 `remote` 등록

- 리모트 저장소에 원본 저장소를 설정해야 원본 저장소 작업을 본인 저장소에 반영할 수 있으며, 이를 통해서 협업이 가능하다.
- 아래 명령어를 통해서 리모트 저장소 확인이 가능하다.

```
$ git remote -v
```

<br>

- `git remote -v` 이후 아래 결과가 나온다면 원격 저장소 설정이 되지 않은 것이다.

```
origin https://github.com/YOUR_USERNAME/YOUR_FORK.git (fetch)
origin https://github.com/YOUR_USERNAME/YOUR_FORK.git (push)
```

<br>

- `upstream` 이름으로 원격 저장소를 추가한다.
- 주소는 원본 저장소를 입력한다.

```
$ git remote add upstream https://github.com/ORIGIN_OWNER/ORIGIN_REPO.git
```

<br>

- `git remote -v` 명령어를 통해 원격 저장소 `upstream`이 추가 되었는지 확인한다.

```
origin https://github.com/YOUR_USERNAME/YOUR_FORK.git (fetch)
origin https://github.com/YOUR_USERNAME/YOUR_FORK.git (push)
upstream  https://github.com/ORIGIN_OWNER/ORIGIN_REPO.git (fetch)
upstream  https://github.com/ORIGIN_OWNER/ORIGIN_REPO.git (push)
```

<br>

# 원격 저장소 최신 `commit` 가져오기

- `fetch` : 원격 저장소에 변경 사항이 있는지 확인하고, 변경 데이터를 로컬 Git에는 가져오지 않는다.
- `pull` : 원격 저장소에서 변경된 메타 데이터 정보를 확인하고, 최신 데이터를 복사하여 로컬 Git에 가져온다.
  <br>

- 우선 최신화가 필요한 브랜치로 이동한다.

```
$ git checkout <브랜치명>
```

<br>

- 원격 저장소에 최신 커밋 내역을 가져온다. 본인이 필요한 상황에 따라서 `fetch` 혹은 `pull`을 사용한다.

```
$ git fetch upstream
$ git merge upstream/main
```

<br>

- 본인 저장소에 최신 커밋 내용을 반영한다.

```
$ git push origin main
```
