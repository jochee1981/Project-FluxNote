# FluxNote 무료 배포 가이드

## 개요

FluxNote는 정적 React 앱이므로 여러 무료 호스팅 플랫폼에 배포할 수 있습니다. 이 문서에서는 가장 인기 있고 사용하기 쉬운 무료 배포 방법들을 소개합니다.

## 배포 옵션 비교

| 플랫폼 | 무료 플랜 | 자동 배포 | 커스텀 도메인 | 빌드 시간 | 추천도 |
|--------|----------|----------|-------------|----------|--------|
| **Vercel** | ✅ 무제한 | ✅ Git 연동 | ✅ 지원 | 빠름 | ⭐⭐⭐⭐⭐ |
| **Netlify** | ✅ 무제한 | ✅ Git 연동 | ✅ 지원 | 빠름 | ⭐⭐⭐⭐⭐ |
| **GitHub Pages** | ✅ 무제한 | ✅ Actions | ✅ 지원 | 보통 | ⭐⭐⭐⭐ |
| **Firebase Hosting** | ✅ 제한적 | ✅ CLI | ✅ 지원 | 빠름 | ⭐⭐⭐⭐ |
| **Surge.sh** | ✅ 무제한 | ❌ 수동 | ❌ 제한적 | 빠름 | ⭐⭐⭐ |

---

## 방법 1: Vercel (가장 추천 ⭐)

### 장점
- **가장 쉬운 배포**: GitHub 연동만으로 자동 배포
- **무료 플랜**: 무제한 프로젝트, 무제한 대역폭
- **빠른 속도**: 글로벌 CDN
- **자동 HTTPS**: SSL 인증서 자동 설정
- **프리뷰 배포**: PR마다 미리보기 URL 제공

### 배포 방법

#### 1단계: GitHub에 프로젝트 업로드
```bash
# Git 초기화 (아직 안 했다면)
git init
git add .
git commit -m "Initial commit"

# GitHub에 새 저장소 생성 후
git remote add origin https://github.com/사용자명/fluxnote.git
git branch -M main
git push -u origin main
```

#### 2단계: Vercel 배포
1. [vercel.com](https://vercel.com) 방문
2. "Sign Up" → GitHub 계정으로 로그인
3. "Add New Project" 클릭
4. GitHub 저장소 선택
5. 프로젝트 설정:
   - **Framework Preset**: Create React App
   - **Build Command**: `npm run build` (자동 감지됨)
   - **Output Directory**: `build` (자동 감지됨)
6. "Deploy" 클릭

#### 3단계: 완료!
- 배포 완료 후 자동으로 URL 제공 (예: `fluxnote.vercel.app`)
- 이후 코드 푸시 시 자동 재배포

### 환경 변수 설정 (필요시)
Vercel 대시보드 → Project Settings → Environment Variables

### 커스텀 도메인 연결
1. Vercel 대시보드 → Project Settings → Domains
2. 도메인 추가
3. DNS 설정 안내 따르기

---

## 방법 2: Netlify (Vercel과 유사)

### 장점
- Vercel과 유사한 기능
- 폼 처리, 서버리스 함수 등 추가 기능
- 무료 플랜: 100GB 대역폭/월

### 배포 방법

#### 옵션 A: GitHub 연동 (추천)
1. [netlify.com](https://netlify.com) 방문
2. "Sign up" → GitHub 계정으로 로그인
3. "Add new site" → "Import an existing project"
4. GitHub 저장소 선택
5. 빌드 설정:
   - **Build command**: `npm run build`
   - **Publish directory**: `build`
6. "Deploy site" 클릭

#### 옵션 B: 드래그 앤 드롭
```bash
# 프로젝트 빌드
npm run build

# build 폴더를 Netlify에 드래그 앤 드롭
```
1. Netlify 대시보드 → "Sites" → "Add new site" → "Deploy manually"
2. `build` 폴더 드래그 앤 드롭

### Netlify 설정 파일 (선택사항)
프로젝트 루트에 `netlify.toml` 생성:
```toml
[build]
  command = "npm run build"
  publish = "build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

## 방법 3: GitHub Pages

### 장점
- GitHub 저장소와 통합
- 완전 무료
- 커스텀 도메인 지원

### 배포 방법

#### 1단계: gh-pages 패키지 설치
```bash
npm install --save-dev gh-pages
```

#### 2단계: package.json 수정
```json
{
  "homepage": "https://사용자명.github.io/fluxnote",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

#### 3단계: 배포
```bash
npm run deploy
```

#### 4단계: GitHub Pages 활성화
1. GitHub 저장소 → Settings → Pages
2. Source: `gh-pages` 브랜치 선택
3. 저장

### 자동 배포 설정 (GitHub Actions)
`.github/workflows/deploy.yml` 파일 생성:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./build
```

---

## 방법 4: Firebase Hosting

### 장점
- Google의 안정적인 인프라
- 빠른 CDN
- 무료 플랜: 10GB 저장공간, 360MB/일 전송

### 배포 방법

#### 1단계: Firebase CLI 설치
```bash
npm install -g firebase-tools
```

#### 2단계: Firebase 로그인
```bash
firebase login
```

#### 3단계: Firebase 프로젝트 초기화
```bash
firebase init hosting
```
선택 사항:
- Use an existing project 또는 Create a new project
- Public directory: `build`
- Single-page app: `Yes`
- Set up automatic builds: `No` (선택)

#### 4단계: 빌드 및 배포
```bash
npm run build
firebase deploy
```

### firebase.json 설정
```json
{
  "hosting": {
    "public": "build",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

---

## 방법 5: Surge.sh (가장 간단)

### 장점
- 매우 간단한 배포
- 명령어 한 줄로 배포
- 무료 서브도메인 제공

### 배포 방법

#### 1단계: Surge 설치
```bash
npm install -g surge
```

#### 2단계: 배포
```bash
npm run build
cd build
surge
```
- 이메일과 비밀번호 입력 (처음만)
- 도메인 입력 (예: `fluxnote.surge.sh`)

### 자동 배포 스크립트
`package.json`에 추가:
```json
{
  "scripts": {
    "deploy:surge": "npm run build && surge build/ fluxnote.surge.sh"
  }
}
```

---

## 공통 사전 준비사항

### 1. 프로젝트 빌드 확인
```bash
npm run build
```
`build` 폴더가 생성되는지 확인

### 2. .gitignore 확인
`.gitignore`에 다음이 포함되어 있는지 확인:
```
node_modules/
build/
.env
```

### 3. 환경 변수 (필요시)
`.env` 파일 생성 (로컬 개발용):
```
REACT_APP_API_URL=https://api.example.com
```

배포 플랫폼에서 환경 변수 설정 필요

---

## 배포 후 확인사항

### ✅ 체크리스트
- [ ] 앱이 정상적으로 로드되는가?
- [ ] 모든 기능이 작동하는가? (노트 작성, 수정, 삭제, 검색)
- [ ] localStorage가 작동하는가?
- [ ] 반응형 디자인이 모바일에서도 잘 보이는가?
- [ ] HTTPS가 활성화되어 있는가? (대부분 자동)

### 문제 해결

#### 빌드 오류
```bash
# 의존성 재설치
rm -rf node_modules package-lock.json
npm install
npm run build
```

#### 라우팅 문제 (404 에러)
- SPA이므로 모든 경로를 `index.html`로 리다이렉트 필요
- Vercel/Netlify: 자동 처리
- GitHub Pages: `_redirects` 파일 또는 설정 필요

#### 환경 변수 문제
- `.env` 파일은 빌드 시점에 포함되어야 함
- `REACT_APP_` 접두사 필수

---

## 추천 배포 순서

1. **초보자**: Vercel 또는 Netlify (가장 쉬움)
2. **GitHub 사용자**: GitHub Pages (통합 편의)
3. **빠른 테스트**: Surge.sh (가장 빠름)
4. **Google 서비스 사용자**: Firebase Hosting

---

## 비용 비교

| 플랫폼 | 무료 플랜 | 제한사항 |
|--------|----------|---------|
| Vercel | 무제한 | 대역폭 무제한 |
| Netlify | 무제한 | 100GB/월 대역폭 |
| GitHub Pages | 무제한 | 저장소 공개 필요 |
| Firebase | 무제한 | 10GB 저장, 360MB/일 |
| Surge | 무제한 | 서브도메인만 |

---

## 보안 고려사항

1. **환경 변수**: 민감한 정보는 환경 변수로 관리
2. **API 키**: 클라이언트에 노출되지 않도록 주의
3. **HTTPS**: 모든 플랫폼에서 자동 제공

---

## 결론

FluxNote는 정적 React 앱이므로 **Vercel** 또는 **Netlify**를 가장 추천합니다. 
- 가장 쉬운 설정
- 자동 배포
- 무료 플랜으로 충분
- 커스텀 도메인 지원

배포 후에는 코드를 푸시할 때마다 자동으로 재배포되어 매우 편리합니다!

