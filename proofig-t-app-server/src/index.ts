import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { serve } from '@hono/node-server';
import path from 'path';
import Database from 'better-sqlite3';
import { Article } from './types';

const db = new Database('database.sqlite');
const app = new Hono();

app.use(
  '*',
  cors({
    origin: ['http://localhost:5173', 'http://localhost:4173'],
    allowMethods: ['GET', 'POST'],
    allowHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

app.get('/submissions', (c) => {
  const rawData = db
    .prepare(
      `
          SELECT a.*,
                 i.status     AS imageStatus,
                 i.totalImages,
                 i.duplications,
                 i.fullReport AS imageReport,
                 t.status     AS textStatus,
                 t.similaritiesFound,
                 t.fullReport AS textReport,
                 c.totalCitations,
                 c.suspicious,
                 c.bad,
                 c.status AS citationStatus,
                 c.fullReport AS citationReport
          FROM articles a
                   LEFT JOIN image_analysis i ON a.id = i.article_id
                   LEFT JOIN text_analysis t ON a.id = t.article_id
                   LEFT JOIN citations_analysis c ON a.id = c.article_id
      `
    )
    .all();

  const submissions: Article[] = rawData.map((row: any) => ({
    title: row.title,
    fileName: row.fileName,
    dateSubmitted: row.dateSubmitted,
    stage: row.stage,
    note: row.note || '',
    imageAnalysis: {
      status: row.imageStatus,
      totalImages: row.totalImages,
      duplications: row.duplications,
      fullReport: row.imageReport,
    },
    textAnalysis: {
      status: row.textStatus,
      similaritiesFound: Boolean(row.similaritiesFound),
      fullReport: row.textReport,
    },
    citationsAnalysis: {
      totalCitations: row.totalCitations,
      suspicious: row.suspicious,
      bad: row.bad,
      status: row.citationStatus,
      fullReport: row.citationReport,
    },
  }));

  return c.json({ success: true, submissions });
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
