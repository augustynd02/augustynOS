import { render, screen, getByTestId, fireEvent } from "@testing-library/react";
import DesktopIcon from "./DesktopIcon";
import createIcon from "../../utils/createIcon";

describe("DesktopIcon", () => {
    const icon = createIcon("test", "test");
    const iconWithImg = createIcon("test2", "test", "https://cdn-icons-png.flaticon.com/256/896/896866.png")

    it("renders the component with provided props", () => {
        render(<DesktopIcon icon={iconWithImg} />);

        const img = screen.getByRole("img");
        expect(img).toHaveAttribute("src", iconWithImg.iconURL);
        expect(img).toHaveAttribute("alt", `${iconWithImg.name} icon`);

        expect(screen.getByText(iconWithImg.name)).toBeInTheDocument();
    });

    it("uses the default image if no iconURL is provided", () => {
        render(<DesktopIcon icon={icon} />);

        const img = screen.getByRole("img");
        expect(img).toHaveAttribute("src", expect.stringContaining("5018320-200.png"));
    });

    it("properly positions itself after being dragged and dropped", () => {
        render(<DesktopIcon icon={icon} />);
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
