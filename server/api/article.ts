export default defineEventHandler((event) => {
  return [
    {
      type: "Vue",
      title: "響應式基礎 Ref & Reactive",
      link: "https://everlasting-hydrangea-e83.notion.site/ref-reactive-4b553ca8484948dc9f0c8069903d504c?pvs=4",
      article:`<p>ref 函式用於定義 vue 響應式狀態的值, 函式的參數接受任何型別並返回一個  ref 物件, 可透過 <code>.value</code> 使用響應式狀態的值</p>
<pre><code class="language-jsx">import { ref } from &#39;vue&#39;
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
}
</code></pre>
<p>在 SFC 中使用 setup 自動解構</p>
<ul>
<li><p><a href="https://cn.vuejs.org/api/composition-api-setup.html">setup() 函式</a></p>
<p>  <code>setup()</code> 本身不包含元件實例的存取權，即在 <code>setup()</code> 中存取 <code>this</code> 會是 <code>undefined</code></p>
<pre><code class="language-jsx">&lt;script&gt;
import { ref, shallowRef } from &#39;vue&#39;
export default {
  data(){
    return {
        option:this
    }
  },
  mounted(){
    console.log(&#39;option&#39;, this.option) // 組件實例 Proxy(Object){...}
        console.log(&#39;composition&#39;, this.composition) // undefined
  },
  setup(){
    const composition = this
    return {
      composition
    }
  }
}
&lt;/script&gt;
</code></pre>
</li>
</ul>
<pre><code class="language-jsx">&lt;script setup&gt;
    import { ref } from &#39;vue&#39;

    const count = ref(0)

    console.log(count.value) // 0
&lt;/script&gt;
</code></pre>
<p>在模板中使用不需要使用 <code>.value</code> ,  因為在模板中使用 ref 會自動解構賦值</p>
<pre><code class="language-jsx">import { ref } from &#39;vue&#39;

const count = ref(0)

function increment() {
  count.value++
}
---

&lt;template&gt;
    &lt;p&gt;{{ count }}&lt;/p&gt;
    &lt;button @click=&quot;count++&quot;&gt; +1 &lt;/button&gt;
&lt;/template&gt;
</code></pre>
<h3 id="ref-深層式響應式">ref 深層式響應式</h3>
<p>深層物件的變化也會被檢測到</p>
<pre><code class="language-jsx">import { ref } from &#39;vue&#39;

const obj = ref({
  nested: { count: 0 },
  arr: [&#39;foo&#39;, &#39;bar&#39;]
})

function mutateDeeply() {
  obj.value.nested.count++
  obj.value.arr.push(&#39;baz&#39;)
}
</code></pre>
<p>使用 shallowRef 減少大型不可變資料的響應性開銷</p>
<p>僅追蹤淺層變化(<code>.value</code>)，放棄檢測深層可更快速訪問深層的值</p>
<pre><code class="language-jsx">const shallowArray = shallowRef([
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
]
</code></pre>
<h3 id="dom-更新時機">DOM 更新時機</h3>
<p><a href="https://book.vue.tw/CH1/1-7-lifecycle.html#%E7%8B%80%E6%85%8B%E7%9A%84%E6%9B%B4%E6%96%B0%E8%88%87%E7%95%AB%E9%9D%A2%E7%9A%84%E5%90%8C%E6%AD%A5">狀態的更新與畫面的同步</a></p>
<p>當你修改了響應式狀態時，DOM 會自動更新。但是要注意的是，DOM 更新並不是同步的。 Vue 會在「next tick」更新周期中緩衝所有狀態的修改，以確保不管你進行了多少次狀態修改，每個元件只會更新一次。</p>
<pre><code class="language-jsx">&lt;script setup&gt;
import { ref, nextTick } from &#39;vue&#39;

const count = ref(0)

async function increment() {
  count.value++

  // DOM 还未更新
  console.log(document.getElementById(&#39;counter&#39;).textContent)   // 0

  await nextTick()
  // DOM 此时已经更新
  console.log(document.getElementById(&#39;counter&#39;).textContent)   // 1
    
    // 或是 callback
    nextTick(()=&gt;{
  console.log(document.getElementById(&#39;counter&#39;).textContent)}) // 1

}
&lt;/script&gt;

&lt;template&gt;
  &lt;button id=&quot;counter&quot; @click=&quot;increment&quot;&gt;{{ count }}&lt;/button&gt;
&lt;/template&gt;
</code></pre>
<h3 id="reactive">Reactive</h3>
<p>reactive 是另一種定義響應式狀態的方式, 返回一個 Proxy 物件</p>
<p>ref 的非原始值將透過 reactive 轉為 Proxy 物件</p>
<pre><code class="language-jsx">import { reactive } from &#39;vue&#39;;

const int = reactive({count:1})
const int2 = ref({count:1})

// 不需要透過 .value
console.log(int.count)

console.log(int)  // Proxy(Object){....}
console.log(int2) // RefImpl{...}
</code></pre>
<p>取消深層響應性：  <strong><code>[shallowReactive()](https://cn.vuejs.org/api/reactivity-advanced.html#shallowreactive)</code></strong></p>
<p>為確保存取代理的一致性，對同一個原始物件呼叫 reactive() 會總是傳回同樣的代理對象，而對一個已存在的代理對象呼叫 reactive() 會傳回其本身：</p>
<pre><code class="language-jsx">const raw = {}
const proxy = reactive(raw)

console.log(raw === proxy) // false

// 在同一個物件上呼叫 reactive() 會傳回相同的代理
console.log(reactive(raw) === proxy) // true

// 在一個代理程式上呼叫 reactive() 會回傳它自己
console.log(reactive(proxy) === proxy) // true
</code></pre>
<p>Reactive 的局限性</p>
<ol>
<li>只能使用非原始值 Object, Array Map…</li>
<li>不能替換整個物件：由於 Vue 的響應式追蹤是透過屬性存取實現的，因此我們必須始終保持對響應式物件相同的參考。這意味著我們不能輕易地「替換」響應式對象，因為這樣的話與第一個引用的響應性連接將丟失：</li>
</ol>
<pre><code class="language-jsx">&lt;script setup&gt;
import { reactive,computed } from &#39;vue&#39;

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
&lt;/template&gt;
</code></pre>
<ol>
<li>使用解構會斷開響應式</li>
</ol>
<pre><code class="language-jsx">const state = reactive({ count: 0 })

// 當解構時，count 已經與 state.count 斷開連接
let { count } = state
// 不會影響原始的 state
count++

// 這個函數接收到的是一個普通的數字 
// 且無法追蹤 state.count 的變化 
// 我們必須傳入整個物件以保持回應性
callSomeFunction(state.count)
</code></pre>
<h3 id="額外的-ref--解包細節-需不需要-value">額外的 ref  解包細節 (需不需要 .value)</h3>
<p>&quot;解包&quot; 通常指的是從響應式物件或引用類型中提取數據的操作，不等同於解構</p>
<p>ref 作為 reactive 的屬性可以直接讀取</p>
<pre><code class="language-jsx">const count = ref(0)
const state = reactive({
  count
})

console.log(state.count) // 0

state.count = 1
console.log(count.value) // 1
</code></pre>
<p>只有當嵌套在一個深層響應式物件內時，才會發生 ref 解包。
當其作為 shallowReactive 的屬性被存取時不會解包。</p>
<p>在模板渲染上下文中，只有頂層的 ref 屬性才會被解包。</p>
<pre><code class="language-jsx">const count = ref(0)
const object = { id: ref(1) }

{{ count + 1 }} // 1
{{ object.id + 1 }} // [object Object]1
</code></pre>
<p>當 ref 作為響應式陣列或原生集合類型(如 Map) 中的元素被存取時，它不會被解包：</p>
<pre><code class="language-jsx">const books = reactive([ref('Vue 3 Guide')])
// 这里需要 .value
console.log(books[0].value)

const map = reactive(new Map([['count', ref(0)]]))
// 这里需要 .value
console.log(map.get('count').value)</code</pre>`,
    },
    {
      type: "JavaScript",
      title: "變數與作用域",
      link: "https://everlasting-hydrangea-e83.notion.site/c228b1d53d7b4c689aa931b90126b4ba?pvs=4",
      article:`<h3 id="1-1-">1-1 變數宣告</h3>
<pre><code class="lang-jsx"><span class="hljs-selector-tag">var</span> <span class="hljs-selector-tag">a</span> = <span class="hljs-string">'a'</span> <span class="hljs-comment">// 全域變數</span>
<span class="hljs-selector-tag">b</span> = <span class="hljs-string">'b'</span> <span class="hljs-comment">// 全域屬性  像是物件中的 key</span>
console.log(window)

變數不可被刪除,  <span class="hljs-comment">// delete a , delete b</span>

function fn (){
    <span class="hljs-selector-tag">var</span> <span class="hljs-selector-tag">a</span> = <span class="hljs-string">'a2'</span>
    <span class="hljs-selector-tag">b</span> = <span class="hljs-string">'b'</span>
}
<span class="hljs-function"><span class="hljs-title">fn</span><span class="hljs-params">()</span></span>
console.log(a) <span class="hljs-comment">// error</span>
console.log(b)
</code></pre>
<p>問題一 為何變數需要被宣告？
避免重複命名導致資料污染</p>
<p>問題二 變數與屬性差異為何？
可以用 運算符 delete</p>
<h3 id="1-2-">1-2 變數的語法作用域</h3>
<p>問題一 var 宣告的變數作用域範圍？
函式內.
若函式內無宣告但有使用變數,會向外查找</p>
<p>問題二 let const 作用域範圍？
區塊作用域 <code>()&amp;{}</code> </p>
<p>如: <code>if(), for(), {}, function(){}</code></p>
<p>js 是靜態作用域(編譯時確定作用域)</p>
<p>var 函式作用域 function(){}
let const 區塊作用域 ()&amp;{}</p>
<h3 id="1-3-hoisting">1-3 hoisting</h3>
<p>問題一 什麼是提升？</p>
<p>瀏覽器解析程式碼有兩個階段</p>
<ol>
<li>創造階段: 為變數準備記憶體 function fn(){} 先於 var</li>
</ol>
<pre><code><span class="hljs-selector-tag">var</span> <span class="hljs-selector-tag">a</span> = <span class="hljs-number">12</span>

function a(){
  console.log(<span class="hljs-string">'fn'</span>)
}

<span class="hljs-function"><span class="hljs-title">a</span><span class="hljs-params">()</span></span><span class="hljs-comment">//error</span>
</code></pre><p>嘗試取值會回傳 undefined</p>
<pre><code>console.log(b) <span class="hljs-comment">// undefined</span>
<span class="hljs-selector-tag">var</span> <span class="hljs-selector-tag">b</span> = <span class="hljs-string">'b'</span>
</code></pre><ol>
<li>執行階段: 實際執行(變數賦值)</li>
</ol>
<p>函式
陳述式 可 hoisting
表達式 無 hoisting</p>
<pre><code class="lang-jsx"><span class="hljs-comment">//覆蓋</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sum</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'fn1'</span>)
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sum</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'fn2'</span>)
}

sum() <span class="hljs-comment">// fn2</span>

<span class="hljs-comment">// 陳述式先被分配到記憶體</span>
<span class="hljs-keyword">var</span> sum = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'expression'</span>)
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sum</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'statment'</span>)
}

sum() <span class="hljs-comment">// experession</span>
</code></pre>
<p>預期函式統一至後方, 僅能使用陳述式無法使用表達式</p>
<pre><code class="lang-jsx"><span class="hljs-selector-tag">var</span> <span class="hljs-selector-tag">b</span> = <span class="hljs-number">12</span>
<span class="hljs-function"><span class="hljs-title">a</span><span class="hljs-params">()</span></span> <span class="hljs-comment">//error</span>
<span class="hljs-selector-tag">var</span> <span class="hljs-selector-tag">a</span> = function (){
  console.log(b)
}
</code></pre>
<p>記憶體分配 在開發人員工具中可看到</p>
<h3 id="1-4-undefined-null-is-not-defined">1-4 undefined &amp; null &amp; is not defined</h3>
<p>宣告時會預設給予 undefined</p>
<p>undefined 系統預設空值
null 開發者賦予空值, (以前有值, 現在沒有)</p>
<pre><code class="lang-jsx"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn1</span>(<span class="hljs-params"></span>)</span>{}
<span class="hljs-keyword">let</span> f = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn2</span>(<span class="hljs-params"></span>)</span>{}
<span class="hljs-built_in">console</span>.log(f.name, fn1.name) <span class="hljs-comment">//fn2, fn1</span>

<span class="hljs-keyword">var</span> bar = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">baz</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(bar === baz)
}
bar()
bar.name <span class="hljs-comment">// "baz"</span>
</code></pre>
<ul>
<li>可選串連 optional chaining operator</li>
</ul>
<p>如果是 <code>?.</code> 前是 undefined, null , 則回傳 undefined </p>
<p>可用於 function 或是 object.prop</p>
<pre><code class="lang-jsx"><span class="hljs-selector-tag">obj</span><span class="hljs-selector-class">.val</span>?<span class="hljs-selector-class">.prop</span>
<span class="hljs-selector-tag">obj</span><span class="hljs-selector-class">.val</span>?.<span class="hljs-selector-attr">[expr]</span>
<span class="hljs-selector-tag">obj</span><span class="hljs-selector-class">.func</span>?.(<span class="hljs-selector-tag">args</span>)
</code></pre>
<ul>
<li>空值合並運算符（nullish coalescing operator）</li>
</ul>
<pre><code class="lang-jsx"><span class="hljs-keyword">let</span> <span class="hljs-keyword">val</span> = <span class="hljs-number">0</span>
<span class="hljs-keyword">let</span> result = <span class="hljs-keyword">val</span> ?? 'unknow'
<span class="hljs-comment">//result = (a !== null &amp;&amp; a !== undefined) ? a : b;</span>
</code></pre>
`,
    },
    {
      type: "CSS",
      title: "用 linear-gradient 做動態邊框",
      link: "https://codepen.io/narrowd4c/pen/GRPLLeg",
      article:'A - 用 linear-gradient 做動態邊框',
    },
    {
      type: "Nuxt",
      title: "Nuxt Seo 設定",
      link: "https://everlasting-hydrangea-e83.notion.site/SEO-and-Meta-336453dcd950470b91e87ddfd4f0b764?pvs=4",
      article:'A-Nuxt Seo 設定',
    },
    {
      type: "JavaScript",
      title: "JavaScript 型別",
      link: "https://everlasting-hydrangea-e83.notion.site/196669444fea4eb7b87aa22b52f564ba?pvs=4",
      article:'A-JavaScript 型別',
    },
  ];
});
