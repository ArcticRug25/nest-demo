<script setup lang="ts">
import type { PropType } from 'vue'
import { useRouter } from 'vue-router'
import type { MenuItem } from './types/SidebarNav'

defineProps({
  menus: {
    type: Array as PropType<Array<MenuItem>>,
    default: () => [] as MenuItem[],
  },
})
const router = useRouter()
// 获取meta中的icon信息
function getIcon(item: MenuItem) {
  const res = router
    .getRoutes()
    .find(o =>
      item.routeName ? o.name === item.routeName : o.path === item.path,
    )
  return res?.meta?.icon
}
</script>

<template>
  <div class="nav-bg flex-fill">
    <ul class="nav flex-column">
      <li v-for="item in menus" :key="item.id" class="nav-item  py-1">
        <router-link class="nav-link text-white-50 d-flex align-items-center cursor" aria-current="page" :to="item.routeName ? { name: item.routeName } : item.path">
          <i class="pe-3 text-light" :class="[getIcon(item)]" />{{ item.name }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.nav-item {
  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
  .active {
    background: rgba(255, 255, 255, 0.3);
  }
}
</style>
