---
description: 카톡 내용을 AI 에이전트·바이브코딩 중심으로 분석합니다
---

# 카톡 내용 분석 Skill

## 역할
Claude가 카톡 내보내기 txt 파일의 대화를 분석합니다.

추출할 항목:
- 🔥 핫토픽 (AI에이전트·바이브코딩 관련)
- ❓ Q&A (사람들이 궁금해한 것)
- 🔗 링크 (공유된 주요 링크)

## 분석 범위

✅ 포함:
- Claude Code 관련
- AI 에이전트 (OpenClaw, n8n 등)
- 바이브코딩
- 자동화 관련

❌ 제외:
- 맥북 사양
- 캔바, 일반 디자인
- 일상 대화
- 자동화와 무관한 질문

## 중복 제거

### 제거할 중복
- 정확히 같은 주제 + 새 정보 없음
- 같은 Q&A 반복
- 같은 링크 공유

### 포함할 중복
- 같은 주제 + 새로운 답변 추가
- 7일 이상 경과 후 재논의
- 긴급한 업데이트 (버그, 보안 등)

## 출력 형식 (JSON)

```json
{
  "analysisDate": "2026-04-20",
  "hotTopics": [
    {
      "id": "topic-id",
      "title": "주제 제목",
      "summary": "3-5줄 상세 내용",
      "isDuplicate": false,
      "isUpdate": false,
      "relatedKeywords": ["키워드1", "키워드2"]
    }
  ],
  "qaList": [
    {
      "question": "Q. 질문",
      "answer": "A. 답변",
      "isDuplicate": false,
      "isUpdate": false
    }
  ],
  "links": [
    {
      "url": "https://...",
      "context": "어떤 맥락에서 공유됨",
      "isDuplicate": false,
      "importance": "high/medium/low"
    }
  ],
  "statistics": {
    "newItems": 5,
    "updatedItems": 1,
    "duplicatesRemoved": 2
  }
}
```

## 사용 예시

```
카톡 내용을 분석해줘.
AI에이전트·바이브코딩 관련만.
중복은 자동 제거해줘. 새 정보 있으면 업데이트 표시해줘.
```