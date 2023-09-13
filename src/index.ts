import { Injector, Logger, common, settings } from "replugged";
import manifest from "../manifest.json";
export { manifest };

const inject = new Injector();

export const PLUGIN_ID = manifest.id;
export const LOGGER = Logger.plugin(PLUGIN_ID);

// Ugly hack. It didn't wanna let me make one in the tsx onChange events, so I just made a function
// and am calling it
export function createReplacement(regex: string, replacement: string): Replacement {
  return {
    regex,
    replacement,
  };
}

// Kinda jank, but it works
export interface Replacement {
  regex: string;
  replacement: string;
}

export interface LinkSettings {
  replacements?: Replacement[];
}

export const defaultSettings = {
  replacements: [
    // this monstrosity probably works for all cases? I sure hope so, because it works for the ones I commonly come across
    {
      regex:
        /(?:https?:\/\/(?:www\.)?(?:twitter|x)\.com\/([a-zA-Z0-9_]+)\/status\/([0-9]+)\/?)(?:\?(?:(?:s=\d+)|(?:s=\d+&t=\w+?))\s?)?/g
          .source,
      replacement: "https://vxtwitter.com/$1/status/$2/",
    },
    // and this is because the normal URL doesn't embed properly in all cases. Also more of the description comes through.
    {
      regex: /https?:\/\/(?:www\.)?furaffinity\.net\/view\/([0-9]+)\/?/g.source,
      replacement: "https://vxfuraffinity.net/view/$1/",
    },
  ],
} satisfies LinkSettings;

export const cfg = await settings.init<LinkSettings, keyof typeof defaultSettings>(
  PLUGIN_ID,
  defaultSettings,
);

export function start(): void {
  inject.before(common.messages, "sendMessage", (args) => {
    try {
      // is there a nicer way to do this? idk
      let { content } = args[1];
      const replacements = cfg.get("replacements");

      if (replacements.length === 0) {
        // Skip because we don't have anything to do
        return args;
      }

      replacements.forEach(({ regex, replacement }) => {
        LOGGER.log({ regex, replacement }, "Checking against", { content });
        const re = new RegExp(regex, "g");
        const check = re.test(content);
        if (check) {
          content = content.replace(re, replacement);
        }
      });

      args[1].content = content;

      return args;
    } catch (e) {
      // Because this can prevent you from sending messages completely.
      LOGGER.error(e);
      return args;
    }
  });
}

export function stop(): void {
  inject.uninjectAll();
}

import { Settings } from "./Settings";
export { Settings };
