export interface ApiResponse<DataType> {
  message?: string;
  data?: DataType;
}

export interface PaginatedResponse<DataType> extends ApiResponse<DataType[]> {
  total: number;
  pageSize: number;
  page: number;
}
