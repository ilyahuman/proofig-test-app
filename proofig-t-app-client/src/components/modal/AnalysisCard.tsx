import { AlertCircle, CheckCircle, Clock, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getStatusColor } from '@/common/colors';

interface AnalysisCardProps {
  title: string;
  status: string;
  reportUrl: string;
  children: React.ReactNode;
}

const StatusIcon = ({ status }: { status: string }) => {
  switch (status.toLowerCase()) {
    case 'completed':
      return <CheckCircle className="h-4 w-4 text-green-800" />;
    case 'pending':
      return <Clock className="h-4 w-4 text-yellow-800" />;
    case 'failed':
      return <AlertCircle className="h-4 w-4 text-red-800" />;
    default:
      return null;
  }
};

export const AnalysisCard = ({
  title,
  status,
  children,
  reportUrl,
}: AnalysisCardProps) => {
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          {status && (
            <Badge
              className={`flex items-center gap-1 ${getStatusColor(status)}`}
            >
              <StatusIcon status={status} />
              {status}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {children}
          {reportUrl && (
            <a
              href={reportUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex text-xs items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors mt-2"
            >
              View Full Report
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
