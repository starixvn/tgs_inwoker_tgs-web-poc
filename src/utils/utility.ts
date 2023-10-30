import { copyImageToClipboard } from "copy-image-clipboard";

function imagePathGenerator(path: string): string {
  return `${process.env.PUBLIC_URL}/assets/images/${path}`;
}

export function copy(item: string): void {
  try {
    navigator.clipboard.writeText(item);
  } catch (e) {
    console.log(e.message);
  }
}

export function copyImage(image: string): void {
  copyImageToClipboard(image)
    .then(() => {
      console.log("Image Copied");
    })
    .catch((e: Error) => {
      console.log("Error: ", e.message);
    });
}

export function downloadImage(url: string, name: string): void {
  fetch(url)
    .then((resp) => resp.blob())
    .then((blob) => {
      const imageUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = imageUrl;
      a.download = name;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(imageUrl);
    })
    .catch((e: Error) => console.log("Error: " + e.message));
}

function removeSpace(str: string): string {
  return str && str.replace(/^\s+|\s+$/g, "");
}

function replaceUnderscoresWithSpace(str: string): string {
  const resultString = str.replace(/_/g, ' ');
  return resultString;
}

export const utility = {
  imagePathGenerator,
  copy,
  copyImage,
  downloadImage,
  removeSpace,
  replaceUnderscoresWithSpace
};
