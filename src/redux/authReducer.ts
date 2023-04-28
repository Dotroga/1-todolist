import { Dispatch } from 'redux'
import {LoginType} from "../Components/Login/Login";
import {authAPI} from "../api/todoAPI";
import {log} from "util";


const initialState = {
    isLoggedIn: false
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}

export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)

export const initializeAppTC = () => (dispatch: Dispatch<ActionsType>) => {
    authAPI.me()
        .then(res => {
            res.data.resultCode === 0
                ? dispatch(setIsLoggedInAC(true))
                : console.log('error')
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
