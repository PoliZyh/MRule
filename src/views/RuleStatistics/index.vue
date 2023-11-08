<template>
    <div class="top">
      <p>规则文件总数：0，知识包总数：0</p>
    </div>
    <div class="theme">
      <div class="subhead">
        <p>近期规则提交</p>
      </div>
      <div class="subhead">
        <p>近期规则发布</p>
      </div>
      <div class="subhead">
        <p>规则调用耗时</p>
      </div>
    </div>
    <div class="card">
      <div class="chart">
        <div id="linecharts-container" style="width: 340px; height: 340px"></div>
      </div>
      <div class="chart">
        <div id="barcharts-container" style="width: 340px; height: 340px"></div>
      </div>
      <div class="chart">
        <div id="piecharts-container" style="width: 340px; height: 340px;"></div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import Highcharts from 'highcharts';
  
  onMounted(() => {
  // 折线图
  const lineChartsData = [
    {
      name: '提交总量',
      data: [8, 3, 5, 11, 9, 8, 12]
    }
  ];
  //折现图配置
  const lineChartsOptions = {
    chart: {
      type: 'line',
      backgroundColor: 'rgb(245, 245, 245)', 
    },
    title: {
      text: '近七天规则提交',
    },
    xAxis: {
      categories: ['10.26','10.27','10.28', '10.29', '10.30', '10.31', '11.01'],
    },
    yAxis: {
      title: {
        text: '数据',
      },
    },
    plotOptions : {
      line: {
        dataLabels: {
          enabled: true
        },   
        enableMouseTracking: false
      }
    },
    credits: {
      enabled: false,
    },
    series: lineChartsData,
  };
  
  // 在指定容器中创建折线图
  Highcharts.chart('linecharts-container', lineChartsOptions);
    
  // 所有图表的配置
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };
  
  // 柱状图
  const barChartData = [
    {
      name: '虚假账单',
      data: [9, 1, 6, 9, 4, 6, 5],
    },
    {
      name: '电子邮件',
      data: [3, 8, 8, 4, 6, 5, 4],
    },
    {
      name: '预付卡',
      data: [8, 3, 9, 4, 7, 8, 5],
    },
  ];
  // 柱状图配置
  const barChartsOptions = {
    chart: {
      type: 'column',
      backgroundColor: 'rgb(245, 245, 245)', 
    },
    title: {
      text: '近七天规则发布',
    },
    xAxis: {
      categories: ['10.26','10.27','10.28', '10.29', '10.30', '10.31', '11.01'],
      crosshair: true,
    },
    yAxis: {
      min: 0,
      title: {
        text: '数据',
      },
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
      },
    },
    credits: {
      enabled: false,
    },
    series: barChartData,
  };
  
  // 在指定容器中创建柱状图
  Highcharts.chart('barcharts-container', barChartsOptions);
    
  // 饼图
  const pieChartData = [
  {
    name: '钓鱼',
    y: 45.0,
  },
  {
    name: '伪造',
    y: 26.8,
  },
  {
    name: '管控',
    y: 12.8,
  },
  {
    name: '虚假账单',
    y: 8.5,
  },
  {
    name: '预付卡欺诈',
    y: 6.2,
  },
  {
    name: '其他',
    y: 0.7,
  },
  ];
  
  // 饼图配置
  const pieChartsOptions = {
    chart: {
      type: 'pie',
      backgroundColor: 'rgb(245, 245, 245)', 
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
    },
    title: {
      text: '各规则调用耗时比例',
    },
  
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '{point.name}: <b>{point.percentage:.1f}%</b>',
          style: {
            fontSize: '10px',
            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black',
          },
          distance: -0.5,
        },
        size: '95%',
      },
    },
    credits: {
      enabled: false,
    },
    series: [
      {
        name: '各规则调用耗时比例',
        data: pieChartData,
      },
    ],
  };
  
  // 在指定容器中创建饼图
  Highcharts.chart('piecharts-container', pieChartsOptions);
  });
  </script>
  
  <style scoped lang="scss">
    .top {
      background: #99a9bf;
      border-radius: 30px;
      height: 50px;
      margin-top: 30px;
      box-shadow: 5px 5px 5px #b9b9b9;
      p{
          font-size: 18px;
          line-height: 50px;
          margin-left: 20px;
      }
    }
    .theme {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      .subhead{
        background: #d3dce6;
        border-radius: 20px;
        height: 45px;
        width: 360px;
        margin-top: 60px;
        box-shadow: 5px 5px 5px #b9b9b9;
        p{
          font-size: 16px;
          line-height: 45px;
          text-align: center;
        }
      }
    }
    .card{
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      margin-top: 30px;
      .chart {
        background-color: rgb(245, 245, 245);
        border-radius: 20px;
        width: 360px;
        height: 360px;
        border: 1px solid rgb(202, 194, 194);
        box-shadow: 5px 5px 5px #b9b9b9;
        display: flex;
        justify-content: center; // 水平居中
        align-items: center; // 垂直居中
      }
    }
  </style>
  