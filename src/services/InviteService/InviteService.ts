import { AxiosInstance } from 'axios';

/**
 * InviteService service
 */
export class InviteService {
	private namespace = '/company/v1';

	private routeAceessName = {
		BaseURL: `${this.namespace}`,
		getCheckInviteURL: (email: string): string =>
			`${this.routeAceessName.BaseURL}/users/checkInvite/?email=${email}/`,
		createInviteURL: (): string =>
			`${this.routeAceessName.BaseURL}/invites/email`,
		createInviteBatchURL: (): string =>
			`${this.routeAceessName.BaseURL}/invites/email/batch`,
		resendingInvitationURL: (id: string): string =>
			`${this.routeAceessName.BaseURL}/invites/email/${id}/repeatInvitation`,
		deleteInvitationURL: (id: string): string =>
			`${this.routeAceessName.BaseURL}/invites/email/${id}/`,
	};

	/**
	 * @param config http client
	 */
	constructor(private httpClient: AxiosInstance) {}

	/**
	 * Get check invite
	 * @returns invite
	 */
	getCheckInvite(email: string) {
		return this.httpClient.get<InviteInfo>(
			`${this.routeAceessName.getCheckInviteURL(email)}`,
		);
	}

	/**
	 * Create invite
	 * @returns
	 */
	createInvite(email: string, firstName: string, lastName: string) {
		return this.httpClient.post(
			`${this.routeAceessName.createInviteURL()}`,
			{
				email,
				firstName,
				lastName,
			},
		);
	}
	/**
	 * Create invite batch
	 * @returns
	 */
	createInviteBatch(list: string[]) {
		return this.httpClient.post<InviteInfo>(
			`${this.routeAceessName.createInviteBatchURL()}`,
			{
				list,
			},
		);
	}

	/**
	 * Resending invitation
	 * @param id user id
	 * @returns
	 */
	resendingInvitation(id: string) {
		return this.httpClient.patch<InviteInfo>(
			`${this.routeAceessName.resendingInvitationURL(id)}`,
		);
	}

	/**
	 * Delete invitation
	 * @param id user id
	 * @returns
	 */
	deleteInvitation(id: string) {
		return this.httpClient.delete<InviteInfo>(
			`${this.routeAceessName.deleteInvitationURL(id)}`,
		);
	}
}

interface InviteInfo {
	status: boolean;
	message: string;
}
