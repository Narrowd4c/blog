export default defineEventHandler((event) => {
  // const article = getRouterParam(event, 'article')
  return [
    {
      name: "Nuxt.js",
      about: "Vue.js 的全端框架",
      link: "https://nuxt.com/",
      type: "程式",
    },
    {
      name: "CSS-Doodle",
      about: "css 圖案套件",
      link: "https://css-doodle.com/",
      type: "程式",
    },
    {
      name: "MapBox",
      about: "線上地圖套件",
      link: "https://www.mapbox.com/",
      type: "其他",
    },
    {
      name: "Clip drop",
      about: "AI 圖片處理",
      link: "https://clipdrop.co/",
      type: "其他",
    },
  ];
});
