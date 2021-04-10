import ApiService from './ApiService'

const login = (content) =>{
    return ApiService.post("login?", null, content)
}

const LoginService = {login}

export default LoginService;