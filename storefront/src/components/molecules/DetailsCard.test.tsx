import { render } from "@testing-library/react";
import { describe, it } from "vitest";
import { DetailsCard } from "./DetailsCard";

const sample = {
  id: "p1",
  title: "P1",
  price: 10,
  image: "img.png",
  stockQty: 3,
  tags: ["a"],
  description: "desc",
};

describe("<DetailsCard />", () => {
  it("renders", () => {
    render(<DetailsCard product={sample as any} />);
  });
});
