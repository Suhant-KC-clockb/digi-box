import { paths } from "./lib/paths";

const authPathsList = Object.values(paths.auth);
const dashboardPathList = Object.values(paths.dashboard);

/**
 * An Array of routes that are accessible to public
 * These routes do not required authentification
 * @type {string[]}
 */

/**
 * An array of routes that are required for authentication
 * @type {string[]}
 */
export const authRoutes = authPathsList;
/**
 * An prefix for API  authentication routes
 * Routes that start with this prefix will be used for api purposes
 * @type {string[]}
 */
export const apiAuthRoutes = "/api/auth";

export const dashboardRoutes = dashboardPathList;
/**
 * The default redirect
 * @type {string}
 */
export const DEFAULT_REDIRECT_URL = "/dashboard";
