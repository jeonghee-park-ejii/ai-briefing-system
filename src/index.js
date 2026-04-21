// 환경 변수 로드
require('dotenv').config();

// 필요한 모듈들
const parser = require('./parser');
const analyzer = require('./analyzer');
const deduplication = require('./deduplication');
const formatter = require('./formatter');
const googleDrive = require('./googleDrive');
const googleSheets = require('./googleSheets');

// 로그 함수
function log(message, type = 'info') {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] [${type.toUpperCase()}] ${message}`);
}

// 메인 함수
async function main() {
  try {
    log('🚀 AI 분석 시스템 시작');

    // 1단계: Input 폴더에서 파일 확인
    log('📂 Input 폴더에서 파일 확인 중...');
    const inputFile = await googleDrive.getLatestFile();

    if (!inputFile) {
      log('⚠️ Input 폴더에 새 파일이 없습니다', 'warn');
      return;
    }

    log(`✅ 파일 발견: ${inputFile.name}`);

    // 2단계: 파일 파싱
    log('🔍 파일 파싱 중...');
    const parsedData = await parser.parse(inputFile.path);
    log(`✅ 파싱 완료: ${parsedData.totalMessages}개 메시지`);

    // 3단계: Claude 분석 (병렬)
    log('🤖 Claude 분석 중... (병렬 처리)');
    const analysisResult = await analyzer.analyze(parsedData);
    log(`✅ 분석 완료`);

    // 4단계: 중복 제거
    log('🔄 중복 제거 중...');
    const dedupResult = await deduplication.filterDuplicates(analysisResult);
    log(`✅ 중복 제거 완료 (새것: ${dedupResult.new.length}, 제거됨: ${dedupResult.duplicates.length})`);

    // 5단계: 포맷팅
    log('📝 포맷팅 중...');
    const formattedResult = await formatter.format(dedupResult);
    log(`✅ 포맷팅 완료`);

    // 6단계: 구글 드라이브에 보고서 저장
    log('📤 구글 드라이브에 보고서 저장 중...');
    const reportUrl = await googleDrive.uploadReport(
      formattedResult.fileName,
      formattedResult.report
    );
    log(`✅ 보고서 저장: ${reportUrl}`);

    // 7단계: 엑셀 업데이트
    log('📊 엑셀 업데이트 중...');
    await googleSheets.addRow({
      date: new Date().toISOString().split('T')[0],
      summary: formattedResult.summary,
      reportLink: reportUrl,
      stats: dedupResult.statistics
    });
    log(`✅ 엑셀 업데이트 완료`);

    log('🎉 모든 작업 완료!', 'success');

  } catch (error) {
    log(`❌ 오류 발생: ${error.message}`, 'error');
    log(error.stack, 'error');
    process.exit(1);
  }
}

// 프로그램 실행
main();
