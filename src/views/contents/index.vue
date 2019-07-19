<template>
  <div class="content-container">
    <!-- 上边的卡片 -->
    <el-card>
      <div slot="header">
        <!-- 头部 -->
        <my-bread>内容管理</my-bread>
      </div>
      <!-- 表单 -->
      <el-form :model="reqParams" size="small" label-width="80px">
        <el-form-item label="状态：">
          <el-radio-group v-model="reqParams.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道：">
          <!-- <el-select v-model="reqParams.channel_id">
            <el-option
              v-for="item in channelOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select> -->
          <my-channel v-model="reqParams.channel_id"></my-channel>
        </el-form-item>
        <el-form-item label="时间：">
          <el-date-picker
            value-format="yyyy-MM-dd"
            @change="changeDate"
            v-model="dataValues"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search()">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 下边的卡片  结果容器 -->
    <el-card>
      <div slot="header">
        根据筛选条件共查询到
        <strong>{{total}}</strong>条结果
      </div>
      <el-table :data="contents">
        <el-table-column label="封面">
          <template slot-scope="scope">
            <!-- {{ scope.row.cover.images[0] }} -->
            <el-image :src="scope.row.cover.images[0]" style="width:100px;height:75px">
              <div slot="error" class="image-slot">
                <img src="../../assets/images/error.gif" width="100" height="75" alt /> >
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status===0" type="info">草稿</el-tag>
            <el-tag v-if="scope.row.status===1">待审核</el-tag>
            <el-tag v-if="scope.row.status===2" type="success">审核通过</el-tag>
            <el-tag v-if="scope.row.status===3" type="warning">审核失败</el-tag>
            <el-tag v-if="scope.row.status===4" type="danger">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="发布时间" prop="pubdate"></el-table-column>
        <el-table-column label="操作" width="120px">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" circle plain @click="edit(scope.row.id)"></el-button>
            <el-button type="danger" icon="el-icon-delete" circle plain @click="del(scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <div class="fyBox">
      <el-pagination
        background
        layout="prev, pager, next"
        @current-change="cahngePager"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      reqParams: {
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdare: null
      },

      // 日期控件数据
      dataValues: [],
      // 文章列表
      contents: [],
      // 总条数
      total: 0
    }
  },
  created () {
    // 获取列表数据
    this.getContents()
  },
  methods: {
    async getContents () {
      const {
        data: { data }
      } = await this.$http.get('articles', { params: this.reqParams })
      this.contents = data.results
      this.total = data.total_count
    },
    // 时间事件
    changeDate (values) {
      this.reqParams.begin_pubdate = values[0]
      this.reqParams.end_pubdate = values[1]
    },
    // 筛选事件
    // 重新获取列表数据即可   reqParams是绑定了筛选数据
    search () {
      this.getContents()
    },
    cahngePager (newPage) {
      // newPage 当前点击的按钮的页码
      // 更新提交给后台的参数
      this.reqParams.page = newPage
      // 获取列表数据
      this.getContents()
    },
    del (id) {
      this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 点击确认 发送删除请求
        await this.$http.delete(`articles/${id}`)
        // 删除成功后做什么
        // 重新获取列表数据
        this.getContents()
        // 删除成功提示
        this.$message.success('删除成功')
      }).catch(() => {
        // 点击取消
      })
    },
    edit (id) {
      // 点击编辑传入对应的id值  地址栏拼接id
      // this.$route.push('/wenzhang?id' + id)
      // 路径传参
      this.$router.push({ path: '/wenzhang', query: { id } })
    }
  }
}
</script>

<style lang="less" scoped>
.el-card {
  margin-bottom: 20px;
}
.fyBox {
  text-align: center;
}
</style>
