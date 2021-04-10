import ApiService from './ApiService'

const GetRequests = (token) =>{
    return ApiService.get(`Request`,token)
}

const SendRequest = (request, token) => {
    return ApiService.post(`Request`,token,request);
}

const RespondToRequest = (requestId, response, token) => {
    return ApiService.post(`Request/respond?requestID=${requestId}&status=${response}`,token)
}

const RequestService = {
    GetRequests,
    SendRequest,
    RespondToRequest
}
export default RequestService;