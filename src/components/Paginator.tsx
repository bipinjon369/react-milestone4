import ReactPaginate from 'react-paginate'
import { ChevronLeft, ChevronRight } from 'lucide-react' // Optional: icon library

type PaginatorProps = {
  pageCount: number
  onPageChange: (selected: number) => void
  currentPage: number
}

export default function Paginator({
  pageCount,
  onPageChange,
  currentPage,
}: PaginatorProps) {
  return (
    <div className="relative w-full border-t border-t-[#E5E9EB] pt-3 pb-4">
      <ReactPaginate
        breakLabel="..."
        nextLabel={
          <span className="flex items-center gap-1">
            Next <ChevronRight size={16} />
          </span>
        }
        previousLabel={
          <span className="flex items-center gap-1">
            <ChevronLeft size={16} /> Previous
          </span>
        }
        onPageChange={({ selected }) => onPageChange(selected)}
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        pageCount={pageCount}
        forcePage={currentPage}
        containerClassName="flex justify-center items-center gap-2 relative"
        pageClassName="rounded-[8px] text-sm w-10 h-10 flex items-center justify-center hover:bg-gray-100"
        activeClassName="text-[#4094F7] font-medium bg-[#F5F9FF]"
        breakClassName="text-gray-500 px-1"
        previousClassName="absolute left-0 border border-[#D0D5DD] rounded-md text-sm px-3 py-1 text-gray-700 hover:bg-gray-100"
        nextClassName="absolute right-0 border border-[#D0D5DD] rounded-md text-sm px-3 py-1 text-gray-700 hover:bg-gray-100"
        disabledClassName="opacity-50 cursor-not-allowed"
      />
    </div>
  )
}
