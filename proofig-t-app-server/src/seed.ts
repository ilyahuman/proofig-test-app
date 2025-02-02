import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';
import { Article } from './types';

const db = new Database('database.sqlite');
const __dirname = path.resolve();

const jsonData: Article[] = JSON.parse(
  fs.readFileSync(path.join(__dirname, './data/articles-sample.json'), 'utf8')
);

const insertArticle = db.prepare(
  `INSERT INTO articles (title, fileName, dateSubmitted, stage, note)
   VALUES (?, ?, ?, ?, ?)`
);
const insertImageAnalysis = db.prepare(
  `INSERT INTO image_analysis (article_id, status, totalImages, duplications, fullReport)
   VALUES (?, ?, ?, ?, ?)`
);
const insertTextAnalysis = db.prepare(
  `INSERT INTO text_analysis (article_id, status, similaritiesFound, fullReport)
   VALUES (?, ?, ?, ?)`
);
const insertCitationsAnalysis = db.prepare(
  `INSERT INTO citations_analysis (article_id, totalCitations, suspicious, bad, status, fullReport)
   VALUES (?, ?, ?, ?, ?, ?)`
);

const insertData = db.transaction(() => {
  for (const article of jsonData) {
    const result = insertArticle.run(
      article.title,
      article.fileName,
      article.dateSubmitted,
      article.stage,
      article.note || null
    );

    const articleId = result.lastInsertRowid as number;

    insertImageAnalysis.run(
      articleId,
      article.imageAnalysis.status,
      article.imageAnalysis.totalImages,
      article.imageAnalysis.duplications,
      article.imageAnalysis.fullReport
    );

    insertTextAnalysis.run(
      articleId,
      article.textAnalysis.status,
      article.textAnalysis.similaritiesFound ? 1 : 0,
      article.textAnalysis.fullReport
    );

    insertCitationsAnalysis.run(
      articleId,
      article.citationsAnalysis.totalCitations,
      article.citationsAnalysis.suspicious,
      article.citationsAnalysis.bad,
      article.citationsAnalysis.status,
      article.citationsAnalysis.fullReport
    );
  }
});

insertData();

console.log('Database seeded successfully!');
