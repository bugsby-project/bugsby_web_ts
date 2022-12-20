export const formatString = (text: string | undefined) => {
    return text ? text.replaceAll("_", " ") : "";
};