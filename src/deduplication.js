const fs = require('fs');

/**
 * 중복 제거
 */
async function filterDuplicates(analysisResult) {
  try {
    // history.json 로드
    const historyPath = './data/history.json';
    let history = { hotTopics: [], qaList: [], linkList: [] };

    if (fs.existsSync(historyPath)) {
      history = JSON.parse(fs.readFileSync(historyPath, 'utf8'));
    }

    // 결과 분류
    const result = {
      new: [],
      updated: [],
      duplicates: [],
      statistics: {
        newItems: 0,
        updatedItems: 0,
        duplicatesRemoved: 0
      }
    };

    // 핫토픽 검사 (간단한 구현)
    if (analysisResult.hotTopics) {
      for (const topic of analysisResult.hotTopics) {
        // 과거 데이터와 비교 (80% 유사 = 중복)
        const isDuplicate = history.hotTopics.some(h =>
          h.title === topic.title
        );

        if (isDuplicate) {
          result.duplicates.push(topic);
          result.statistics.duplicatesRemoved++;
        } else {
          result.new.push(topic);
          result.statistics.newItems++;
        }
      }
    }

    // history.json 업데이트
    history.hotTopics = [
      ...history.hotTopics,
      ...(analysisResult.hotTopics || [])
    ];

    fs.writeFileSync(
      historyPath,
      JSON.stringify(history, null, 2),
      'utf8'
    );

    return result;

  } catch (error) {
    throw new Error(`중복 제거 오류: ${error.message}`);
  }
}

module.exports = {
  filterDuplicates
};
