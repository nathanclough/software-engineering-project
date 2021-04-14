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
    return matches[2]+encrypted.toString()
    // var EC = require('elliptic').ec
    // var ec = new EC('curve25519');
    
    // Generate keys
    // var key1 = ec.genKeyPair();
    // var key2 = ec.genKeyPair();

    // var shared1 = key1.derive(key2.getPublic());
    // var shared2 = key2.derive(key1.getPublic());

    // console.log('Both shared secrets are BN instances');
    // console.log(shared1.toString(16));
    // console.log(shared2.toString(16));

    // var pair = ec.genKeyPair();
    // var privateKey = pair.getPrivate()
    // console.log("private:" + privateKey.toString('hex'))

    // var publicKey = pair.getPublic()
    // console.log("public:" + publicKey.toString('hex'))
}

const decryptDataUrl = (dataUrl) => {
    let re = /(.*),(.*)/
    let matches = re.exec(dataUrl)
    var decrypted = decrypt(matches[2]);
    return matches[1]+decrypted.toString()
}

const encrypt = (string ) => {
    var e =  CryptoJS.AES.encrypt(string,process.env.REACT_APP_PRIVATE_KEY).toString()
    console.log("Encrypted:" + e)
    console.log("Decrypted:" + decrypt(e))
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
    createPost
}
export default PostService;