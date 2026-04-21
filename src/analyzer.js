const axios = require('axios');

/**
 * Claude API로 분석
 */
async function analyze(parsedData) {
  try {
    const apiKey = process.env.CLAUDE_API_KEY;

    if (!apiKey) {
      throw new Error('CLAUDE_API_KEY 환경변수가 없습니다');
    }

    // 메시지를 텍스트로 변환
    const messageText = parsedData.messages
      .map(m => `[${m.nickname}] [${m.time}] ${m.content}`)
      .join('\n');

    // Claude API 호출
    const response = await axios.post(
      'https://api.anthropic.com/v1/messages',
      {
        model: 'claude-opus-4-1',
        max_tokens: 2000,
        system: `당신은 AI 커뮤니티 분석 전문가입니다.

        카톡 대화 내용을 분석하고 다음을 추출하세요:
        1. 핫토픽 (AI에이전트, 바이브코딩 관련만)
        2. Q&A (사람들 질문과 답변)
        3. 링크 (공유된 URL)

        JSON 형식으로 응답하세요.`,
        messages: [
          {
            role: 'user',
            content: `다음 카톡 대화를 분석해줘:\n\n${messageText}`
          }
        ]
      },
      {
        headers: {
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'content-type': 'application/json'
        }
      }
    );

    // 응답 파싱
    const content = response.data.content[0].text;

    // JSON 추출
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    const analysisResult = jsonMatch ? JSON.parse(jsonMatch[0]) : {};

    return {
      analysisDate: new Date().toISOString().split('T')[0],
      ...analysisResult,
      statistics: {
        newItems: 0,
        updatedItems: 0,
        duplicatesRemoved: 0
      }
    };

  } catch (error) {
    throw new Error(`분석 오류: ${error.message}`);
  }
}

module.exports = {
  analyze
};
