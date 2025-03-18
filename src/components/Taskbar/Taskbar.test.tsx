import { render, screen, fireEvent } from '@testing-library/react';
import Taskbar from './Taskbar';
import AppContext from '../../contexts/App/AppContext';
import ActionsContext from '../../contexts/Actions/ActionsContext';
import createFile from '../../utils/createFile';
import createApp from '../../utils/createApp';

describe('Taskbar component', () => {
    const mockToggleMinimize = vi.fn();
    const mockHandleOpenModal = vi.fn();

    const file1 = createFile('file1', 'File 1');
    const file2 = createFile('file2', 'File 2');
    const app1 = createApp(file1);
    const app2 = createApp(file2);

    const renderTaskbar = () => {
        return render(
            <ActionsContext.Provider value={{ handleOpenModal: mockHandleOpenModal, handleCloseModal: vi.fn(), modalPosition: { x: 0, y: 0 }, isModalShown: false, actions: [] }}>
                <AppContext.Provider value={{ openApps: [app1, app2], startApp: vi.fn(), closeApp: vi.fn(), editAppName: vi.fn(), toggleMinimize: mockToggleMinimize }}>
                    <Taskbar />
                </AppContext.Provider>
            </ActionsContext.Provider>
        );
    };

    it('renders the taskbar correctly', () => {
        renderTaskbar();
        expect(screen.getByTestId('taskbar')).toBeInTheDocument();
    });

    it('correctly displays open applications as tabs', () => {
        renderTaskbar();

        const tabs = screen.getByTestId('tabs');
        expect(tabs.children).toHaveLength(2);
        expect(screen.getByText('File 1')).toBeInTheDocument();
        expect(screen.getByText('File 2')).toBeInTheDocument();
    });

    it('calls toggleMinimize when clicking an app tab', () => {
        renderTaskbar();

        const tab = screen.getByText('File 1');
        fireEvent.click(tab);

        expect(mockToggleMinimize).toHaveBeenCalledWith('file1');
    });

    it('calls handleOpenModal on right-clicking the taskbar', () => {
        renderTaskbar();

        fireEvent.contextMenu(screen.getByTestId('taskbar'));

        expect(mockHandleOpenModal).toHaveBeenCalled();
    });

    it('renders the start menu icon', () => {
        renderTaskbar();
        expect(screen.getByTestId('startmenu')).toBeInTheDocument();
    });
});
