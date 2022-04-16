import { ImageObject } from "./imageObject";

export interface TagObject {
    tagId?: number;
    tagName: string;
    tagType: string;
    images?: ImageObject; 
}