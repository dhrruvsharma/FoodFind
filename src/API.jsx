import axios from "axios";
const baseUrl = import.meta.env.VITE_BASE;
const searchUrl = import.meta.env.VITE_SEARCH;
export const Get = async (page,category,sort) => {
    try {
        const response = await axios.get(`${baseUrl}/search`,
            {
                params: {
                    'page_size': 25,
                    'fields': 'product_name,code,image_url',
                    'page': page,
                    'categories_tags': category,
                    'sort_by': sort
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
export const Search = async (query,page,category,sort) => {
    try{
        const response = await axios.get(`${searchUrl}`,{
            params: {
                'search_terms': query,
                'json':1,
                'fields': 'product_name,code,image_url',
                'page':page,
                'page_size': 25,
                'categories_tags':category,
                'sort_by': sort
            },
        })
        return {
            data: response.data.products,
            count: response.data.page_count
        };
    } catch (error) {
            throw new Error(error);
    }
}

export const FetchDetails = async (id) => {
    try{
        const response = await axios.get(`${baseUrl}/product/${id}`,{
            params: {
                'fields': 'product_name,completeness,nutrient_levels,brands,categories_tags_en,image_url,labels,ingredients_text,countries_tags_en,nutrition_grades'
            }
        })
        return response.data.product;
    } catch(error) {
        throw new Error(error);
    }
}