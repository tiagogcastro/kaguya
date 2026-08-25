export type ApiError = {
  messages: string[];
  name: string;
  statusCode: number;
}

export function apiError(error: any): ApiError {
  const status = error?.response?.status || 400;
  const data = error?.response?.data;

  const message =
    data?.error?.message ||
    data?.message ||
    error?.message ||
    'Unexpected error';

  return {
    messages: [message],
    name: 'Error',
    statusCode: status,
  };
}
