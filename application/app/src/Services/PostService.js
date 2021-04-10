import ApiService from './ApiService'

const getPosts = (id, token) => {
    return ApiService.get(`post?id=${id}`, token)
}

const PostService = {
    getPosts
}
export default PostService;