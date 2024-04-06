import { TOKEN } from "../../utils/ConstantsFile";

const accessToken = "JWT " + localStorage.getItem(TOKEN);


export default accessToken;
