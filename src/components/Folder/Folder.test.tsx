import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Folder from './Folder';
import FileSystemProvider from '../../contexts/FileSystem/FileSystemProvider';
import AppProvider from '../../contexts/App/AppProvider';
import  createFolder from '../../utils/createFolder';
import createFile from '../../utils/createFile';
import { Folder as FolderType } from '../../types/Folder';
import { vi } from 'vitest';

const fileSystemMock = createFolder('root', 'Root', [
  createFolder('desktop', 'Desktop', [
    createFolder('folder1', 'Test folder 1', [
      createFolder('folder2', 'Nested folder 2', [
        createFolder('folder3', 'Nested folder 3', [
          createFolder('folder4', 'Nested folder 4', [])
        ]),
        createFile('nestedfile2', 'Nested file 2')
      ]),
      createFile('nestedfile1', 'Nested file 1')
    ]),
    createFile('file1', 'Test file 1'),
    createFile('file2', 'Test file 2')
  ])
]);

const appContextMock = {
  openApps: [],
  startApp: vi.fn(),
  closeApp: vi.fn(),
  toggleMinimize: vi.fn(),
  editAppName: vi.fn(),
};

describe('Folder component', () => {
  const renderFolder = (file: FolderType) => {
    render(
      <FileSystemProvider>
        <AppProvider value={appContextMock}>
          <Folder file={file} appId="app1" />
        </AppProvider>
      </FileSystemProvider>
    );
  };

  test('renders the folder name and children', () => {
    renderFolder(fileSystemMock);

    expect(screen.getByDisplayValue('Root')).toBeInTheDocument();
    expect(screen.getByText('Test folder 1')).toBeInTheDocument();
    expect(screen.getByText('Test file 1')).toBeInTheDocument();
  });

  test('can navigate to a subfolder', async () => {
    renderFolder(fileSystemMock);

    const folder1 = screen.getByText('Test folder 1');
    fireEvent.click(folder1);

    await waitFor(() => {
      expect(screen.getByDisplayValue('Test folder 1')).toBeInTheDocument();
      expect(screen.getByText('Nested folder 2')).toBeInTheDocument();
    });
  });

  test('can go back in history', async () => {
    renderFolder(fileSystemMock);

    const folder1 = screen.getByText('Test folder 1');
    fireEvent.click(folder1);

    await waitFor(() => {
      expect(screen.getByDisplayValue('Test folder 1')).toBeInTheDocument();
    });

    const backButton = screen.getByTitle('Back to Root');
    fireEvent.click(backButton);

    expect(screen.getByDisplayValue('Root')).toBeInTheDocument();
  });

  test('can go forward in history', async () => {
    renderFolder(fileSystemMock);

    const folder1 = screen.getByText('Test folder 1');
    fireEvent.click(folder1);

    await waitFor(() => {
      expect(screen.getByDisplayValue('Test folder 1')).toBeInTheDocument();
    });

    const backButton = screen.getByTitle('Back to Root');
    fireEvent.click(backButton);

    const forwardButton = screen.getByTitle('Forward to Test folder 1');
    fireEvent.click(forwardButton);

    expect(screen.getByDisplayValue('Test folder 1')).toBeInTheDocument();
  });

  test('does not go back if there is no history', () => {
    renderFolder(fileSystemMock);

    const backButton = screen.getByTitle('Back to Root');
    fireEvent.click(backButton);

    expect(screen.getByDisplayValue('Root')).toBeInTheDocument();
  });

  test('updates the app name in context on folder navigation', async () => {
    renderFolder(fileSystemMock);

    const folder1 = screen.getByText('Test folder 1');
    fireEvent.click(folder1);

    await waitFor(() => {
      expect(appContextMock.editAppName).toHaveBeenCalledWith('app1', 'Test folder 1');
    });
  });

  test('displays empty folder message when no children are present', async () => {
    const emptyFolder = createFolder('empty', 'Empty Folder', []);

    renderFolder(emptyFolder);

    expect(screen.getByText('This folder is empty.')).toBeInTheDocument();
  });

  test('disables back and forward buttons when there is no history', () => {
    renderFolder(fileSystemMock);

    const backButton = screen.getByTitle('Back to Root');
    const forwardButton = screen.getByTitle('Forward to Test folder 1');

    expect(backButton).toBeDisabled();
    expect(forwardButton).toBeDisabled();
  });

  test('handles folder search input', () => {
    renderFolder(fileSystemMock);

    const searchInput = screen.getByPlaceholderText('Search...');
    fireEvent.change(searchInput, { target: { value: 'Test file 1' } });

    expect(searchInput.value).toBe('Test file 1');
  });
});
