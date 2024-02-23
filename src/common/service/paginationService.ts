import { PaginationRequest } from "../validation/paginationRequest.validation";

interface PaginationResult {
    totalItems: number;
    pages: number;
    limit: number;
    currentPage: number;
    hasNext: boolean;
    hasPrevious: boolean;
  }

export const  getPaginationResult = (
    total: number,
    paginationRequest?: PaginationRequest
  ): PaginationResult => {
    const { skip, limit } = getPageOption(paginationRequest);
  
    const pages = Math.ceil(total / limit);
    const currentPage = skip / limit + 1;
    const hasNext = currentPage < pages;
    const hasPrevious = currentPage > 1;
  
    return {
      totalItems: total,
      pages,
      limit,
      currentPage: paginationRequest?.page || 1,
      hasNext,
      hasPrevious,
    };
  };
  
  export const getPageOption = (opt?: PaginationRequest): { skip: number; limit: number } => {
    const take = opt?.limit || 20;
    return {
      limit: take,
      skip: opt?.page ? (opt.page - 1) * take : 0,
    };
  };