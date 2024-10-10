const { PrismaClient } = require('@prisma/client');
const fs = require('fs');

const prisma = new PrismaClient();

async function saveDataToFile() {
  const data = await prisma.topic.findMany();

  // JSON 파일로 저장
  fs.writeFileSync('topics.json', JSON.stringify(data, null, 2));

  console.log('사용자 데이터를 topics.json 파일로 저장했습니다.');
}

savePhotosToFile()
  .catch((e) => {
    console.error('데이터 저장 중 오류 발생:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
