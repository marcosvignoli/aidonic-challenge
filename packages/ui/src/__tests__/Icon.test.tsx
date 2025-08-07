import React from "react";
import { render } from "@testing-library/react";
import { Icon } from "../components/Icon";

describe("Icon Component", () => {
  it("should render with default props", () => {
    const { container } = render(<Icon type="warning" />);

    const icon = container.querySelector("svg");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass("h-6", "w-6");
  });

  it("should handle different icon types", () => {
    const { rerender, container } = render(<Icon type="warning" />);
    let icon = container.querySelector("svg");
    expect(icon?.querySelector("path")).toHaveAttribute(
      "d",
      expect.stringContaining("M12 9v2m0 4h.01")
    );

    rerender(<Icon type="user" />);
    icon = container.querySelector("svg");
    expect(icon?.querySelector("path")).toHaveAttribute(
      "d",
      expect.stringContaining("M16 7a4 4 0 11-8 0")
    );

    rerender(<Icon type="document" />);
    icon = container.querySelector("svg");
    expect(icon?.querySelector("path")).toHaveAttribute(
      "d",
      expect.stringContaining("M9 12h6m-6 4h6")
    );
  });

  it("should handle different sizes", () => {
    const { rerender, container } = render(<Icon type="warning" size="sm" />);
    expect(container.querySelector("svg")).toHaveClass("h-4", "w-4");

    rerender(<Icon type="warning" size="md" />);
    expect(container.querySelector("svg")).toHaveClass("h-6", "w-6");

    rerender(<Icon type="warning" size="lg" />);
    expect(container.querySelector("svg")).toHaveClass("h-8", "w-8");

    rerender(<Icon type="warning" size="xl" />);
    expect(container.querySelector("svg")).toHaveClass("h-12", "w-12");
  });

  it("should apply custom className", () => {
    const { container } = render(
      <Icon type="warning" className="text-red-500 custom-class" />
    );

    const icon = container.querySelector("svg");
    expect(icon).toHaveClass("text-red-500", "custom-class");
  });

  it("should have proper accessibility attributes", () => {
    const { container } = render(<Icon type="warning" />);

    const icon = container.querySelector("svg");
    expect(icon).toHaveAttribute("aria-hidden", "true");
  });

  it("should have proper SVG structure", () => {
    const { container } = render(<Icon type="warning" />);

    const icon = container.querySelector("svg");
    expect(icon).toHaveAttribute("fill", "none");
    expect(icon).toHaveAttribute("viewBox", "0 0 24 24");
    expect(icon).toHaveAttribute("stroke", "currentColor");

    const path = icon?.querySelector("path");
    expect(path).toHaveAttribute("stroke-linecap", "round");
    expect(path).toHaveAttribute("stroke-linejoin", "round");
    expect(path).toHaveAttribute("stroke-width", "2");
  });
});
