import ApiService from "./ApiService"

const createMessage = (values,token) =>{
    return ApiService.post(`message`,token,values)
}

const getMessages = (id,token) =>{
    console.log(id)
    return ApiService.get(`message?id=${id}`,token)
}

const MessageService = {
    createMessage,
    getMessages
}

export default MessageService