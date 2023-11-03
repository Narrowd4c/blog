export default defineEventHandler((event) => {
  return [
    {
      type: "Vue",
      title: "響應式基礎 Ref & Reactive",
      link: "https://everlasting-hydrangea-e83.notion.site/ref-reactive-4b553ca8484948dc9f0c8069903d504c?pvs=4",
      article: `<article id="4b553ca8-4849-48dc-9f0c-8069903d504c" class="page sans"><header><h1 class="page-title">ref &amp; reactive</h1><p class="page-description"></p></header><div class="page-body"><p id="f18d8785-4867-4aab-b2ab-0e921c58e133" class="">ref 函式用於定義 vue 響應式狀態的值, 函式的參數接受任何型別並返回一個  ref 物件, 可透過 <code>.value</code> 使用響應式狀態的值</p><pre id="9dcffe89-e775-4b3d-a3f2-fe8b0eebed45" class="code"><code>import { ref } from &#x27;vue&#x27;
export default {
  setup() {
    const count = ref(0)

    console.log(count.value) // 0

    function increment(){
      count.value++
    }
    return {
      count,
      increment
    }
  }
}</code></pre><p id="26e095fd-4e58-4b79-9f3c-f11b1a6e2aa9" class="">在 SFC 中使用 setup 自動解構</p><ul id="79f37e14-8fef-460e-add0-035488bef982" class="toggle"><li><details open=""><summary><mark class="highlight-blue"><a href="https://cn.vuejs.org/api/composition-api-setup.html">setup() 函式</a></mark></summary><p id="117fc077-29ad-4b24-9597-65bac5f0079d" class=""><code>setup()</code> 本身不包含元件實例的存取權，即在 <code>setup()</code> 中存取 <code>this</code> 會是 <code>undefined</code></p><pre id="504c9aef-3c9f-4518-b5e6-9e4d965198cf" class="code"><code>&lt;script&gt;
import { ref, shallowRef } from &#x27;vue&#x27;
export default {
  data(){
    return {
        option:this
    }
  },
  mounted(){
    console.log(&#x27;option&#x27;, this.option) // 組件實例 Proxy(Object){...}
		console.log(&#x27;composition&#x27;, this.composition) // undefined
  },
  setup(){
    const composition = this
    return {
      composition
    }
  }
}
&lt;/script&gt;</code></pre></details></li></ul><pre id="c98dd306-9a29-460e-a111-cb35cf9078ec" class="code"><code>&lt;script setup&gt;
	import { ref } from &#x27;vue&#x27;

	const count = ref(0)

	console.log(count.value) // 0
&lt;/script&gt;</code></pre><p id="1f864ddd-363d-47cc-adb0-17bf15361e2a" class="">在模板中使用不需要使用 <code>.value</code> ,  因為在模板中使用 ref 會自動解構賦值</p><pre id="2969d7d5-e13c-4055-a7ff-b38b6ef4bcba" class="code"><code>import { ref } from &#x27;vue&#x27;

const count = ref(0)

function increment() {
  count.value++
}
---

&lt;template&gt;
	&lt;p&gt;{{ count }}&lt;/p&gt;
	&lt;button @click=&quot;count++&quot;&gt; +1 &lt;/button&gt;
&lt;/template&gt;</code></pre><h3 id="ad55a512-a11f-477b-92d7-23286ee7cd89" class="">ref 深層式響應式</h3><p id="b3b4f373-bdc4-4b96-baff-ed52368fcfb3" class="">深層物件的變化也會被檢測到</p><pre id="5e88e1ab-d2a7-4f7e-a1b5-249add38c616" class="code"><code>import { ref } from &#x27;vue&#x27;

const obj = ref({
  nested: { count: 0 },
  arr: [&#x27;foo&#x27;, &#x27;bar&#x27;]
})

function mutateDeeply() {
  obj.value.nested.count++
  obj.value.arr.push(&#x27;baz&#x27;)
}</code></pre><p id="b217ef5e-aad6-40b7-8d36-24ec5ba97c5b" class="">使用 shallowRef 減少大型不可變資料的響應性開銷</p><p id="5699d192-b3dc-4fa5-a91c-f221524bdc82" class="">僅追蹤淺層變化(<code>.value</code>)，放棄檢測深層可更快速訪問深層的值</p><pre id="65d8357e-31c6-44b4-8844-82bdbf3fea08" class="code"><code>const shallowArray = shallowRef([
  /* 巨大的列表，里面包含深层的对象 */
])

// 这不会触发更新...
shallowArray.value.push(newObject)
// 这才会触发更新
shallowArray.value = [...shallowArray.value, newObject]

// 这不会触发更新...
shallowArray.value[0].foo = 1
// 这才会触发更新
shallowArray.value = [
  {
    ...shallowArray.value[0],
    foo: 1
  },
  ...shallowArray.value.slice(1)
]</code></pre><h3 id="9be17b63-7b44-4861-be61-184f6fb43c79" class="">DOM 更新時機</h3><p id="8985d381-c9c5-4a88-a5a6-d6dc94bebe05" class=""><a href="https://book.vue.tw/CH1/1-7-lifecycle.html#%E7%8B%80%E6%85%8B%E7%9A%84%E6%9B%B4%E6%96%B0%E8%88%87%E7%95%AB%E9%9D%A2%E7%9A%84%E5%90%8C%E6%AD%A5">https://book.vue.tw/CH1/1-7-lifecycle.html#狀態的更新與畫面的同步</a></p><p id="659f804f-ba9a-40ae-869d-f82f483bc7ed" class="">當你修改了響應式狀態時，DOM 會自動更新。但是要注意的是，DOM 更新並不是同步的。 Vue 會在「next tick」更新周期中緩衝所有狀態的修改，以確保不管你進行了多少次狀態修改，每個元件只會更新一次。</p><pre id="c5facaf9-5541-48cc-97e7-4d6a7207a143" class="code"><code>&lt;script setup&gt;
import { ref, nextTick } from &#x27;vue&#x27;

const count = ref(0)

async function increment() {
  count.value++

  // DOM 还未更新
  console.log(document.getElementById(&#x27;counter&#x27;).textContent)   // 0

  await nextTick()
  // DOM 此时已经更新
  console.log(document.getElementById(&#x27;counter&#x27;).textContent)   // 1
	
	// 或是 callback
	nextTick(()=&gt;{
  console.log(document.getElementById(&#x27;counter&#x27;).textContent)}) // 1

}
&lt;/script&gt;

&lt;template&gt;
  &lt;button id=&quot;counter&quot; @click=&quot;increment&quot;&gt;{{ count }}&lt;/button&gt;
&lt;/template&gt;</code></pre><h3 id="e433299b-9a81-4ef9-87d0-4bd26a1591cc" class="">Reactive</h3><p id="f1c14298-6358-4ef7-8c4b-2fc05ff48c98" class="">reactive 是另一種定義響應式狀態的方式, 返回一個 Proxy 物件</p><p id="aaf892c4-cba2-4385-a481-e1fdd51494d5" class="">ref 的非原始值將透過 reactive 轉為 Proxy 物件</p><pre id="02e2595e-e6f8-407f-8ea4-cb7651b28ed5" class="code"><code>import { reactive } from &#x27;vue&#x27;;

const int = reactive({count:1})
const int2 = ref({count:1})

// 不需要透過 .value
console.log(int.count)

console.log(int)  // Proxy(Object){....}
console.log(int2) // RefImpl{...}</code></pre><p id="927290f0-6fb2-482f-9702-c356a990f2a1" class="">取消深層響應性：  <a href="https://cn.vuejs.org/api/reactivity-advanced.html#shallowreactive"><code><strong>shallowReactive()</strong></code></a></p><p id="8bb621bc-c96d-4f78-8f9e-9b8f03107e7c" class="">
</p><p id="bdf2e9ac-efa8-42c0-b68e-692f8c0e2f53" class="">為確保存取代理的一致性，<mark class="highlight-red">對同一個原始物件呼叫 reactive() 會總是傳回同樣的代理對象</mark>，而對一個已存在的代理對象呼叫 reactive() 會傳回其本身：</p><pre id="fc4310e1-66da-4e94-9e04-7d425d67684e" class="code"><code>const raw = {}
const proxy = reactive(raw)

console.log(raw === proxy) // false

// 在同一個物件上呼叫 reactive() 會傳回相同的代理
console.log(reactive(raw) === proxy) // true

// 在一個代理程式上呼叫 reactive() 會回傳它自己
console.log(reactive(proxy) === proxy) // true</code></pre><p id="c2469c23-d0ef-477a-973e-bc76bb189f90" class="">
</p><p id="4d78181c-e116-4ca1-8a6c-c69088ac89c0" class="">Reactive 的局限性</p><ol type="1" id="d43acb19-2aac-4c01-aa76-caf2780e4105" class="numbered-list" start="1"><li>只能使用非原始值 Object, Array Map…</li></ol><ol type="1" id="4e69ba64-907c-4ea5-813a-899e4d87dfe4" class="numbered-list" start="2"><li>不能替換整個物件：由於 Vue 的響應式追蹤是透過屬性存取實現的，因此我們必須始終保持對響應式物件相同的參考。這意味著我們不能輕易地「替換」響應式對象，因為這樣的話與第一個引用的響應性連接將丟失：</li></ol><pre id="c267e36c-4453-4a7f-8e5d-c4b0a4543b59" class="code"><code>&lt;script setup&gt;
import { reactive,computed } from &#x27;vue&#x27;


let int = reactive({int:123})
console.log(int)

function change(){
  int = reactive({int:3322})
}

function add(){
  int.int++
}

const compute = computed(()=&gt;{
  return 'int: $ {int.int}'
})

&lt;/script&gt;

&lt;template&gt;
    &lt;p &gt;{{compute}}&lt;/p&gt; 
    &lt;p @click=&quot;add&quot;&gt;add&lt;/p&gt;

		// 指向新的響應式
    &lt;p @click=&quot;change&quot;&gt;change&lt;/p&gt; 
		
		// 舊的值不在具有響應式
    &lt;p&gt;{{int}}&lt;/p&gt;
&lt;/template&gt;</code></pre><ol type="1" id="1b98d26f-0e32-4043-8c86-5ac5878e4959" class="numbered-list" start="3"><li>使用解構會斷開響應式</li></ol><pre id="76faa53e-b5bb-4cf8-b2e9-8d3e225569a3" class="code"><code>const state = reactive({ count: 0 })

// 當解構時，count 已經與 state.count 斷開連接
let { count } = state
// 不會影響原始的 state
count++

// 這個函數接收到的是一個普通的數字 
// 且無法追蹤 state.count 的變化 
// 我們必須傳入整個物件以保持回應性
callSomeFunction(state.count)</code></pre><p id="ea991e80-da17-4dcc-a08d-8b838dce1d63" class="">
</p><h3 id="04f8e586-cebc-46bd-8576-3355acc8ba92" class="">額外的 ref  解包細節 (需不需要 .value)</h3><p id="fc749efc-97a8-4a83-ab2c-6eabb1cd1d79" class="">&quot;解包&quot; 通常指的是從響應式物件或引用類型中提取數據的操作，不等同於解構</p><p id="1e6fc2a3-7294-4e62-b60b-0278599cb268" class="">ref 作為 reactive 的屬性可以直接讀取</p><pre id="60b21dbe-e167-473b-99a5-115fcbb5ca8b" class="code"><code>const count = ref(0)
const state = reactive({
  count
})

console.log(state.count) // 0

state.count = 1
console.log(count.value) // 1</code></pre><p id="bb38e41d-5e1d-4f4f-a75f-d0ba568e6f86" class="">只有當嵌套在一個深層響應式物件內時，才會發生 ref 解包。
當其作為 shallowReactive 的屬性被存取時不會解包。</p><p id="8d17d205-53e4-4859-b4b0-5ec5ed5f557b" class="">
</p><p id="9bcb5694-d96b-4b2b-91e6-fc77353bd449" class="">在模板渲染上下文中，只有頂層的 ref 屬性才會被解包。</p><pre id="1bcf12c5-ea37-4237-8e66-e4a6f50a066b" class="code"><code>const count = ref(0)
const object = { id: ref(1) }

{{ count + 1 }} // 1
{{ object.id + 1 }} // [object Object]1</code></pre><p id="013bee25-1f7f-42d3-b9aa-37e8262e98f5" class="">當 ref 作為響應式陣列或原生集合類型(如 Map) 中的元素被存取時，它不會被解包：</p><pre id="ffbe058f-8449-469c-8380-70952fbda12a" class="code"><code>const books = reactive([ref(&#x27;Vue 3 Guide&#x27;)])
// 这里需要 .value
console.log(books[0].value)

const map = reactive(new Map([[&#x27;count&#x27;, ref(0)]]))
// 这里需要 .value
console.log(map.get(&#x27;count&#x27;).value)</code></pre></div></article><span class="sans" style="font-size:14px;padding-top:2em"></span>`,
    },
    {
      type: "JavaScript",
      title: "變數與作用域",
      link: "https://everlasting-hydrangea-e83.notion.site/c228b1d53d7b4c689aa931b90126b4ba?pvs=4",
      article: `<article id="c228b1d5-3d7b-4c68-9aa9-31b90126b4ba" class="page sans"><header><p class="page-description"></p></header><div class="page-body"><hr id="f5f49bda-821e-492a-bf24-114b72d2a599"/><pre id="6bc51092-52b8-46a3-87ad-d5aad8b48c72" class="code code-wrap"><code>var a = &#x27;a&#x27; // 全域變數
b = &#x27;b&#x27; // 全域屬性  像是物件中的 key
console.log(window)

變數不可被刪除,  // delete a , delete b

function fn (){
    var a = &#x27;a2&#x27;
    b = &#x27;b&#x27;
}
fn()
console.log(a) // error
console.log(b)
</code></pre><p id="8cdf822f-a8f1-49f5-93fe-225933ca4726" class="">問題一 為何變數需要被宣告？
避免重複命名導致資料污染</p><p id="9abd1c02-177d-452d-a913-91776312dcb6" class="">問題二 變數與屬性差異為何？
可以用 運算符 delete</p><h3 id="041208b2-23bb-4ad5-919f-716e8611ace1" class="">1-2 變數的語法作用域</h3><p id="170aae22-036d-472d-8907-d258521da865" class="">問題一 var 宣告的變數作用域範圍？
函式內.
若函式內無宣告但有使用變數,會向外查找</p><p id="650e49c2-c2e3-4d48-98c5-9fa4180481ff" class="">問題二 let const 作用域範圍？
區塊作用域 <code>()&amp;{}</code> </p><p id="b54116f3-db38-4982-a8cd-6831ee2e7e10" class="">如: <code>if(), for(), {}, function(){}</code></p><p id="c6315d02-8a22-45a9-bdfc-6d1c33dbb9df" class="">js 是靜態作用域(編譯時確定作用域)</p><p id="a449a94d-1385-4819-bb9b-ac9793f7919e" class="">var 函式作用域 function(){}
let const 區塊作用域 ()&amp;{}</p><h3 id="c2a42f6d-508d-499b-afa5-e65418eb0a69" class="">1-3 hoisting</h3><p id="b15e7039-a372-438b-9fa7-dd0d6cdf211b" class="">問題一 什麼是提升？</p><p id="844feb38-d2eb-4f98-9f71-158c31bb5081" class="">瀏覽器解析程式碼有兩個階段</p><ol type="1" id="d10f8ec1-f876-4ab4-8484-2a33e861463b" class="numbered-list" start="1"><li>創造階段: 為變數準備記憶體 function fn(){} 先於 var</li></ol><pre id="efe8328c-8fa8-4965-8be4-ba0fdb63a916" class="code code-wrap"><code>var a = 12

function a(){
  console.log(&#x27;fn&#x27;)
}

a()//error
</code></pre><p id="9bb1446e-2e0b-45f6-ae6a-7216de176187" class="">嘗試取值會回傳 undefined</p><pre id="d012bb6e-ffa2-487a-afc2-d553b903e699" class="code code-wrap"><code>console.log(b) // undefined
var b = &#x27;b&#x27;
</code></pre><ol type="1" id="28c82d53-c8ae-4346-8981-ec5bd1852d8f" class="numbered-list" start="1"><li>執行階段: 實際執行(變數賦值)</li></ol><p id="5b1c526e-d394-416f-b47e-85db6d612d6e" class="">函式
陳述式 可 hoisting
表達式 無 hoisting</p><pre id="0f48bcb7-2cbd-4024-8982-6ea8048c5886" class="code code-wrap"><code>//覆蓋
function sum(){
  console.log(&#x27;fn1&#x27;)
}

function sum(){
  console.log(&#x27;fn2&#x27;)
}

sum() // fn2

// 陳述式先被分配到記憶體
var sum = () =&gt; {
  console.log(&#x27;expression&#x27;)
}

function sum(){
  console.log(&#x27;statment&#x27;)
}

sum() // experession
</code></pre><p id="72416cbe-a0da-4500-a35b-6b450d367afc" class="">預期函式統一至後方, 僅能使用陳述式無法使用表達式</p><pre id="3c3084de-cfc2-4f1f-952d-de8ab0fe4a2f" class="code code-wrap"><code>var b = 12
a() //error
var a = function (){
  console.log(b)
}
</code></pre><p id="ca26d346-a824-42dd-bfc5-a498ee6a27d8" class="">記憶體分配 在開發人員工具中可看到</p><h3 id="e9e9f9c2-eb42-4632-9ad8-6406259daecf" class="">1-4 undefined &amp; null &amp; is not defined</h3><p id="f28333c7-3d53-4adc-9235-0e862e46c16f" class="">宣告時會預設給予 undefined</p><p id="a7d2653c-ee81-4f2b-9d06-a2831601993b" class="">undefined 系統預設空值
null 開發者賦予空值, (以前有值, 現在沒有)</p><pre id="8905a57a-52b9-495a-8083-f6186b58c948" class="code code-wrap"><code>function fn1(){}
let f = function fn2(){}
console.log(f.name, fn1.name) //fn2, fn1

var bar = function baz() {
  console.log(bar === baz)
}
bar()
bar.name // &quot;baz&quot;</code></pre><ul id="90ea1f94-cd05-424f-9db1-9329cda8dc43" class="bulleted-list"><li style="list-style-type:disc">可選串連 optional chaining operator</li></ul><p id="52cd700c-7adc-4c5d-b0d4-84fe9b71d0bb" class="">如果是 <code>?.</code> 前是 undefined, null , 則回傳 undefined </p><p id="d7b3ed70-e7fb-4f65-93e4-41c4df8a579a" class="">可用於 function 或是 object.prop</p><pre id="db25993c-e767-4a58-9d0b-5ac01b4d190d" class="code code-wrap"><code>obj.val?.prop
obj.val?.[expr]
obj.func?.(args)</code></pre><ul id="304ddbdb-d6de-44a6-b4ff-52818fbcb672" class="bulleted-list"><li style="list-style-type:disc">空值合並運算符（nullish coalescing operator）</li></ul><pre id="005e8bd7-d134-4acb-b605-67c179a14f81" class="code code-wrap"><code>let val = 0
let result = val ?? &#x27;unknow&#x27;
//result = (a !== null &amp;&amp; a !== undefined) ? a : b;</code></pre><p id="9d72b698-030e-436a-91bb-d024db7276b8" class="">
</p></div></article><span class="sans" style="font-size:14px;padding-top:2em"></span>`,
    },
    {
      type: "CSS",
      title: "用 linear-gradient 做動態邊框",
      link: "https://codepen.io/narrowd4c/pen/GRPLLeg",
      article: "",
    },
    {
      type: "Nuxt",
      title: "Nuxt Seo 設定",
      link: "https://everlasting-hydrangea-e83.notion.site/SEO-and-Meta-336453dcd950470b91e87ddfd4f0b764?pvs=4",
      article: `<article id="336453dc-d950-470b-91e8-7ddfd4f0b764" class="page sans"><header><h1 class="page-title">SEO and Meta</h1><p class="page-description"></p></header><div class="page-body"><ol type="1" id="c7c8af4b-163a-432f-bfac-4591561960f3" class="numbered-list" start="1"><li>在 nuxt.config.ts 定義</li></ol><pre id="440fc642-3913-46ca-aac7-1ff4b6c3c567" class="code"><code>// nuxt.config.ts
export default defineNuxtConfig({
	// ssr:false, 如果使用 false 只會 seo 只會讀到 app.head 的內容
  app: {
    head: {
      charset: &#x27;utf-8&#x27;,
      viewport: &#x27;width=device-width, initial-scale=1&#x27;,
			meta:[{ property: &quot;og:title&quot;, content: &quot;my website&quot; },]
    }
  }
})</code></pre><p id="2218faf2-4bd1-4232-bc81-21ac12e19581" class="">app.head 無法加入響應性資料 建議在 app.vue 使用 useHead 函式</p><p id="8e93a579-3c1f-43df-9582-4c4d02138d4a" class="">ssr:true 時 useHead 會覆蓋 app.head</p><ol type="1" id="c92a5353-c4d9-4707-a69a-e06be636be3f" class="numbered-list" start="2"><li>在 app.vue 使用 useHead()</li></ol><pre id="3e248289-09a4-4e5f-86e9-be77197c6b8e" class="code"><code>// app.vue

&lt;script setup&gt;
useHead({
  title: &#x27;My App&#x27;,
  meta: [
    { name: &#x27;description&#x27;, content: &#x27;My amazing site.&#x27; }
  ],
  bodyAttrs: {
    class: &#x27;bodyClass&#x27;
  },
  script: [{ src:&#x27;https://cdn.tailwindcss.com&#x27; }],
	link: [
    {
      rel: &#x27;preconnect&#x27;,
      href: &#x27;https://fonts.googleapis.com&#x27;
    },
    {
      rel: &#x27;stylesheet&#x27;,
      href: &#x27;https://fonts.googleapis.com/css2?family=Roboto&amp;display=swap&#x27;,
      crossorigin: &#x27;&#x27;
    }
  ]
})

// nuxt.config.ts 內的 ssr 設定為 false 則載入時讀取不到
useSeoMeta({
  title: &#x27;My Amazing Site&#x27;,
  ogTitle: &#x27;My Amazing Site&#x27;,
  description: &#x27;This is my amazing site, let me tell you all about it.&#x27;,
  ogDescription: &#x27;This is my amazing site, let me tell you all about it.&#x27;,
  ogImage: &#x27;https://example.com/image.png&#x27;,
  twitterCard: &#x27;summary_large_image&#x27;,
})

&lt;/script&gt;</code></pre><p id="18b4e60e-ad2c-4bb1-bd49-33ddbe0a405d" class="">Type</p><p id="5a3fd652-fb48-4f2c-962d-8720a2ffaa8b" class="">可以在 app.head 或是 useHead 中使用的屬性</p><pre id="1b1a9c8c-e4f8-4517-88a8-80082a74e117" class="code"><code>interface MetaObject {
  title?: string
  titleTemplate?: string | ((title?: string) =&gt; string)
  templateParams?: Record&lt;string, string | Record&lt;string, string&gt;&gt;
  base?: Base
  link?: Link[]
  meta?: Meta[]
  style?: Style[]
  script?: Script[]
  noscript?: Noscript[];
  htmlAttrs?: HtmlAttributes;
  bodyAttrs?: BodyAttributes;
}</code></pre><ol type="1" id="2cb2441d-d2b2-4c78-beb7-d2ce6d9d4c0c" class="numbered-list" start="3"><li>Component</li></ol><p id="165d4d0d-a26e-4bf0-9f7b-2ec636f0032f" class="">使用 Component 在 template 中使用</p><p id="1149ecb8-8296-4178-be4f-cd42039f29b0" class=""><code><strong>&lt;Title&gt;</strong></code>, <code><strong>&lt;Base&gt;</strong></code><code><strong>&lt;NoScript&gt;</strong></code><code><strong>&lt;Style&gt;</strong></code><code><strong>&lt;Meta&gt;</strong></code><code><strong>&lt;Link&gt;</strong></code><code><strong>&lt;Body&gt;</strong></code><code><strong>&lt;Html&gt;</strong></code> and <code><strong>&lt;Head&gt;</strong></code></p><p id="6e205f42-9af4-4c7c-9ce7-5a29de84179c" class="">Head  和 Body 可以接受嵌套 meta tags (<code>&lt;Meta /&gt;</code>)</p><pre id="80e779fd-b555-477a-bcda-784d889c33bf" class="code"><code>&lt;script setup lang=&quot;ts&quot;&gt;
const title = ref(&#x27;Hello World&#x27;)
&lt;/script&gt;

&lt;template&gt;
  &lt;div&gt;
    &lt;Head&gt; 
      &lt;Title&gt;{{ title }}&lt;/Title&gt;
      &lt;Meta name=&quot;description&quot; :content=&quot;title&quot; /&gt;
      &lt;Style type=&quot;text/css&quot; children=&quot;body { background-color: green; }&quot; /&gt;
    &lt;/Head&gt;

    &lt;h1&gt;{{ title }}&lt;/h1&gt;
  &lt;/div&gt;
&lt;/template&gt;</code></pre><p id="f92158c8-453d-4f1f-881c-67586b41e310" class="">TitleTemplate</p><p id="6e18118a-8c2e-4c6b-be32-a6ddc149459e" class="">在其他頁面使用 useHead.titile 會先做為參數帶入 titleTemplate 再回傳</p><pre id="4ccc7af2-7294-44de-93f7-4bfadc24ee9c" class="code"><code>// app.vue
&lt;script setup lang=&quot;ts&quot;&gt;
useHead({
  // as a string,
  // where %s is replaced with the title
  titleTemplate: &#x27;%s - Site Title&#x27;,
  // ... or as a function
  titleTemplate: (productCategory) =&gt; {
    return productCategory
      ? productCategory + '- Site Title'
      : &#x27;Site Title&#x27;
  }
})
&lt;/script&gt;</code></pre><pre id="2ddb11a8-1f02-4b3e-9352-dd0ce384a37b" class="code"><code>// about.vue

useHead({
	title:&#x27;about&#x27;,
})
---
about - Site Title

//---//

useHead({
	title:null,
})
---
Site Title</code></pre><p id="171c513b-8176-44d2-bf03-05b590b36c61" class="">Body tags</p><p id="9a2ad2bf-6af3-488d-b860-a4718279abda" class="">tag 標籤放置 </p><pre id="f4345cfa-e4bc-465a-9454-66be5fb9a6f2" class="code"><code>&lt;script setup lang=&quot;ts&quot;&gt;
useHead({
  script: [
    {
      src: &#x27;https://third-party-script.com&#x27;,
      // valid options are: &#x27;head&#x27; | &#x27;bodyClose&#x27; | &#x27;bodyOpen&#x27;
      tagPosition: &#x27;bodyClose&#x27;
    }
  ]
})
&lt;/script&gt;


---
&lt;body&gt;
....
&lt;script src=&quot;https://third-party-script.com&quot;&gt;
&lt;/body&gt;</code></pre><p id="5b684676-e4b8-4bb3-baa9-e8fae95ae277" class="">definePageMeta</p><pre id="fef9a7f0-dcf2-485a-8f26-642e623537cd" class="code"><code>// pages/about.vue

&lt;script setup lang=&quot;ts&quot;&gt;
definePageMeta({
  title: &#x27;Some Page&#x27; // 這是在建置時透過巨集提取的，因此無法動態設定
})
&lt;/script&gt;</code></pre><pre id="f4c3cf42-279a-408d-bfaf-7f944e62d075" class="code"><code>// layout/defalut.vue

&lt;script setup lang=&quot;ts&quot;&gt;
const route = useRoute()

useHead({
  meta: [{ property: &#x27;og:title&#x27;, content: 'App Name - $ {route.meta.title}' }]
})
&lt;/script&gt;</code></pre><p id="1a2b6c58-18fd-4ad3-8faa-56b069368d55" class="">
</p></div></article><span class="sans" style="font-size:14px;padding-top:2em"></span>`,
    },
    {
      type: "Vue",
      title: "Vue Router",
      link: "https://everlasting-hydrangea-e83.notion.site/196669444fea4eb7b87aa22b52f564ba?pvs=4",
      article: `<article id="c8bc810c-db10-40e5-8154-89ec6cb27310" class="page sans"><header><h1 class="page-title">基礎範例</h1><p class="page-description"></p></header><div class="page-body"><p id="4f7c1f07-0984-4e32-b7cd-a7372759ba6b" class="">
</p><pre id="0deef533-b69a-44f7-bcca-4d8a764caa2f" class="code"><code>import { RouterLink, RouterView } from &#x27;vue-router&#x27;
&lt;router-link to=&quot;/&quot;&gt;Link&lt;/router-link&gt;  // router-link :to={name:&#x27;&#x27;, param:&#x27;&#x27;}
&lt;router-view&gt;&lt;/router-view&gt;

---

import {createRouter, createWebHistory} from &#x27;vue-router&#x27;;
import Home from &#x27;./Home.vue&#x27;;

const routes = [
		{path:&#x27;/&#x27;, name:&#x27;Home&#x27;, component:Home},
		{path:&#x27;/about&#x27;, name:&quot;About&quot;, component:()=&gt;import(&#x27;./About.vue&#x27;)}
]

const router = createRouter({
	history:createWebHistory(),
	routes // 語法糖 -&gt; routes:routes
});

export default router;</code></pre>
<p id="b7163173-5605-40ad-8629-fe66c91ae86b" class="">
</p><ul id="586bfa00-a44e-457e-ab4f-f632ee6e561f" class="toggle"><li><details open=""><summary>動態路由</summary><pre id="b1e62376-a3a4-4584-b794-93161a340ada" class="code"><code>const User = {
  template: &#x27;&lt;div&gt;User&lt;/div&gt;&#x27;,
}

const routes = [
	// 冒號後為參數
  { path: &#x27;/users/:id&#x27;, component: User },
	{ path: &#x27;/users/:id/post/:postId&#x27;, components:Post },
  // 與字串連接
	{ path: &#x27;/users/user:id&#x27;, components:Post }
]</code></pre><pre id="405fb732-67a7-4de0-9b54-b949c89a026d" class="code"><code>&lt;script setup&gt;
import { useRouter, useRoute } from &#x27;vue-router&#x27;
const router = useRouter()
const route = useRoute()

console.log(router.currentRoute.value.path)
console.log(route.params)

&lt;/script&gt;
&lt;template&gt;
	&lt;RouterLink :to=&quot;{name:&#x27;user&#x27;, params:{id:12}}&quot;&gt;User&lt;/RouterLink&gt;
	{{ $route.param.id }}
&lt;/tempalte&gt;</code></pre><p id="9ad1511a-d276-4a67-90fb-1bead476378a" class="">路由僅參數改變，則相同的組件將被重複使用(不會有生命週期)</p><pre id="b2553670-1b47-4361-befd-e72009adf9f4" class="code"><code>watch(
 // route.params 是 reactive()
  () =&gt; route.params,
  (toParams, previousParams) =&gt; {
    // 对路由变化做出响应...
    console.log(toParams)
    console.log(previousParams)
    console.log(&#x27;watch&#x27;)
  }
)</code></pre><p id="c9863f0e-fef5-49e1-851f-44edbff20428" class="">或是用路由守衛</p><pre id="f16993e7-f84e-47ee-a004-a34beab23800" class="code"><code>&lt;script setup&gt;
import { useRouter, useRoute, onBeforeRouteLeave, onBeforeRouteUpdate  } from &#x27;vue-router&#x27;

async onBeforeRouteUpdate((to, from) =&gt; {
  console.log(&#x27;update&#x27;)
  console.log(&#x27;to&#x27;, to)
  console.log(&#x27;from&#x27;, from)
	if(to.params.id !== from.params.id) {
		userData.value = await fetch(...)
	}
})

onBeforeRouteLeave((to, from) =&gt; {
  console.log(&#x27;leave&#x27;)
  console.log(&#x27;to&#x27;, to)
  console.log(&#x27;from&#x27;, from)
  // return false 取消換頁
})
&lt;/script&gt;</code></pre><p id="f3584c22-dcd7-457c-8283-92862ae99620" class="">擷取所有路由或 404 Not found 路由</p><pre id="cdde64f2-73f8-4202-8ab5-d8b4ba09742b" class="code"><code>// https://...../some/not/found

path: &#x27;/:pathMatch&#x27;,
name: &#x27;NotFound&#x27;,
component: () =&gt; import(&#x27;../views/NotFound.vue&#x27;)
// error

path: &#x27;/:pathMatch(.*)&#x27;,
name: &#x27;NotFound&#x27;,
component: () =&gt; import(&#x27;../views/NotFound.vue&#x27;)
route.params.pathMath = &#x27;some/not/found&#x27;

path: &#x27;/:pathMatch(.*)*&#x27;,
name: &#x27;NotFound&#x27;,
component: () =&gt; import(&#x27;../views/NotFound.vue&#x27;)
route.params.pathMath = [&#x27;some&#x27;, &#x27;not&#x27;, &#x27;found&#x27;]</code></pre><ul id="139a0a64-58e5-4d8c-8c7e-37c3ae497c37" class="toggle"><li><details open=""><summary><code>path: &#x27;/:pathMatch&#x27;</code> 和 <code>path: &#x27;/:pathMatch(.*)&#x27;</code> 差異</summary><p id="81fa1c85-bcb3-49fe-9383-adbccdbf27e6" class="">在Vue Router中，<code>path: &#x27;/:pathMatch&#x27;</code> 和 <code>path: &#x27;/:pathMatch(.*)&#x27;</code> 兩者之間有一些重要的區別。</p><ol type="1" id="944267d3-a5ef-4b57-8c5a-92eda3ac2f81" class="numbered-list" start="1"><li><code>path: &#x27;/:pathMatch&#x27;</code>：
這個路由規則使用了冒號 <code>:</code>，表示這是一個動態路由參數。這意味著路徑中的任何內容都將匹配到這個參數，不論是單詞、斜槓或其他字符。這個參數將匹配到路由的<code>params</code>屬性中，你可以在組件中訪問它，以根據實際請求的路徑來動態呈現內容。</li></ol><ol type="1" id="a3c2a580-0f36-4458-b62b-2b52f1b0f2ce" class="numbered-list" start="2"><li><code>path: &#x27;/:pathMatch(.*)&#x27;</code>：
在這個路由規則中，我們同樣使用了動態路由參數 <code>:pathMatch</code>，但是不同的是，我們在括號中使用了<code>(.*)</code>正則表達式。這表示它將匹配路由中的任何內容，但只有一個捕獲組（capturing group），並且會保留整個路徑字符串。這樣，它不會將斜槓視為分隔符，而是將整個路徑當作一個值，並且將其傳遞到<code>params</code>屬性中。</li></ol><p id="8f8731d2-764d-4b10-884c-242f645cb285" class="">總結來說，<code>path: &#x27;/:pathMatch&#x27;</code> 將捕獲單個路由段，而 <code>path: &#x27;/:pathMatch(.*)&#x27;</code> 將捕獲整個路由路徑作為單個值。你可以根據你的項目需求選擇使用哪一種路由規則。</p></details></li></ul><pre id="35650119-5f0c-476d-8561-f15fce64b34f" class="code"><code>router.push({
  name: &#x27;NotFound&#x27;,
  // 保留目前路徑並刪除第一個字符，以避免目標 URL 以 // 開頭。
  // route.path = &#x27;/some/not/found&#x27;
  params: { pathMatch: route.path.substring(1).split(&#x27;/&#x27;) },
  query: route.query,
  hash: route.hash,
})</code></pre></details></li></ul><ul id="ef83bc11-82dd-4ae1-a5a6-87c542570651" class="toggle"><li><details open=""><summary>命名路由</summary><p id="7e5f4c78-a2b9-4c21-93f7-f0133c7570e2" class="">切換路由的方式除了 path 還能使用 name</p><pre id="8ec2661c-6b10-42c8-a7f3-94c9f8d1a768" class="code"><code>{
	path:&#x27;/user/:id&#x27;,
	name:&#x27;user&#x27;,
	components:()=&gt; import(....)
}

&lt;RouterLink to=&quot;user/1&quot;&gt;

&lt;RouterLink :to=&quot;{name:&#x27;user&#x27;, params:{ id:1 }}&quot;&gt;</code></pre></details></li></ul><ul id="ae1acc7e-5bbf-4fa7-b44c-e941f76045b4" class="toggle"><li><details open=""><summary>路由的匹配語法</summary><p id="a9ae70d4-763d-40f7-8e54-6438d14c5deb" class="">正則表達式</p><pre id="17c7c25c-fab2-4f76-9236-4e6f767bbaca" class="code"><code>const routes = [
  // /:orderId -&gt; 僅匹配數字
  { path: &#x27;/:orderId(\\d+)&#x27; },
  // /:productName -&gt; 符合其他任何內容
  { path: &#x27;/:productName&#x27; },
]</code></pre><p id="4b88fce9-149a-42c8-8e5a-91ef232a0a50" class="">可重複的參數 (分割路徑為陣列)</p><pre id="4d62e9e1-6f44-4284-ac5b-c8e4cdf0fba1" class="code"><code>const routes = [
  // /:chapters -&gt;  匹配 /one, /one/two, /one/two/three, 等
  { path: &#x27;/:chapters+&#x27; },
  // /:chapters -&gt; 匹配 /, /one, /one/two, /one/two/three, 等
  { path: &#x27;/:chapters*&#x27; },
]</code></pre><pre id="68dcd62c-0f42-4d81-9b1c-df8433494850" class="code"><code>// 给定 { path: &#x27;/:chapters*&#x27;, name: &#x27;chapters&#x27; },
router.resolve({ name: &#x27;chapters&#x27;, params: { chapters: [] } }).href
// 产生 /
router.resolve({ name: &#x27;chapters&#x27;, params: { chapters: [&#x27;a&#x27;, &#x27;b&#x27;] } }).href
// 产生 /a/b

// 给定 { path: &#x27;/:chapters+&#x27;, name: &#x27;chapters&#x27; },
router.resolve({ name: &#x27;chapters&#x27;, params: { chapters: [] } }).href
// 抛出错误，因为  chapters  为空</code></pre><p id="4ac0b127-d8de-472c-9c36-140b7d07a2e3" class="">Sensitive 與 strict 路由配置</p><p id="13eca5e3-d3ef-4f36-8956-9189cb3b6ca4" class="">Sensitive  區分大小寫</p><p id="508eefa8-e5e7-4704-b165-2a2ceb471fb9" class="">strict 區分結尾是否有 <code> / </code></p><pre id="1bd8bd66-e221-4fae-b126-6dd2d3960946" class="code"><code>const router = createRouter({
  history: createWebHistory(),
  routes: [
   // 將符合 /users/posva 而非： 
   // - /users/posva/ 當 strict: true 
   // - /Users/posva 當 sensitive: true
    { path: &#x27;/users/:id&#x27;, sensitive: true },
   // 將符合 /users, /Users, 以及 /users/42 而非 /users/ 或 /users/42/
    { path: &#x27;/users/:id?&#x27; },
  ],
  strict: true, // applies to all routes
})</code></pre><p id="c9eb2bc3-882e-4657-86a5-9fd56ff17f09" class="">可選參數</p><p id="4a2f6b4a-293a-4be5-9a4a-e7a3d962fb3e" class="">?: 參數可為 0 個或 1 個</p><p id="67548c47-8858-4520-b99a-491b9dc34086" class="">*: 參數可為 0 個或 1 個</p><pre id="34f0747c-76ca-4547-898d-f847d8705dca" class="code"><code>const routes = [
  // 匹配 /users 和 /users/posva
  { path: &#x27;/users/:userId?&#x27; },
  // 匹配 /users 和 /users/42
  { path: &#x27;/users/:userId(\\d+)?&#x27; },
]</code></pre></details></li></ul><ul id="bfd4cf99-c6bc-408d-9b04-36a6822f2dde" class="toggle"><li><details open=""><summary>巢狀路由</summary><p id="10810e5b-ec54-44ed-b12e-afba6f1c9c5c" class="">子路由 path 不要使用<code> / </code>做開頭,<code> / </code>被視為根路徑 ( https://……/ )</p><pre id="2797a26e-703d-4920-b885-5551c78903ae" class="code"><code>{
 path: &#x27;/user/:id&#x27;,
 name: &#x27;user&#x27;,
 component: () =&gt; import(&#x27;../views/UserView.vue&#x27;),
 children: [
   { path: &#x27;post&#x27;, name:&#x27;user-post&#x27;, component: () =&gt; import(&#x27;../views/UserPost.vue&#x27;)},
	 // 子路由根路徑使用空字串
	 { path: &#x27;&#x27;, name:&#x27;user-name&#x27;, component: () =&gt; import(&#x27;../views/UserChild.vue&#x27;)}
 ]
}

// ../user/12/post</code></pre><pre id="61da3f99-8241-49d6-a9be-0fb80e45aac1" class="code"><code>// UserView

&lt;tempalte&gt;
	&lt;RouterLink to=&quot;&quot;&gt;&lt;/RouterLink&gt;
	&lt;RouterView /&gt;
&lt;/template&gt;</code></pre><p id="6941ac50-84c2-4c54-aba6-9acc36475c63" class="">子路由命名</p><pre id="7193e2fb-75d3-4934-b60f-aef54045b92f" class="code"><code>// App.vue
&lt;RouterLink :to=&quot;{name:&#x27;user-name&#x27;, params:{id:12}}&quot; /&gt;

// router/index.js
{
 path: &#x27;/user/:id&#x27;,
 // name: &#x27;user&#x27;, 子路由有命名則不需要命名
 component: () =&gt; import(&#x27;../views/UserView.vue&#x27;),
 children: [
	 { path: &#x27;&#x27;, name:&#x27;user-name&#x27;, component: () =&gt; import(&#x27;../views/UserChild.vue&#x27;)}
 ]
}</code></pre><p id="530856eb-7527-47cd-97d6-874ee141a9ac" class="">父層路由與子路由皆有命名</p><pre id="4002dc9a-8f62-4625-98b3-609dd759f523" class="code"><code>// App.vue
&lt;RouterLink :to=&quot;{name:&#x27;user&#x27;}&quot; /&gt;
// 不會顯示子路由，但重新整理會顯示

// router/index.js
{
 path: &#x27;/user/:id&#x27;,
 name: &#x27;user&#x27;,
 component: () =&gt; import(&#x27;../views/UserView.vue&#x27;),
 children: [
	 { path: &#x27;&#x27;, name:&#x27;user-name&#x27;, component: () =&gt; import(&#x27;../views/UserChild.vue&#x27;)}
 ]
}</code></pre></details></li></ul><ul id="d90e69cd-f80e-4bb3-be5a-0ea90e9527d1" class="toggle"><li><details open=""><summary>程式化導航(<strong><strong>Programmatic Navigation</strong></strong>)</summary><p id="3d878bfb-4a57-4822-93ae-ed9605decb15" class="">當你點選 <code>&lt;router-link&gt;</code> 時，內部會呼叫這個方法，所以點選 <code>&lt;router-link :to=&quot;...&quot;&gt;</code> 相當於呼叫 <code>router.push(...)</code> ：</p><pre id="969b818a-481a-4604-8ee3-4e66835b9ffd" class="code"><code>// literal string path
router.push(&#x27;/users/eduardo&#x27;)

// object with path
router.push({ path: &#x27;/users/eduardo&#x27; })

// named route with params to let the router build the url
router.push({ name: &#x27;user&#x27;, params: { username: &#x27;eduardo&#x27; } })

// with query, resulting in /register?plan=private
router.push({ path: &#x27;/register&#x27;, query: { plan: &#x27;private&#x27; } })

// with hash, resulting in /about#team
router.push({ path: &#x27;/about&#x27;, hash: &#x27;#team&#x27; })</code></pre><p id="45dfd2db-90cf-492e-8806-2ad0bfb5dd92" class="">router.push 使用 path 會忽略 params (query 不會被忽略)</p><p id="467ced15-cd34-4bb9-af5b-cd5b1bccc821" class="">params 的值會被轉型為 <code>Number | String</code></p><h3 id="b4f31660-f210-4983-946f-c635231de89c" class="">替換當前位置</h3><p id="e58afcff-0fe8-41cc-86c1-180b8b5a6244" class=""><code>router.push(…)</code> 有瀏覽器歷史紀錄 (從上一頁跳到下一頁)</p><p id="b516ad17-01f5-46e0-8c8e-9dd7b5ad7968" class=""><code>router.replace(…)</code> 不會有瀏覽器歷史紀錄 (取代當前頁面紀錄)</p><pre id="bd58ce9f-3146-4164-87b0-5e1c9d17809f" class="code"><code>// 以下結果相同
&lt;router-link :to=&quot;...&quot; replace /&gt;

router.push({ path: &#x27;/home&#x27;, replace: true })

router.replace({ path: &#x27;/home&#x27; })</code></pre><p id="ec9a822b-c9aa-467f-aa90-1736894bf58c" class="">前往</p><pre id="8e6e2a16-54f8-4cfc-9201-8a13317b724b" class="code"><code>// 下一頁, 等同 router.forward()
router.go(1)

// 上一頁, 等同 router.back()
router.go(-1)

// 超過無效
router.go(100)
router.go(-100)</code></pre><p id="9aeee3f2-002c-4841-be36-67ab04786422" class="">參考：<a href="https://developer.mozilla.org/en-US/docs/Web/API/History_API">https://developer.mozilla.org/en-US/docs/Web/API/History_API</a></p></details></li></ul><ul id="480d4d65-06ae-49e8-a341-e817af89b866" class="toggle"><li><details open=""><summary>命名視圖</summary><p id="8c4b2514-a7e9-47a0-ae81-74566f6acffb" class="">同一層多個 RouterView</p><pre id="183a9bb5-3ef0-4ff1-8a39-11e2cd1c47e1" class="code"><code>&lt;RouterView /&gt;
&lt;RouterView name=&quot;LeftBar&quot; /&gt;
// name 沒有 RightView 則忽略
&lt;RouterView name=&quot;RightView&quot; /&gt;

{
	path:&#x27;/&#x27;,
	components:{
		default:()=&gt; import(../Home.vue),
		LeftBar:()=&gt; import(../Left.vue),
		RightView:()=&gt; import(../Right.vue),
	}
},
{
	path:&#x27;/other&#x27;,
	components:{
		default:()=&gt; import(../Other.vue),
		LeftBar:()=&gt; import(../OtherLeft.vue),
	}
}</code></pre></details></li></ul><ul id="3ff2ae19-4a59-4b0a-b9e0-d7f5d665fe9a" class="toggle"><li><details open=""><summary>重定向(轉址)和別名</summary><p id="773f23a1-8dfa-47bb-a56c-9b42e65c930c" class="">網址輸入 https://....../home 重定向至 https://....../</p><pre id="15d13af4-88fc-4b19-a5d2-bcfdd814a24e" class="code"><code>const routes = [
	{ path: &#x27;/&#x27;, component: Home },
	{ path: &#x27;/home&#x27;, redirect: &#x27;/&#x27; }
]</code></pre><p id="e92fec3b-1f1a-41cd-90f4-998210bd1d23" class="">name</p><pre id="5c6fc7b7-a239-400f-b66f-681c7840aace" class="code"><code>const routes = [
	{ path: &#x27;/&#x27;, name:&#x27;homepage&#x27;, component: Home },
	{ path: &#x27;/home&#x27;, redirect: {name:&#x27;homepage&#x27;} }
]</code></pre><p id="44d62a0a-bc5f-4e49-bd0b-1796d6a82030" class="">函式</p><pre id="990664ea-8633-4434-adf8-1b8dc6dc5d1b" class="code"><code>const routes = [
  {
    // /search/screens -&gt; /search?q=screens
    path: &#x27;/search/:searchText&#x27;,
    redirect: (to) =&gt; {
      // 方法接收目標路由作為參數
      // return 重定向的字串路徑/路徑對象
      return { path: &#x27;/search&#x27;, query: { q: to.params.searchText } }
    },
  },
  {
    path: &#x27;/search&#x27;,
    // ...
  },
]</code></pre><p id="e0948b1d-3b23-4511-a631-20889e471d7d" class="">相對</p><pre id="ed84b9be-6a87-4c94-86bd-ec7c56865dcf" class="code"><code>const routes = [
  {
    // 將總是把/users/123/posts重新導向到/users/123/profile。
    path: &#x27;/users/:id/posts&#x27;,
    redirect: to =&gt; {
      // 此函數接收目標路由作為參數 
			// 相對位置不以 / 開頭 
			// 或 { path: &#x27;profile&#x27;}
      return &#x27;profile&#x27;
    },
  },
]</code></pre><p id="9a115b21-7e9b-40b6-af1f-b891dee8a0ab" class="">別名</p><p id="be13eb29-f680-488c-ae58-61f81637330a" class="">https://…./home 等同於 htttps://…../ </p><p id="a7f9cf40-c32f-4d5d-9bbb-86cf60de7a4a" class="">跟重定向不同的是網址會保留</p><pre id="51157fc9-3521-470e-b958-a34513d807f7" class="code"><code>const routes = [{ path: &#x27;/&#x27;, component: Homepage, alias: &#x27;/home&#x27; }]

const routes = [
	{path:&#x27;/users&#x27;, components:Homepage, alias:[&#x27;/people&#x27;, &#x27;/list&#x27;]}
]</code></pre><p id="34201489-f1dc-4ebc-b54f-ce290e20cc1a" class="">如果你的路由有參數，請確保在任何絕對別名中包含它們：</p><pre id="eb660820-71ed-44cf-b763-0f1ef7fed319" class="code"><code>const routes = [
	{path:&#x27;/users/:id&#x27;, components:Homepage, alias:[&#x27;/people:id&#x27;, &#x27;/list&#x27;, &#x27;/:id&#x27;]}
]

/*  
	/people/12
  /users/12
	/12
   ---
  /list  不會顯示(404 Not Found)
*/</code></pre><p id="996bd5a5-c591-46cb-9bb0-b290953f06de" class="">巢狀路由</p><p id="cd8552cd-a835-4513-9e08-3d90f25a2f49" class="">巢狀路由使用 <code>/</code> 為絕對路徑</p><pre id="9d000a57-8e8e-456c-8f29-67b62d13e81b" class="code"><code>const routes = [
	{
		path:&#x27;/users&#x27;, 
		component:Homepage,
		children:[
			{path:&#x27;list&#x27;, component:&#x27;....&#x27;, alias:[&#x27;/people&#x27;, &#x27;&#x27;]}
		]
	}
]

/* 
	/people
	/users/list
	/users
*/</code></pre><p id="8da2e160-b7c7-44bf-9098-61107c872ea6" class="">
</p></details></li></ul><ul id="01493670-c008-4b38-8c7e-ee89c7ab723d" class="toggle"><li><details open=""><summary>傳遞 props</summary><p id="49bbcd68-0d01-4154-b4e2-be7670c3d792" class="">設定 <code>props:true</code> 替換 $route.params</p><pre id="0c1451ec-55fe-45f9-a8c5-06888741d7ab" class="code"><code>//    https//..../user/12
defineProps({
    id:String
})

// &lt;div&gt;props: {{$route.params.id }}&lt;/div&gt;
&lt;div&gt;prop:{{ id }}&lt;/div&gt;

---

const routes = [{ path: &#x27;/user/:id&#x27;, component: User, props: true }]</code></pre><p id="27ca3a52-c289-4619-9e44-35e5e56a1141" class="">命名視圖</p><p id="6fb95d56-1a4f-46fa-9625-37eafb7974fe" class="">每一個命名視圖 props 都要設定</p><pre id="715bb626-ca99-4066-8abb-bbb9de3c3ffb" class="code"><code>const routes = [
  {
    path: &#x27;/user/:id&#x27;,
    components: { default: User, sidebar: Sidebar },
    props: { default: true, sidebar: false }
  }
]</code></pre><p id="4583ed3c-f44f-4c54-a93c-b06086395066" class="">函式</p><pre id="427695a2-6525-4925-a0f3-6b6bd22715e8" class="code"><code>// https://..../search?q=vue

const routes = [
  {
    path: &#x27;/search&#x27;,
    component: SearchUser,
    //  { query:vue }
    props: route =&gt; ({ query: route.query.q })
  }
]

definedProps({
	query:String
})


&lt;div&gt;{{ qu }}&lt;/div&gt;</code></pre><p id="3ce74f0c-8fb3-41f8-94a3-283fc7b03051" class="">物件模式</p><p id="b843a30f-825c-4e4d-b84b-2b1502b9ee8b" class="">只能傳遞靜態值</p><pre id="01ec2cab-ee5a-43dc-bcfc-56b74d5a4862" class="code"><code>
const routes = [
  {
    path: &#x27;/search&#x27;,
    component: SearchUser,
    props: {something:&#x27;string&#x27;}
  }
]</code></pre><p id="32d57ede-c3b1-4498-8090-635800850429" class="">混用</p><pre id="84035060-e77e-4943-a28e-16dc85086f9e" class="code"><code>const routes = [
  {
    path: &#x27;/user/:id&#x27;,
    component: User,
    props: (route)=&gt;({
			something:&#x27;string&#x27;,
			...route.param
		})
  }
]</code></pre></details></li></ul></div></article><span class="sans" style="font-size:14px;padding-top:2em"></span>`,
    },
    {
      type: "Vue",
      title: "Pinia",
      link: "",
      article:`<article id="e182803d-a7e6-4287-9246-1164692e2119" class="page sans"><header><div class="page-header-icon undefined"></header><div class="page-body"><p id="4125c74d-238d-49fe-9a9e-2d99266fcbcc" >
</p><h1 id="f3ea380f-51d0-48f7-aae0-0daae3d3369c" class="">Store</h1><p id="b6a95575-5ac2-42e7-9f1a-ae473b35f70a" class="">Store (如 Pinia) 是一個保存狀態和業務邏輯的實體，它並不會與你的元件樹綁定。換句話說，它承載著全域狀態。它有點像一個永遠存在的元件，每個元件都可以讀取和寫入它。它有三個概念，state、getter 和 action，我們可以假設這些概念相當於元件中的 data、 computed 和 methods。</p><p id="afcd2221-6dab-47e5-a98f-257d70730316" class="">
</p><ul id="a3147374-fa19-49e0-a13d-8de736448099" class="bulleted-list"><li style="list-style-type:disc">store 是一個用 reactive 包裝的對象</li></ul><h3 id="b9ddc4f3-8144-4c26-b2bd-258aa490dff7" class=""><strong><strong>Option Store</strong></strong></h3><p id="a75d01af-33db-4bbe-8570-b29c89412a78" class="">state → data</p><p id="ab68852e-652b-4455-b345-6c0fe68dad26" class="">getter → computed</p><p id="4a4a41de-006c-4fbb-839b-f95d86466854" class="">actions → methods</p><pre id="ad439533-63d7-4cd9-946d-d1da5e3b7784" class="code"><code>// stores/counter.js
import { defineStore } from &#x27;pinia&#x27;

// 命名  use...Store
export const useCounterStore = defineStore(&#x27;counter&#x27;, {
  state: () =&gt; ({ count: 0 }),
  getters: {
    double: (state) =&gt; state.count * 2,
  },
  actions: {
    increment() {
      this.count++
    },
  },
})</code></pre><h3 id="9e4283eb-56f8-40c9-925e-c25e6590a397" class=""><strong><strong>Setup Store</strong></strong></h3><pre id="b2f43df4-34fb-46fa-8c36-ce0fa8966aa3" class="code"><code>// src/stores/counter.js

import { ref, computed } from &#x27;vue&#x27;
import { defineStore } from &#x27;pinia&#x27;

export const useCounterStore = defineStore(&#x27;counter&#x27;, () =&gt; {
  const count = ref(0)
  const doubleCount = computed(() =&gt; count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})</code></pre><p id="673bb7e7-da25-4c33-9b88-4f6528692dfd" class="">Setup store 比 Option Store 帶來了更多的靈活性，因為你可以在一個 store 內建立偵聽器，並自由地使用任何組合式函數。不過，請記住，<mark class="highlight-red">使用組合式函數會讓 SSR 變得更複雜</mark>。</p><hr id="4d31bd82-17a5-4c1d-878d-9fb29dcf773e"/><h3 id="7cebbe75-649a-4fb4-9c5b-9cfdf5c60f74" class="">storeToRefs</h3><p id="61f01f9f-d18c-4bc2-bf43-08e798b0da5d" class="">直接對 useCounterStore <mark class="highlight-red">解構</mark>會導致的響應性失效 (僅 state, getter,   action 不會)</p><p id="459de23d-1d6c-4009-a925-b41d7c84db6d" class="">在其他元件操作 count 將不會更新到當前元件</p><pre id="6bdf58c1-4f88-4a0d-83d9-95181c283160" class="code"><code>const store = useCounterStore()

// const {count, dobleCount } = store  -&gt; 不能直接解構
const {count, dobleCount } = storeToRefs(store)

const { increment } = store // action 可以直接解構</code></pre><details open=""><summary style="font-weight:600;font-size:1.875em;line-height:1.3;margin:0">State</summary><div class="indented"><p id="760a9273-baab-480c-9695-9ec0594bab9c" class="">state 通常被定義為一個返回初始狀態的函數</p><pre id="38901a5a-c20e-42fb-88e4-0200346aad44" class="code"><code>import { definedStore } from &#x27;pinia&#x27;

const useStore = defineStore(&#x27;storeId&#x27;, {
	state: () =&gt; {
		return {
			count: 0,
			name: &#x27;&#x27;,
			isAdmin:true,
			items:[],
			hasChanged:true,
		}
	}
})</code></pre><h3 id="735ec56e-6eaa-414c-ad9b-aa9bc442dbe8" class="">TypeScript</h3><p id="de03e144-546c-4b3d-a010-05ac4909c47d" class="">在啟用 strict , 或至少 noImplicitThis,  Pinia 會自動推斷類型</p><ul id="5ccca5c5-fef0-497b-b5af-2f8d197cffbb" class="toggle"><li><details open=""><summary>interface 寫法</summary><pre id="53b5a12a-34d8-4df3-9d5e-32e293a806e1" class="code"><code>const useStore = defineStore(&#x27;storeId&#x27;, {
  state: () =&gt; {
    return {
      // 用于初始化空列表
      userList: [] as UserInfo[],
      // 用于尚未加载的数据
      user: null as UserInfo | null,
    }
  },
})

interface UserInfo {
  name: string
  age: number
}</code></pre><pre id="c63145da-6b66-4bde-a33f-94b3a40bd742" class="code"><code>interface State {
  userList: UserInfo[]
  user: UserInfo | null
}

const useStore = defineStore(&#x27;storeId&#x27;, {
  state: (): State =&gt; {
    return {
      userList: [],
      user: null,
    }
  },
})

interface UserInfo {
  name: string
  age: number
}</code></pre></details></li></ul><p id="0500d8e0-0d94-4126-8893-a5ce8ee8b76f" class="">訪問 state</p><p id="dadad917-4450-45b1-af9e-1e25124352b9" class="">可直接對其進行讀寫</p><pre id="fc5bddfe-cf16-4258-91e7-5c9efb4b642d" class="code"><code>const store = useStore()

console.log(store.name)</code></pre><p id="c23cb958-9ad9-4c1f-8f62-099fa5dc806f" class="">不能直接解構使用,  需透過 storeToRefs(store)</p><p id="d893311b-2bb0-4405-877e-f91b9260b182" class="">
</p><p id="9ad8683b-60cb-41b1-b0ac-1660ac2eb431" class="">重置 state</p><p id="9f8823d8-03b6-4041-897f-d3bba7a39608" class="">選項式 (Option Store) 可直接用 $reset() 方法重置為初始值</p><pre id="5252721d-fa7f-4312-95ed-cfe41d0df82b" class="code"><code>const store = useStore()

store.$reset()</code></pre><p id="d03bf207-8b4c-4d6d-96d0-adfdfa79f167" class="">變更 state</p><pre id="da422f8a-2b1a-4896-9215-8ddef64de8c9" class="code"><code>const store = useStore()

// 方法 1 
store.count++

// 方法 2 
store.$patch({
	count:store.count++
	name:&#x27;DIO&#x27;,
	age:&#x27;120&#x27;
})

// 方法 3 
store.$patch((state)=&gt;{
	state.items.push({name:&#x27;shoes&#x27;, quantity: 1})
	state.hasChanged = true
})</code></pre><p id="c04c822b-b6d4-411e-aec2-c8b6f429a68a" class="">替換 state</p><p id="865366c6-ef36-4816-89b6-b4909a532d10" class="">無法完全替換掉 store 的 state, </p><pre id="8277493b-fc68-4905-a77b-deb8a83dc6ca" class="code"><code>// 這其實並沒有取代 '$state'
store.$state = { count: 24 }
// 在它內部呼叫 '$patch()'：
store.$patch({ count: 24 })</code></pre><p id="7a4f4c41-896a-4929-a1bd-e784a55f0857" class="">
</p><p id="2fcf988e-6e18-4917-a5d7-d0bec6c0090b" class="">初始化 state</p><p id="677f05e3-ee8d-49ef-bfde-d1df019b6b12" class="">你也可以透過變更 pinia 實例的 state 來設定整個應用程式的初始 state。這常用於 SSR 中的啟動過程。</p><pre id="844940f3-5311-4ec6-b64b-8c06621bc083" class="code"><code>import devalue from &#x27;@nuxt/devalue&#x27;
import { createPinia } from &#x27;pinia&#x27;
// 检索服务端的 rootState
const pinia = createPinia()
const app = createApp(App)
app.use(router)
app.use(pinia)

// 渲染页面后，rootState 被建立，
// 可以直接在 'pinia.state.value'上读取。

// 序列化，转义(如果 state 的内容可以被用户改变，这点就非常重要，几乎都是这样的)
// 并将其放置在页面的某处
// 例如，作为一个全局变量。
devalue(pinia.state.value)</code></pre><p id="f3b91eee-bd03-44c1-9e23-8039950d0ddf" class=""><a href="https://juejin.cn/post/7091119489072234509">訂閱 state</a></p><p id="4ef63bb8-8c0e-48ff-a04b-84d155e4de64" class="">透過 <code>$subscribe()</code> 方法監聽 state 的變化, 比起普通的 <code>watch()</code>，使用 <code>$subscribe()</code> 的好处是 <em>subscriptions</em> 在 <em>patch</em> 後只觸發一次</p><pre id="95f93409-6abd-43b6-9cf6-e51803ff15a2" class="code"><code>counter.$subscribe((mutation, state) =&gt; {
  // import { MutationType } from &#x27;pinia&#x27;
  mutation.type // &#x27;direct&#x27; | &#x27;patch object&#x27; | &#x27;patch function&#x27;

  // 和 counter.$id 一样
  mutation.storeId // &#x27;counter&#x27;

  // 只有 mutation.type === &#x27;patch object&#x27;的情况下才可用
  mutation.payload // 传递给 counter.$patch() 的补丁对象。

  // 每当状态发生变化时，将整个 state 持久化到本地存储。
  localStorage.setItem(&#x27;counter&#x27;, JSON.stringify(state))
})</code></pre><pre id="c11d5c0b-e6d5-42a4-87ff-25790e0afc67" class="code"><code>mutation.type -&gt; state 變更狀態的方式

// direct
conter.count++ 

// patch object
counter.$patch({count:12})

// patch function
counter.$patch((state)=&gt; {
	state.count *= 2
})</code></pre><p id="770aafa9-6a86-48d2-809a-c2d88a1b1604" class="">默认情况下，<em>state subscription</em> 会被绑定到添加它们的组件上 (如果 store 在组件的 <code>setup()</code> 里面)。这意味着，当该组件被卸载时，它们将被自动删除。如果你想在组件卸载后依旧保留它们，请将 <code>{ detached: true }</code> 作为第二个参数，以将 <em>state subscription</em> 从当前组件中<em>分离</em>：</p><pre id="1d174444-d812-4372-ab15-4934f3953d9d" class="code"><code>&lt;script setup&gt;
const someStore = useSomeStore()
// 此订阅器即便在组件卸载之后仍会被保留
someStore.$subscribe(callback, { detached: true })
&lt;/script&gt;</code></pre><p id="23ef6e21-bd65-4021-b10e-799ae1d8d8af" class="">在 <code><strong>pinia</strong></code> 实例上使用 <code><strong>watch()</strong></code> 函数侦听整个 state。</p><pre id="19f6400b-875a-426f-921f-a84465ade94a" class="code"><code>// main.ts
const pinia = createPinia()
watch(
  pinia.state,
  (state) =&gt; {
    // 每当状态发生变化时，将整个 state 持久化到本地存储。
     localStorage.setItem(&#x27;piniaState&#x27;, JSON.stringify(state))
  },
  { deep: true }
)

app.use(pinia)</code></pre></div></details><details open=""><summary style="font-weight:600;font-size:1.875em;line-height:1.3;margin:0">Getter</summary><div class="indented"><p id="96e9890a-117c-4903-862f-70c3d274b2f9" class="">getter 本身無法傳入參數，但可以透過回傳 func 的方式傳入參數</p><pre id="9dc8626f-390b-42ac-af0b-f017e52b508d" class="code"><code>export const useCounterStore = defineStore(&#x27;counter&#x27;, {
  state: () =&gt; ({ count: 0 }),
  getters: {
    double(state){ return state.count * 2},
    multiplied(state){ 
			return (num) =&gt; num * state.count 
		},
  },
  actions: {
    increment() {
      this.count++
    },
  },
})
---

&lt;p @click=&quot;increment&quot;&gt; increment &lt;/p&gt;
&lt;p&gt;{{ double }}&lt;/p&gt;
&lt;p&gt;{{ multiplied(count) }}&lt;/p&gt;</code></pre><p id="d2a152dd-697d-48d5-8cbd-08c257b291a2" class="">請注意，當你這樣做時，getter 將不再被快取，它們只是一個被你呼叫的函數。不過，你可以在 getter 本身中快取一些結果，雖然這種做法並不常見，但有證明表明它的性能會更好：</p><pre id="e2151e72-418e-4c85-a1d0-fed112cfed07" class="code"><code>export const useStore = defineStore(&#x27;main&#x27;, {
  getters: {
    getActiveUserById(state) {
      const activeUsers = state.users.filter((user) =&gt; user.active)
      return (userId) =&gt; activeUsers.find((user) =&gt; user.id === userId)
    },
  },
})</code></pre><p id="20912360-36ec-4a2a-8e52-f71f9cccff67" class="">訪問<strong><strong>其他 store 的 getter 直接 import 使用即可</strong></strong></p><pre id="6e70179b-830f-45cd-9ead-dcfb01248738" class="code"><code>import { useOtherStore } from &#x27;./other-store&#x27;

export const useStore = defineStore(&#x27;main&#x27;, {
  state: () =&gt; ({
    // ...
  }),
  getters: {
    otherGetter(state) {
      const otherStore = useOtherStore()
      return state.localData + otherStore.data
    },
  },
})</code></pre></div></details><details open=""><summary style="font-weight:600;font-size:1.875em;line-height:1.3;margin:0">Aciton</summary><div class="indented"><p id="18387a7a-96bc-40a1-98e6-2686241a9cc8" class="">action 可以是異步</p><pre id="d50fa09c-1738-46ed-8bdb-1d5b1a41056c" class="code"><code>import { mande } from &#x27;mande&#x27;

const api = mande(&#x27;/api/users&#x27;)

export const useUsers = defineStore(&#x27;users&#x27;, {
  state: () =&gt; ({
    userData: null,
    // ...
  }),

  actions: {
    async registerUser(login, password) {
      try {
        this.userData = await api.post({ login, password })
        showTooltip('Welcome back $ {this.userData.name}!')
      } catch (error) {
        showTooltip(error)
        // 让表单组件显示错误
        return error
      }
    },
  },
})</code></pre><p id="51dc18f6-8735-4f4e-9971-85e445787c10" class="">訪問<strong><strong>其他 store 的 action</strong></strong></p><pre id="4b77707d-c79e-443c-8cdf-e99b99b5ee8f" class="code"><code>import { useAuthStore } from &#x27;./auth-store&#x27;

export const useSettingsStore = defineStore(&#x27;settings&#x27;, {
  state: () =&gt; ({
    preferences: null,
    // ...
  }),
  actions: {
    async fetchUserPreferences() {
      const auth = useAuthStore()
      if (auth.isAuthenticated) {
        this.preferences = await fetchPreferences()
      } else {
        throw new Error(&#x27;User must be authenticated&#x27;)
      }
    },
  },
})</code></pre><p id="59be1613-fe1f-41c4-9230-c71079f27e3e" class="">訂閱<strong><strong> action</strong></strong></p><p id="90111c5d-64bc-4b49-82a8-69798a2e14b0" class="">通過 <code>store.$onAction()</code> 來監聽 action 和它們的結果。傳遞給它的回調函數會<mark class="highlight-red">在 action 本身之前執行。</mark></p><pre id="f7e66d5c-a0b5-4adb-bf49-6b53007be95b" class="code"><code>const unsubscribe = someStore.$onAction(
  ({
    name, // action 名称
    store, // store 实例，类似 'someStore'
    args, // 传递给 action 的参数数组
    after, // 在 action 返回或解决后的钩子
    onError, // action 抛出或拒绝的钩子
  }) =&gt; {
    // 为这个特定的 action 调用提供一个共享变量
    const startTime = Date.now()
    // 这将在执行 &quot;store &quot;的 action 之前触发。
    console.log('Start &quot;$ {name}&quot; with params [$ {args.join(&#x27;, &#x27;)}].')

    // 这将在 action 成功并完全运行后触发。
    // 它等待着任何返回的 promise
    after((result) =&gt; {
      console.log(
        'Finished &quot;$ {name}&quot; after $ {
          Date.now() - startTime
        }ms.\nResult: $ {result}.'
      )
    })

    // 如果 action 抛出或返回一个拒绝的 promise，这将触发
    onError((error) =&gt; {
      console.warn(
        'Failed &quot;$ {name}&quot; after $ {Date.now() - startTime}ms.\nError: $ {error}.'
      )
    })
  }
)

// 手动删除监听器
unsubscribe()</code></pre><p id="cbaf3b44-8d64-4baa-ba9f-ec721a526104" class="">默认情况下，<em>action 订阅器</em>会被绑定到添加它们的组件上(如果 store 在组件的 <code>setup()</code> 内)。这意味着，当该组件被卸载时，它们将被自动删除。如果你想在组件卸载后依旧保留它们，请将 <code>true</code> 作为第二个参数传递给 <em>action 订阅器</em>，以便将其从当前组件中分离：</p><pre id="e19365a3-5d36-48a2-b60e-ea34f3d0a17f" class="code"><code>&lt;script setup&gt;
const someStore = useSomeStore()
// 此订阅器即便在组件卸载之后仍会被保留
someStore.$onAction(callback, true)
&lt;/script&gt;</code></pre></div></details><details open=""><summary style="font-weight:600;font-size:1.875em;line-height:1.3;margin:0">Plugins</summary><div class="indented"><p id="acb7880b-f4c2-401f-ae76-faeba2c816fd" class=""><a href="https://juejin.cn/post/7086664050569904158">TypeScript</a> 透過 interface - <strong><strong>PiniaCustomProperties </strong></strong></p><pre id="c173f8f4-d034-41e7-993f-a857eca36560" class="code"><code>declare module &#x27;pinia&#x27; { 
    interface PiniaCustomProperties&lt;Id, S, G, A&gt; { 
        $globalStore: {
            id: Id,
            state?: () =&gt; S,
            get?: G,
            act?: A
        },
    }
}

// use(plugin: PiniaPlugin): Pinia;

pinia.use(({store}) =&gt; { 
    store.$globalStore = {
        id: &#x27;globalStore&#x27;,
        state: () =&gt; ({ state: &#x27;state&#x27; }),
        get: {
            getters: () =&gt; { return &#x27;getters&#x27; }
        },
        act: {
            act() { 
                console.log(&#x27;actions&#x27;)
            }
        }
    }
})

const store = useSomeStoer()

console.log(store.$global.id) // &#x27;globalStore&#x27;</code></pre></div></details></div></article><span class="sans" style="font-size:14px;padding-top:2em"></span>`
    }
  ];
});
