import { Dispatch } from 'redux'
import {LoginType} from "../Components/Login/Login";
import {authAPI} from "../api/todoAPI";
import {log} from "util";


const initialState = {
    isLoggedIn: false,
    isInitialized: false
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        case 'login/SET-IS-INITIALIZED':
            return {...state, isInitialized: action.value}
        default:
            return state
    }
}

export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)
export const setIsInitializedAC = (value: boolean) =>
    ({type: 'login/SET-IS-INITIALIZED', value} as const)

export const initializeAppTC = () => (dispatch: Dispatch<ActionsType>) => {
    authAPI.me()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true))
            } else {
                console.log('error')
            }
        })
        .finally(()=>{
            dispatch(setIsInitializedAC(true))
        })


}
export const loginTC = (data: LoginType) => (dispatch: Dispatch<ActionsType>) => {
    authAPI.login(data)
        .then(res => {
            res.data.resultCode === 0
            ? dispatch(setIsLoggedInAC(true))
                : console.log('error')
        })

}

// types
type ActionsType = ReturnType<typeof setIsLoggedInAC>
    | ReturnType<typeof setIsInitializedAC>
