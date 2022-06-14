import axios from 'axios';
import { AppThunk } from 'store';
import { HTTP_RESPONSE_STATUS_CODES as STATUS_CODES } from 'api/constants/httpResponseStatusCodes';
import { actions } from './notifications';

const DEFAULT_ERROR_CODE = STATUS_CODES['Internal Server Error'];

const { notify } = actions;

export const notifyOnNetworkError = (
  message: string,
  error: unknown
): AppThunk => {
  return (dispatch) => {
    const code =
      axios.isAxiosError(error) && error.response?.status
        ? error.response.status
        : DEFAULT_ERROR_CODE;

    const errorTypeMessage =
      STATUS_CODES[code] || STATUS_CODES[DEFAULT_ERROR_CODE];

    dispatch(
      notify({
        message: `We couldn’t ${message} (${errorTypeMessage})`,
        variant: 'error',
      })
    );
  };
};
