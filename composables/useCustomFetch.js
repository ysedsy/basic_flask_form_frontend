import { ref } from 'vue';

export function useCustomFetch(url, method, body, options = {}) {
    const config = useRuntimeConfig();
    var requestOptions = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        }
    };
    url = new URL(config.backendURL + url);
    if(options.query && Object.keys(options.query).length > 0){
        const urlObj = new URL(url);
        Object.keys(options.query).forEach(key => url.searchParams.append(key, options.query[key]));
        url = urlObj.toString();
    } else {
        url = url.toString();
    }
    if(body){
        requestOptions = {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: body,
        };
    }
    return useCustomFetch(url, requestOptions, {
        options,
        async onResponseError({request,response,options}){
            console.error('Error fetching data:', response);
        },
        async onResponse({request,response,options}){
            return response.data;
        },
        async onRequestError({request,error,options}){
            console.error('Error fetching data:', error);
        },
    });
}