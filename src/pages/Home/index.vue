<template>
  <div>
    <TypeNav />
    <ListContainer />
    <Recommend />
    <Rank />
    <Like />
    <Floor
      v-for="(Floor, index) in floorList"
      :key="Floor.id"
      :floorData="Floor"
    />
    <Brand />
  </div>
</template>

<script>
// TypeNav为全局组件，而ListContainer为局部组件！需要注册！
import ListContainer from '@/pages/Home/ListContainer'
import Recommend from '@/pages/Home/Recommend'
import Rank from '@/pages/Home/Rank'
import Like from '@/pages/Home/Like'
import Floor from '@/pages/Home/Floor'
import Brand from '@/pages/Home/Brand'
import { mapState } from 'vuex'
export default {
  name: '',
  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand
  },
  mounted() {
    this.$store.dispatch('getFloorList');
  },
  computed: {
    ...mapState({
      floorList: (state) => state.home.floorList,
    }),
  }
}
</script>

<style>
</style>