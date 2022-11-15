import { AxiosInstance } from 'axios';

/**
 * RolesService service
 */
export class RolesService {
	private namespace = '/company/v1';

	private routeAceessName = {
		BaseURL: `${this.namespace}`,
		getPermissionsURL: (): string =>
			`${this.routeAceessName.BaseURL}/permissions/`,
		getRolesURL: (): string => `${this.routeAceessName.BaseURL}/roles/`,
		createRoleURL: (): string => `${this.routeAceessName.BaseURL}/roles/`,
		roleByIdURL: (id: string): string =>
			`${this.routeAceessName.BaseURL}/roles/${id}/`,
		updateRoleURL: (id: string) =>
			`${this.routeAceessName.roleByIdURL(id)}`,
		deleteRoleURL: (id: string) =>
			`${this.routeAceessName.roleByIdURL(id)}`,
	};

	/**
	 * @param config http client
	 */
	constructor(private httpClient: AxiosInstance) {}

	/**
	 * Get permissions
	 * @returns list of permissions
	 */
	getPermissions() {
		return this.httpClient.get<PermissionsList[]>(
			`${this.routeAceessName.getPermissionsURL()}`,
		);
	}

	/**
	 * Get roles
	 * @returns list of roles
	 */
	getRoles() {
		return this.httpClient.get<RoleList[]>(
			`${this.routeAceessName.getRolesURL()}`,
		);
	}

	/**
	 * Create role
	 * @param name role
	 * @param permissions
	 * @returns
	 */
	createRole(name: string, permissions: string[]) {
		return this.httpClient.post<PermissionsInfo>(
			`${this.routeAceessName.createRoleURL()}`,
			{
				name,
				permissions,
			},
		);
	}

	/**
	 * Get role by id
	 * @param id role id
	 * @returns
	 */
	roleById(id: string) {
		return this.httpClient.get<RoleListPermissions>(
			`${this.routeAceessName.roleByIdURL(id)}`,
		);
	}

	/**
	 * Update role
	 * @param id role id
	 * @param name
	 * @param permissions
	 * @param usersIds
	 * @param departmentsIds
	 * @returns
	 */
	updateRole(
		id: string,
		name: string,
		permissions: string[],
		usersIds: string[],
		departmentsIds: string[],
	) {
		return this.httpClient.patch<RoleListPermissions>(
			`${this.routeAceessName.updateRoleURL(id)}`,
			{ name, permissions, usersIds, departmentsIds },
		);
	}

	/**
	 * Delete role
	 * @param id role id
	 * @returns
	 */
	deleteRole(id: string) {
		return this.httpClient.delete<RoleListPermissions>(
			`${this.routeAceessName.deleteRoleURL(id)}`,
		);
	}
}

interface PermissionsList {
	create: string[];
	view: string[];
	edit: string[];
	delete: string[];
	export: string[];
}

interface RoleList {
	id: string;
	name: string;
	userlist: Array<UserForRole>;
	departmenlist: Array<DepartmentForRole>;
}

interface UserForRole {
	id: string;
	firstName: string;
	lastName: string;
	avatar: string;
	dateUpdate: number;
}

interface DepartmentForRole {
	id: string;
	name: string;
	dateUpdate: number;
}

interface PermissionsInfo {
	id: string;
	name: string;
	permissions: PermissionsList;
}

interface RoleListPermissions extends RoleList {
	permissions: PermissionsList;
}
