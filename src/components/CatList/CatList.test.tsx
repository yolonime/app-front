import { render, waitFor, screen } from "@testing-library/react";
import mockData from "./cats";
import CatList from "./";

jest.mock("../../utils/api", () => {
  return {
    get: () => Promise.resolve(mockData),
  };
});

describe("Cat List component", () => {
  it("should display title", async () => {
    render(<CatList />);

    expect(screen.getByText("Some Random Cats")).toMatchSnapshot();
  });

  it("should fetch cats when button is clicked", async () => {
    const { baseElement } = render(<CatList />);
    await waitFor(() => {});
    expect(baseElement).toMatchSnapshot();
  });
});
