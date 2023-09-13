import { components, util } from "replugged";
import { LOGGER, Replacement, cfg, createReplacement, defaultSettings } from ".";

const { Text, Divider, TextInput, Notice, Button, Flex } = components;

// The ugliest hack in this entire thing.
// But, if it works, it works. It does, and I'm not changing it unless someone complains/figures out a better way/both.
function SettingsTable({ headers }: { headers: string[] }): React.ReactElement {
  const { value, onChange } = util.useSetting(cfg, "replacements");

  LOGGER.log({ value });
  return (
    <div>
      <Flex grow={1}>
        <table>
          <thead>
            {headers.map((header) => (
              <th>
                <Text.Normal>{header}</Text.Normal>
              </th>
            ))}
          </thead>
          <tbody>
            {value.map((replacement) => (
              <tr>
                <td>
                  <TextInput
                    editable={true}
                    onChange={(newer: string) =>
                      onChange(value.map((orig) => whatTheRegex(newer, replacement, orig)))
                    }
                    value={replacement.regex}
                    autoCorrect="off"
                    autoCapitalize="off"
                    autoComplete="off"
                    spellCheck={false}
                  />
                </td>
                <td>
                  <TextInput
                    editable={true}
                    onChange={(newer: string) =>
                      onChange(value.map((orig) => whatTheRepl(newer, replacement, orig)))
                    }
                    value={replacement.replacement}
                    autoCorrect="off"
                    autoCapitalize="off"
                    autoComplete="off"
                    spellCheck={false}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Flex>
      <br />
      <Flex direction={Flex.Direction.HORIZONTAL} justify={Flex.Justify.END} align={Flex.Align.END}>
        <Button
          onClick={() => {
            onChange(value.concat(createReplacement("", "")));
          }}>
          Add Row
        </Button>
        <Button
          onClick={() => {
            onChange(value.slice(0, value.length - 1));
          }}>
          Remove Row (DANGER)
        </Button>
        <Button onClick={() => onChange(defaultSettings.replacements)}>
          Reset to Default (DANGER)
        </Button>
      </Flex>
    </div>
  );
}

function whatTheRegex(newer: string, input: Replacement, orig: Replacement): Replacement {
  LOGGER.log({ newer, input, orig });
  if (orig.regex === input.regex && orig.replacement === input.replacement) {
    return { regex: newer, replacement: input.replacement };
  }
  return orig;
}

function whatTheRepl(newer: string, input: Replacement, orig: Replacement): Replacement {
  LOGGER.log({ newer, input, orig });
  if (orig.regex === input.regex && orig.replacement === input.replacement) {
    return { regex: input.regex, replacement: newer };
  }
  return orig;
}

export function Settings(): React.ReactElement {
  return (
    <div>
      <Text.H1>Settings</Text.H1>
      <Notice messageType={Notice.Types.INFO}>
        This is an{" "}
        <i>
          <b>***extremely***</b>
        </i>{" "}
        broken settings page, but it works. I hope that you figure out{" "}
        <i>
          <b>***how***</b>
        </i>{" "}
        it works. Or <i>if</i> it works.
        <br />
        All regex is `/regex/g`, and the replacement is a string that accepts the `$` replacement
        syntax.
      </Notice>
      <Divider />
      <SettingsTable headers={["Regex", "Replacement"]} />
      <Divider />
      <Notice messageType={Notice.Types.WARNING}>
        The "DANGER" isn't kidding. It will just remove the last element. It doesn't care, it
        doesn't prompt. It's just gone.
        <br />I suggest using a site like...{" "}
        <TextInput editable={false} value={"https://regex101.com/"} />
      </Notice>
    </div>
  );
}
