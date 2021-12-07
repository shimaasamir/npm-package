export interface IResponse<T extends {}> {
  status: boolean;
  data: T;
  message: string;
}
