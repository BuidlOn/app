import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Pagination } from "../pagination";

describe("Pagination", () => {
  it("renders nothing when there is only one page", () => {
    const { container } = render(
      <Pagination page={1} totalPages={1} onPageChange={vi.fn()} />,
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("lists every page without ellipsis when the range is small", () => {
    render(<Pagination page={1} totalPages={5} onPageChange={vi.fn()} />);
    for (const n of ["1", "2", "3", "4", "5"]) {
      expect(screen.getByRole("button", { name: n })).toBeInTheDocument();
    }
    expect(screen.queryByText("…")).not.toBeInTheDocument();
  });

  it("collapses a long range around the current page", () => {
    render(<Pagination page={20} totalPages={40} onPageChange={vi.fn()} />);

    for (const n of ["1", "19", "20", "21", "40"]) {
      expect(screen.getByRole("button", { name: n })).toBeInTheDocument();
    }
    expect(screen.queryByRole("button", { name: "10" })).not.toBeInTheDocument();
    expect(screen.getAllByText("…")).toHaveLength(2);
  });

  it("marks the active page for assistive tech", () => {
    render(<Pagination page={3} totalPages={10} onPageChange={vi.fn()} />);
    expect(screen.getByRole("button", { name: "3" })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });

  it("disables the previous control on the first page", () => {
    render(<Pagination page={1} totalPages={10} onPageChange={vi.fn()} />);
    expect(screen.getByRole("button", { name: /previous page/i })).toBeDisabled();
    expect(screen.getByRole("button", { name: /next page/i })).toBeEnabled();
  });

  it("disables the next control on the last page", () => {
    render(<Pagination page={10} totalPages={10} onPageChange={vi.fn()} />);
    expect(screen.getByRole("button", { name: /next page/i })).toBeDisabled();
  });

  it("reports the requested page to the caller", async () => {
    const onPageChange = vi.fn();
    render(<Pagination page={3} totalPages={10} onPageChange={onPageChange} />);

    await userEvent.click(screen.getByRole("button", { name: "4" }));
    expect(onPageChange).toHaveBeenCalledWith(4);

    await userEvent.click(screen.getByRole("button", { name: /previous page/i }));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });
});
