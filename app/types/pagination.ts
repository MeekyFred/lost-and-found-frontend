export interface Pagination {
  total: number;
  pages: number;
  page: number;
  limit: number;
  relations?: string | undefined;
}
