<template>
  <div id="center">
    <div class="up">
      <div class="bg-color-black item">
        <p class="ml-3 colorBlue fw-b" style="width: 95%; font-size: 0.215rem;align-self: center">{{titleItem[0].title}}</p>
        <div style="align-self: center" >
          <dv-digital-flop :config="titleItem[0].number"  />
        </div>
      </div>
    </div>
    <div class="down">
      <div class="d-flex jc-center">
        <RightCenterChart />
      </div>
      <div class="ranking bg-color-black">
        <span style="color:#5cd9e8">
          <icon name="align-left"></icon>
        </span>
        <span class="fs-xl text mx-2 mb-1" style="font-size: 0.175rem">95598运检类投诉</span>
        <dv-scroll-ranking-board :config="ranking" style="height:2.75rem" />
      </div>
    </div>
  </div>
</template>

<script>
  import RightCenterChart from "@/components/echart/centerRight/rightCenterChart";
export default {
  data () {
    return {
      titleItem: [
        {
          title: "95598运检类投诉工单",
          number: {
            number: [79],
            toFixed: 1,
            content: "{nt}"+"件"
          }
        },


      ],
      ranking: {
        data: [
          {
            name: "四川",
            value: 20
          },
          {
            name: "湖南",
            value: 10
          },
          {
            name: "重庆",
            value: 7
          },
          {
            name: "陕西",
            value: 6
          },
          {
            name: "安徽",
            value: 5
          },
        ],
        carousel: "single",
        unit: "件"
      },
    };
  },
  components: {
    RightCenterChart
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
      width: 90%;
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