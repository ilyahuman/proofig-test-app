import { useState, useEffect } from 'react';
import { Article } from '@/types/article';
import { config } from '@/common/config';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const useArticles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(config.API_URL);

        await sleep(1000);

        if (!response.ok) {
          throw new Error('Failed to fetch articles');
        }

        const data = await response.json();

        setArticles(data.submissions);
      } catch (e) {
        const err = e as Error;
        console.error(err.message);
        setError('An error occurred while fetching articles');
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return { articles, isLoading, error };
};
