import { render } from "@testing-library/react";
import { describe, it } from "vitest";
import { SupportMessageList } from "./SupportMessageList";

describe("<SupportMessageList />", () => {
  it("renders messages", () => {
    const messages = [
      { role: "user", text: "Hi" },
      { role: "assistant", text: "Hello" },
    ];
    const ref = ({ current: null } as unknown) as React.RefObject<HTMLDivElement>;
    render(<SupportMessageList messages={messages as any} listRef={ref} />);
  });
});
