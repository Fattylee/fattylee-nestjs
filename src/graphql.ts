
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class NewVideoInput {
    title: string;
    url?: string;
    authorId: string;
}

export abstract class IQuery {
    abstract name(): string | Promise<string>;

    abstract users(): User[] | Promise<User[]>;

    abstract videos(): Video[] | Promise<Video[]>;

    abstract video(id: string): Video | Promise<Video>;
}

export class User {
    username: string;
    password: string;
    created?: string;
    updated?: string;
    ideas?: Idea[];
}

export class Idea {
    id: string;
}

export class Video {
    id: string;
    title: string;
    url?: string;
    author: UserVideo;
}

export class UserVideo {
    id: string;
    name?: string;
}

export abstract class IMutation {
    abstract createVideo(input?: NewVideoInput): Video | Promise<Video>;
}
