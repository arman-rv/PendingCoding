import { apiCall } from "../interceptor/api-call";

const getLandingReport = async () => await apiCall(`/Home/LandingReport`);

export { getLandingReport };
