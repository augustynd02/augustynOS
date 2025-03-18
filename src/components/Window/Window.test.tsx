import { render, screen, fireEvent } from '@testing-library/react';
import Window from './Window';
import AppContext from '../../contexts/App/AppContext';
import createFile from '../../utils/createFile';
import createApp from '../../utils/createApp';
import { vi } from 'vitest';

describe('Window component', () => {
    const mockCloseApp = vi.fn();
    const mockToggleMinimize = vi.fn();

    const file = createFile('file1', 'Test File');
    const app = createApp(file);

    const renderWindow = (testApp = app) => {
        return render(
            <AppContext.Provider value={{ openApps: [testApp], startApp: vi.fn(), closeApp: mockCloseApp, editAppName: vi.fn(), toggleMinimize: mockToggleMinimize }}>
                <Window app={testApp} />
            </AppContext.Provider>
        );
    };

    it('renders the window correctly', () => {
        renderWindow();
        expect(screen.getByTestId('window')).toBeInTheDocument();
    });

    it('displays the app icon and name', () => {
        renderWindow();
        expect(screen.getByAltText('Test File icon')).toBeInTheDocument();
        expect(screen.getByText('Test File')).toBeInTheDocument();
    });

    it('closes the window when close button is clicked', () => {
        renderWindow();

        fireEvent.click(screen.getByTestId('close'));

        expect(mockCloseApp).toHaveBeenCalledWith('file1');
    });

    it('handles drag events', () => {
        renderWindow();

        const titleBar = screen.getByText('Test File');

        fireEvent.mouseDown(titleBar);
        fireEvent.mouseUp(titleBar);

        expect(screen.getByTestId('window')).toBeInTheDocument();
    });
});
