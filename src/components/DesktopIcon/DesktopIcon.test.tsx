import { render, screen, getByTestId, fireEvent } from "@testing-library/react";
import DesktopIcon from "./DesktopIcon";
import createFile from "../../utils/createFile";

describe("DesktopIcon", () => {
    const file = createFile('test', 'test');
    const fileWithImg = createFile('test2', 'test2', 'https://cdn-icons-png.flaticon.com/256/896/896866.png')

    it("renders the component with provided props", () => {
        render(<DesktopIcon file={fileWithImg} />);

        const img = screen.getByRole("img");
        expect(img).toHaveAttribute("src", fileWithImg.iconURL);
        expect(img).toHaveAttribute("alt", `${fileWithImg.name} icon`);

        expect(screen.getByText(fileWithImg.name)).toBeInTheDocument();
    });

    it("uses the default image if no iconURL is provided", () => {
        render(<DesktopIcon file={file} />);

        const img = screen.getByRole("img");
        expect(img).toHaveAttribute("src", expect.stringContaining("windows-file-icon-16.jpg"));
    });

    it("properly positions itself after being dragged and dropped", () => {
        render(<DesktopIcon file={file} />);
        const desktopIcon = screen.getByTestId('desktopicon');
        const event = new MouseEvent('dragend', {
            bubbles: true,
            cancelable: true,
            clientX: 20,
            clientY: 410,
          });
        Object.defineProperty(event, 'target', {
            value: desktopIcon,
            writable: true,
        });
        fireEvent(desktopIcon, event);
        expect(desktopIcon).toHaveStyle('grid-row-start: 5; grid-column-start: 1');
    })
});
