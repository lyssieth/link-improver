import { Injector, common, settings } from "replugged";
import manifest from "../manifest.json";
export { manifest };

const inject = new Injector();

export interface Replacement {
  regex: RegExp;
  replacement: string;
}

export interface LinkSettings {
  replacements?: Replacement[];
}

export const defaultSettings = {
  replacements: [
    {
      regex:
        /(?:https?:\/\/(?:www\.)?(?:twitter|x)\.com\/([a-zA-Z0-9_]+)\/status\/([0-9]+)\/?)(?:\?(?:(?:s=\d+$)|(?:s=\d+&t=\w+?$)))?/g,
      replacement: "https://vxtwitter.com/$1/status/$2/",
    },
    {
      regex: /https?:\/\/(?:www\.)?furaffinity\.net\/view\/([0-9]+)\/?/g,
      replacement: "https://vxfuraffinity.net/view/$1/",
    },
  ],
} satisfies LinkSettings;

export const cfg = await settings.init<LinkSettings, keyof typeof defaultSettings>(
  manifest.id,
  defaultSettings,
);

export async function start(): Promise<void> {
  inject.before(common.messages, "sendMessage", (args) => {
    let { content } = args[1];
    const replacements = cfg.get("replacements");

    if (!replacements) {
      // Skip because we don't have anything to do
      return args;
    }

    replacements.forEach(({ regex, replacement }) => {
      const check = regex.test(content);
      if (check) {
        content = content.replace(regex, replacement);
      }
    });

    args[1].content = content;

    return args;
  });
}

export function stop(): void {
  inject.uninjectAll();
}

import { Settings } from "./Settings";
export { Settings };
