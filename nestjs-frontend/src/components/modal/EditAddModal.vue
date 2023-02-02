<script setup lang="ts">
import type { PropType } from 'vue'
import { ref, toRefs } from 'vue'

import type { FormItem } from '../Form.vue'
import Form from '../Form.vue'
import { useModal } from '@/hooks'

const _props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  msg: {
    type: String,
    default: '新增',
  },
  schema: {
    type: Array as PropType<FormItem[]>,
    default: () => [],
  },
})
const emit = defineEmits(['submit'])

const { show } = toRefs(_props)
const formRef = ref()

const { modalRef: editRef, hide } = useModal(show, 'show')

const formData = ref()

// 取消
const cancel = () => {
  hide()
}

// 确定
const submit = () => {
  emit('submit', formData.value)
  hide()
  formData.value = {}
  formRef.value?.clearForm()
}

const change = (val: any) => {
  formData.value = val
}
</script>

<template>
  <!-- Edit/Add Model -->
  <div ref="editRef" class="modal fade" tabindex="-1" aria-labelledby="EditAndAddModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 id="EditAndAddModalLabel" class="modal-title">
            {{ msg }}
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" />
        </div>
        <div class="modal-body">
          <Form ref="formRef" :schema="schema" @change="change" />
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="cancel">
              取消
            </button>
            <button type="button" class="btn btn-primary" @click="submit()">
              确定
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
