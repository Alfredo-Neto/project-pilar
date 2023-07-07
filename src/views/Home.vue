<template>
  <div class="home">
    <Dashboard />
  </div>
</template>

<script>
import Dashboard from "@/components/Dashboard";

export default {
  name: "Home",
  components: { Dashboard },
};
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
}
</style>
