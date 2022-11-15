import { AxiosInstance } from 'axios';

import { EntityType } from '../FilesService';

/**
 * Comments service
 */
export class CommentsService {
	private namespace = '/comments/v1/comments';

	private routeAceessName = {
		BaseURL: `${this.namespace}`,
		getCommentsURL: (
			entity_type: EntityType[],
			entityId: number,
			list: number,
			childList: number,
			nextId: number,
			lastId: number,
		): string =>
			`${this.routeAceessName.BaseURL}/?entity_type=${entity_type}&entityId=${entityId}
			&list=${list}&childList=${childList}&nextId=${nextId}&lastId=${lastId}/`,
		createCommentURL: (): string => `${this.routeAceessName.BaseURL}/`,
		commentByIDURL: (id: number): string =>
			`${this.routeAceessName.BaseURL}/${id}`,
		updateCommentURL: (id: number) =>
			`${this.routeAceessName.commentByIDURL(id)}`,
		deleteCommentURL: (id: number) =>
			`${this.routeAceessName.commentByIDURL(id)}`,
	};

	/**
	 * @param config http client
	 */
	constructor(private httpClient: AxiosInstance) {}

	/**
	 * Get comments
	 * @returns list of comments
	 */
	getComments(
		entity_type: EntityType[],
		entityId: number,
		list: number,
		childList: number,
		nextId: number,
		lastId: number,
	) {
		return this.httpClient.get<Comment[]>(
			`${this.routeAceessName.getCommentsURL(
				entity_type,
				entityId,
				list,
				childList,
				nextId,
				lastId,
			)}`,
		);
	}

	/**
	 * Create comment
	 * @param config type of interface CommentServiceDto
	 * @returns
	 */
	createComment(entityType: string, entityId: number, message?: string) {
		return this.httpClient.post<CommentServiceDto>(
			`${this.routeAceessName.createCommentURL()}`,
			{
				entityType,
				entityId,
				message,
			},
		);
	}

	/**
	 * Get comment by id
	 * @param id comment id
	 * @returns
	 */
	getCommentById(id: number) {
		return this.httpClient.get<CommentServiceDto>(
			`${this.routeAceessName.commentByIDURL(id)}`,
		);
	}

	/**
	 * Update comment
	 * @param id comment id
	 * @param message message
	 * @returns
	 */
	updateComment(id: number, message: string) {
		return this.httpClient.patch<CommentServiceDto>(
			`${this.routeAceessName.updateCommentURL(id)}`,
			{ message },
		);
	}

	/**
	 * Delete comment
	 * @param id comment id
	 * @returns
	 */
	deleteComment(id: number) {
		return this.httpClient.delete<CommentServiceDto>(
			`${this.routeAceessName.deleteCommentURL(id)}`,
		);
	}
}

export interface Comment {
	id: number;
	entityType?: EntityType[];
	entityId?: number;
	message: string;
	authorId: string;
	date: number;
	reactions: ReactionService[];
	nextId: number;
	prevId: number;
}

interface ReactionService {
	reaction: number;
	count: number;
}

type CommentServiceDto = Omit<Comment, 'reactions' | 'nextId' | 'prevId'>;
