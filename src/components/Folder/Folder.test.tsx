import { render, screen, fireEvent } from '@testing-library/react';
import Folder from './Folder';
import createFolder from '../../utils/createFolder';
import { vi } from 'vitest';
import AppContext from '../../contexts/App/AppContext';

const mockFolder = createFolder('root', 'Root', [
	createFolder('subfolder', 'Subfolder', []),
])

const appContextMock = {
	openApps: [],
	startApp: vi.fn(),
	closeApp: vi.fn(),
	toggleMinimize: vi.fn(),
	editAppName: vi.fn(),
};

const renderFolder = () => {
	render(
		<AppContext.Provider value={appContextMock}>
			<Folder file={mockFolder} appId="root" />
		</AppContext.Provider>
	)
}

describe('Folder component', () => {
	it("renders itself and all buttons", () => {
		renderFolder();

		expect(screen.getByTestId('folder')).toBeInTheDocument();
		expect(screen.getByRole('button', { name: 'Go back'})).toBeInTheDocument();
		expect(screen.getByRole('button', { name: 'Go forward'})).toBeInTheDocument();
	})

	it("displays correct information about the amount of children", () => {
		renderFolder();

		expect(screen.getByText(/1\sitem/i)).toBeInTheDocument();
	})

	it("can open other folders", () => {
		renderFolder();

		const subFolderIcon = screen.getByTestId('foldericon');

		fireEvent.dblClick(subFolderIcon);

		expect(screen.getByText('This folder is empty.')).toBeInTheDocument();
	})

	it("can go back in history to a previous folder", () => {
		renderFolder();

		const subFolderIcon = screen.getByTestId('foldericon');
		fireEvent.dblClick(subFolderIcon);

		const backButton = screen.getByRole('button', { name: 'Go back'});
		fireEvent.click(backButton);

		expect(screen.getByText(/1\sitem/i)).toBeInTheDocument();
	})

	it("can go forwards in history to another folder", () => {
		renderFolder();

		const subFolderIcon = screen.getByTestId('foldericon');
		fireEvent.dblClick(subFolderIcon);

		const backButton = screen.getByRole('button', { name: 'Go back'});
		fireEvent.click(backButton);

		const forwardButton = screen.getByRole('button', { name: 'Go forward'});
		fireEvent.click(forwardButton);

		expect(screen.getByText('This folder is empty.')).toBeInTheDocument();
	})
});

