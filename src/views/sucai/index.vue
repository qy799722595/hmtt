<template>
  <div class="container" v-loading="loading">
    <el-card>
      <div slot="header">
        <my-bread>素材管理</my-bread>
      </div>
      <div style="margin-bottom:20px">
        <el-radio-group v-model="reqParams.collect" @change="search()" size="small">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <el-button
          type="success"
          @click="dialogVisible=true"
          style="float:right"
          size="small"
        >添加素材</el-button>
      </div>
      <ul class="img-list">
        <li v-for="item in images" :key="item.id">
          <img :src="item.url" alt />
          <div class="fot" v-if="!reqParams.collect">
            <span class="el-icon-star-off" @click="toggleFav(item)" :class="{red:item.is_collected}"></span>
            <span class="el-icon-delete" @click="delImage(item.id)"></span>
          </div>
        </li>
      </ul>
      <el-pagination
        v-if="total>reqParams.per_page"
        background
        layout="prev, pager, next"
        :page-size="reqParams.per_page"
        :current-page="reqParams.page"
        @current-change="pager"
        :total="total"
      ></el-pagination>
    </el-card>
    <el-dialog title="添加素材" :visible.sync="dialogVisible" width="300px">
      <el-upload
        class="avatar-uploader"
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        :show-file-list="false"
        name="image"
        :on-success="handleSuccess"
        :headers="headers"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      reqParams: {
        collect: false,
        page: 1,
        per_page: 10
      },
      // 素材列表
      images: [],
      // 分页相关
      total: 0,
      // 控制对话框的显示与隐藏 默认隐藏 false
      dialogVisible: false,
      // 预览地址
      imageUrl: null,
      // 上传请求头
      headers: {
        Authorization:
          'Bearer ' + JSON.parse(window.sessionStorage.getItem('hmtt')).token
      },
      loading: false
    }
  },
  created () {
    this.getImages()
  },
  methods: {
    async getImages () {
      this.loading = true
      const {
        data: { data }
      } = await this.$http.get('user/images', { params: this.reqParams })
      this.images = data.results
      // 获取总条数
      this.total = data.total_count
      this.loading = false
    },
    search () {
      this.reqParams.page = 1
      this.getImages()
    },
    pager (newPage) {
      this.reqParams.page = newPage
      this.getImages()
    },
    // 上传成功后的处理函数
    handleSuccess (res) {
      // 预览
      this.imageUrl = res.data.url
      this.$message.success('上传成功')
      // 关闭对话框 更新列表
      window.setTimeout(() => {
        this.dialogVisible = false
        this.getImages()
        this.imageUrl = null
      }, 1500)
    },
    // 收藏 / 取消收藏
    async toggleFav (item) {
      // item包含id is_collected 是否收藏
      const {
        data: { data }
      } = await this.$http.put('user/images/' + item.id, {
        collect: !item.is_collected
      })
      // 成功 图标切换颜色
      this.$message.success('操作成功')
      item.is_collected = data.collect
    },
    delImage (id) {
      this.$confirm('此操作将永久删除该素材, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 获取要删除对应项的id
        await this.$http.delete('user/images/' + id)
        // 提示信息
        this.$message.success('删除成功')
        // 删除成功后刷新列表
        this.getImages()
      }).catch(() => {})
    }
  }
}
</script>

<style lang="less" scoped>
.img-list {
  list-style: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  li {
    width: 280px;
    height: 280px;
    float: left;
    margin-right: 20px;
    margin-bottom: 20px;
    border: 1px dashed #eee;
    position: relative;
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
    .fot {
      width: 100%;
      height: 30px;
      line-height: 30px;
      position: absolute;
      color: #fff;
      background: rgba(0, 0, 0, 0.5);
      bottom: 0;
      left: 0;
      text-align: center;
      span {
        margin: 0 20px;
        &.red {
          color: red;
        }
      }
    }
  }
}
</style>
