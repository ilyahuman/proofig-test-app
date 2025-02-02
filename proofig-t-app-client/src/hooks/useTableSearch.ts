import { useMemo } from 'react';
import { useDebounce } from './useDebounce';
import { Article } from '@/types/article';
import { useQueryState } from 'nuqs';

type SearchableFields = Pick<Article, 'title' | 'fileName'>;

export function useTableSearch(articles: Article[], delay: number = 300) {
  const [searchTerm, setSearchTerm] = useQueryState('searchTerm', {
    defaultValue: '',
  });
  const debouncedSearchTerm = useDebounce(searchTerm, delay);

  const filteredArticles = useMemo(() => {
    if (!debouncedSearchTerm.trim()) return articles;

    return articles.filter((article) => {
      const searchableFields: SearchableFields = {
        title: article.title,
        fileName: article.fileName,
      };

      return Object.values(searchableFields).some((value) => {
        if (value === null || value === undefined) return false;
        return value
          .toString()
          .toLowerCase()
          .includes(debouncedSearchTerm.toLowerCase());
      });
    });
  }, [articles, debouncedSearchTerm]);

  return {
    filteredArticles,
    searchTerm,
    setSearchTerm,
    isSearching: searchTerm !== debouncedSearchTerm,
  };
}
