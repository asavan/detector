"use strict";
import "./css/style.css";

import settings from "__CURRENT_SETTINGS__";
import gameFunction from "./game.js";
import {launchWithUrlParse} from "./helper.js";

launchWithUrlParse(window, document, settings, gameFunction);
