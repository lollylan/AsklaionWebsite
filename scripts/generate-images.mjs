import { writeFile } from 'fs/promises';
import { existsSync } from 'fs';

const API_KEY = 'b1f29cdd8d89eea8880df06a2ef41994';
const CREATE_URL = 'https://api.kie.ai/api/v1/jobs/createTask';
const RESULT_URL = 'https://api.kie.ai/api/v1/jobs/recordInfo';

const IMAGES = [
  {
    filename: 'public/images/academy-bg.webp',
    prompt: 'abstract dark coding environment, glowing amber circuits, deep charcoal background, cinematic, ultra detailed, no text, no letters, no words, dark moody atmosphere, digital art',
  },
  {
    filename: 'public/images/forge-bg.webp',
    prompt: 'dark medical software workshop, glowing teal tools and code, dark navy background, cinematic, ultra detailed, no text, no letters, no words, futuristic medical technology, digital art',
  },
];

async function createTask(prompt) {
  const res = await fetch(CREATE_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'nano-banana-2',
      input: {
        prompt,
        image_input: [],
        aspect_ratio: '16:9',
        resolution: '2K',
        output_format: 'png',
      },
    }),
  });

  const data = await res.json();
  console.log('Create task response:', JSON.stringify(data, null, 2));

  if (data.code !== 200 || !data.data?.taskId) {
    throw new Error(`Failed to create task: ${JSON.stringify(data)}`);
  }

  return data.data.taskId;
}

async function waitForResult(taskId, maxWait = 120000) {
  const start = Date.now();

  while (Date.now() - start < maxWait) {
    await new Promise(r => setTimeout(r, 5000));

    const res = await fetch(`${RESULT_URL}?taskId=${taskId}`, {
      headers: { 'Authorization': `Bearer ${API_KEY}` },
    });

    const data = await res.json();

    if (data.data?.state === 'success') {
      const result = JSON.parse(data.data.resultJson);
      const urls = result.resultUrls || [];
      if (urls.length > 0) return urls[0];
      throw new Error('No result URLs in success response');
    }

    if (data.data?.state === 'fail') {
      throw new Error(`Task failed: ${data.data.failMsg}`);
    }

    console.log(`  Task ${taskId}: ${data.data?.state || 'unknown'}...`);
  }

  throw new Error(`Timeout waiting for task ${taskId}`);
}

async function downloadImage(url, filename) {
  const res = await fetch(url);
  const buffer = Buffer.from(await res.arrayBuffer());
  await writeFile(filename, buffer);
  console.log(`  Saved: ${filename} (${(buffer.length / 1024).toFixed(0)} KB)`);
}

async function main() {
  console.log('Generating background images via kie.ai Nano Banana 2...\n');

  for (const img of IMAGES) {
    if (existsSync(img.filename)) {
      console.log(`Skipping ${img.filename} (already exists)`);
      continue;
    }

    try {
      console.log(`Creating task for ${img.filename}...`);
      const taskId = await createTask(img.prompt);
      console.log(`  Task ID: ${taskId}`);

      console.log('  Waiting for result...');
      const imageUrl = await waitForResult(taskId);
      console.log(`  Image URL: ${imageUrl}`);

      await downloadImage(imageUrl, img.filename);
    } catch (err) {
      console.error(`Error generating ${img.filename}:`, err.message);
      console.log('  Will use CSS gradient fallback instead.');
    }
  }

  console.log('\nDone!');
}

main();
