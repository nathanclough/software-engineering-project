import ApiService from './ApiService'

const PostAccount = (content) => {
    return ApiService.post("Accounts?", null, content);
}

const GetAccounts = (username, token) => {
    return ApiService.get(`Accounts?username=${username}`, token)
}

const GetAccount = (id, token) => {
    return ApiService.get(`Accounts/${id}`, token)
}

const GetAccountCircle = (id, token) => {
    return ApiService.get(`Accounts/Circle?id=${id}`, token)
}

const AccountService = { 
    PostAccount,
    GetAccounts,
    GetAccount,
    GetAccountCircle
}
export default AccountService