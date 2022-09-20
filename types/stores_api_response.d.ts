export interface Stores {
   data: Store[];
   meta: Meta;
}

export interface Store {
   id: number;
   attributes: StoreAttributes;
}

export interface StoreAttributes {
   createdAt: Date;
   updatedAt: Date;
   publishedAt: Date;
   city: string;
   location: string;
   media: Media;
}

export interface Media {
   data: Data;
}

export interface Data {
   id: number;
   attributes: DataAttributes;
}

export interface DataAttributes {
   name: string;
   alternativeText: string;
   caption: string;
   width: number;
   height: number;
   formats: Formats;
   hash: string;
   ext: string;
   mime: string;
   size: number;
   url: string;
   previewUrl: null;
   provider: string;
   provider_metadata: null;
   createdAt: Date;
   updatedAt: Date;
}

export interface Formats {
   thumbnail: Thumbnail;
}

export interface Thumbnail {
   name: string;
   hash: string;
   ext: string;
   mime: string;
   path: null;
   width: number;
   height: number;
   size: number;
   url: string;
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
