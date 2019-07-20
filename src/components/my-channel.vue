<template>
  <el-select :value="value" @change="fn">
    <el-option
      v-for="item in channelOptions"
      :key="item.id"
      :label="item.name"
      :value="item.id">
    </el-option>
  </el-select>
</template>

<script>
export default {
  name: 'my-channel',
  props: ['value'],
  data () {
    return {
      // 默认频道数据
      channelOptions: []
    }
  },
  created () {
    // 获取频道数据
    this.getData()
  },
  methods: {
    async getData () {
      // const o = { data: {} }; const {data}=o  一层解构 对象的结构一层
      // 二层解构  const res = {data:{data:{channel:[]}}} 多个结构 const {data:{data}}
      const {
        data: { data }
      } = await this.$http.get('channels')
      this.channelOptions = data.channels
    },
    fn (value) {
      this.$emit('input', value)
    }
  }
}
</script>

<style>
</style>
