import { fireEvent, render, screen } from '@testing-library/react';
import Taskbar from './Taskbar';
import Desktop from "../Desktop/Desktop";
import DesktopIcon from "../DesktopIcon/DesktopIcon";
import AppProvider from "../../contexts/AppProvider";
import { Application } from '../../types/Application';

describe('Taskbar', () => {
    const icons:Application[] = [
        {
            id: Date.now().toString(),
            name: "Test",
            type: "test",
        }
    ];
    it("renders tabs from open apps", () => {
        render(
            <AppProvider>
                <Desktop icons={icons} />
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
