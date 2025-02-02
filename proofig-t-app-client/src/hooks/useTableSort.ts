import { useQueryState } from 'nuqs';
import { Article } from '@/types/article';

export type SortKey = keyof Pick<
  Article,
  'title' | 'fileName' | 'dateSubmitted' | 'stage'
>;
export type SortOrder = 'asc' | 'desc';

const VALID_SORT_KEYS: readonly SortKey[] = [
  'title',
  'fileName',
  'dateSubmitted',
  'stage',
] as const;

const VALID_SORT_ORDERS: readonly SortOrder[] = ['asc', 'desc'] as const;

export function useTableSort(articles: Article[]) {
  const [sortKey, setSortKey] = useQueryState('sortKey');
  const [sortOrder, setSortOrder] = useQueryState('sortOrder');

  const key = VALID_SORT_KEYS.includes(sortKey as SortKey)
    ? (sortKey as SortKey)
    : null;

  const order = VALID_SORT_ORDERS.includes(sortOrder as SortOrder)
    ? (sortOrder as SortOrder)
    : null;

  const compareValues = (
    valueA: unknown,
    valueB: unknown,
    order: SortOrder
  ): number => {
    if (valueA == null && valueB == null) return 0;
    if (valueA == null) return 1;
    if (valueB == null) return -1;

    if (typeof valueA === 'string' && typeof valueB === 'string') {
      if (isValidDate(valueA) && isValidDate(valueB)) {
        const dateA = new Date(valueA).getTime();
        const dateB = new Date(valueB).getTime();
        return order === 'asc' ? dateA - dateB : dateB - dateA;
      }
      return order === 'asc'
        ? valueA.localeCompare(valueB, undefined, { sensitivity: 'base' })
        : valueB.localeCompare(valueA, undefined, { sensitivity: 'base' });
    }

    if (typeof valueA === 'number' && typeof valueB === 'number') {
      return order === 'asc' ? valueA - valueB : valueB - valueA;
    }

    return 0;
  };

  const sortedArticles: Article[] = [...articles].sort((a, b) => {
    if (!key || !order) return 0;
    return compareValues(a[key], b[key], order);
  });

  const toggleSort = async (newKey: SortKey) => {
    if (newKey === sortKey) {
      if (sortOrder === 'asc') {
        await setSortOrder('desc');
      } else if (sortOrder === 'desc') {
        await Promise.all([setSortKey(null), setSortOrder(null)]);
      }
    } else {
      await Promise.all([setSortKey(newKey), setSortOrder('asc')]);
    }
  };

  return {
    sortedArticles,
    sortKey: key,
    sortOrder: order,
    toggleSort,
  };
}

const isValidDate = (dateString: string): boolean => {
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date.getTime());
};
