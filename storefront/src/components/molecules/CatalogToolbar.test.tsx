import { render } from "@testing-library/react";
import { describe, it } from "vitest";
import { CatalogToolbar } from "./CatalogToolbar";

describe("<CatalogToolbar />", () => {
  it("renders with minimal props", () => {
    render(
      <CatalogToolbar
        query=""
        onQuery={() => {}}
        tag=""
        onTag={() => {}}
        sort="price-asc"
        onSort={() => {}}
        tags={[]}
        onReset={() => {}}
      />,
    );
  });
});
