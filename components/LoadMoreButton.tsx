import React from 'react';
import { Button } from '@heroui/button';

interface LoadMoreButtonProps {
  onLoadMore: () => void;
  hasMore: boolean;
  isLoading?: boolean;
}

export const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({ 
  onLoadMore, 
  hasMore, 
  isLoading = false 
}) => {
  if (!hasMore) return null;

  return (
    <div className="w-full flex justify-center mt-8">
      <Button 
        color="primary"
        variant="flat"
        size="lg"
        isDisabled={isLoading}
        onClick={onLoadMore}
      >
        {isLoading ? 'Loading...' : 'Load More'}
      </Button>
    </div>
  );
};
