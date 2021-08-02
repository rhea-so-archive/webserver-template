# HOW TO CONTRIBUTE

여러 가지 방법으로 해당 Repository 에 참여하실 수 있습니다 :)  
PR 을 올려주실 때, labels 를 참고하셔서 알맞은 제목을 함께 올려주세요!  
Commit Message 는 `Update`라고만 해주셔도 되고, 원하시는 메세지를 적어주시면 됩니다.

## Process

해당 Repository 에 contribute 하는 방법을 소개드립니다.

### Pull Request 를 통한 Contribute

#### 1. Fork this respository

이 repository 를 fork 해주세요!

#### 2. Clone forked repository

fork 한 repository 를 local directory 에 clone 해주세요!

```bash
# in your workspace
$ git clone https://github.com/rhea-so/WebServerCore WebServerCore
$ cd WebServerCore
```

#### 3. Commit your

```bash
$ git add .
$ git commit -m "[your description]"
$ git push origin master
```

### 4. Register pull request for your commit

`Pull Request`를 등록해주세요.

### Optional. Resolve Conflict

Pull Request 를 등록했는데, conflict 가 있어서 auto merge 가 안된다고 하는 경우 해당 conflict 를 해결해주세요.

```bash
# in WebServerCore
$ git remote add --track master upstream https://github.com/rhea-so/WebServerCore
$ git fetch upstream
$ git rebase upstream/master
# (resolve conflict in your editor)
$ git add .
$ git rebase --continue
$ git push -f origin master
```

### Issue 를 통한 Contribute

Pull Request 방식이 익숙하시지 않은 분들은 issue 로 내용을 등록하실 수도 있습니다.  
추가하고 싶은 내용을 issue 로 등록해주시면 저 또는 다른 분들이 적절한 위치에 올려주신 내용을 추가할 수 있습니다 :)

</br>

---

### ISSUE_TEMPLATE

```
### This issue is...
* [ ] Edit typos or links
* [ ] Inaccurate information
* [ ] New Resources
* [ ] Suggestions
* [ ] Questions

#### Description
(say something...)
```

</br>

### PULL_REQUEST_TEMPLATE

```
### This Pull Request is...
* [ ] Edit typos or links
* [ ] Inaccurate information
* [ ] New Resources

#### Description
(say something...)
```