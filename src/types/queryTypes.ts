export interface QueryRequest {
    sql: string;
    queue: string;
  }
  
  export interface QueryResult {
    rows: Record<string, any>[];
  }
  
  export interface QueryRowsResponse {
    results: QueryResult[];
  }
  
  export interface QueryTuplesResult {
    columns: Record<string, any>[];
  }
  
  export interface QueryTuplesResponse {
    results: QueryTuplesResult[];
  }
  