import { AxiosInstance } from 'axios';

/**
 * NewsFeed service
 */
export class NewsFeed {
	private namespace = '/newsfeed/v1/posts';

	private routeAceessName = {
		newsFeedBaseURL: `${this.namespace}`,
		getPostsURL: (page: number, list: number): string =>
			`${this.routeAceessName.newsFeedBaseURL}/?page=${page}&list=${list}`,
		createPostURL: `${this.namespace}`,
		updatePostURL: (postId: number): string =>
			`${this.routeAceessName.newsFeedBaseURL}/${postId}/`,
		deletePostURL: (postId: number): string =>
			`${this.routeAceessName.newsFeedBaseURL}/${postId}/`,
		getCommentsURL: (page: number, list: number, postId: number): string =>
			`${this.routeAceessName.newsFeedBaseURL}/${postId}/comments/?page=${page}&list=${list}`,
		createCommentURL: (postId: number): string =>
			`${this.routeAceessName.deletePostURL(postId)}comments/`,
		updateCommentURL: (postId: number, commentId: number) =>
			`${this.routeAceessName.deletePostURL(
				postId,
			)}comments/${commentId}`,
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
		return this.httpClient.get(
			`${this.routeAceessName.getPostsURL(page, list)}`,
		);
	}

	/**
	 * Create post
	 * @param postconfig type of intaface post include fields title, message, files
	 * @param recipients RecipientsPost intarface
	 * @returns
	 */
	createPost(
		title: string,
		message: string,
		files?: string[],
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
	 * @param postId post id
	 * @param postconfig type of intaface post include fields title, message, files
	 * @param recipients RecipientsPost intarface
	 * @returns
	 */
	updatePost(
		postId: number,
		postconfig: createPost,
		recipients: RecipientsPost,
	) {
		return (
			this.httpClient.patch<Post>(
				`${this.routeAceessName.updatePostURL(postId)}`,
			),
			{
				postconfig,
				recipients,
			}
		);
	}

	/**
	 * Delete post
	 * @param postId post id
	 * @returns
	 */
	deletePost(postId: number) {
		return this.httpClient.delete<Post>(
			`${this.routeAceessName.deletePostURL(postId)}`,
		);
	}

	/**
	 * Get comment for the post
	 * @param page current page
	 * @param list how many items should be per page
	 * @param postId post id
	 * @returns list of comments
	 */
	getComments(page: number, list: number, postId: number) {
		return this.httpClient.get<Post>(
			`${this.routeAceessName.getCommentsURL(page, list, postId)}`,
		);
	}

	/**
	 * Create comment for the post.
	 * @param postId post id
	 * @param config type of interface Post
	 * @returns
	 */
	createComment(postId: number, config: createComment) {
		return this.httpClient.post<Post>(
			`${this.routeAceessName.createCommentURL(postId)}`,
			config,
		);
	}

	/**
	 * Update comment for the post
	 * @param postId post od
	 * @param commentId comment id
	 * @param config type of interface Post
	 * @returns
	 */
	updateComment(postId: number, commentId: number, config: createComment) {
		return this.httpClient.patch<Post>(
			`${this.routeAceessName.updateCommentURL(postId, commentId)}`,
			{ config },
		);
	}

	/**
	 * Delete comment for the post
	 * @param postId post id
	 * @param commentId comment id
	 * @returns
	 */
	deleteComment(postId: number, commentId: number) {
		return this.httpClient.delete<Post>(
			`${this.routeAceessName.updateCommentURL(postId, commentId)}`,
		);
	}
}

export interface Post {
	id: string;
	title: string;
	message: string;
	authorId: string;
	files: string[];
	date?: number;
	comments?: [
		{
			id: string;
			massege: string;
			authorId: string;
			files?: string[];
			date: number;
		},
	];
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

type createPost = Omit<Post, 'id' | 'authorId' | 'comments' | 'date'>;
type createComment = Omit<
Post,
'authorId' | 'date' | 'title' | 'comments' | 'id'
>;
