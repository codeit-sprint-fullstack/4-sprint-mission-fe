import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://sprint-mission-api.vercel.app',
    timeout: 3000
});

export function getArticleList(page = 1, pageSize = 10, keyword = "") {
    instance.get(`/articles/?page=${page}&pageSize=${pageSize}&keyword=${keyword}`)
        .then(res => {
            if (res.status >= 200 && res.status < 300) {
                console.log('Result:', res.data);
                return res.data;
            } else {
                console.error(`Error: Received status code ${res.status}`);
                console.error('Error Data:', res.data);
            }
        })
        .catch(err => {
            if (err.response) {
                if (err.response.status >= 200 && err.response.status < 300) {
                    console.log('Result:', err.response.data);
                } else {
                    console.error(`Error: ${err.response.status}`);
                    console.error('Error Data:', err.response.data);
                }
            } else {
                console.error('Error Message:', err.message);
            }
        });
}

export function getArticle(id) {
    instance.get(`/articles/${id}`)
        .then(res => {
            if (res.status >= 200 && res.status < 300) {
                console.log('Result:', res.data);
                return res.data;
            } else {
                console.error(`Error: Received status code ${res.status}`);
                console.error('Error Data:', res.data);
            }
        })
        .catch(err => {
            if (err.response) {
                if (err.response.status >= 200 && err.response.status < 300) {
                    console.log('Result:', err.response.data);
                } else {
                    console.error(`Error: ${err.response.status}`);
                    console.error('Error Data:', err.response.data);
                }
            } else {
                console.error('Error Message:', err.message);
            }
        });
}

export function createArticle(requestData) {
    instance.post('/articles', requestData)
        .then(res => {
            if (res.status >= 200 && res.status < 300) {
                console.log('Result:', res.data);
                return res.data;
            } else {
                console.error(`Error: Received status code ${res.status}`);
                console.error('Error Data:', res.data);
            }
        })
        .catch(err => {
            if (err.response) {
                console.error(`Error Status: ${err.response.status}`);
                console.error('Error Data:', err.response.data);
            } else {
                console.error('Error Message:', err.message);
            }
        });
}

export function patchArticle(id, requestData) {
    instance.patch(`/articles/${id}`, requestData)
        .then(res => {
            if (res.status >= 200 && res.status < 300) {
                console.log('Result:', res.data);
                return res.data;
            } else {
                console.error(`Error: Received status code ${res.status}`);
                console.error('Error Data:', res.data);
            }
        })
        .catch(err => {
            if (err.response) {
                console.error(`Error Status: ${err.response.status}`);
                console.error('Error Data:', err.response.data);
            } else {
                console.error('Error Message:', err.message);
            }
        });
}

export function deleteArticle(id) {
    instance.delete(`/articles/${id}`)
        .then(res => {
            if (res.status >= 200 && res.status < 300) {
                console.log('Result:', res.data);
                return res.data;
            } else {
                console.error(`Error: Received status code ${res.status}`);
                console.error('Error Data:', res.data);
            }
        })
        .catch(err => {
            if (err.response) {
                console.error(`Error Status: ${err.response.status}`);
                console.error('Error Data:', err.response.data);
            } else {
                console.error('Error Message:', err.message);
            }
        });
}


