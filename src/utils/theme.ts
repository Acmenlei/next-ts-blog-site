// 获取当前主题颜色
export function getCurrentTheme(color: string) {
  return color === 'light' ? '#222' : '#888';
}
// 改变对应的主题颜色
export function getReflectTheme(color: string) {
  return color === 'light' ? 'dark' : 'light';
}