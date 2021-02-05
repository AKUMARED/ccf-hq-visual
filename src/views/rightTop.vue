<template>
  <div id="center">
    <div class="up">
      <div class="bg-color-black item" v-for="item in titleItem" :key="item.title">
        <p class="ml-3 colorBlue fw-b" style="width: 95%; font-size: 0.215rem;align-self: center">{{item.title}}</p>
        <div style="align-self: center" >
          <dv-digital-flop :config="item.number" style="margin-right: .2rem"/>
        </div>
      </div>
    </div>
    <div class="down">
      <div class="d-flex jc-center">
        <leftCenter />
      </div>
    </div>
  </div>
</template>

<script>
  import leftCenter from "@/components/echart/left/leftCenter";
export default {
  data () {
    return {
      titleItem: [
        {
          title: "报修工单",
          number: {
            number: [4.43],
            toFixed: 1,
            content: "{nt}"+"万件"
          }
        },
        {
          title: "派发工单",
          number: {
            number: [1.19],
            toFixed: 1,
            content: "{nt}"+"万件"
          }
        },
        {
          title: "一次解决率",
          number: {
            number: [72.48],
            toFixed: 1,
            content: "{nt}"+"%"
          }
        },

      ],
      ranking: {
        data: [
          {
            name: "西藏",
            value: 403.79
          },
          {
            name: "上海",
            value: 89.44
          },
          {
            name: "天津",
            value: 78.31
          },
          {
            name: "青海",
            value: 72.09
          },
          {
            name: "北京",
            value: 54.70
          },
        ],
        carousel: "single",
        unit: "件"
      },
    };
  },
  components: {
    leftCenter
  }
};
</script>

<style lang="scss" scoped>
#center {
  display: flex;
  flex-direction: column;
  .up {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    .item {
      display: flex;
      flex-direction: row;
      border-radius: 0.225rem;
      padding-top: 0.1rem;
      margin-top: 0.2rem;
      width: 32%;
      height: 0.675rem;
    }
  }
  .down {
    padding: 0.07rem 0.05rem 0;
    width: 100%;
    display: flex;
    height: 3.1875rem;
    justify-content: space-between;
    .bg-color-black {
      border-radius: 0.0625rem;
    }
    .ranking {
      padding: 0.125rem;
      width: 59%;
    }
  }
}
</style>