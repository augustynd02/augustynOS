import { fireEvent, render, screen } from '@testing-library/react';
import Taskbar from './Taskbar';
import Desktop from "../Desktop/Desktop";
import DesktopIcon from "../DesktopIcon/DesktopIcon";
import AppProvider from "../../contexts/AppProvider";

describe('Taskbar', () => {
    it("renders tabs from open apps", () => {
        render(
            <AppProvider>
                <Desktop>
                    <DesktopIcon name="Test" type="test"/>
                </Desktop>
                <Taskbar />
            </AppProvider>
        );

        const tabs = screen.getByTestId('tabs');
        expect(tabs.children).toHaveLength(0);

        const icon = screen.getByTestId('desktopicon');
        fireEvent.dblClick(icon);

        expect(tabs.children).toHaveLength(1);
    })
});
