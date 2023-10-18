<template>
  <div class="h-screen bg-red-600">
    <section
      style="
        --bgUrl: url(&quot;https://cw-image-resizer.cwg.tw/resize/uri/https%3A%2F%2Fstorage.googleapis.com%2Fcrossing-cms-cwg-tw%2Fckeditor%2F202007%2Fckeditor-5f0ff3cecda06.jpg/?format=webp&quot;);
      "
      class="flex items-center justify-center"
    >
      <h1 class="title">Ayasofya</h1>
    </section>
    <section
      style="
        --bgUrl: url(&quot;https://images1.epochhk.com/pictures/128935/100_Fotolia_27216027@1200x1200.jpg&quot;);
      "
      class="flex items-center justify-center"
    >
      <h1 class="title">Mont-Saint-Michel</h1>
    </section>
  </div>
</template>
<script setup>
import { ref } from "vue";

const rotation = ref(0);
</script>
<style scoped>
.index {
  height: 100vh;
}
section {
  background: var(--bgUrl) center/cover no-repeat fixed;
  scroll-snap-align: start;
  min-width: 100vw;
  height: 100%;
  flex: 1 0 0px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.title {
  --rotation:0deg;
  font-size: 5vw;
  background: linear-gradient(
      var(--rotation),
      rgba(20, 140, 255, 1) 5%,
      rgba(255, 255, 255, 0.1) 100%
    ),
    aqua;
  color: rgba(0, 0, 0, 0) !important;
  background-clip: text;
  -webkit-background-clip: text;
  filter: drop-shadow(1px 1px 1px black);
  cursor: pointer;
  transform: scale(1);
  &:hover {
    animation:
      scale 0.7s linear infinite both alternate,
      linear 0.5s linear infinite both;
  }
}

@keyframes scale {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.05);
  }
}

@keyframes linear {
  0% {
    --rotation: 0deg;
  }
  10% {
    --rotation: 36deg;
  }
  20% {
    --rotation: 72deg;
  }
  30% {
    --rotation: 108deg;
  }
  40% {
    --rotation: 144deg;
  }
  50% {
    --rotation: 180deg;
  }
  60% {
    --rotation: 216deg;
  }
  70% {
    --rotation: 252deg;
  }
  80% {
    --rotation: 288deg;
  }
  90% {
    --rotation: 324deg;
  }
  100% {
    --rotation: 360deg;
  }
}
</style>
