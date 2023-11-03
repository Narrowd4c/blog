<template>
  <div class="container">
    <div v-if="article" class="mx-auto my-10 w-10/12 px-4">
      <h1 class="mb-4 text-3xl">{{ article.title }}</h1>
      <a :href="article.link" target="_blank" v-if="!article.article">連結</a>
      <p v-html="article.article" class="[&_pre]:text-sm"></p>
    </div>
    <div v-else-if="showNotFound" class="mx-auto w-1/2 border">
      <h1>找不到文章</h1>
    </div>
  </div>
</template>
<script setup>
const getArticleData = ref(null);
const route = useRoute();
const showNotFound = ref(false);
const article = ref(null);
watchEffect(async () => {
  let res = await $fetch("/api/article");
  getArticleData.value = res.filter(({ title }) => {
    return route.params.title === title;
  });
  if (getArticleData.value.length !== 0) {
    article.value = getArticleData.value.at(0);
  } else {
    showNotFound.value = true;
  }
});
</script>
<style>
.page-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-top: 0;
  margin-bottom: 0.75em;
}

.source {
  border: 1px solid #ddd;
  border-radius: 3px;
  padding: 1.5em;
  word-break: break-all;
}

.callout {
  border-radius: 3px;
  padding: 1rem;
}

.indented {
  padding-left: 1.5em;
}

@media only print {
  img {
    max-height: 100vh;
    object-fit: contain;
  }
}

@page {
  margin: 1in;
}

.collection-content {
  font-size: 0.875rem;
}

.column-list {
  display: flex;
  justify-content: space-between;
}

.column {
  padding: 0 1em;
}

.column:first-child {
  padding-left: 0;
}

.column:last-child {
  padding-right: 0;
}

.table_of_contents-item {
  display: block;
  font-size: 0.875rem;
  line-height: 1.5;
  padding: 0.125rem;
}

p {
  margin: 1rem 0;
  line-height: 2;
}
.table_of_contents-indent-1 {
  margin-left: 1.5rem;
}

.table_of_contents-indent-2 {
  margin-left: 3rem;
}

.table_of_contents-indent-3 {
  margin-left: 4.5rem;
}

.table_of_contents-link {
  text-decoration: none;
  opacity: 0.7;
  border-bottom: 1px solid rgba(55, 53, 47, 0.18);
}

.mono ol {
  padding-inline-start: 2em;
}

.mono ol > li {
  text-indent: -0.4em;
}

.toggle {
  padding-inline-start: 0em;
  list-style-type: none;
  padding: 1rem 0px;
}

/* Indent toggle children */
.toggle > li > details {
  padding-left: 1.7em;
}

.toggle > li > details > summary {
  margin-left: -1.1em;
}

.selected-value {
  display: inline-block;
  padding: 0 0.5em;
  background: rgba(206, 205, 202, 0.5);
  border-radius: 3px;
  margin-right: 0.5em;
  margin-top: 0.3em;
  margin-bottom: 0.3em;
  white-space: nowrap;
}

.collection-title {
  display: inline-block;
  margin-right: 1em;
}

.page-description {
  margin-bottom: 2em;
}

.simple-table {
  margin-top: 1em;
  font-size: 0.875rem;
  empty-cells: show;
}
.simple-table td {
  height: 29px;
  min-width: 120px;
}

.simple-table th {
  height: 29px;
  min-width: 120px;
}

.simple-table-header-color {
  background: rgb(247, 246, 243);
  color: black;
}
.simple-table-header {
  font-weight: 500;
}

.icon {
  display: inline-block;
  max-width: 1.2em;
  max-height: 1.2em;
  text-decoration: none;
  vertical-align: text-bottom;
  margin-right: 0.5em;
}

.user-icon {
  width: 1.5em;
  height: 1.5em;
  border-radius: 100%;
  margin-right: 0.5rem;
}

.user-icon-inner {
  font-size: 0.8em;
}

.text-icon {
  border: 1px solid #000;
  text-align: center;
}

.page-cover-image {
  display: block;
  object-fit: cover;
  width: 100%;
  max-height: 30vh;
}

.page-header-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.page-header-icon-with-cover {
  margin-top: -0.72em;
  margin-left: 0.07em;
}

.page-header-icon img {
  border-radius: 3px;
}

.link-to-page {
  margin: 1em 0;
  padding: 0;
  border: none;
  font-weight: 500;
}

.image {
  border: none;
  margin: 1.5em 0;
  padding: 0;
  border-radius: 0;
  text-align: center;
}

.code,
code {
  background: rgba(135, 131, 120, 0.15);
  border-radius: 3px;
  padding: 0.2em 0.4em;
  border-radius: 3px;
  font-size: 85%;
  tab-size: 2;
}

code {
  color: #eb5757;
}

.code {
  padding: 1.5em 1em;
}
pre {
  overflow: scroll;
}
.code-wrap {
  white-space: pre-wrap;
  word-break: break-all;
}

.code > code {
  background: none;
  padding: 0;
  font-size: 100%;
  color: inherit;
}

.bookmark {
  text-decoration: none;
  max-height: 8em;
  padding: 0;
  display: flex;
  width: 100%;
  align-items: stretch;
}

.bookmark-title {
  font-size: 0.85em;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 1.75em;
  white-space: nowrap;
}

.bookmark-text {
  display: flex;
  flex-direction: column;
}

.bookmark-info {
  flex: 4 1 180px;
  padding: 12px 14px 14px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.bookmark-image {
  width: 33%;
  flex: 1 1 180px;
  display: block;
  position: relative;
  object-fit: cover;
  border-radius: 1px;
}

.bookmark-description {
  color: rgba(55, 53, 47, 0.6);
  font-size: 0.75em;
  overflow: hidden;
  max-height: 4.5em;
  word-break: break-word;
}

.bookmark-href {
  font-size: 0.75em;
  margin-top: 0.25em;
}

.sans {
  font-family:
    ui-sans-serif,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    Helvetica,
    "Apple Color Emoji",
    Arial,
    sans-serif,
    "Segoe UI Emoji",
    "Segoe UI Symbol";
}
.code {
  font-family: "SFMono-Regular", Menlo, Consolas, "PT Mono", "Liberation Mono",
    Courier, monospace;
}

.select-value-color-interactiveBlue {
  background-color: rgba(35, 131, 226, 0.07);
}
.select-value-color-pink {
  background-color: rgba(245, 224, 233, 1);
}
.select-value-color-purple {
  background-color: rgba(232, 222, 238, 1);
}
.select-value-color-green {
  background-color: rgba(219, 237, 219, 1);
}
.select-value-color-gray {
  background-color: rgba(227, 226, 224, 1);
}
.select-value-color-translucentGray {
  background-color: rgba(255, 255, 255, 0.0375);
}
.select-value-color-orange {
  background-color: rgba(250, 222, 201, 1);
}
.select-value-color-brown {
  background-color: rgba(238, 224, 218, 1);
}
.select-value-color-red {
  background-color: rgba(255, 226, 221, 1);
}
.select-value-color-yellow {
  background-color: rgba(253, 236, 200, 1);
}
.select-value-color-blue {
  background-color: rgba(211, 229, 239, 1);
}
.select-value-color-pageGlass {
  background-color: undefined;
}
.select-value-color-washGlass {
  background-color: undefined;
}

.checkbox {
  display: inline-flex;
  vertical-align: text-bottom;
  width: 16;
  height: 16;
  background-size: 16px;
  margin-left: 2px;
  margin-right: 5px;
}

.checkbox-on {
  background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20width%3D%2216%22%20height%3D%2216%22%20fill%3D%22%2358A9D7%22%2F%3E%0A%3Cpath%20d%3D%22M6.71429%2012.2852L14%204.9995L12.7143%203.71436L6.71429%209.71378L3.28571%206.2831L2%207.57092L6.71429%2012.2852Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E");
}

.checkbox-off {
  background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20x%3D%220.75%22%20y%3D%220.75%22%20width%3D%2214.5%22%20height%3D%2214.5%22%20fill%3D%22white%22%20stroke%3D%22%2336352F%22%20stroke-width%3D%221.5%22%2F%3E%0A%3C%2Fsvg%3E");
}
</style>
