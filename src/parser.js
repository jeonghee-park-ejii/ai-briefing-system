const fs = require('fs');
const path = require('path');

/**
 * 카톡 파일 파싱
 */
async function parse(filePath) {
  try {
    // 파일 읽기
    const content = fs.readFileSync(filePath, 'utf8');

    // 날짜 정규식
    const dateRegex = /---+\s*(\d{4})년\s*(\d{1,2})월\s*(\d{1,2})일\s*(\S+)\s*---+/g;

    // 메시지 정규식
    const messageRegex = /\[([^\]]+)\]\s*\[([^\]]+)\]\s*(.+)/;

    // 파일명
    const fileName = path.basename(filePath);

    // 결과 객체
    const result = {
      fileName: fileName,
      saveDate: new Date().toISOString().split('T')[0],
      messages: [],
      totalMessages: 0,
      cleanedMessages: 0
    };

    // 라인별 처리
    const lines = content.split('\n');
    let currentDate = '';

    for (const line of lines) {
      // 날짜 라인 확인
      const dateMatch = line.match(/(\d{4})년\s*(\d{1,2})월\s*(\d{1,2})일\s*(\S+)/);
      if (dateMatch) {
        currentDate = dateMatch[0];
        continue;
      }

      // 불필요한 메시지 제외
      if (line.includes('님이 들어왔습니다') ||
          line.includes('님이 나갔습니다') ||
          line.includes('메시지가 삭제되었습니다') ||
          line.includes('관리자가 메시지를 가렸습니다') ||
          line === '' ||
          line.includes('[사진]') ||
          line.includes('[동영상]') ||
          line.includes('[이모티콘]')) {
        continue;
      }

      // 메시지 파싱
      const match = line.match(messageRegex);
      if (match) {
        result.messages.push({
          date: currentDate,
          nickname: match[1],
          time: match[2],
          content: match[3]
        });
        result.cleanedMessages++;
      }

      result.totalMessages++;
    }

    return result;

  } catch (error) {
    throw new Error(`파싱 오류: ${error.message}`);
  }
}

module.exports = {
  parse
};
