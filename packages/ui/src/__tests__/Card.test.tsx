import React from "react";
import { render, screen } from "@testing-library/react";
import { Card } from "../components/Card";

describe("Card Component", () => {
  it("should render children content", () => {
    render(
      <Card>
        <h2>Card Title</h2>
        <p>Card content goes here</p>
      </Card>
    );

    expect(screen.getByText("Card Title")).toBeInTheDocument();
    expect(screen.getByText("Card content goes here")).toBeInTheDocument();
  });

  it("should apply default styling classes", () => {
    const { container } = render(<Card>Content</Card>);

    const card = container.firstChild;
    expect(card).toHaveClass(
      "rounded-lg",
      "bg-[#ffffff]",
      "shadow-md",
      "border",
      "p-6"
    );
  });

  it("should apply custom className", () => {
    const { container } = render(
      <Card className="custom-card-class">Content</Card>
    );

    const card = container.firstChild;
    expect(card).toHaveClass("custom-card-class");
  });

  it("should handle different padding options", () => {
    const { container, rerender } = render(<Card padding="sm">Content</Card>);
    expect(container.firstChild).toHaveClass("p-3");

    rerender(<Card padding="md">Content</Card>);
    expect(container.firstChild).toHaveClass("p-6");

    rerender(<Card padding="lg">Content</Card>);
    expect(container.firstChild).toHaveClass("p-8");
  });

  it("should maintain semantic structure", () => {
    render(
      <Card>
        <h3>Semantic heading</h3>
        <div>Nested content</div>
      </Card>
    );

    expect(screen.getByRole("heading", { level: 3 })).toBeInTheDocument();
    expect(screen.getByText("Nested content")).toBeInTheDocument();
  });
});
