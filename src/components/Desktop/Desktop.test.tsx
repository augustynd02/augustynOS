import { render, screen, fireEvent } from '@testing-library/react';
import Desktop from './Desktop';
import AppContext from '../../contexts/App/AppContext';
import ActionsContext from '../../contexts/Actions/ActionsContext';
import FileSystemContext from '../../contexts/FileSystem/FileSystemContext';
import createFolder from '../../utils/createFolder';
import createApp from '../../utils/createApp';
import createFile from '../../utils/createFile';
import { vi } from 'vitest';
import { Folder } from '../../types/Folder';

describe('Desktop component', () => {
    const mockHandleOpenModal = vi.fn();

    const file1 = createFile("file1", "Custom File 1");

    const customFileSystem = createFolder('root', 'root', [
        createFolder('desktop', 'desktop', [file1])
    ])

    const customGetFolder = (id: string) => {
        return customFileSystem.children.find((item) => item.id === id) as Folder;
    }

    const customOpenApps = [createApp(file1)];

    const renderDesktop = () => {
        return render(
            <ActionsContext.Provider value={{ handleOpenModal: mockHandleOpenModal, handleCloseModal: vi.fn(), modalPosition: { x: 0, y: 0 }, isModalShown: false, actions: [] }}>
                <AppContext.Provider value={{ openApps: customOpenApps, startApp: vi.fn(), closeApp: vi.fn(), editAppName: vi.fn(), toggleMinimize: vi.fn() }}>
                    <FileSystemContext.Provider value={{ fileSystem: customFileSystem, getFolder: customGetFolder }}>
                        <Desktop />
                    </FileSystemContext.Provider>
                </AppContext.Provider>
            </ActionsContext.Provider>
        );
    };

    it('renders correctly', () => {
        renderDesktop();
        expect(screen.getByTestId('desktop')).toBeInTheDocument();
    });

    it('renders desktop icons based on custom file system', () => {
        renderDesktop();
        expect(screen.getByTestId('desktopicon')).toBeInTheDocument();
    });

    it('renders open app windows based on custom app context', () => {
        renderDesktop();
        expect(screen.getByTestId('window')).toBeInTheDocument();
    });

    it('calls handleOpenModal on right-click', () => {
        renderDesktop();
        fireEvent.contextMenu(screen.getByTestId('desktop'));
        expect(mockHandleOpenModal).toHaveBeenCalled();
    });
});
