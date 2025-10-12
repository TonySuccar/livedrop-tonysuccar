import { render } from "@testing-library/react";
import { describe, it } from "vitest";
import { Text } from "./Text";

describe("<Text />", () => {
  it("renders default body text", () => {
    render(<Text>hello</Text>);
  });
});
