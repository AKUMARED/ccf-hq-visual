<template>
  <div id="center">
    <div class="up">
      <div class="bg-color-black item">
        <p class="ml-4 colorBlue fw-b">{{titleItem[0].title}}</p>
        <div>
          <dv-digital-flop :config="titleItem[0].number" style="width:1rem;height:.425rem;margin-left: 0.45rem" />
        </div>
      </div>
      <div class="bg-color-black item">
        <p class="ml-4 colorBlue fw-b">{{titleItem[1].title}}</p>
        <div>
          <dv-digital-flop :config="titleItem[1].number" style="width:1rem;height:.425rem;margin-left: 0.45rem" />
        </div>
      </div>
      <div class="bg-color-black item">
        <p class="ml-4 colorBlue fw-b">{{titleItem[2].title}}</p>
        <div>
          <dv-digital-flop :config="titleItem[2].number" style="width:1rem;height:.425rem;margin-left: 0.45rem" />
        </div>
      </div>
    </div>
    <div class="down">
      <div class="ranking bg-color-black">
        <span style="color:#5cd9e8">
          <icon name="align-left"></icon>
        </span>
        <span class="fs-xl text mx-2 mb-1" style="font-size: 0.175rem">每百万户派发量较多的单位</span>
        <dv-scroll-ranking-board :config="ranking" style="height:2.75rem" />
      </div>
      <div class="d-flex jc-center">
        <CentreLeft1Chart />
      </div>
    </div>
  </div>
</template>

<script>
  import CentreLeft1Chart from "@/components/echart/centerLeft/centerLeft1Chart";
export default {
  data () {
    return {
      titleItem: [
        {
          title: "共受理故障报修工单",
          number: {
            number: [4.43],
            toFixed: 1,
            content: "{nt}"+"万件"
          }
        },
        {
          title: "派发故障报修工单",
          number: {
            number: [1.19],
            toFixed: 1,
            content: "{nt}"+"万件"
          }
        },
        {
          title: "故障报修一次解决率",
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
    CentreLeft1Chart
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
      border-radius: 0.225rem;
      padding-top: 0.1rem;
      margin-top: 0.2rem;
      width: 28%;
      height: 0.675rem;
    }
  }
  .down {
    padding: 0.07rem 0.05rem;
    padding-bottom: 0;
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