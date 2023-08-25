import { Finder } from "../link_finder";

export class FurAffinityFinder implements Finder {
  public findAndReplace(text: string): string {
    return text.replace(
      /https?:\/\/(?:www\.)?furaffinity\.net\/view\/([0-9]+)\/?/g,
      "https://vxfuraffinity.net/view/$1/",
    );
  }
}
