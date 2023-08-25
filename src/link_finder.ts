import { FurAffinityFinder } from "./finders/furaffinity";
import TwitterFinder from "./finders/twitter";

export interface Finder {
  findAndReplace(text: string): string;
}

// This is where you will store your finders.
export const FINDERS = new Map<string, Finder>();

FINDERS.set("furaffinity", new FurAffinityFinder());
FINDERS.set("twitter", new TwitterFinder());
