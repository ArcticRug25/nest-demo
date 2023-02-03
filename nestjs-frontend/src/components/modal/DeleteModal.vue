<script setup lang="ts">
import { toRefs } from 'vue'
import { useModal } from '@/hooks'
const _props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
})
const emit = defineEmits(['delete', 'update:show'])
const { show } = toRefs(_props)

const { modalRef: deleteRef, hide } = useModal(show, 'show')

// 删除该条数据
const deleteSubmit = async () => {
  // @delete
  emit('delete')
}

// 取消
const cancel = () => {
  hide()
}
</script>

<template>
  <!-- Delete Modal -->
  <div ref="deleteRef" class="modal fade" tabindex="-1" aria-labelledby="DeleteModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 id="DeleteModalLabel" class="modal-title">
            删除
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" />
        </div>
        <div class="modal-body">
          确定删除该记录吗？
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="cancel()">
            取消
          </button>
          <button type="button" class="btn btn-primary" @click="deleteSubmit()">
            确定
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
