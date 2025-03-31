import { navMenuClick, checkUserSignedIn } from "../common.js";

const header = document.querySelector("header");
checkUserSignedIn(header);
navMenuClick(header);
