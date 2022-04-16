import { TagObject } from "./TagObject";

export interface ImageObject {
    imageId?: number;
    imageUrl: string;
    imageLocation?: string;
    tags: TagObject[];
}