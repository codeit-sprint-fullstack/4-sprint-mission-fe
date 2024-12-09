export const is_image = ["jpg", "jpeg", "png", "gif", "bmp"];

export function IsImage(src) {
  return is_image.includes(src.split(".").pop());
}


export default IsImage;