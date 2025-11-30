import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationEllipsis, PaginationLink, PaginationNext } from "@/shared/components";
import { memo, useMemo, useCallback } from "react";
import { VISIBLE_PAGES_LIMIT, SIBLING_COUNT } from "../../../features/catalog/get-catalog-games/model/const";
import { ICustomPaginationProps } from "./interfaces";
import { range } from "./hooks";

export const CustomPagination = memo((props: ICustomPaginationProps) => {
    const {
        totalPages,
        setPage,
        currentPage = 1, 
    } = props;

    if (totalPages <= 1) {
        return null;
    }

    const paginationRange = useMemo(() => {
        const totalNumbers = VISIBLE_PAGES_LIMIT + SIBLING_COUNT + 2; 

        if (totalNumbers >= totalPages) {
            return range(1, totalPages);
        }

        const startPage = Math.max(2, currentPage - SIBLING_COUNT);
        const endPage = Math.min(totalPages - 1, currentPage + SIBLING_COUNT);

        const shouldShowLeftEllipsis = startPage > 2;
        const shouldShowRightEllipsis = endPage < totalPages - 1;

        if (!shouldShowLeftEllipsis && shouldShowRightEllipsis) {
            const leftItemCount = VISIBLE_PAGES_LIMIT - 2;
            const end = 1 + leftItemCount - 1;
            return [...range(1, end), '...', totalPages];
        }

        if (shouldShowLeftEllipsis && !shouldShowRightEllipsis) {
            const rightItemCount = VISIBLE_PAGES_LIMIT - 2;
            const start = totalPages - rightItemCount + 1;
            return [1, '...', ...range(start, totalPages)];
        }

        if (shouldShowLeftEllipsis && shouldShowRightEllipsis) {
            return [1, '...', ...range(startPage, endPage), '...', totalPages];
        }
        
        return range(1, totalPages); 
    }, [totalPages, currentPage]);

    const onNext = useCallback(() => {
        if (currentPage < totalPages) {
            setPage(currentPage + 1);
        }
    }, [currentPage, totalPages, setPage]);

    const onPrevious = useCallback(() => {
        if (currentPage > 1) {
            setPage(currentPage - 1);
        }
    }, [currentPage, setPage]);

    const handlePageClick = useCallback((page: number) => {
        setPage(page);
    }, [setPage]);

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious 
                        onClick={onPrevious} 
                        className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''} 
                    />
                </PaginationItem>

                {paginationRange.map((page, index) => {
                    if (page === '...') {
                        return <PaginationItem key={index}>
                            <PaginationEllipsis />
                        </PaginationItem>;
                    }

                    const pageNumber = page as number;
                    return (
                        <PaginationItem key={index}>
                            <PaginationLink
                                onClick={() => handlePageClick(pageNumber)}
                                isActive={pageNumber === currentPage}
                            >
                                {pageNumber}
                            </PaginationLink>
                        </PaginationItem>
                    );
                })}

                <PaginationItem>
                    <PaginationNext 
                        onClick={onNext} 
                        className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''} 
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
});