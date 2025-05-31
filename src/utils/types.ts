export interface SearchError {
    message: string;
}

export interface BrandsResponse {
    success: boolean;
    message: string;
    status: number;
    data: {
        current_page: number;
        data: Brand[]; 
        total: number;
        per_page: number;
        last_page: number;
    };
}

export interface ContentsResponse {
    success: boolean;
    message: string;
    status: number;
    data: {
        current_page: number;
        data: Content[]; 
        total: number;
        per_page: number;
        last_page: number;
    };
}

export interface Category {
    id: string;
    name_mm: string;
    name_en: string;
    created_at: string;
    updated_at: string;
    pivot: {
        brand_id: string;
        category_id: string;
    };
}

export interface Content {
    id: string;
    title: string;
    content: string;
    description: string;
    slug: string;
    created_at: string;
    updated_at: string;
    display_url: string;
    categories: Category[];
    keywords: Keyword[];
    brand: any
}


export interface Product {
    id: string;
    brand_id: string;
    name: string;
    description: string;
    slug: string;
    created_at: string;
    updated_at: string;
}

export interface Brand {
    id: string;
    priority: number;
    name: string;
    slug: string;
    description: string;
    created_at: string;
    updated_at: string;
    categories: Category[];
    products: Product[];
    contents: Content[];
}

export interface Keyword {
    id: string;
    name: string;
    created_at: string;
    updated_at: string;
}

export interface SearchResponse {
    success: boolean;
    message: string;
    status: number;
    data: {
        current_page: number;
        data: Brand[]; // This is the array of brands
        total: number;
        per_page: number;
        last_page: number;
    };
}

export interface FilterInitialValue {
    q: string;
    take: number;
    page?: number; // Optional for pagination
}

export interface DetailResponse {
    data: Content
}

export interface DetailError {
    message: ""
}

export interface Trend {
    id: string;
    content_id: string,
    content_contract_id: string,
    priority: number,
    content: Content
}

export interface TrendResponse {
    data: Trend[];
}

export interface TrendError {
    message: string;
}