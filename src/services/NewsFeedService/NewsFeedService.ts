import { AxiosInstance } from 'axios';
import { EntryType } from 'perf_hooks';

import { Comment } from '../CommentsService';

/**
 * NewsFeed service
 */
export class NewsFeed {
	private namespace = '/newsfeed/v1/posts';

	private routeAceessName = {
		BaseURL: `${this.namespace}`,
		getPostsURL: (page: number, list: number): string =>
			`${this.routeAceessName.BaseURL}/?page=${page}&list=${list}/`,
		createPostURL: (): string => `${this.routeAceessName.BaseURL}/`,
		updatePostURL: (id: string): string =>
			`${this.routeAceessName.BaseURL}/${id}/`,
		deletePostURL: (id: string): string =>
			`${this.routeAceessName.BaseURL}/${id}/`,
	};

	/**
	 * @param config http client
	 */
	constructor(private httpClient: AxiosInstance) {}

	/**
	 * Get posts list
	 * @param page current page
	 * @param list how many items should be per page
	 * @returns post list
	 */
	getPosts(page: number, list: number) {
		return this.httpClient.get<Post[]>(
			`${this.routeAceessName.getPostsURL(page, list)}`,
		);
	}

	/**
	 * Create post
	 * @param title title
	 * @param message message
	 * @param files files
	 * @param recipients RecipientsPost intarface
	 * @returns
	 */
	createPost(
		title: string,
		message: string,
		files?: FileInfoDto[],
		recipients?: RecipientsPost,
	) {
		return this.httpClient.post<Post>(
			`${this.routeAceessName.createPostURL}`,
			{
				title,
				message,
				files,
				recipients,
			},
		);
	}

	/**
	 * Update post
	 * @param id post id
	 * @param title title
	 * @param message message
	 * @param files files
	 * @param recipients RecipientsPost intarface
	 * @returns
	 */
	updatePost(
		id: string,
		title: string,
		message: string,
		files: FileInfoDto[],
		recipients: RecipientsPost,
	) {
		return (
			this.httpClient.patch<Post>(
				`${this.routeAceessName.updatePostURL(id)}`,
			),
			{
				title,
				message,
				files,
				recipients,
			}
		);
	}

	/**
	 * Delete post
	 * @param id post id
	 * @returns
	 */
	deletePost(id: string) {
		return this.httpClient.delete<Post>(
			`${this.routeAceessName.deletePostURL(id)}`,
		);
	}
}

export interface Post {
	id: string;
	title: string;
	message: string;
	authorId: string;
	files?: FileInfoDto[];
	date?: number;
	comments?: Comment[];
}

interface FileInfoDto {
	id: number;
	entityType: EntryType[];
	entityId: number;
	uploadId: string;
	originalFilename: string;
	lastModified: number;
	size: number;
	url: string;
}

export interface RecipientsPost {
	exclude: {
		departmentsIds: string[];
		usersIds: string[];
	};
	include: {
		departmentsIds: string[];
		usersIds: string[];
	};
}
