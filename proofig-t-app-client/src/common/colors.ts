export const STAGE_COLORS = {
  'pre-publication':
    'bg-yellow-200 text-yellow-800 hover:bg-yellow-400 cursor-pointer',
  'post-publication':
    'bg-emerald-400 text-white hover:bg-emerald-600 cursor-pointer',
} as const;

export const getStageColor = (stage: string) => {
  return STAGE_COLORS[stage.toLowerCase() as keyof typeof STAGE_COLORS];
};

export const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'complete':
      return 'bg-emerald-600 text-white hover:bg-emerald-300 cursor-pointer';
    case 'in progress':
      return 'bg-blue-400 text-white animate-pulse transition-all ease-linear duration-2000 hover:bg-blue-600 cursor-pointer';
    case 'pending':
      return 'bg-yellow-200 text-yellow-800 hover:bg-yellow-300 cursor-pointer';
    case 'failed':
      return 'bg-red-200 text-red-800 hover:bg-rose-400 cursor-pointer';
    default:
      return 'bg-gray-200 text-gray-800';
  }
};
