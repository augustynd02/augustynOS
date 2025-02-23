import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Desktop from "../Desktop/Desktop";
import AppProvider from "../../contexts/App/AppProvider";
import { Icon } from "../../types/Icon";
import createIcon from "../../utils/createIcon";
import { Application } from "../../types/Application";
import Window from "./Window";

describe("Window", () => {
    const icons: Icon[] = [
        createIcon("test", "test")
    ];

    const mockApp: Application = {
        id: '1',
        name: 'test',
        type: 'test',
        iconURL: 'testurl.jpg',
        isMinimized: false
    }

    it("renders correctly with given props", () => {
        render(
            <Window app={mockApp} />
        )

        const window = screen.getByTestId('window');
        const name = screen.getByText('test');
        const icon = screen.getByRole("img", { name: "test icon" });

        expect(window).toBeInTheDocument();
        expect(name).toBeInTheDocument();
        expect(icon).toBeInTheDocument();
        expect(icon).toHaveAttribute("src", "testurl.jpg");
    })

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
