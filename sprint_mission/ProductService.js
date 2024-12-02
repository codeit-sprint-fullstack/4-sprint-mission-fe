import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://sprint-mission-api.vercel.app',
    timeout: 3000
});

export async function getProductList(page = 1, pageSize = 10, keyword = "") {
    try {
        const res = await instance.get(
            `/products/?page=${page}&pageSize=${pageSize}&keyword=${keyword}`
        );
        if (res.status >= 200 && res.status < 300) {
            console.log('Result:', res.data);
            return res.data;
        } else {
            console.error(`Error: Received status code ${res.status}`);
            console.error('Error Data:', res.data);
        }
    } catch (err) {
        if (err.status >= 200 && err.status < 300) {
            console.log('Result:', err.data);
        } else {
            console.error(`Error: ${err.status}`);
            console.error('Error data:', err.data);
        }
    }
}

export async function getProduct(id) {
    try {
        const res = await instance.get(
            `/products/${id}`
        );

        if (res.status >= 200 && res.status < 300) {
            console.log('Result:', res.data);
            return res.data;
        } else {
            console.error(`Error: Received status code ${res.status}`);
            console.error('Error Data:', res.data);
        }
    } catch (err) {
        if (err.status >= 200 && err.status < 300) {
            console.log('Result:', err.data);
            console.log(err)
        } else {
            console.error(`Error: ${err.status}`);
            console.error('Error data:', err.data);
        }
        console.log(err)
    }
}

export async function createProduct(requestData) {
    try {
        const res = await instance.post(
            '/products',
            requestData
        );

        if (res.status >= 200 && res.status < 300) {
            console.log('Result:', res.data);
            return res.data;
        } else {
            console.error(`Error: Received status code ${res.status}`);
            console.error('Error Data:', res.data);
        }
    } catch (err) {
        if (err.response) {
            console.error(`Error Status: ${err.response.status}`);
            console.error('Error Data:', err.response.data);
        } else {
            console.error('Error Message:', err.message);
        }
    }
}


export async function patchProduct(id, requestData) {
    try {
        const res = await instance.patch(
            `/products/${id}`,
            requestData
        );

        if (res.status >= 200 && res.status < 300) {
            console.log('Result:', res.data);
            return res.data;
        } else {
            console.error(`Error: Received status code ${res.status}`);
            console.error('Error Data:', res.data);
        }
    } catch (err) {
        if (err.response) {
            console.error(`Error Status: ${err.response.status}`);
            console.error('Error Data:', err.response.data);
        } else {
            console.error('Error Message:', err.message);
        }
    }
}

export async function deleteProduct(id) {
    try {
        const res = await instance.delete(
            `/products/${id}`
        );

        if (res.status >= 200 && res.status < 300) {
            console.log('Result:', res.data);
            return res.data;
        } else {
            console.error(`Error: Received status code ${res.status}`);
            console.error('Error Data:', res.data);
        }
    } catch (err) {
        if (err.response) {
            console.error(`Error Status: ${err.response.status}`);
            console.error('Error Data:', err.response.data);
        } else {
            console.error('Error Message:', err.message);
        }
    }
}