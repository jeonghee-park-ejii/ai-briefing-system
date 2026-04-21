# AI 단톡방 자동 분석 시스템

## 프로젝트 개요
- **목적**: AI 관련 카톡 단톡방 내용 자동 분석
- **주요 기능**: 핫토픽 추출, Q&A 정리, 링크 수집, 중복 제거, 엑셀 자동 업데이트
- **기술 스택**: Node.js, Claude API, Google Drive API, Google Sheets API
- **개발자**: 정희쌤

---

## 폴더 구조
ai-briefing-system/
├── .claude/
│   └── commands/
│       ├── analyze.md          ← 분석 Skill
│       ├── parse.md            ← 파싱 Skill
│       ├── dedup.md            ← 중복 제거 Skill
│       └── format.md           ← 포맷팅 Skill
├── src/
│   ├── index.js                ← 메인 파일
│   ├── parser.js               ← 카톡 파싱
│   ├── analyzer.js             ← Claude 분석
│   ├── deduplication.js        ← 중복 제거
│   ├── formatter.js            ← 포맷팅
│   ├── googleDrive.js          ← 구글 드라이브
│   └── googleSheets.js         ← 엑셀 업데이트
├── data/
│   └── history.json            ← 히스토리 (자동 생성)
├── logs/
│   └── (로그 파일들)
├── input/                      ← 카톡 내보내기 파일 넣는 곳
├── config/
│   └── .env.example
├── .gitignore
├── CLAUDE.md                   ← 이 파일
└── package.json


---

## 작업 규칙

### 1. 파일 인코딩
- 모든 파일은 **UTF-8**로 저장
- 카톡 txt 파일도 **UTF-8** (매우 중요!)

### 2. 분석 범위
✅ **포함할 것**:
- Claude Code 관련
- AI 에이전트 (OpenClaw, n8n 등)
- 바이브코딩
- 자동화 관련

❌ **제외할 것**:
- 맥북 사양
- 캔바, 일반 디자인
- 일상 대화
- 자동화와 무관한 질문

### 3. 중복 제거 규칙

#### 제거할 중복
- 정확히 같은 주제 + 새 정보 없음
- 같은 Q&A 반복
- 같은 링크 공유

#### 포함할 중복
- 같은 주제 + 새로운 답변 추가
- 7일 이상 경과 후 재논의
- 긴급한 업데이트 (버그, 보안 등)

---

## API 키 관리

### 필요한 서비스
1. **Claude API** (Anthropic)
2. **Google Drive API** (Google)
3. **Google Sheets API** (Google)

### .env 파일 (절대 깃허브에 올리지 마!)
CLAUDE_API_KEY=sk-ant-xxxxx
GOOGLE_DRIVE_FOLDER_ID=xxxxx
GOOGLE_SHEETS_ID=xxxxx
GOOGLE_SERVICE_ACCOUNT={"type":"service_account",...}


---

## 초기 설정 체크리스트

- [ ] GitHub 저장소 생성
- [ ] git clone으로 로컬 받기
- [ ] 폴더 구조 생성
- [ ] CLAUDE.md 작성
- [ ] .env 파일 작성
- [ ] Claude API 키 발급
- [ ] Google API 활성화
- [ ] 구글 드라이브 폴더 생성

---

## 사용 방법

### 매일 정희쌤이 할 일
카톡 단톡방 → 설정 → 대화 내보내기 → txt 저장
구글 드라이브 AI브리핑/Input 폴더에 업로드
자동 분석 시작! (내가 할 일 없음)
25분 후 완성
구글 드라이브/Reports에 상세 보고서 저장
구글 시트 엑셀 자동 업데이트
중복 제거 완료
링크로 클릭 가능

---

## 주의사항

### 보안
- `.env` 파일 절대 깃허브에 올리지 말 것!
- API 키는 환경변수로만 관리
- `.gitignore`에 추가:
.env
node_modules/
.DS_Store
*.log
input/
logs/


### 파일 저장
- 모든 파일은 **UTF-8**로 저장
- 한글 깨짐 방지!

---
## 환경 설정 완료 (2026)

### Google API 설정
- Google Drive API: 활성화 완료
- Google Sheets API: 활성화 완료
- 서비스 계정: ai-briefing-bot@ai-briefing-system.iam.gserviceaccount.com

### Google Drive 폴더 구조
- 메인 폴더: AI-Briefing
- 폴더 ID: 16govLo_QlAPYggeXcYIUJ2RqyIIUQhHT
- 하위 폴더: Input, Reports

### Google Sheets
- 시트 이름: AI브리핑_요약
- 시트 ID: 1tDt448hc-QZZP1BQnQQHR8MxTyiIhiMeHXzKBxsDHPY

### 서비스 계정 키 파일
- 파일명: ai-briefing-system-548c0df97480.json
- 위치: 프로젝트 루트 (gitignore로 보호됨)

### 다음 할 일
- [ ] googleDrive.js 구현
- [ ] googleSheets.js 구현
- [ ] 첫 테스트 실행