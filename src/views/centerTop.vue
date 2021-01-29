<template>
  <div id="centreLeft2">
    <div >
      <div class="d-flex jc-center">
        <CentreLeft2Chart />
      </div>
    </div>
  </div>
</template>

<script>
import CentreLeft2Chart from "@/components/echart/centerLeft/centerLeft2Chart";
export default {
  data() {
    return {};
  },
  components: {
    CentreLeft2Chart
  },
  mounted() {},
  methods: {}
};
</script>

<style lang="scss">
#centreLeft2 {
  padding: 0.2rem;
  height: 6.125rem;
  min-width: 3.75rem;
  border-radius: 0.0625rem;
  margin-left:0.1rem;
  margin-right:0.1rem;
  /*.bg-color-black {*/
  /*  height: 4.8125rem;*/
  /*  border-radius: 0.125rem;*/
  /*}*/
  .text {
    color: #c3cbde;
  }
  .chart-box {
    margin-top: 0.2rem;
    width: 4.125rem;
    height: 2.125rem;
    .active-ring-name {
      padding-top: 0.125rem;
    }
  }
}
</style>