---
description: 분석 결과의 중복을 제거합니다
---

# 중복 제거 Skill

## 역할
새로운 분석 결과와 과거 데이터를 비교해서 중복을 제거합니다.

## 중복 판정 기준

### 제거 (순수 중복)
- 제목이나 핵심 내용이 80% 이상 같음
- 새로운 정보 없음
- 7일 이내에 이미 분석됨

### 포함 (업데이트)
- 같은 주제 + 새로운 답변 추가
- 같은 주제 + 추가 정보 있음
- 7일 이상 경과 후 재논의

### 항상 포함 (긴급)
- 보안 관련 업데이트
- 버그 발견
- 중요한 새 릴리즈
- 정책 변경

## 출력 형식

```json
{
  "new": [
    {
      "type": "hotTopic",
      "title": "새로운 주제",
      "content": "내용"
    }
  ],
  "updated": [
    {
      "type": "qa",
      "id": "vibe-coding-1",
      "title": "바이브코딩 시작",
      "updateReason": "새로운 답변 추가됨"
    }
  ],
  "duplicates": [
    {
      "title": "Claude 4",
      "reason": "3일 전과 동일한 내용",
      "removedDate": "2026-04-21"
    }
  ],
  "statistics": {
    "newItems": 5,
    "updatedItems": 2,
    "duplicatesRemoved": 3
  }
}
```

## 사용 예시

```
이전 분석과 비교해서 중복 제거해줘.
새 정보 있으면 업데이트로 표시해줘.
```
