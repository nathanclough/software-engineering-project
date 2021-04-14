import ApiService from './ApiService'

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

const getPosts = (id, token) => {
    return ApiService.get(`post?id=${id}`, token)
        .then( data => {
            // Get bytes from the blob url then decrypt them 
            return data
            })
}

const createPost = (values, token) => {
    return getBase64(values.upload[0].originFileObj)
        .then( dataUrl =>  ApiService.post(`Post`,token,
            // Final parameter is the buffer for the post and its description
            {
                Description : values.description,
                Bytes: dataUrl
            })) 
}

const PostService = {
    getPosts,
    createPost
}
export default PostService;