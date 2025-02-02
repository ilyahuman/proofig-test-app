import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { Article } from '@/types/article';
import { getStageColor } from '@/common/colors';
import { AnalysisCard } from '@/components/modal/AnalysisCard';

interface ArticleModalProps {
  article: Article;
  onClose: () => void;
}

export function ArticleModal({ article, onClose }: ArticleModalProps) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="w-11/12 md:max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl mb-2">{article.title}</DialogTitle>
          <div className="flex items-center gap-2 text-sm">
            <Badge className={getStageColor(article.stage)}>
              {article.stage}
            </Badge>
            <span className="text-muted-foreground">
              Submitted on {formatDate(article.dateSubmitted)}
            </span>
          </div>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh] pr-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <AnalysisCard title="Basic Information" status="" reportUrl="">
              <div className="space-y-2">
                <div className="text-sm">
                  <span className="font-medium">File Name:</span>{' '}
                  {article.fileName}
                </div>
                {article.note && (
                  <div className="text-sm">
                    <span className="font-medium">Note:</span> {article.note}
                  </div>
                )}
              </div>
            </AnalysisCard>

            <AnalysisCard
              title="Image Analysis"
              status={article.imageAnalysis.status}
              reportUrl={article.imageAnalysis.fullReport}
            >
              <div className="space-y-2">
                <div className="text-sm">
                  <span className="font-medium">Total Images:</span>{' '}
                  {article.imageAnalysis.totalImages}
                </div>
                <div className="text-sm">
                  <span className="font-medium">Duplications:</span>{' '}
                  {article.imageAnalysis.duplications}
                </div>
              </div>
            </AnalysisCard>

            <AnalysisCard
              title="Text Analysis"
              status={article.textAnalysis.status}
              reportUrl={article.textAnalysis.fullReport}
            >
              <div className="text-sm">
                <span className="font-medium">Similarities Found:</span>{' '}
                <Badge
                  variant={
                    article.textAnalysis.similaritiesFound
                      ? 'destructive'
                      : 'secondary'
                  }
                >
                  {article.textAnalysis.similaritiesFound ? 'Yes' : 'No'}
                </Badge>
              </div>
            </AnalysisCard>

            <AnalysisCard
              title="Citations Analysis"
              status={article.citationsAnalysis.status}
              reportUrl={article.citationsAnalysis.fullReport}
            >
              <div className="space-y-2">
                <div className="text-sm">
                  <span className="font-medium">Total Citations:</span>{' '}
                  {article.citationsAnalysis.totalCitations}
                </div>
                <div className="text-sm">
                  <span className="font-medium">Suspicious:</span>{' '}
                  <Badge
                    variant={
                      article.citationsAnalysis.suspicious > 0
                        ? 'destructive'
                        : 'secondary'
                    }
                  >
                    {article.citationsAnalysis.suspicious}
                  </Badge>
                </div>
                <div className="text-sm">
                  <span className="font-medium">Bad:</span>{' '}
                  <Badge
                    variant={
                      article.citationsAnalysis.bad > 0
                        ? 'destructive'
                        : 'secondary'
                    }
                  >
                    {article.citationsAnalysis.bad}
                  </Badge>
                </div>
              </div>
            </AnalysisCard>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
