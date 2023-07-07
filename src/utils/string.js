export const trimString = (string) => {
  if (string.length > 20) {
    return string.slice(0, 20) + "...";
  }
  return string;
};

export const copyToClipboard = (text) => {
  console.log("TEXT", text);
  navigator.clipboard
    .writeText(text)
    .then(() => {
      console.log("Text copied to clipboard");
    })
    .catch((error) => {
      console.error("Error copying text to clipboard:", error);
    });
};
