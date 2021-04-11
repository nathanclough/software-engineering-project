// This file defines how we interact with the API 

const handleError = data => console.log(data); 


const post = (resource, token, content) => {
    // Encryption of content will happen here 

    return fetch(`${process.env.REACT_APP_API_URL}${resource}`,
        {
            method: 'POST',
            headers:{ 
                 'Content-Type': 'application/json',
                 'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(content)
        })
        .then(data =>{ 
            data = data.json()

            return data;  
        })
        .catch(handleError)
}

const get = (resource, token) => {
    return fetch(`${process.env.REACT_APP_API_URL}${resource}`,
        {
            method: 'GET',
            headers:{ 
                 'Content-Type': 'application/json',
                 'Authorization': `Bearer ${token}`
            },
        })
        .then(data =>{ 
            data = data.json() 
            return data;
        })
        .catch(handleError)
}

const ApiService = {
    post,
    get
}

export default ApiService