import { render, screen, fireEvent } from '@testing-library/react';
import Notepad from './Notepad';
import AppContext from '../../contexts/App/AppContext';
import FileSystemContext from '../../contexts/FileSystem/FileSystemContext';
import { TextFile } from '../../types/TextFile';
import { vi } from 'vitest';
import createFolder from '../../utils/createFolder';

describe('Notepad component', () => {
  const mockEditAppName = vi.fn();
  const mockCloseApp = vi.fn();
  const mockUpdateFileById = vi.fn();

  const mockFile: TextFile = {
    id: 'file1',
    name: 'MyNote.txt',
    content: 'Initial content',
    type: 'textfile',
  };

  const mockFileSystem = createFolder('root', 'root', []);

  const renderNotepad = () =>
    render(
      <AppContext.Provider value={{ editAppName: mockEditAppName, closeApp: mockCloseApp, startApp: vi.fn(), toggleMinimize: vi.fn(), openApps: [] }}>
        <FileSystemContext.Provider value={{ updateFileById: mockUpdateFileById, getFolder: vi.fn(), setFileSystem: vi.fn(), fileSystem: mockFileSystem }}>
          <Notepad file={mockFile} />
        </FileSystemContext.Provider>
      </AppContext.Provider>
    );

  it('renders the notepad and shows initial content', () => {
    renderNotepad();
    const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
    expect(textarea.value).toBe('Initial content');
  });

  it('shows character count correctly', () => {
    renderNotepad();
    expect(screen.getByText('15 characters')).toBeInTheDocument();
  });

  it('updates content on change', () => {
    renderNotepad();
    const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
    fireEvent.change(textarea, { target: { value: 'New content' } });
    expect(textarea.value).toBe('New content');
  });

  it('opens file menu and calls save', () => {
    renderNotepad();

    const fileMenu = screen.getByText('File');
    fireEvent.click(fileMenu);

    const saveOption = screen.getByText('Save');
    fireEvent.click(saveOption);

    expect(mockUpdateFileById).toHaveBeenCalledWith('file1', expect.any(Function));
  });

  it('closes the app on Exit click', () => {
    renderNotepad();

    const fileMenu = screen.getByText('File');
    fireEvent.click(fileMenu);

    const exitOption = screen.getByText('Exit');
    fireEvent.click(exitOption);

    expect(mockCloseApp).toHaveBeenCalledWith('file1');
  });

  it('marks file as edited with * when content changes', () => {
    renderNotepad();
    const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
    fireEvent.change(textarea, { target: { value: 'Changed content' } });
    expect(mockEditAppName).toHaveBeenCalledWith('file1', '* MyNote.txt');
  });

  it('removes * from filename when content is reverted', () => {
    renderNotepad();
    const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
    fireEvent.change(textarea, { target: { value: 'Changed content' } });
    fireEvent.change(textarea, { target: { value: 'Initial content' } });
    expect(mockEditAppName).toHaveBeenCalledWith('file1', 'MyNote.txt');
  });
});
