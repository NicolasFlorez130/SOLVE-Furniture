export interface HomeContent {
   title: string;
   createdAt: Date;
   updatedAt: Date;
   publishedAt: Date;
   bubblesTitle: string;
   background: Background;
   highlight: Highlight;
   bubble: Bubble;
   bubblesBackground: Background;
}

export interface Background {
   data: BackgroundData;
}

export interface BackgroundData {
   id: number;
   attributes: FluffyAttributes;
}

export interface FluffyAttributes {
   name: string;
   alternativeText: string;
   caption: string;
   width: number;
   height: number;
   formats: PurpleFormats;
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

export interface PurpleFormats {
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

export interface Bubble {
   data: Bubble_Data[];
}

export interface Bubble_Data {
   id: number;
   attributes: DatumAttributes;
}

export interface DatumAttributes {
   name: string;
   alternativeText: string;
   caption: string;
   width: number;
   height: number;
   formats: FluffyFormats;
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

export interface FluffyFormats {
   thumbnail: Large;
   small: Large;
}

export interface Highlight {
   id: number;
   label: string;
   text: string;
}

export interface Meta {}
