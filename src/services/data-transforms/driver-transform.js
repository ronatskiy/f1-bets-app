import Racer from "../../domain/racer";

/**
 * @param {ErgastApi.Driver} driver
 * @param {string} points
 * @return {Racer}
 */
export function driverTransform(driver, points) {
	return new Racer(driver.givenName, driver.familyName, driver.permanentNumber, driver.code, points);
}
