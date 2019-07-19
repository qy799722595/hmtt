<template>
  <div class="container">
    <el-card>
      <div slot="header">
        <my-bread>评论管理</my-bread>
      </div>
      <!-- 定义一个comments对象数组 用来接收返回过来的列表数据 渲染列表  -->
      <el-table :data="comments">
        <!-- 更改prop中的值 对应接口文档 -->
        <el-table-column prop="title" label="标题" width="300"></el-table-column>
        <el-table-column prop="comment_status" label="评论状态">
          <template slot-scope="scope">
            <!-- 按钮组件 -->
            <el-switch v-model="scope.row.comment_status"></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
        <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
        <el-table-column label="操作"></el-table-column>
      </el-table>
        <el-pagination background layout="prev, pager, next" :total="1000">

        </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      reqParams: {
        page: 1,
        per_page: 10,
        response_type: 'comment'
      },
      // 声明
      comments: [],
      total: 0
    }
  },
  created () {
    this.commentsData()
  },
  methods: {
    async commentsData () {
      const {
        data: { data }
      } = await this.$http.get('articles', { params: this.reqParams })
      this.comments = data.results
      this.total = this.total_count
    }
  }
}
</script>

<style>
</style>
