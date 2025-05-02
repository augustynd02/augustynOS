import { render, screen, fireEvent } from '@testing-library/react';
import ImageFile from './ImageFile';
import { ImageFile as ImageFileType } from '../../types/ImageFile';

const mockImageFile: ImageFileType = {
  id: '1',
  name: 'test-image.jpg',
  type: 'imagefile',
  src: 'https://example.com/test-image.jpg',
};

describe('ImageFile component', () => {
  it('renders image with correct src and alt', () => {
    render(<ImageFile file={mockImageFile} />);
    const img = screen.getByRole('img') as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.src).toBe(mockImageFile.src);
    expect(img.alt).toBe(mockImageFile.name);
  });

  it('zooms in the image', () => {
    render(<ImageFile file={mockImageFile} />);
    const img = screen.getByRole('img');
    const zoomInButton = screen.getByRole('button', { name: /zoom in/i }) || screen.getAllByRole('button')[1];

    fireEvent.click(zoomInButton);
    expect(img).toHaveStyle('transform: scale(1.2)');
  });

  it('zooms out the image with minimum scale limit', () => {
    render(<ImageFile file={mockImageFile} />);
    const img = screen.getByRole('img');
    const zoomOutButton = screen.getByRole('button', { name: /zoom out/i }) || screen.getAllByRole('button')[0];

    fireEvent.click(zoomOutButton);
    fireEvent.click(zoomOutButton);
    fireEvent.click(zoomOutButton);
    fireEvent.click(zoomOutButton);
    fireEvent.click(zoomOutButton);

    expect(img).toHaveStyle('transform: scale(0.2)');
  });
});
