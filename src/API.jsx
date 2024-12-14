import axios from "axios";
const baseUrl = import.meta.env.VITE_BASE;
const searchUrl = import.meta.env.VITE_SEARCH;
export const Get = async (page,category) => {
    try {
        const response = await axios.get(`${baseUrl}/search`,
            {
                params: {
                    'page_size': 25,
                    'fields': 'product_name,code,image_url',
                    'page': page,
                    'categories_tags': category
                }
            }
        );
        return {
            data: response.data.products,
            count: response.data.page_count
        };
    } catch (error) {
        throw new Error(error)
    }
}
export const Search = async (query,page,category) => {
    try{
        const response = await axios.get(`${searchUrl}`,{
            params: {
                'search_terms': query,
                'json':1,
                'fields': 'product_name,code,image_url',
                'page':page,
                'page_size': 25,
                'categories_tags':category
            }
        })
        return {
            data: response.data.products,
            count: response.data.page_count
        };
    } catch (error) {
        throw new Error(error);
    }
}