import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ErrorDisplay } from "../components/ErrorDisplay";

describe("ErrorDisplay Component", () => {
  it("should render with required props", () => {
    const { container } = render(<ErrorDisplay error="Test error message" />);

    expect(screen.getByText("Test error message")).toBeInTheDocument();
    expect(screen.getByText("Something went wrong")).toBeInTheDocument(); // Default title
    expect(container.querySelector("svg")).toBeInTheDocument(); // Warning icon
  });

  it("should render with default title", () => {
    render(<ErrorDisplay error="Network error" />);

    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });

  it("should render with custom title", () => {
    render(<ErrorDisplay error="Network error" title="Connection Failed" />);

    expect(screen.getByText("Connection Failed")).toBeInTheDocument();
    expect(screen.queryByText("Something went wrong")).not.toBeInTheDocument();
  });

  it("should render retry button when onRetry is provided", () => {
    const mockRetry = jest.fn();
    render(<ErrorDisplay error="Network error" onRetry={mockRetry} />);

    const retryButton = screen.getByRole("button", { name: "Retry" });
    expect(retryButton).toBeInTheDocument();
  });

  it("should not render retry button when onRetry is not provided", () => {
    render(<ErrorDisplay error="Network error" />);

    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("should call onRetry when retry button is clicked", () => {
    const mockRetry = jest.fn();
    render(<ErrorDisplay error="Network error" onRetry={mockRetry} />);

    fireEvent.click(screen.getByRole("button", { name: "Retry" }));
    expect(mockRetry).toHaveBeenCalledTimes(1);
  });

  it("should render with custom retry label", () => {
    const mockRetry = jest.fn();
    render(
      <ErrorDisplay
        error="Network error"
        onRetry={mockRetry}
        retryLabel="Try Again"
      />
    );

    expect(
      screen.getByRole("button", { name: "Try Again" })
    ).toBeInTheDocument();
  });

  it("should apply custom className", () => {
    const { container } = render(
      <ErrorDisplay error="Network error" className="custom-error-class" />
    );

    expect(container.firstChild).toHaveClass("custom-error-class");
  });

  it("should have proper accessibility structure", () => {
    render(<ErrorDisplay error="Network error" title="Error occurred" />);

    const heading = screen.getByRole("heading", { level: 3 });
    expect(heading).toHaveTextContent("Error occurred");

    const errorMessage = screen.getByText("Network error");
    expect(errorMessage).toBeInTheDocument();
  });

  it("should render warning icon with correct styling", () => {
    const { container } = render(<ErrorDisplay error="Network error" />);

    const icon = container.querySelector("svg");
    expect(icon).toHaveClass("mx-auto");
    expect(icon?.closest("div")).toHaveClass("text-red-500", "mb-4");
  });
});
