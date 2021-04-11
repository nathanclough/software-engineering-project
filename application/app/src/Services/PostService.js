import ApiService from './ApiService'

const getPosts = (id, token) => {
    return ApiService.get(`post?id=${id}`, token)
        .then( data => {
            // Get bytes from the blob url then decrypt them 
            })
}

const PostService = {
    getPosts
}
export default PostService;