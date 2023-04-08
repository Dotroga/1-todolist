import axios from 'axios'
import {ListColorType} from "../Types";
const instance = axios.create({
    baseURL: 'http://localhost:3001/',
})
export const listsColorAPI = {
    getListsColor()  {
        return instance.get('listsColor')
    },
    createListColor(obj: ListColorType) {
        return instance.post('listsColor', obj)
    }

}