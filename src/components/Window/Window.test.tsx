import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Desktop from "../Desktop/Desktop";
import AppProvider from "../../contexts/AppProvider";
import { Icon } from "../../types/Icon";
import createApp from "../../utils/createApp";

describe("Window", () => {
    const icons:Icon[] = [
        createApp("test", "test")
    ];

    it("renders upon a desktop icon being double-clicked", async () => {
        render(
            <AppProvider>
                <Desktop icons={icons} />
            </AppProvider>
        );
        const desktopIcon = screen.getByTestId('desktopicon');
        fireEvent.dblClick(desktopIcon);

        expect(await screen.findByTestId("window")).toBeInTheDocument();
    });

    it("closes upon close button being clicked", async () => {
        render(
            <AppProvider>
               <Desktop icons={icons} />
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
