export default class UserStanding {
	constructor({ userId, userName, totalPoints = 0 }) {
		this.userId = userId;
		this.userName = userName;
		this.totalPoints = totalPoints;
	}
}
