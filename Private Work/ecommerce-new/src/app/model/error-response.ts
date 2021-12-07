export interface IErrorResponse {
  message: string;
  errors: { [prop: string]: '' }[];
  status: boolean;
}
