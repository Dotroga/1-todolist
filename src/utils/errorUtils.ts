import { Dispatch } from 'redux'
import axios, {AxiosError} from "axios";
import {appActions} from "../redux/app.reducer";
import {ResponseType} from '../api/instanse'


export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch) => {
  if (data.messages.length) {
    dispatch(appActions.setErrorSnackbar({error: data.messages[0]}))
  } else {
    dispatch(appActions.setErrorSnackbar({error: 'Some error occurred'}))
  }
  // dispatch(appActions.setAppStatus({status: 'failed'}))
}

export const handleServerNetworkError = (e: unknown, dispatch: Dispatch) => {
  const err = e as Error | AxiosError<{ error: string }>
  if (axios.isAxiosError(err)) {
    const error = err.message ? err.message : 'Some error occurred'
    dispatch(appActions.setErrorSnackbar({error}))
  } else {
    dispatch(appActions.setErrorSnackbar({error: `Native error ${err.message}`}))
  }
  // dispatch(appActions.setAppStatus({status: 'failed'}))
}
