import { basecommands } from "../utils/core/basecommands";
import { setupcommand } from "./setup/setup";

const commands:Record<string, basecommands> = {
    'setup': new setupcommand(),
}

export default commands;
