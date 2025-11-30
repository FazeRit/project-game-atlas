export interface ICustomPaginationProps {
    currentPage: number;
    totalPages: number;
    setPage: (page: number) => void;
}