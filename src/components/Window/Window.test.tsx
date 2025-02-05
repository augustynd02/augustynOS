import { render, screen, fireEvent } from "@testing-library/react";
import Desktop from "../Desktop/Desktop";
import DesktopIcon from "../DesktopIcon/DesktopIcon";

describe("Window", () => {
    it("renders upon a desktop icon being double-clicked", () => {
        render(
            <Desktop>
                <DesktopIcon name="Test" />
            </Desktop>
        );
        const desktopIcon = screen.getByTestId('desktopicon');

        const event = new MouseEvent('dblclick');

        fireEvent(desktopIcon, event);

        expect(screen.getByTestId("window")).toBeInTheDocument();
    });
});
