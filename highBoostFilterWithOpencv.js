
function highBoostFilterWithOpencv(image, boost_factor) {
  const src = cv.imread(image);

  const dst = new cv.Mat();
  const kernel = new cv.Mat(3, 3, cv.CV_32FC1);
  const anchor = new cv.Point(-1, -1);
  cv.filter2D(src, dst, src.depth(), kernel, anchor, 0, cv.BORDER_DEFAULT);
  const highboost = new cv.Mat();
  cv.addWeighted(src, 1 + boost_factor, dst, -boost_factor, 0, highboost);
  cv.imshow('canvas', highboost);
  src.delete();
  dst.delete();
  kernel.delete();

  highboost.delete();
}