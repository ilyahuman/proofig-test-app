CREATE TABLE IF NOT EXISTS articles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL, fileName TEXT NOT NULL,
    dateSubmitted TEXT NOT NULL, stage TEXT NOT NULL,
    note TEXT
);

CREATE TABLE IF NOT EXISTS image_analysis (
    article_id INTEGER PRIMARY KEY,
    status TEXT,
    totalImages INTEGER,
    duplications INTEGER,
    fullReport TEXT,
    FOREIGN KEY (article_id) REFERENCES articles (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS text_analysis (
    article_id INTEGER PRIMARY KEY,
    status TEXT,
    similaritiesFound BOOLEAN,
    fullReport TEXT,
    FOREIGN KEY (article_id) REFERENCES articles (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS citations_analysis (
    article_id INTEGER PRIMARY KEY,
    totalCitations INTEGER,
    suspicious INTEGER,
    bad INTEGER,
    status TEXT,
    fullReport TEXT,
    FOREIGN KEY (article_id) REFERENCES articles (id) ON DELETE CASCADE
);
