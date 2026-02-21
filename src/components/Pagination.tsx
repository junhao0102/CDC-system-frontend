import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PaginationProps {
  currentPage: number
  totalPages: number
  isLoading?: boolean
  onPageChange: (page: number) => void
}

export default function Pagination({
  currentPage,
  totalPages,
  isLoading,
  onPageChange,
}: PaginationProps) {
  function getPaginationRange() {
    const range: (number | string)[] = []

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        range.push(i)
      } else if (range[range.length - 1] !== '...') {
        range.push('...')
      }
    }
    return range
  }
  if (totalPages <= 1) return null

  return (
    <div className="flex items-center justify-center space-x-2 py-4">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1 || isLoading}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {getPaginationRange().map((page, index) =>
        page === '...' ? (
          <span key={index} className="px-2 text-slate-400">
            ...
          </span>
        ) : (
          <Button
            key={index}
            variant={currentPage === page ? 'default' : 'ghost'}
            size="sm"
            className={cn(
              'h-8 w-8 p-0',
              currentPage === page && 'pointer-events-none',
            )}
            onClick={() => onPageChange(Number(page))}
            disabled={isLoading}
          >
            {page}
          </Button>
        ),
      )}

      <Button
        variant="ghost"
        size="icon"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages || isLoading}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}
