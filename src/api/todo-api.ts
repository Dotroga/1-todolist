import axios from 'axios'
const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
})
export const todoApi = {
    getLists()  {
       return instance.get<ListType[]>('todo-lists')
    },
    createList(title: string) {
        return instance.post<ResponseType<{item: ListType}>>('todo-lists', {title})
    },
    updateList(listId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists${listId}`,{title})
    },
    deleteList(listId: string) {
        return instance.delete<ResponseType>(`todo-lists/${listId}`)
    },
    getTasks(listId: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${listId}/tasks`)
    },
    createTask(listId: string, title: string) {
        return instance.post(`todo-lists/${listId}/tasks`, {title})
    }
}

type ListType = {
    id: string
    title: string
    addedDate: string
    order: number
}
type ResponseType<T = {}> = {
    resultCode: number
    fieldsErrors: string[]
    messages: string[]
    data: T
}
type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}



 export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: string
    priority: string
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate:  string
}