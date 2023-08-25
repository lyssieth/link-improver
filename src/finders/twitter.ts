import { Finder } from "../link_finder";

// https://twitter.com/EnderVoidWolf/status/1694421054725275938?s=20
// https://x.com/badbaltictakes/status/1693352879367561613?s=46&t=18kxALw5DB7QjO8r1jm_Pw
// we wanna strip anything after the ? and replace the domain with vxtwitter.com

export default class TwitterFinder implements Finder {
  public findAndReplace(text: string): string {
    return text.replace(
      /(:?https?:\/\/(?:www\.)?(:?twitter|x)\.com\/([a-zA-Z0-9_]+)\/status\/([0-9]+)\/?)(?:\?(?:(?:s=\d+$)|(?:s=\d+&t=\w+?$)))?/g,
      "https://vxtwitter.com/$1/status/$2/",
    );
  }
}
