
import { Dispatch } from 'redux'
import {appActions} from "redux/app.reducer";
import {ResponseType} from "api/todoAPI";


export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch) => {
  if (data.messages.length) {
    dispatch(appActions.setErrorSnackbar({error: data.messages[0]}))
  } else {
    dispatch(appActions.setErrorSnackbar({error: 'Some error occurred'}))
  }
  // dispatch(appActions.setAppStatus({status: 'failed'}))
}

export const handleServerNetworkError = (error: { message: string }, dispatch: Dispatch) => {
  dispatch(appActions.setErrorSnackbar({error: error.message ? error.message : 'Some error occurred'}))
  // dispatch(appActions.setAppStatus({status: 'failed'}))
}
