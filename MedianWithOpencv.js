function medianFilterWithOpencv(image, ksize) {
  console.log("chamei")
  const src = cv.imread(image);
  const dst = new cv.Mat();
  cv.medianBlur(src, dst, ksize);
  cv.imshow('canvas', dst);
  src.delete();
  dst.delete();
}