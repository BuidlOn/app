/**
 * Standard API envelope returned by the BuidlOn backend.
 * The frontend never invents these shapes — they mirror the backend contract.
 */
export interface ApiSuccess<T> {
  success: true;
  message: string;
  data: T;
}

export interface ApiFailure {
  success: false;
  message: string;
  errors: string[];
}

export type ApiResponse<T> = ApiSuccess<T> | ApiFailure;

export interface Paginated<T> {
  items: T[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}
