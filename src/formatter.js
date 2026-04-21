/**
 * 결과를 마크다운으로 포맷
 */
async function format(dedupResult) {
  try {
    const today = new Date().toISOString().split('T')[0];
    const [year, month, day] = today.split('-');

    // 마크다운 보고서 작성
    let markdown = `# 📌 AI 단톡방 브리핑 - ${year}.${month}.${day}\n\n`;

    // 핫토픽
    if (dedupResult.new && dedupResult.new.length > 0) {
      dedupResult.new.forEach((topic, index) => {
        markdown += `## 🔥 핫토픽 ${index + 1} | ${topic.title || '제목'}\n\n`;
        markdown += `${topic.summary || '내용 없음'}\n\n`;
        markdown += `---\n\n`;
      });
    }

    // 요약 (엑셀용)
    const summary = dedupResult.new
      .map(t => `• ${t.title}`)
      .slice(0, 5)
      .join('\n');

    return {
      fileName: `${today}.md`,
      report: markdown,
      summary: summary,
      reportUrl: '' // 나중에 채워짐
    };

  } catch (error) {
    throw new Error(`포맷팅 오류: ${error.message}`);
  }
}

module.exports = {
  format
};
