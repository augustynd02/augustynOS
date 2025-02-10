import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Desktop from "../Desktop/Desktop";
import DesktopIcon from "../DesktopIcon/DesktopIcon";
import AppProvider from "../../contexts/AppProvider";

describe("Window", () => {
    it("renders upon a desktop icon being double-clicked", async () => {
        render(
            <AppProvider>
                <Desktop>
                    <DesktopIcon name="Test" type="test"/>
                </Desktop>
            </AppProvider>
        );
        const desktopIcon = screen.getByTestId('desktopicon');
        fireEvent.dblClick(desktopIcon);

        expect(await screen.findByTestId("window")).toBeInTheDocument();
    });

    it("closes upon close button being clicked", async () => {
        render(
            <AppProvider>
                <Desktop>
                    <DesktopIcon name="Test" type="test"/>
                </Desktop>
            </AppProvider>
        );

        const desktopIcon = screen.getByTestId('desktopicon');
        fireEvent.dblClick(desktopIcon);

        await waitFor(() => expect(screen.getByTestId("window")).toBeInTheDocument());

        const button = screen.getByTestId("close");
        fireEvent.click(button);

        expect(screen.queryByTestId("window")).not.toBeInTheDocument();
    });
});
