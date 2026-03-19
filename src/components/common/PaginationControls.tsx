import { Button } from '@/components/ui/button';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPreviousPage: () => void;
  onNextPage: () => void;
  ariaControls?: string;
}

const PaginationControls = ({
  currentPage,
  totalPages,
  onPreviousPage,
  onNextPage,
  ariaControls,
}: PaginationControlsProps) => {
  return (
    <nav className="flex items-center justify-center gap-4 pt-4" aria-label="Pagination">
      <Button
        type="button"
        variant="outline"
        onClick={onPreviousPage}
        disabled={currentPage === 1}
        aria-label="Go to previous page"
        aria-controls={ariaControls}
      >
        Previous
      </Button>

      <span
        className="min-w-28 text-center text-sm text-muted-foreground"
        aria-live="polite"
      >
        Page {currentPage} of {totalPages}
      </span>

      <Button
        type="button"
        variant="outline"
        onClick={onNextPage}
        disabled={currentPage === totalPages}
        aria-label="Go to next page"
        aria-controls={ariaControls}
      >
        Next
      </Button>
    </nav>
  );
};

export default PaginationControls;
