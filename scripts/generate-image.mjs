import sharp from 'sharp';

const previewSource = 'public/preview-source.png';
const faviconSource = 'public/favicon-source.svg';

const faviconSizes = [
  { name: 'favicon-32.png', size: 32 },
  { name: 'favicon-16.png', size: 16 },
  { name: 'apple-touch-icon.png', size: 180 },
];

async function generatePreview() {
  await sharp(previewSource).png().toFile('public/preview.png');
}

async function generateFavicons() {
  for (const s of faviconSizes) {
    await sharp(faviconSource).resize(s.size, s.size).png().toFile(`public/${s.name}`);
  }
}

async function run() {
  await generatePreview();
  await generateFavicons();
  console.log('All images generated ✅');
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
