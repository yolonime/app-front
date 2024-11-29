import { render, screen } from "@testing-library/react";
import Input from "./Input";
import userEvent from "@testing-library/user-event";

describe("Input", () => {
  it("should trigger onChange", () => {
    const onchange = jest.fn();

    render(<Input onChange={onchange} />);

    const input = screen.getByPlaceholderText("saisie");

    userEvent.type(input, "AAA");

    expect(onchange).toBeCalled();
  });
});
