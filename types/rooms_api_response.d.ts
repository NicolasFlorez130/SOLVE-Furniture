export interface Rooms {
   data: Room[];
   meta: Meta;
}

export interface Room {
   id: number;
   attributes: RoomAttributes;
}

export interface RoomAttributes {
   place: string;
   createdAt: Date;
   updatedAt: Date;
   publishedAt: Date;
   description: string;
   image: Image;
   details: Details;
}

export interface Details {
   id: number;
   label: string;
   text: string;
}

export interface Image {
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
   thumbnail: Large;
   small: Large;
   medium: Large;
   large: Large;
}

export interface Large {
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
