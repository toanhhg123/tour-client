import { Button } from '@/components/ui/button'
import useNavigateParams from '@/hooks/useNavigateParams'
import { Table } from '@tanstack/react-table'
import {
    ArrowLeft,
    ArrowLeftToLineIcon,
    ArrowRight,
    ArrowRightToLineIcon,
} from 'lucide-react'
import { useState } from 'react'

interface DataTablePaginationProps<TData> {
    table: Table<TData>
}

export function DataTablePagination<TData>({
    table,
}: DataTablePaginationProps<TData>) {

    const { navigate, record } = useNavigateParams(['keyword', 'type', 'pageIndex'])

    const [pageIndex, setPageIndex] = useState(1)

    const updatePageIndex = (newIndex: number) => {
        setPageIndex(newIndex);
        navigate({ ...record, pageIndex: newIndex.toString() });
    };

    const handleNextPage = () => updatePageIndex(pageIndex + 1);
    const handlePrevPage = () => updatePageIndex(pageIndex - 1);
    const handleFirstPage = () => updatePageIndex(1);
    const handleLastPage = () => updatePageIndex(table.getPageCount());

    const getCanNextPage = () => pageIndex < table.getPageCount();
    const getCanPrevPage = () => pageIndex > 1;

    return (
        <div className="flex items-center justify-between px-2">
            <div className="flex-1 text-sm text-muted-foreground">
                {table.getFilteredSelectedRowModel().rows.length} of{' '}
                {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
            <div className="flex items-center space-x-6 lg:space-x-8">
                <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                    Page {pageIndex} of{' '}
                    {table.getPageCount()}
                </div>
                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        className="hidden h-8 w-8 p-0 lg:flex"
                        onClick={() => handleFirstPage()}
                        disabled={!getCanPrevPage()}
                    >
                        <span className="sr-only">Go to first page</span>
                        <ArrowLeftToLineIcon className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={() => handlePrevPage()}
                        disabled={!getCanPrevPage()}
                    >
                        <span className="sr-only">Go to previous page</span>
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={() => handleNextPage()}
                        disabled={!getCanNextPage()}
                    >
                        <span className="sr-only">Go to next page</span>
                        <ArrowRight className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        className="hidden h-8 w-8 p-0 lg:flex"
                        onClick={() => handleLastPage()}
                        disabled={!getCanNextPage()}
                    >
                        <span className="sr-only">Go to last page</span>
                        <ArrowRightToLineIcon className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    )
}