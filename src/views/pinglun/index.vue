<template>
  <div class="container">
    <el-card>
      <div slot="header">
        <my-bread>评论管理</my-bread>
      </div>
      <el-table :data="comments">
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
        <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
        <!-- 状态是个布尔值 prop只能显示字符串或数字 所以不能使用prop -->
        <el-table-column label="状态">
          <template slot-scope="scope">{{scope.row.comment_status?'正常':'关闭'}}</template>
        </el-table-column>
        <el-table-column label="操作" width="400">
          <template slot-scope="scope">
            <el-button
              @click="getStatus(scope.row)"
              v-if="!scope.row.comment_status"
              type="success"
              size="mini"
            >打开评论</el-button>
            <el-button @click="getStatus(scope.row)" v-else type="danger" size="mini">关闭评论</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        style="margin-top:20px"
        :page-size="reqParams.per_page"
        :current-page="reqParams.page"
        @current-change="pager"
        layout="prev, pager, next"
        :total="total"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      reqParams: {
        page: 1,
        per_page: 20,
        response_type: 'comment'
      },
      comments: [],
      // 总条数
      total: 0
    }
  },
  created () {
    this.getCommtens()
  },
  methods: {
    async getCommtens () {
      const {
        data: { data }
      } = await this.$http.get('articles', { params: this.reqParams })
      this.comments = data.results
      // 给total赋值
      this.total = data.total_count
    },
    pager (newPage) {
      this.reqParams.page = newPage
      this.getCommtens()
    },
    getStatus (row) {
      // console.log(row)
      const text1 = '是否打开评论'
      const text2 = '关闭后无法进行该评论操作，是否关闭？'
      this.$confirm(row.comment_status ? text2 : text1, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const {
            data: { data }
          } = await this.$http.put('comments/status?article_id=' + row.id, {
            allow_comment: !row.comment_status
          })
          this.$message.success('修改状态成功')
          row.comment_status = data.allow_comment
          // console.log(data)
        })
        .catch(() => {})
    }
  }
}
</script>

<style>
</style>
