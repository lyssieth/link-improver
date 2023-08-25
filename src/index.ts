import { Injector, Logger, common } from "replugged";
import { FINDERS } from "./link_finder";

const inject = new Injector();
const logger = Logger.plugin("LinkImprover");

export async function start(): Promise<void> {
  inject.before(common.messages, "sendMessage", (args) => {
    let { content } = args[1];

    FINDERS.forEach((finder, name) => {
      content = finder.findAndReplace(content);
      logger.log(`Replaced links for ${name}`);
    });

    args[1].content = content;

    return args;
  });
}

export function stop(): void {
  inject.uninjectAll();
}
