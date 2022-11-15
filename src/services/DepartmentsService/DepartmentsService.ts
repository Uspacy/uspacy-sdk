import { AxiosInstance } from 'axios';

/**
 * Departments service
 */
export class Departments {
	private namespace = 'company/v1/departments';

	private routeAceessName = {
		BaseURL: `${this.namespace}`,
		getDepartmentsURL: (
			page: string,
			list: string,
			name: string,
			headId: string,
			parentDepartmentId: string,
			userIds: string,
		): string =>
			`${this.routeAceessName.BaseURL}
			/?page=${page}&list=${list}&filter[name]=${name}&filter[headId]=${headId}&filter[parentDepartmentId]=
			${parentDepartmentId}&filter[usersIds]=${userIds}/`,
		createDepartmentURL: (): string => `${this.routeAceessName.BaseURL}/`,
		getDepartmentByIdURL: (id: string): string =>
			`${this.routeAceessName.BaseURL}/${id}/`,
		updateDepartmentURL: (id: string): string =>
			`${this.routeAceessName.BaseURL}/${id}/`,
		deleteDepartmentURL: (id: string): string =>
			`${this.routeAceessName.BaseURL}/${id}/`,
		updateDepartmentRolesByIdURL: (id: string): string =>
			`${this.routeAceessName.BaseURL}/${id}/updateRoles/`,
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
		return this.httpClient.get<Department[]>(
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
	createDepartment(
		name: string,
		description: string,
		headId: string,
		parentDepartmentId: string,
		userIds: string[],
	) {
		return this.httpClient.post<Department>(
			`${this.routeAceessName.createDepartmentURL()}`,
			{
				name,
				description,
				headId,
				parentDepartmentId,
				userIds,
			},
		);
	}

	/**
	 * Get department by id
	 * @param id department id
	 * @returns departament by id
	 */
	getDepartmentById(id: string) {
		return this.httpClient.get<Department>(
			`${this.routeAceessName.getDepartmentByIdURL(id)}`,
		);
	}

	/**
	 * Update department data (set head department, move users, set parent department)
	 * @param id department ID
	 * @param name name of department
	 * @param headId head id
	 * @param parentDepartmentId id of parent department
	 * @param userIds id of member this dep
	 * @returns updated department data
	 */
	updateDepartment(
		id: string,
		name: string,
		headId: string,
		description: string,
		parentDepartmentId: string,
		usersIds: string,
	) {
		return this.httpClient.patch<Department>(
			`${this.routeAceessName.updateDepartmentURL(id)}`,
			{
				name,
				headId,
				description,
				parentDepartmentId,
				usersIds,
			},
		);
	}

	/**
	 * Delete department.
	 * @param id departament ID
	 * @returns
	 */
	deleteDepartment(id: string) {
		return this.httpClient.delete<Department>(
			`${this.routeAceessName.deleteDepartmentURL(id)}`,
		);
	}

	/**
	 * Update department roles by id
	 * @param id departament ID
	 * @param roles roles
	 * @returns
	 */
	updateDepartmentRolesById(id: string, roles: string[]) {
		return this.httpClient.patch<Department>(
			`${this.routeAceessName.updateDepartmentRolesByIdURL(id)}`,
			{
				roles,
			},
		);
	}
}

export interface Department {
	id: string;
	name: string;
	headId: string;
	parentDepartmentId: string;
	usersIds: string[];
	roles: string[];
}
