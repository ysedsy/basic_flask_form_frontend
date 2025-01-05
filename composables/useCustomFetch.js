

export function useCustomFetch(url, method, body, options = {}) {
    if (!method) {
        method = 'GET';
    }
    const config = useRuntimeConfig().public;
    var requestOptions = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
    };
    console.log('url:', url);
    // url = new URL('/api' + url);
    // if(options.query && Object.keys(options.query).length > 0){
    //     const urlObj = new URL(url);
    //     Object.keys(options.query).forEach(key => url.searchParams.append(key, options.query[key]));
    //     url = urlObj.toString();
    // } else {
    //     url = url.toString();
    // }
    if(body){
        requestOptions = {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: body,
        };
    }
    url = url.toString();
    url = "/api" + url;
    return useFetch(url, requestOptions, {
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