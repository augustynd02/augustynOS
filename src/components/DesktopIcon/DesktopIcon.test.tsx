import { render, screen, getByTestId, fireEvent } from "@testing-library/react";
import DesktopIcon from "./DesktopIcon";

describe("DesktopIcon", () => {
    const name = "Test app";
    const iconURL = "https://example.com/icon.png";

    it("renders the component with provided props", () => {
        render(<DesktopIcon name={name} iconURL={iconURL} />);

        const img = screen.getByRole("img");
        expect(img).toHaveAttribute("src", iconURL);
        expect(img).toHaveAttribute("alt", `${name} icon`);

        expect(screen.getByText(name)).toBeInTheDocument();
    });

    it("uses the default image if no iconURL is provided", () => {
        render(<DesktopIcon name={name} />);

        const img = screen.getByRole("img");
        expect(img).toHaveAttribute("src", expect.stringContaining("placeholder.jpg"));
    });

    it("properly positions itself after being dragged and dropped", () => {
        render(<DesktopIcon name={name} />);
        const desktopIcon = screen.getByTestId('desktopicon');
        const event = new MouseEvent('dragend', {
            bubbles: true,
            cancelable: true,
            clientX: 20,
            clientY: 410,
          });
        Object.defineProperty(event, 'target', {
            value: desktopIcon,
            writable: true,
        });
        fireEvent(desktopIcon, event);
        expect(desktopIcon).toHaveStyle('grid-row-start: 5; grid-column-start: 1');
    })
});
