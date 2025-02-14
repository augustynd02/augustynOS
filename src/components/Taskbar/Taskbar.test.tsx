import { fireEvent, render, screen } from '@testing-library/react';
import Taskbar from './Taskbar';
import Desktop from "../Desktop/Desktop";
import AppProvider from "../../contexts/AppProvider";
import { Icon } from '../../types/Icon';
import createIcon from '../../utils/createIcon';

describe('Taskbar', () => {
    const icons:Icon[] = [
       createIcon("test", "test")
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
