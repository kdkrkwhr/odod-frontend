import { Dimensions, Platform } from "react-native";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");

// iphone 8 로 해상도로 개발 진행
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 667;

console.log("장비 사이즈 ", WIDTH, HEIGHT);
const scale = (size: number) => (WIDTH / guidelineBaseWidth) * size;
const verticalScale = (size: number) => (HEIGHT * size) / guidelineBaseHeight;
const moderateScale = (size: number, factor: number = 1) =>
  size + (scale(size) - size) * factor;

export { scale, verticalScale, moderateScale };
