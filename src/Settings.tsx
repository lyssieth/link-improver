import React from "react";
import { components } from "replugged";

const { Text, Divider } = components;

export function Settings(): React.ReactElement {
  return (
    <div>
      <Text.H1>Settings</Text.H1>
      <Divider />
      <SettingsTable
        headers={["Name", "Value"]}
        rows={[
          ["Example 1", "Potato"],
          ["Example 2", "Tomato"],
        ]}
      />
    </div>
  );
}

function SettingsTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: string[][];
}): React.ReactElement {
  return (
    <table>
      <thead>
        {headers.map((header) => (
          <th>
            <Text.Normal>{header}</Text.Normal>
          </th>
        ))}
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr>
            {row.map((it) => (
              <td>
                <Text.Normal>{it.toString()}</Text.Normal>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
