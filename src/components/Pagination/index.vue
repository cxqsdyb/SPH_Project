<template>
  <div class="pagination">
    <!-- 前 -->
    <button
      v-show="startAndEnd.start != 1"
      @click="$emit('getPage', pageNo - 1)"
    >
      上一页
    </button>
    <button v-show="startAndEnd.end > continues" @click="$emit('getPage', 1)">
      1
    </button>
    <button v-show="startAndEnd.start - 1 > 1">···</button>

    <!-- 中 -->
    <button
      v-for="(page, index) in startAndEnd.end"
      :key="index"
      v-show="page >= startAndEnd.start"
      :class="{ active: page == pageNo }"
      @click="$emit('getPage', page)"
    >
      {{ page }}
    </button>

    <!-- 后 -->
    <button v-show="totalPage - startAndEnd.end > 1">···</button>
    <button
      v-show="startAndEnd.end < totalPage"
      @click="$emit('getPage', totalPage)"
    >
      {{ totalPage }}
    </button>
    <button
      v-show="startAndEnd.end != totalPage"
      @click="$emit('getPage', pageNo + 1)"
    >
      下一页
    </button>
    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ['pageNo', 'pageSize', 'total', 'continues'],
  computed: {
    // 计算出总页数
    totalPage() {
      // 向上取值
      return Math.ceil(this.total / this.pageSize);
    },
    // 计算连续页码得起始和结束的数字
    startAndEnd() {
      let start, end;
      // 页码总数小于连续页码数,不正常
      if (this.continues > this.totalPage) {
        start = 1;
        end = this.totalPage;
      } else {
        // 页码总数大于等于连续页码个数，正常
        start = this.pageNo - Math.floor(this.continues / 2);
        end = this.pageNo + Math.floor(this.continues / 2);
        // 避免数字<=0或>页码总数
        if (start < 1) {
          start = 1;
          end = this.continues;
        }
        if (end > this.totalPage) {
          end = this.totalPage;
          start = this.totalPage - this.continues + 1;
        }
      }
      return { start, end }
    }
  }
}
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>
