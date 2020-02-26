<template>
  <div class="layout">
    <Navbar/>
    <router-view/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Navbar from '@/components/shared/Navbar.vue';

@Component({
  name: 'Layout',
  components: {
    Navbar,
  },
})

export default class Layout extends Vue {
}
</script>
