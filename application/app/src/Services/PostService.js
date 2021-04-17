import ApiService from './ApiService'
import CryptoJS from 'crypto-js'

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

const encryptDataUrl = (dataUrl) => {
    let re = /(.*),(.*)/
    let matches = re.exec(dataUrl)
    var encrypted = CryptoJS.AES.encrypt(matches[2], process.env.REACT_APP_PRIVATE_KEY);
    return `${matches[1]},${encrypted.toString()}`
}

const decryptDataUrl = (dataUrl) => {
    let re = /(.*),(.*)/
    let matches = re.exec(dataUrl)
    var decrypted = decrypt(matches[2]);
    return matches[1]+","+decrypted.toString()
}

const encrypt = (string ) => {
    return CryptoJS.AES.encrypt(string,process.env.REACT_APP_PRIVATE_KEY).toString()
}

const decrypt = (string) => {
    var bytes  = CryptoJS.AES.decrypt(string, process.env.REACT_APP_PRIVATE_KEY);
    var originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
}

const getPosts = (id, token) => {
    return ApiService.get(`post?id=${id}`, token)
        .then( data => {
            // Get bytes from the blob url then decrypt them 
            data.forEach(post => {
                post.description = decrypt(post.description)
                post.mediaUrl = decryptDataUrl(post.mediaUrl)  
            })
            return data
            })
}

const createPost = (values, token) => {
    
    return getBase64(values.upload[0].originFileObj)
        .then( dataUrl => {
            ApiService.post(`Post`,token,
            // Final parameter is the buffer for the post and its description
            {
                Description : encrypt(values.description),
                Bytes: encryptDataUrl(dataUrl) 
            })
        }) 
}

const PostService = {
    getPosts,
    createPost,
    decryptDataUrl
}
export default PostService;