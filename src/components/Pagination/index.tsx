import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationProps {
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function PaginationComponent({
    page,
    totalPages,
    onPageChange,
}: Readonly<PaginationProps>) {
    const renderPaginationItems = () => {
        const maxPageButtons = 3;
        const pages = [];

        let startPage = Math.max(1, page - Math.floor(maxPageButtons / 2));
        let endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

        if (endPage - startPage < maxPageButtons - 1) {
            startPage = Math.max(1, endPage - maxPageButtons + 1);
        }

        if (startPage > 1) {
            pages.push(
                <PaginationItem key={1}>
                    <PaginationLink onClick={() => onPageChange(1)}>
                        1
                    </PaginationLink>
                </PaginationItem>
            );

            if (startPage > 2) {
                pages.push(
                    <PaginationItem key="ellipsis-start">
                        <PaginationEllipsis />
                    </PaginationItem>
                );
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <PaginationItem key={i}>
                    <PaginationLink
                        onClick={() => onPageChange(i)}
                        isActive={i === page}
                    >
                        {i}
                    </PaginationLink>
                </PaginationItem>
            );
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                pages.push(
                    <PaginationItem key="ellipsis-end">
                        <PaginationEllipsis />
                    </PaginationItem>
                );
            }

            pages.push(
                <PaginationItem key={totalPages}>
                    <PaginationLink onClick={() => onPageChange(totalPages)}>
                        {totalPages}
                    </PaginationLink>
                </PaginationItem>
            );
        }

        return pages;
    };
    return (
        <Pagination>
            <PaginationContent>
                {page > 1 && (
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={(e) => {
                                e.preventDefault();
                                onPageChange(page - 1);
                            }}
                        />
                    </PaginationItem>
                )}
                {renderPaginationItems()}
                {page < totalPages && (
                    <PaginationItem>
                        <PaginationNext
                            onClick={(e) => {
                                e.preventDefault();
                                onPageChange(page + 1);
                            }}
                        />
                    </PaginationItem>
                )}
            </PaginationContent>
        </Pagination>
    );
}
