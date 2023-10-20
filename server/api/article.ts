export default defineEventHandler((event) => {
  return [
    {
      id: 1,
      type: "JavaScript",
      article: "<h1>Coco</h1><p>P</p><p>P</p><pre>var a = 'a'  全域變數 b = 'b' // 全域屬性 \n像是物件中的 key console.log(window) 變數不可被刪除,\n  // delete a , delete b function fn (){var a = 'a2'b = 'b'}fn()console.log(a) // error console.log(b)</pre>",
      title: '變數與作用域',
      link:'',
    },
    {
      id: 2,
      type: "CSS",
      title: "用 linear-gradient 實現彩色邊框",
      article: "使用 linear-gradient 和 background:border-box 組合",
      link: "https://codepen.io/narrowd4c/pen/GRPLLeg",
    },
    {
      id: 3,
      type: "TailwindCSS",
    },
    {
      id: 5,
      type: "CSS",
      title: "COCo",
      article: "okok",
    },
    {
      id: 4,
      type: "Vue",
    },
  ];
});
