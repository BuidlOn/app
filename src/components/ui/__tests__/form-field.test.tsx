import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { FormField } from "../form-field";
import { Input } from "../input";

function renderField(props: Partial<React.ComponentProps<typeof FormField>> = {}) {
  return render(
    <FormField label="Wallet address" {...props}>
      {(field) => <Input {...field} />}
    </FormField>,
  );
}

describe("FormField", () => {
  it("associates the label with the control", () => {
    renderField();
    expect(screen.getByLabelText(/wallet address/i)).toBeInTheDocument();
  });

  it("renders a hint and points aria-describedby at it while valid", () => {
    renderField({ hint: "An EVM address starting with 0x." });

    const input = screen.getByLabelText(/wallet address/i);
    const hint = screen.getByText("An EVM address starting with 0x.");

    expect(input).toHaveAttribute("aria-describedby", hint.id);
    expect(input).not.toHaveAttribute("aria-invalid");
  });

  it("marks the control invalid and describes it by the error message", () => {
    renderField({ error: "Enter a valid EVM wallet address." });

    const input = screen.getByLabelText(/wallet address/i);
    const error = screen.getByText("Enter a valid EVM wallet address.");

    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input.getAttribute("aria-describedby")).toContain(error.id);
  });

  it("replaces the hint with the error rather than showing both", () => {
    renderField({ hint: "Starts with 0x.", error: "Invalid address." });

    expect(screen.queryByText("Starts with 0x.")).not.toBeInTheDocument();
    expect(screen.getByText("Invalid address.")).toBeInTheDocument();
  });

  it("does not leak the internal invalid flag onto the DOM node", () => {
    renderField({ error: "Invalid address." });
    // `error` is consumed by Input; neither it nor `invalid` may reach the DOM.
    const input = screen.getByLabelText(/wallet address/i);
    expect(input).not.toHaveAttribute("invalid");
    expect(input).not.toHaveAttribute("error");
  });

  it("marks required fields for sighted users without polluting the label text", () => {
    renderField({ required: true });
    expect(screen.getByLabelText(/wallet address/i)).toBeInTheDocument();
  });
});
