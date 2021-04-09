import ApiService from './ApiService'

const login = (content) =>{
    return ApiService.post("login?", null, content)
}

export default {
    login
}