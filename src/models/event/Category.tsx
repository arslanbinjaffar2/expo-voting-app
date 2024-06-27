export interface Category {
    id: number;
    event_id: number;
    parent_id: number;
    color: string;
    sort_order: number;
    status: number;
    cat_type: string;
    created_at: string;
    updated_at: string;
    deleted_at: string;
    name: string;
    children?: Category[];
    subcategories_count?: number | undefined;
    speaker_count?: number | undefined;
}