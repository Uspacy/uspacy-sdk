import { AxiosInstance } from 'axios';

/**
 * Departments service
 */
export class Departments {
	private namespace = 'company/v1/departments';

	private routeAceessName = {
		depServiceBaseURL: `${this.namespace}`,
		getDepartmentsURL: (
			page: string,
			list: string,
			name: string,
			headId: string,
			parentDepartmentId: string,
			userIds: string,
		): string =>
			`${this.routeAceessName.depServiceBaseURL}
			/?page=${page}&list=${list}&filter[name]=${name}&filter[headId]=${headId}&filter[parentDepartmentId]=
			${parentDepartmentId}&filter[usersIds]=${userIds}`,
		createDepartmentURL: (): string =>
			`${this.routeAceessName.depServiceBaseURL}`,
		getDepartmentByIdURL: (depID: number): string =>
			`${this.routeAceessName.depServiceBaseURL}/${depID}`,
		updateDepartmentURL: (depID: number): string =>
			`${this.routeAceessName.depServiceBaseURL}/${depID}`,
		deleteDepartmentURL: (depID: number): string =>
			`${this.routeAceessName.depServiceBaseURL}/${depID}`,
	};

	/**
	 * @param config http client
	 */
	constructor(private httpClient: AxiosInstance) {}

	/**
	 *Get departments list
	 * @param page current page
	 * @param list how many items should be per page
	 * @param name name of departemnt
	 * @param headId head id
	 * @param parentDepartmentId id of parent department
	 * @param userIds id of member this dep
	 * @returns
	 */
	getDepartments(
		page: string,
		list: string,
		name: string,
		headId: string,
		parentDepartmentId: string,
		userIds: string,
	) {
		return this.httpClient.get<Department>(
			`${this.routeAceessName.getDepartmentsURL(
				page,
				list,
				name,
				headId,
				parentDepartmentId,
				userIds,
			)}`, // 200 OK
		);
	}

	/**
	 * Create department
	 * @returns
	 */
	createDepartment(name: string, description: string, headId: string) {
		return this.httpClient.post<Department>(
			`${this.routeAceessName.createDepartmentURL()}`,
			{
				name,
				description,
				headId,
			},
		);
	}

	/**
	 * Get department by id
	 * @param depID department id
	 * @returns departament by id
	 */
	getDepartmentById(depID: number) {
		return this.httpClient.get<Department>(
			`${this.routeAceessName.getDepartmentByIdURL(depID)}`,
		);
	}

	/**
	 * Update department data (set head department, move users, set parent department)
	 * @param depID department ID
	 * @param name name of department
	 * @param headId head id
	 * @param parentDepartmentId id of parent department
	 * @param userIds id of member this dep
	 * @returns updated department data
	 */
	updateDepatment(
		depID: number,
		name: string,
		headId: string,
		parentDepartmentId: string,
		usersIds: string,
	) {
		return this.httpClient.patch<DepartmentPatch>(
			`${this.routeAceessName.updateDepartmentURL(depID)}`,
			{
				name,
				headId,
				parentDepartmentId,
				usersIds,
			},
		);
	}

	/**
	 * Delete department.
	 * @param depID departament ID
	 * @returns
	 */
	deleteDepartment(depID: number) {
		return this.httpClient.delete<DepartmentPatch>(
			`${this.routeAceessName.deleteDepartmentURL(depID)}`,
		);
	}
}

export interface DepartmentPatch {
	names: string;
	headIds: string;
	parentDepartmentIds: string;
	usersIds: [];
}

export interface Department extends DepartmentPatch {
	id: string;
}
