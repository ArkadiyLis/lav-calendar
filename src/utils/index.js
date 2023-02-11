export const getRandomColorHex = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;

export const getColorHexByIndex = (index) => {
    const HEX_COLORS = ['#4A13E5', '#602CD5', '#A83CF0', '#A050B9', '#2259FD', '#B872ED', '#3321A0', '#571B5E', '#B90AE3', '#329CE2',]
    return HEX_COLORS[index % 10];
};