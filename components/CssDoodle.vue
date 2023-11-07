<template>
  <css-doodle>
    @grid: 20x1 / 100vmin auto; background: @doodle( :doodle { @grid: 6x1 /
    100%; --polygon: polygon( 50% 0, @m(@r(2, 10), (@r(40%, 80%) @r(20%, 60%))),
    50% 100%, @m(@r(2, 10), (@r(50%, 100%) @r(60%, 80%))), 108% 100%, @m(@r(2,
    10), (@r(50%, 100%) @r(20%, 100%))) ); } clip-path: @shape(rotate: 30);
    @offset: @plot(r: .49; dir: auto -90); @size: 50%; :before, :after {
    content: ''; position: absolute; inset: 0; clip-path: var(--polygon);
    transform: rotateY(@pn(180deg, 0)); background: #fff; } );
  </css-doodle>
</template>
<script setup>
import "css-doodle";
</script>
