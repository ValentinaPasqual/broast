(window.webpackJsonp=window.webpackJsonp||[]).push([[51,112],{39:function(t,a,e){"use strict";e.r(a),e.d(a,"ChartData",(function(){return r}));class r{static get DEFAULT_MULTIPLIER(){return 1.2}static get MAXIMUM_DIVISIONS(){return 10}static get COLORS(){return["#003663","#E84E0F","#02A99A","#999999"]}constructor(t,a,e,r){this.filter=r,this.initialChartSetup(t,a,e)}initialChartSetup(t,a,e,r=!0){this.disableRangeUpdate=a,this.disableOldDataRemoval=e,this.translateService=t,this.range=150,this.chartOptions=this.getDefaultChartOptions(t),this.chartSetup(this.chartOptions),r&&(this.dataHolder=this.createDataHolder(),this.firstLoad=!0)}refresh(){this.initialChartSetup(this.translateService,this.disableRangeUpdate,this.disableOldDataRemoval,!1),this.translateLabels(this.dataHolder),this.updateRange(this.dataHolder)}translateLabels(t){this.createDataHolder().forEach((a,e)=>{t[e].originalKey?t[e].originalKey=a.key:t[e].key=a.key})}setSubTitle(t){this.chartOptions.title.enable=!0;const a=t.map(t=>{if(Array.isArray(t.value)&&!t.value.length)return;const a=Array.isArray(t.value)?t.value.join("/"):t.value;return t.label+(void 0!==a?`<span class="data-value">${a}</span>`:"")});this.chartOptions.title.html=a.map(t=>`<span class="info-element">${t}</span>`)}chartSetup(t){}createDataHolder(){throw new Error("Must implement data holder creation")}addData(t,a){this.removeOldData(this.dataHolder,this.range),this.addNewData(this.dataHolder,t,a,this.isFirstLoad()),this.updateRange(this.dataHolder),this.firstLoad&&(this.firstLoad=!1)}removeOldData(t,a){this.disableOldDataRemoval||t[0].values.length>a&&t.forEach(t=>t.values.shift())}addNewData(t,a,e,r){}updateRange(t,a){if(this.disableRangeUpdate)return;const[e]=r.calculateMaxChartValueAndDivisions(t,a);this.chartOptions.chart.yDomain=[0,e]}isFirstLoad(){return this.firstLoad}getDefaultChartOptions(t){return{chart:{interpolate:"monotone",type:"lineChart",height:500,margin:{left:80,right:80},x:function(t){return t[0]},y:function(t){return t[1]},clipEdge:!0,noData:t.instant("resource.no_data"),showControls:!1,duration:0,rightAlignYAxis:!1,useInteractiveGuideline:!0,xAxis:{showMaxMin:!1,tickFormat:function(t){return d3.time.format("%X")(new Date(t))}},yAxis:{showMaxMin:!1,tickFormat:function(t){return t}},legend:{maxKeyLength:100},color:r.COLORS},title:{enable:!0,className:"chart-additional-info",html:" "}}}static getMaxValueFromDataHolder(t){return Math.max(...t.filter(t=>!t.disabled).flatMap(t=>r.getMaxValueForDataSeries(t)))}static getMaxValueForDataSeries(t){return Math.max(...t.values.map(t=>t[1]))}static calculateMaxChartValueAndDivisions(t,a){let e;e=Array.isArray(t)?r.getMaxValueFromDataHolder(t):r.getMaxValueForDataSeries(t);const i=Math.round(e*(a||r.DEFAULT_MULTIPLIER))||1;return[i,Math.ceil(i/r.MAXIMUM_DIVISIONS)]}static getIntegerRangeForValues(t,a){const[e,i]=r.calculateMaxChartValueAndDivisions(t,a);return d3.range(0,e+1,i)}static formatBytesValue(t,a){let e=t;a&&(e=Math.max(...a.filter(t=>!t.disabled).flatMap(t=>t.values).flatMap(t=>t[1])));const r=Math.floor(Math.log(e)/Math.log(1024));return`${(parseFloat(t)/Math.pow(1024,r)).toFixed(2)} ${["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"][r]}`}formatNumber(t){if(t&&this.filter)return this.filter("currency")(t,"",0)}}},47:function(t,a,e){"use strict";e.r(a),e.d(a,"FileDescriptorsChart",(function(){return i}));var r=e(39);class i extends r.ChartData{constructor(t,a){super(t,!1,!1,a)}chartSetup(t){t.chart.yAxis.tickFormat=t=>this.formatNumber(t),t.chart.color=[t.chart.color[1]]}createDataHolder(){return[{key:this.translateService.instant("resource.system.file_descriptors.open"),area:"true",values:[]}]}addNewData(t,a,e){if(!e.openFileDescriptors){const t=[{label:this.translateService.instant("resource.system.file_descriptors.only_unix")}];return void this.setSubTitle(t)}t[0].values.push([a,e.openFileDescriptors]);const r=[{label:this.translateService.instant("resource.system.file_descriptors.max"),value:this.formatNumber(e.maxFileDescriptors)}];this.setSubTitle(r)}updateRange(t){super.updateRange(t,2)}}}}]);