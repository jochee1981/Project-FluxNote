# Vercel 배포 완전 초보자 가이드

## 📋 목차
1. [사전 준비사항](#1-사전-준비사항)
2. [GitHub에 프로젝트 업로드하기](#2-github에-프로젝트-업로드하기)
3. [Vercel 가입하기](#3-vercel-가입하기)
4. [Vercel에 프로젝트 배포하기](#4-vercel에-프로젝트-배포하기)
5. [배포 확인하기](#5-배포-확인하기)
6. [문제 해결](#6-문제-해결)

---

## 1. 사전 준비사항

### 필요한 것들
- ✅ 컴퓨터에 Git이 설치되어 있어야 합니다
- ✅ GitHub 계정이 있어야 합니다 (없으면 만들어야 합니다)
- ✅ 프로젝트가 정상적으로 빌드되는지 확인

### Git 설치 확인하기

**Windows 사용자:**
1. 시작 메뉴에서 "Git Bash" 또는 "Git CMD" 검색
2. 열어서 다음 명령어 입력:
```bash
git --version
```
3. 버전이 나오면 설치되어 있는 것입니다 (예: `git version 2.40.0`)
4. 안 나오면 [git-scm.com](https://git-scm.com/download/win)에서 다운로드

**Mac 사용자:**
1. 터미널 열기 (Cmd + Space → "터미널" 입력)
2. 다음 명령어 입력:
```bash
git --version
```
3. 안 나오면 Xcode Command Line Tools 설치:
```bash
xcode-select --install
```

### 프로젝트 빌드 테스트

프로젝트 폴더에서 다음 명령어 실행:

```bash
npm run build
```

성공하면 `build` 폴더가 생성됩니다. 에러가 나면 먼저 해결해야 합니다.

---

## 2. GitHub에 프로젝트 업로드하기

### 2-1. GitHub 계정 만들기 (없는 경우)

1. [github.com](https://github.com) 방문
2. 우측 상단 "Sign up" 클릭
3. 이메일, 비밀번호 입력
4. 사용자명 선택 (예: `myusername`)
5. 이메일 인증 완료

### 2-2. GitHub에 새 저장소 만들기

1. GitHub에 로그인
2. 우측 상단 "+" 버튼 클릭 → "New repository" 선택
3. 저장소 설정:
   - **Repository name**: `fluxnote` (원하는 이름)
   - **Description**: "FluxNote 메모 앱" (선택사항)
   - **Public** 선택 (무료로 사용하려면 Public)
   - **"Add a README file" 체크 해제** (이미 프로젝트가 있으므로)
   - **"Add .gitignore" 체크 해제**
   - **"Choose a license" 선택 안 함**
4. "Create repository" 클릭

### 2-3. 프로젝트를 Git으로 초기화하기

**프로젝트 폴더로 이동:**
```bash
cd "C:\dev\Project FluxNote"
```

**Git 초기화:**
```bash
git init
```

**모든 파일 추가:**
```bash
git add .
```

**첫 번째 커밋 만들기:**
```bash
git commit -m "Initial commit: FluxNote 메모 앱"
```

**GitHub 저장소 연결:**
```bash
git remote add origin https://github.com/사용자명/fluxnote.git
```
⚠️ **중요**: `사용자명`을 본인의 GitHub 사용자명으로 바꾸세요!

**브랜치 이름을 main으로 변경:**
```bash
git branch -M main
```

**GitHub에 업로드:**
```bash
git push -u origin main
```

**로그인 요청이 나오면:**
- 사용자명: GitHub 사용자명 입력
- 비밀번호: GitHub Personal Access Token 입력 (일반 비밀번호 아님!)

### 2-4. Personal Access Token 만들기 (비밀번호 대신 사용)

1. GitHub → 우측 상단 프로필 클릭 → "Settings"
2. 왼쪽 메뉴 맨 아래 "Developer settings"
3. "Personal access tokens" → "Tokens (classic)"
4. "Generate new token" → "Generate new token (classic)"
5. 설정:
   - **Note**: "Vercel 배포용" (설명)
   - **Expiration**: 원하는 기간 선택
   - **Select scopes**: `repo` 체크 (전체 체크됨)
6. "Generate token" 클릭
7. **토큰 복사** (한 번만 보여줌! 저장해두세요)
8. `git push` 할 때 비밀번호 대신 이 토큰 사용

### 2-5. 업로드 확인

GitHub 저장소 페이지를 새로고침하면 파일들이 보여야 합니다.

---

## 3. Vercel 가입하기

### 3-1. Vercel 웹사이트 방문

1. 브라우저에서 [vercel.com](https://vercel.com) 방문
2. 우측 상단 "Sign Up" 클릭

### 3-2. GitHub로 가입하기

1. "Continue with GitHub" 클릭
2. GitHub 로그인 화면에서 로그인
3. "Authorize Vercel" 클릭 (권한 허용)

### 3-3. 프로필 설정 (선택사항)

- 이름, 팀 이름 등 설정 (건너뛰어도 됨)

---

## 4. Vercel에 프로젝트 배포하기

### 4-1. 새 프로젝트 추가

1. Vercel 대시보드에서 "Add New..." 버튼 클릭
2. "Project" 선택

### 4-2. GitHub 저장소 선택

1. "Import Git Repository" 화면에서
2. GitHub 저장소 목록에서 `fluxnote` (또는 만든 저장소 이름) 찾기
3. 저장소 옆 "Import" 클릭

### 4-3. 프로젝트 설정

Vercel이 자동으로 설정을 감지합니다:

**자동 감지되는 설정:**
- **Framework Preset**: Create React App ✅
- **Root Directory**: `./` ✅
- **Build Command**: `npm run build` ✅
- **Output Directory**: `build` ✅

**확인만 하면 됩니다:**
- "Override" 버튼이 있으면 클릭하지 마세요
- 자동으로 설정된 값이 맞는지 확인만 하세요

**환경 변수 (Environment Variables):**
- 지금은 설정할 필요 없습니다 (나중에 필요하면 추가 가능)

### 4-4. 배포 시작

1. 화면 하단 "Deploy" 버튼 클릭
2. 배포가 시작됩니다 (1-2분 소요)

### 4-5. 배포 진행 상황 확인

배포 중 화면에서:
- "Building" 단계: 프로젝트를 빌드하는 중
- "Deploying" 단계: 배포하는 중
- "Ready" 단계: 완료!

---

## 5. 배포 확인하기

### 5-1. 배포 완료 확인

배포가 완료되면:
- ✅ "Congratulations!" 메시지
- 🌐 배포된 URL 표시 (예: `fluxnote.vercel.app`)

### 5-2. 사이트 방문하기

1. 표시된 URL 클릭하거나
2. 브라우저에서 URL 직접 입력
3. FluxNote 앱이 정상적으로 보이는지 확인

### 5-3. 기능 테스트

다음 기능들이 작동하는지 확인:
- ✅ "새 노트" 버튼 클릭
- ✅ 노트 작성 및 저장
- ✅ 노트 수정
- ✅ 노트 삭제
- ✅ 검색 기능
- ✅ 페이지 새로고침 후에도 데이터 유지 (localStorage)

---

## 6. 문제 해결

### 문제 1: Git push 할 때 에러

**에러 메시지: "fatal: could not read Username"**

**해결 방법:**
1. Personal Access Token을 제대로 만들었는지 확인
2. 비밀번호 입력할 때 일반 비밀번호가 아닌 **토큰**을 입력해야 함

**에러 메시지: "remote origin already exists"**

**해결 방법:**
```bash
git remote remove origin
git remote add origin https://github.com/사용자명/fluxnote.git
git push -u origin main
```

### 문제 2: Vercel 배포 실패

**에러: "Build failed"**

**해결 방법:**
1. 로컬에서 빌드 테스트:
```bash
npm run build
```
2. 에러가 나면 수정 후 다시 커밋:
```bash
git add .
git commit -m "Fix build errors"
git push
```
3. Vercel이 자동으로 다시 배포 시도

**에러: "Module not found"**

**해결 방법:**
1. `package.json`에 모든 의존성이 있는지 확인
2. 로컬에서 다시 설치:
```bash
npm install
npm run build
```

### 문제 3: 사이트는 열리지만 기능이 안 됨

**localStorage 문제:**
- Vercel은 HTTPS를 자동으로 제공하므로 문제없음
- 브라우저 콘솔(F12)에서 에러 확인

**라우팅 문제:**
- Create React App은 자동으로 처리됨
- 문제가 있으면 Vercel 대시보드 → Settings → Rewrites 확인

### 문제 4: GitHub 저장소를 찾을 수 없음

**해결 방법:**
1. Vercel 대시보드에서 "Add New Project" 다시 클릭
2. "Import Git Repository"에서 저장소 목록 새로고침
3. GitHub에서 저장소가 Public인지 확인 (Private은 Pro 플랜 필요)

---

## 7. 자동 배포 설정 (이미 자동으로 설정됨!)

### 자동 배포란?

코드를 수정하고 GitHub에 푸시하면:
1. Vercel이 자동으로 변경사항 감지
2. 자동으로 다시 빌드
3. 자동으로 배포

**테스트해보기:**
1. 로컬에서 파일 하나 수정 (예: `src/App.js`에서 제목 변경)
2. 커밋 및 푸시:
```bash
git add .
git commit -m "Update title"
git push
```
3. Vercel 대시보드에서 자동 배포 확인

---

## 8. 커스텀 도메인 연결하기 (선택사항)

### 8-1. 도메인이 있는 경우

1. Vercel 대시보드 → 프로젝트 선택
2. "Settings" → "Domains"
3. 도메인 입력 (예: `fluxnote.com`)
4. DNS 설정 안내 따르기

### 8-2. 도메인이 없는 경우

- 현재 제공되는 `fluxnote.vercel.app` URL로도 충분합니다
- 무료로 사용 가능합니다

---

## 9. 배포 후 관리

### 9-1. 배포 내역 확인

Vercel 대시보드 → 프로젝트 → "Deployments" 탭에서:
- 모든 배포 내역 확인
- 이전 버전으로 롤백 가능
- 각 배포의 로그 확인

### 9-2. 환경 변수 추가 (나중에 필요하면)

1. Vercel 대시보드 → 프로젝트 → "Settings" → "Environment Variables"
2. 변수 추가:
   - Key: `REACT_APP_API_URL`
   - Value: `https://api.example.com`
3. 다시 배포하면 적용됨

### 9-3. 프로젝트 설정 변경

Vercel 대시보드 → 프로젝트 → "Settings" → "General"에서:
- 프로젝트 이름 변경
- 빌드 설정 변경
- 환경 변수 관리

---

## 10. 완료 체크리스트

배포가 성공적으로 완료되었다면:

- [ ] GitHub에 프로젝트 업로드 완료
- [ ] Vercel 계정 생성 및 GitHub 연동 완료
- [ ] Vercel에 프로젝트 배포 완료
- [ ] 배포된 URL로 사이트 접속 가능
- [ ] 모든 기능이 정상 작동
- [ ] 자동 배포가 작동하는지 확인

---

## 🎉 축하합니다!

이제 FluxNote가 인터넷에 배포되었습니다!

**배포된 사이트 주소를 친구들에게 공유할 수 있습니다!**

---

## 추가 팁

### 배포 속도 향상
- Vercel은 이미 매우 빠릅니다
- CDN을 통해 전 세계 어디서나 빠르게 접속 가능

### 무료 플랜 제한
- 무제한 프로젝트
- 무제한 대역폭
- 무제한 배포
- 커스텀 도메인 지원

### 비용
- **완전 무료입니다!** (개인 프로젝트의 경우)

---

## 도움이 필요하면

1. Vercel 문서: [vercel.com/docs](https://vercel.com/docs)
2. Vercel 커뮤니티: [github.com/vercel/vercel/discussions](https://github.com/vercel/vercel/discussions)
3. 에러 메시지를 구글에 검색해보세요

---

**이제 배포를 시작해보세요! 화이팅! 💪**

