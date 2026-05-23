<script setup>
import { onMounted, ref } from 'vue';
import React from 'react';
import ReactDOM from 'react-dom/client';
import SelectPlayground from './SelectPlayground';

const container = ref(null);
onMounted(() => {
  ReactDOM.createRoot(container.value).render(
    React.createElement(SelectPlayground)
  );
});
</script>

<template>
  <div ref="container"></div>
</template>
