export interface Welcome {
   id: number;
   attributes: DataAttributes;
}

export interface DataAttributes {
   title: string;
   createdAt: Date;
   updatedAt: Date;
   publishedAt: Date;
   buble: Bubble;
}

export interface Bubble {
   data: Datum[];
}

export interface Datum {
   id: number;
   attributes: DatumAttributes;
}

export interface DatumAttributes {
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

export interface Meta {}
