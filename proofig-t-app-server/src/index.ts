import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { serve } from '@hono/node-server';
import { readFileSync } from 'fs';
import { join } from 'path';
import path from 'path';

const __dirname = path.resolve();
const app = new Hono();

const getSubmissions = (): any[] => {
  try {
    const filePath = join(__dirname, './data/articles-sample.json');
    return JSON.parse(readFileSync(filePath, 'utf-8'));
  } catch (error) {
    console.error('Error reading JSON file:', error);
    return [];
  }
};

app.use(
  '*',
  cors({
    origin: 'http://localhost:5173',
    allowMethods: ['GET', 'POST'],
    allowHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

app.get('/submissions', (c) => {
  return c.json({ success: true, submissions: getSubmissions() });
});

app.onError((err, c) => {
  console.error('Server Error:', err);
  return c.json({ success: false, message: 'Internal Server Error' }, 500);
});

serve(app)
  .on('listening', () => {
    console.log('✅ Server running on http://localhost:3000');
  })
  .on('error', (err) => {
    console.error(err.message);
  });
