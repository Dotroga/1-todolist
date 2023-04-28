import axios from 'axios'
import {ListColorType} from "../Types";
const instance = axios.create({
    baseURL: 'http://localhost:3001/',
})
export const listsColorAPI = {
    getListsColor() {
        return instance.get('listsColor')
            .then((data):ColorListTypeFromDB[]=> data.data)
    },
    createListColor(obj: ListColorType) {
        return instance.post('listsColor', obj)

    }
}

type ColorListTypeFromDB = {id: number, color: string, listId: string }