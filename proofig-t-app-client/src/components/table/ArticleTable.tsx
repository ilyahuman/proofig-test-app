import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import type { Article } from '@/types/article';
import { useTableSort } from '@/hooks/useTableSort';
import { ArticleTableHeader } from './ArticleTableHeader';
import { getStageColor } from '@/common/colors';
import { memo } from 'react';
import { Badge } from '@/components/ui/badge';

interface ArticleTableProps {
  articles: Article[];
  onRowClick: (article: Article) => void;
}

export const ArticleTable = memo(function ArticleTable({
  articles,
  onRowClick,
}: ArticleTableProps) {
  const { sortedArticles, sortKey, sortOrder, toggleSort } =
    useTableSort(articles);

  return (
    <div className="relative rounded-md border">
      <ScrollArea className="rounded-md border">
        <div className="h-full max-h-[calc(100vh-170px)]">
          <Table>
            <ArticleTableHeader
              sortKey={sortKey}
              sortOrder={sortOrder}
              onSort={toggleSort}
            />
            <TableBody>
              {!sortedArticles.length && (
                <TableRow>
                  <TableCell className="p-4 font-medium text-base">
                    No articles found.
                  </TableCell>
                </TableRow>
              )}
              {sortedArticles.map((article, index) => (
                <TableRow
                  key={article.fileName}
                  onClick={() => onRowClick(article)}
                  className={`
                    cursor-pointer 
                    transition-colors 
                    hover:bg-accent 
                    ${index % 2 === 0 ? 'bg-white' : 'bg-muted/20'}
                  `}
                >
                  <TableCell className="font-semibold  p-4 min-w-[200px]">
                    {article.title}
                  </TableCell>
                  <TableCell className="min-w-[200px]">
                    {article.fileName}
                  </TableCell>
                  <TableCell className="min-w-[150px]">
                    {new Date(article.dateSubmitted).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="min-w-[100px]">
                    <Badge className={getStageColor(article.stage)}>
                      {article.stage}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
});
