import { Icon } from "../types/Icon";

const createIcon = (name: string, type: string, iconURL: string = "https://static.thenounproject.com/png/5018320-200.png"):Icon=> {
    const icon:Icon = {
        id: Date.now().toString(),
        name: name,
        type: type,
        iconURL: iconURL,
    }
    return icon;
}

export default createIcon;
