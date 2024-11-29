import { render, screen } from "@testing-library/react";
import Counter from ".";
import userEvent from "@testing-library/user-event";

const renderComponent = () => {
  return render(<Counter />);
};

describe("Counter component", () => {
  it("should render correctly", () => {
    const { container } = renderComponent();
 
    expect(container).toMatchSnapshot();
  });

  it("should display 0 at init", () => {
    renderComponent();

    const value = screen.getByText("0");

    expect(value).toBeVisible();
  });

  it("should increment value on Add button click", async () => {
    renderComponent();

    const button = screen.getByRole("button", { name: "Add" });

    await userEvent.click(button);

    expect(screen.getByText("1")).toBeVisible();
  });

  it("should decrement value on - button click", async () => {
    renderComponent();

    const button = screen.getByRole("button", { name: "-" });

    await userEvent.click(button);

    expect(screen.getByText("-1")).toBeVisible();
  });
});
