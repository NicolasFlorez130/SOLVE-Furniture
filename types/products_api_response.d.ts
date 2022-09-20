export interface Products {
   data: Product[];
   meta: Meta;
}

export interface Product {
   id: number;
   attributes: ProductAttributes;
}

export interface ProductAttributes {
   name: string;
   price: number;
   description_small: string;
   createdAt: Date;
   updatedAt: Date;
   publishedAt: Date;
   featured: boolean | null;
   image: Image;
   description_detailed: DescriptionDetailed;
   category: Category;
}

export interface Category {
   data: CategoryData;
}

export interface CategoryData {
   id: number;
   attributes: PurpleAttributes;
}

export interface PurpleAttributes {
   name: string;
   createdAt: Date;
   updatedAt: Date;
   publishedAt: Date;
}

export interface DescriptionDetailed {
   id: number;
   label: string;
   text: string;
}

export interface Image {
   data: ImageData;
}

export interface ImageData {
   id: number;
   attributes: FluffyAttributes;
}

export interface FluffyAttributes {
   name: string;
   alternativeText: string;
   caption: string;
   width: number;
   height: number;
   formats: Formats;
   hash: string;
   ext: EXT;
   mime: MIME;
   size: number;
   url: string;
   previewUrl: null;
   provider: string;
   provider_metadata: null;
   createdAt: Date;
   updatedAt: Date;
}

export enum EXT {
   PNG = '.png',
}

export interface Formats {
   thumbnail: Small;
   small: Small;
}

export interface Small {
   name: string;
   hash: string;
   ext: EXT;
   mime: MIME;
   path: null;
   width: number;
   height: number;
   size: number;
   url: string;
}

export enum MIME {
   ImagePNG = 'image/png',
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
