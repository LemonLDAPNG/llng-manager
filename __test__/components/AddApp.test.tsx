import "@testing-library/jest-dom";
import { fireEvent, screen } from "@testing-library/react";
import AddApp from "../../src/components/AddApp";
import { renderWithProviders } from "../../src/utils/test-utils";

describe("AddApp component", () => {
  it("renders without crashing", () => {
    renderWithProviders(<AddApp />);
  });

  it("toggles the popup when button is clicked", async () => {
    renderWithProviders(<AddApp />);

    expect(screen.queryByRole("dialog")).toBeNull();

    fireEvent.click(screen.getByText("", { selector: ".addButton" }));

    expect(screen.getByRole("dialog")).toBeInTheDocument();

    // fireEvent.click(screen.getByText("", { selector: ".addButton" }));
    // expect(screen.getByRole("dialog")).toBeInTheDocument();
    // fireEvent.keyPress(screen.getByTestId("overlay"), {
    //   key: "Escape",
    //   code: "Escape",
    //   keyCode: 27,
    //   charCode: 27,
    // });
    // await waitForElementToBeRemoved(screen.queryByRole("dialog"));
    // expect(screen.queryByRole("dialog")).toBeNull();
  });
});