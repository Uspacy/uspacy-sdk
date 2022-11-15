import { AxiosInstance } from 'axios';
const isAvailibleParams = (params: AvalibleTask) => {
	let query_params = '?';
	let counter = 0;
	for (const query in params) {
		counter++;
		const current_query_params = params[query];
		query_params += `${
			counter > 1 ? '&' : ''
		}${query}=${current_query_params}`;
	}
	return query_params;
};
/**
 * Tasks service
 */
export class Tasks {
	private namespace = 'tasks/v1/';

	private routeAceessName = {
		BaseURL: `${this.namespace}`,
		getAvailableTasksURL: (params: AvalibleTask): string =>
			`${this.routeAceessName.BaseURL}tasks/${isAvailibleParams(params)}`,
		createTaskURL: `${this.namespace}tasks/`,
		getTaskByIdURL: (taskID: string): string =>
			`${this.routeAceessName.BaseURL}tasks/${taskID}/`,
		editTaskByIdURL: (taskID: string): string =>
			`${this.routeAceessName.BaseURL}tasks/${taskID}/`,
		denialATaskURL: (taskID: string): string =>
			`${this.routeAceessName.editTaskByIdURL(taskID)}denial/`,
		getCommentsURL: (
			taskID: string,
			page: number,
			list: number,
		): string => {
			return `${this.routeAceessName.editTaskByIdURL(
				taskID,
			)}comments/?page=${page}&list=${list}`;
		},
		createCommentURL: (taskID: string): string =>
			`${this.routeAceessName.editTaskByIdURL(taskID)}comments/`,
		deleteCommentURL: (taskID: string, commentId: string): string =>
			`${this.routeAceessName.createCommentURL(taskID)}${commentId}`,
		getCanbanStagesURL: `${this.namespace}/stages/`,
		getCanbanStageByIdURL: (stageId: string): string =>
			`${this.routeAceessName.getCanbanStagesURL}${stageId}`,
		moveTaskToStageURL: (stageId: string): string =>
			`${this.routeAceessName.getCanbanStageByIdURL(stageId)}/moveTask`,
		getCommentsByTaskIdURL: (taskId: string): string =>
			`${this.routeAceessName.getTaskByIdURL(taskId)}checkList/`,
		updateCheckListURL: (taskId: string, checkListId: string): string =>
			`${this.routeAceessName.getCommentsByTaskIdURL(
				taskId,
			)}${checkListId}/`,
		getItemsCheckByIdURL: (checkListId: string): string =>
			`${this.routeAceessName.BaseURL}checklist/${checkListId}`,
		deleteItemToCheckListByIdURL: (
			checkListId: string,
			checkListItemId: string,
		): string =>
			`${this.routeAceessName.getItemsCheckByIdURL(
				checkListId,
			)}/${checkListItemId}`,
		bulkEditionCompleteTasksURL: (): string =>
			`${this.routeAceessName.createTaskURL}massEdit/complete`,
		bulkEditionArchiveTasksURL: (): string =>
			`${this.routeAceessName.createTaskURL}massEdit/archive`,
		bulkEditionDeleteTasksURL: (): string =>
			`${this.routeAceessName.createTaskURL}massEdit/delete`,
		transferTasksAnotherUserURL: (): string =>
			`${this.routeAceessName.BaseURL}delegation`,
	};

	/**
	 * @param config http client
	 */
	constructor(private httpClient: AxiosInstance) {}

	/**
	 * Get available tasks list.
	 * @param page current page
	 * @param list how many items should be per page
	 * @param field_name the field we are looking for
	 * @param sort_by the field by which to sort
	 * @param order_by sorting direction
	 * @returns available tasks list
	 */
	getAvailableTasks(params: AvalibleTask) {
		return this.httpClient.get<Task>(
			`${this.routeAceessName.getAvailableTasksURL(params)}`,
		);
	}

	/**
	 * Create task
	 * @param config type of interface Task
	 * @returns
	 */
	createTask(config: createTask) {
		return this.httpClient.post<Task>(
			`${this.routeAceessName.createTaskURL}`,
			config,
		);
	}

	/**
	 * Get task by id
	 * @param id task id
	 * @returns
	 */
	getTaskById(id: string) {
		return this.httpClient.get<Task>(
			`${this.routeAceessName.getTaskByIdURL(id)}`,
		);
	}

	/**
	 * Edit task by id
	 * @param id task id
	 * @param config type of task interface
	 * @returns
	 */
	editTaskById(id: string, config: updateTask) {
		return this.httpClient.patch<Task>(
			`${this.routeAceessName.editTaskByIdURL(id)}`,
			config,
		);
	}

	/**
	 * Delete task by id
	 * @param id task id
	 * @returns
	 */
	deleteTaskById(id: string) {
		return this.httpClient.delete<Task>(
			`${this.routeAceessName.editTaskByIdURL(id)}`,
		);
	}

	/**
	 *
	 * @param id task id
	 * @param reason why do you want to cancel the task?
	 * @returns
	 */
	denialATask(id: string, reason: string) {
		return this.httpClient.post<Task>(
			`${this.routeAceessName.denialATaskURL(id)}`,
			reason,
		);
	}

	/**
	 * Get comments task by id
	 * @param id task id
	 * @param page current page
	 * @param list how many items should be per page
	 * @returns
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	getCommentsById(id: string, page: number, list: number) {
		return this.httpClient.get<Comments>(
			`${this.routeAceessName.getCommentsURL(id, page, list)}`,
		);
	}

	/**
	 * Create comment for task
	 * @param id task id
	 * @param denial When the comment is a rejection and the task is not accepted.
	 * @returns
	 */
	createComment(id: string, denial: boolean) {
		return this.httpClient.post<CreateCommentForTask>(
			`${this.routeAceessName.createCommentURL(id)}`,
			{ denial },
		);
	}

	/**
	 * Delete comment to task by id
	 * @param id task id
	 * @param commentId comment id
	 * @returns
	 */
	deleteComment(id: string, commentId: string) {
		return this.httpClient.delete(
			`${this.routeAceessName.deleteCommentURL(id, commentId)}`,
		);
	}

	/**
	 * Update comment for task
	 * @param id task id
	 * @param commentId comment id
	 * @returns
	 */
	updateComment(id: string, commentId: string, denial: boolean) {
		return this.httpClient.patch<CreateCommentForTask>(
			`${this.routeAceessName.deleteCommentURL(id, commentId)}`,
			{
				denial,
			},
		);
	}

	/**
	 * Get canban stages
	 * @returns canban stages
	 */
	getCanbanStages() {
		return this.httpClient.get<CanbanStage>(
			`${this.routeAceessName.getCanbanStagesURL}`,
		);
	}

	/**
	 * Create canban stage
	 * @param title title (status, ex.: to do)
	 * @param color
	 * @param afterId The ID of the stage to add after.
	 * @returns created canban stage
	 */
	createCanbanStage(title: string, color: string, afterId: string) {
		return this.httpClient.post<CanbanStage>(
			`${this.routeAceessName.getCanbanStagesURL}`,
			{
				title,
				color,
				afterId,
			},
		);
	}

	/**
	 * Get canban stage by id
	 * @param stageId stage id
	 * @returns canban stage by id
	 */
	getCanbanStageById(stageId: string) {
		return this.httpClient.get<CanbanStage>(
			`${this.routeAceessName.getCanbanStageByIdURL(stageId)}`,
		);
	}

	/**
	 * Update canban stage by id
	 * @param stageId stage id
	 * @param title title (status, ex.: to do)
	 * @param color
	 * @param afterId The ID of the stage to add after.
	 * @returns updated stage
	 */
	updateCanbanStageById(
		stageId: string,
		title: string,
		color: string,
		afterId: string,
	) {
		return this.httpClient.patch<CanbanStage>(
			`${this.routeAceessName.getCanbanStageByIdURL(stageId)}`,
			{
				title,
				color,
				afterId,
			},
		);
	}

	/**
	 * Delete stage by id
	 * @param stageId stage id
	 * @returns
	 */
	deleteCanbanStageById(stageId: string) {
		return this.httpClient.delete<CanbanStage>(
			`${this.routeAceessName.getCanbanStageByIdURL(stageId)}`,
		);
	}

	/**
	 * Moving a task to stage
	 * @param stageId stage id
	 * @param id
	 * @returns
	 */
	moveTaskToStage(stageId: string, id: string) {
		return this.httpClient.post(
			`${this.routeAceessName.moveTaskToStageURL(stageId)}`,
			id,
		);
	}

	/**
	 * Get comments task by id.
	 * @param id task id
	 * @returns task comments
	 */
	getCommentsByTaskId(id: string) {
		return this.httpClient.get<CommentsTaskById>(
			`${this.routeAceessName.getCommentsByTaskIdURL(id)}`,
		);
	}

	/**
	 * Create check list for task
	 * @param id task id
	 * @param title title
	 * @returns
	 */
	createNewCheckList(id: string, title: string) {
		return this.httpClient.post<CheckList>(
			`${this.routeAceessName.getCommentsByTaskIdURL(id)}`,
			title,
		);
	}

	/**
	 * Update check list for task
	 * @param id task id
	 * @param checkListId checklist id
	 * @param title title checklist
	 * @returns
	 */
	updateCheckList(id: string, checkListId: string, title: string) {
		return this.httpClient.patch<UpdateCheckList>(
			`${this.routeAceessName.updateCheckListURL(id, checkListId)}`,
			title,
		);
	}

	/**
	 * Delete check list to task by id
	 * @param id task id
	 * @param checkListId checklist id
	 * @returns
	 */
	deleteCheckListById(id: string, checkListId: string) {
		return this.httpClient.delete<CheckList>(
			`${this.routeAceessName.updateCheckListURL(id, checkListId)}`,
		);
	}

	/**
	 * Get items check list by id
	 * @param checkListId checklist id
	 * @returns check list by id
	 */
	getItemsCheckById(checkListId: string) {
		return this.httpClient.get<CheckListItem>(
			`${this.routeAceessName.getItemsCheckByIdURL(checkListId)}`,
		);
	}

	/**
	 * Create item check list for task
	 * @param checkListId checklist id
	 * @param title title of checklist
	 * @param responsibleId responsible id
	 * @param deadline deadline
	 * @returns
	 */
	createCheckListItem(
		checkListId: string,
		title: string,
		responsibleId: string,
		deadline: string,
	) {
		return this.httpClient.post<CheckListItem>(
			`${this.routeAceessName.getItemsCheckByIdURL(checkListId)}`,
			{
				title,
				responsibleId,
				deadline,
			},
		);
	}

	/**
	 * Delete item to check list by id.
	 * @param checkListId checklist id
	 * @param checkListItemId checklist item id
	 * @returns
	 */
	deleteItemToCheckListById(checkListId: string, checkListItemId: string) {
		return this.httpClient.delete<CheckListItem>(
			`${this.routeAceessName.deleteItemToCheckListByIdURL(
				checkListId,
				checkListItemId,
			)}`,
		);
	}

	/**
	 * Update check list for task
	 * @param checkListId checklist id
	 * @param checkListItemId checklist item id
	 * @param title title checklist
	 * @param responsibleId responsible id
	 * @param deadline deadline
	 * @returns
	 */
	updateChackListForTask(
		checkListId: string,
		checkListItemId: string,
		title: string,
		responsibleId: string,
		deadline: string,
	) {
		return this.httpClient.patch<CheckListItem>(
			`${this.routeAceessName.deleteItemToCheckListByIdURL(
				checkListId,
				checkListItemId,
			)}`,
			{
				title,
				responsibleId,
				deadline,
			},
		);
	}

	/**
	 * Bulk editing complete tasks
	 * @param ids ids tasks
	 * @returns
	 */
	bulkEditionCompleteTasks(ids: string[]) {
		return this.httpClient.post(
			`${this.routeAceessName.bulkEditionCompleteTasksURL()}`,
			{
				ids,
			},
		);
	}

	/**
	 * Bulk editing archive tasks
	 * @param ids ids tasks
	 * @returns
	 */
	bulkEditionArchiveTasks(ids: string[]) {
		return this.httpClient.post(
			`${this.routeAceessName.bulkEditionArchiveTasksURL()}`,
			{
				ids,
			},
		);
	}

	/**
	 * Bulk editing delete tasks
	 * @param ids ids tasks
	 * @returns
	 */
	bulkEditionDeleteTasks(ids: string[]) {
		return this.httpClient.post(
			`${this.routeAceessName.bulkEditionDeleteTasksURL()}`,
			{
				ids,
			},
		);
	}

	/**
	 * Transfer tasks to another user
	 * @returns
	 */
	transferTasksAnotherUser(
		oldUserId: string,
		newUserId: string,
		task: { owner: boolean; responsible: boolean },
	) {
		return this.httpClient.post(
			`${this.routeAceessName.transferTasksAnotherUserURL()}`,
			{
				oldUserId,
				newUserId,
				task,
			},
		);
	}
}

export interface Task {
	title: string;
	deadline: number;
	closedDate: number;
	createdBy: string;
	closedBy: string;
	createdDate: number;
	responsibleId: string;
	accomplicesIds: string[];
	auditorsIds: string[];
	body: string;
	status: TaskStatus[];
	kanbanStageId: string;
	priority: Priority[];
	acceptResult: boolean;
	requiredResult: boolean;
	resultCommentId: string;
	fixed: boolean;
	archive: boolean;
	departmentId: string;
	groupId: string;
	files: string[];
}

export interface Comments {
	id: string;
	files: string[];
	message: string;
	authorId: string;
	date: number;
}

export interface CreateCommentForTask {
	responsibleId: string;
	denial: boolean;
}

export interface CommentsTaskById {
	id: string;
	title: string;
	checkListItemIds: string[];
}

export interface CanbanStage {
	id: string;
	title: string;
	color: string;
	afterId: string;
}

export interface CheckListItem {
	id: string;
	title: string;
	responsibleId: string;
	deadline: number;
}

export interface CheckList {
	id: string;
	title: string;
}

export interface UpdateCheckList {
	title: string;
}

export enum TaskStatus {
	TO_DO = 'TO_DO',
	IN_PROGRESS = 'IN_PROGRESS',
	READY_FOR_REVIEW = 'READY_FOR_REVIEW',
	DONE = 'DONE',
	BLOCKED = 'BLOCKED',
}

export enum Priority {
	LOW = 'Low',
	AVARAGE = 'Avarage',
	HIGH = 'High',
}

type createTask = Pick<
Task,
| 'title'
| 'deadline'
| 'responsibleId'
| 'accomplicesIds'
| 'auditorsIds'
| 'body'
| 'priority'
| 'files'
| 'departmentId'
| 'fixed'
| 'groupId'
>;

type updateTask = Pick<
Task,
| 'title'
| 'deadline'
| 'responsibleId'
| 'accomplicesIds'
| 'auditorsIds'
| 'body'
| 'priority'
| 'files'
| 'departmentId'
| 'archive'
| 'fixed'
>;

export interface AvalibleTask {
	page: number;
	list: string;
	field_name: string;
	sort_by: string;
	order_by: string;
}
