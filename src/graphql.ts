
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class IdeaPayloadInput {
    idea: string;
    description: string;
}

export class LoginInput {
    username: string;
    password: string;
}

export class IdeaInput {
    page?: number;
    newest?: boolean;
}

export class NewVideoInput {
    title: string;
    url?: string;
    authorId: string;
}

export abstract class IQuery {
    abstract users(page?: number, amount?: number): User[] | Promise<User[]>;

    abstract ideas(data?: IdeaInput): Idea[] | Promise<Idea[]>;

    abstract idea(id: string): Idea | Promise<Idea>;

    abstract comments(): Comment[] | Promise<Comment[]>;

    abstract whoami(): User | Promise<User>;

    abstract videos(): Video[] | Promise<Video[]>;

    abstract video(id: string): Video | Promise<Video>;
}

export abstract class IMutation {
    abstract createComment(ideaId: string, userId: string, comment: string): Comment | Promise<Comment>;

    abstract login(credentials?: LoginInput): Auth | Promise<Auth>;

    abstract register(credentials?: LoginInput): Auth | Promise<Auth>;

    abstract createIdea(data?: IdeaPayloadInput): Idea | Promise<Idea>;

    abstract createVideo(input?: NewVideoInput): Video | Promise<Video>;
}

export class Auth {
    username: string;
    token: string;
}

export class User {
    id: string;
    username: string;
    created: string;
    updated: string;
    ideas?: Idea[];
    comments?: Comment[];
    bookmarks?: Idea[];
}

export class Comment {
    id: string;
    comment: string;
    author: User;
    idea: Idea;
}

export class Idea {
    id: string;
    idea: string;
    description: string;
    created: string;
    updated: string;
    author: User;
    upvotes: number;
    downvotes: number;
    comments: Comment[];
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
