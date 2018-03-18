import uniqid from "uniqid";

const PREFIX = "-26bf-11e8-";

export default function generateId() {
	return uniqid() + uniqid(PREFIX);
}

export function generateRaceId() {
	return uniqid();
}
