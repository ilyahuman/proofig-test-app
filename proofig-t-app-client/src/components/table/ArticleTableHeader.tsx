import { Button } from '@/components/ui/button';
import { TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { SortKey } from '@/hooks/useTableSort';

interface ArticleTableHeaderProps {
  sortKey: string | null;
  sortOrder: string | null;
  onSort: (key: SortKey) => void;
}

export function ArticleTableHeader({
  sortKey,
  sortOrder,
  onSort,
}: ArticleTableHeaderProps) {
  const SortIcon = ({ column }: { column: SortKey }) => {
    if (column !== sortKey) return null;
    return sortOrder === 'asc' ? (
      <ChevronUp className="ml-2 h-4 w-4" />
    ) : (
      <ChevronDown className="ml-2 h-4 w-4" />
    );
  };

  const columns: { key: SortKey; label: string; width: string }[] = [
    { key: 'title', label: 'Title', width: 'min-w-[200px]' },
    { key: 'fileName', label: 'File Name', width: 'min-w-[200px]' },
    { key: 'dateSubmitted', label: 'Date Submitted', width: 'min-w-[150px]' },
    { key: 'stage', label: 'Stage', width: 'min-w-[100px]' },
  ];

  return (
    <TableHeader>
      <TableRow className="bg-slate-200">
        {columns.map(({ key, label, width }) => (
          <TableHead
            key={key}
            className={`${width} ${key === 'title' ? 'w-[300px]' : ''}`}
          >
            <Button
              variant="ghost"
              onClick={() => onSort(key)}
              className="font-bold whitespace-nowrap"
            >
              {label} <SortIcon column={key} />
            </Button>
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
  );
}
