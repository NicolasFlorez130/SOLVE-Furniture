export interface Categories {
   data: Category[];
   meta: Meta;
}

export interface Category {
   id: number;
   attributes: Attributes;
}

export interface Attributes {
   name: string;
   createdAt: Date;
   updatedAt: Date;
   publishedAt: Date;
}

export interface Meta {
   pagination: Pagination;
}

export interface Pagination {
   page: number;
   pageSize: number;
   pageCount: number;
   total: number;
}
