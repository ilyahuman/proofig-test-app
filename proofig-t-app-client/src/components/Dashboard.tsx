import { useState } from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { ArticleTable } from '@/components/table/ArticleTable';
import { ArticleModal } from '@/components/modal/ArticleModal';
import { Article } from '@/types/article';
import { useArticles } from '@/hooks/useArticles';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { AppSidebar } from '@/components/AppSidebar';
import { useTableSearch } from '@/hooks/useTableSearch';

export function Dashboard() {
  const { articles, isLoading, error } = useArticles();
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const { filteredArticles, searchTerm, setSearchTerm } =
    useTableSearch(articles);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="space-y-4 w-full my-3">
          <Skeleton className="h-8 w-full animate-pulse" />
          <Skeleton className="h-96 w-full animate-pulse" />
        </div>
      );
    }

    if (error) {
      return (
        <Alert variant="destructive" className="my-3">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      );
    }

    return (
      <>
        <Input
          type="text"
          placeholder="Search articles by Title or File Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4"
        />
        <ArticleTable
          articles={filteredArticles}
          onRowClick={setSelectedArticle}
        />
        {selectedArticle && (
          <ArticleModal
            article={selectedArticle}
            onClose={() => setSelectedArticle(null)}
          />
        )}
      </>
    );
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex w-full flex-col p-6">
        <SidebarTrigger />
        <Separator className="my-4" />
        {renderContent()}
      </main>
    </SidebarProvider>
  );
}
