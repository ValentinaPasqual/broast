(window.webpackJsonp=window.webpackJsonp||[]).push([[55,135],{105:function(e,n,r){"use strict";r.r(n);r(40),r(5);function t(e,n,r,t,i,a,o,s,u,c,d,l,y){const g=o.search().type;void 0===g||g.startsWith("text")?e.viewType="text":e.viewType=g;e.newIndex={},e.info=s,e.page=1;const w={id:"1",name:"",query:"",inference:!0,sameAs:!0};const f=function(){var r;if(e.editSearchQuery=o.search().editSearchQuery,e.page=e.editSearchQuery?2:1,e.newIndex.name=(r=o.search().name)?1!==e.page?r:"Copy_of_"+r:"",e.newIndex.options=o.search().options?o.search().options:"text"===e.viewType?"-termweight idf":"",e.searchQueries&&(e.newIndex.searchQuery=o.search().searchQuery?o.search().searchQuery:e.searchQueries[e.viewType],"predication"===e.viewType&&(e.newIndex.analogicalQuery=o.search().analogicalQuery?o.search().analogicalQuery:e.searchQueries.analogical)),e.editSearchQuery)e.currentQuery.query=e.newIndex.searchQuery,e.notoolbarInference=!0,e.notoolbarSameAs=!0,window.editor&&e.setQuery(e.newIndex.searchQuery);else{if("text"===e.viewType&&e.allSamples){e.samples=e.allSamples.text,e.newIndex.stopList=o.search().stopList?o.search().stopList:void 0,e.newIndex.analyzer=o.search().analyzer?o.search().analyzer:"org.apache.lucene.analysis.en.EnglishAnalyzer";const n=h("-literal_index");void 0!==n&&(e.newIndex.isLiteralIndex=n),window.editor&&e.setQuery(e.samples.literals)}"predication"===e.viewType&&e.allSamples&&(i.getIndexes().success((function(n){if(e.literalIndexes=["no-index"].concat(n.filter((function(e){return"textLiteral"===e.type&&("BUILT"===e.status||"OUTDATED"===e.status)})).map((function(e){return e.name}))),void 0===e.newIndex.inputIndex){const n=h("-input_index");if(void 0!==n)for(let r=0;r<e.literalIndexes.length;r++)n===e.literalIndexes[r]&&(e.newIndex.inputIndex=e.literalIndexes[r])}void 0===e.newIndex.inputIndex&&(e.newIndex.inputIndex=e.literalIndexes[0])})).error((function(e){const r=getError(e);n.error(r,y.instant("similarity.could.not.get.indexes.error"))})),e.samples=e.allSamples.predication,window.editor&&e.setQuery(e.samples.predication))}},p=new RegExp("^[a-zA-Z0-9-_]+$"),m=function(){return e.invalidIndexName=!1,e.saveQueries(),e.newIndex.name?p.test(e.newIndex.name)?e.newIndex.query?e.newIndex.searchQuery?"predication"!==e.viewType||e.newIndex.analogicalQuery?"SELECT"===window.editor.getQueryType()||void n.error(y.instant("similarity.index.select.queries.constraint")):(n.error(y.instant("similarity.empty.analogical.query.error")),!1):(n.error(y.instant("similarity.empty.search.query.error")),!1):(n.error(y.instant("similarity.empty.select.query.error")),!1):(e.invalidIndexName=y.instant("similarity.index.name.constraint"),!1):(e.invalidIndexName=y.instant("similarity.empty.index.name.error"),!1)},x=function(n,r){e.newIndex.options=e.newIndex.options+(""===e.newIndex.options?"":" ")+n+" "+r};function h(n){const r=e.newIndex.options.split(" ");for(let t=0;t<r.length;t++)if(r[t]===n&&t+1<r.length){const n=r[t+1];return delete r[t],delete r[t+1],e.newIndex.options=r.join(" "),n}}function I(e){}function Q(n,r,t){const i=angular.element(document.getElementById("yasr-inner"));e.queryIsRunning=n,n?(e.queryStartTime=Date.now(),e.countTimeouted=!1,e.progressMessage=r,e.extraMessage=t,i.addClass("hide")):(e.progressMessage="",e.extraMessage="",i.removeClass("hide")),null===e.$$phase&&e.$apply()}function T(n){function r(){return window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight||0}const i=n;if(e.orientationViewMode){if("yasr"===e.viewMode){let e=r()-document.querySelector(".CodeMirror-wrap").getBoundingClientRect().top;e-=40,document.querySelector(".CodeMirror-wrap").style.height=e+"px"}else e.noPadding={},document.querySelector(".CodeMirror-wrap").style.height="";document.getElementById("yasr").style.minHeight=""}else if(e.noPadding={paddingRight:15,paddingLeft:0},window.editor&&document.querySelector(".CodeMirror-wrap")){let e=r()-document.querySelector(".CodeMirror-wrap").getBoundingClientRect().top;e-=40,document.querySelector(".CodeMirror-wrap").style.height=e+"px",document.getElementById("yasr").style.minHeight=e+"px"}else{let n;n=t(i?function(){e.fixSizesOnHorizontalViewModeSwitch(i)}:e.fixSizesOnHorizontalViewModeSwitch,100),e.$on("$destroy",(function(){t.cancel(n)}))}window.yasr&&window.yasr.container&&t((function(){window.yasr.container.resize()}),100)}function S(){T(!0)}function v(e){t((function(){$('a[data-id = "'+e+'"]').tab("show")}),0)}function b(r,t){e.executedQueryTab=e.currentQuery,"SELECT"===window.editor.getQueryType()?t&&"SELECT"!==window.editor.getQueryType()?n.warning(y.instant("similarity.explain.select.queries.constraint")):"update"!==window.editor.getQueryMode()?(e.explainRequested=t,e.queryIsRunning||(r?e.currentTabConfig.resultsCount=0:e.resetCurrentTabConfig(),e.viewMode="editor",e.orientationViewMode&&e.fixSizesOnHorizontalViewModeSwitch(),Q(!0,y.instant("evaluating.query.msg")),window.editor.query())):n.warning(y.instant("cannot.execute.update.error")):n.error(y.instant("similarity.indexes.select.queries.constraint"))}function q(){Q(!0,y.instant("common.refreshing.namespaces"),y.instant("common.extra.message")),c.getRepositoryNamespaces().success((function(n){const r={};n.results.bindings.forEach((function(e){r[e.prefix.value]=e.namespace.value})),e.namespaces=r})).error((function(n){e.repositoryError=getError(n)})).finally((function(){Q(!1)}))}function C(){a.addKnownPrefixes(JSON.stringify(window.editor.getValue())).success((function(e){angular.isDefined(window.editor)&&angular.isDefined(e)&&e!==window.editor.getValue()&&window.editor.setValue(e)})).error((function(e){const r=getError(e);return n.error(r,y.instant("common.add.known.prefixes.error")),!0}))}function E(n){let r=void 0;return angular.forEach(e.tabsData,(function(e){if(e.name===n.name&&e.query===n.body)return r=e.id,e})),r}function M(){e.tabsData=[e.currentQuery];const n=e.currentQuery;null===e.currentQuery.query||""===e.currentQuery.query?window.editor.setValue(" "):window.editor.setValue(e.currentQuery.query||" "),t((function(){e.currentTabConfig={},e.currentTabConfig.queryType=n.queryType,e.currentTabConfig.resultsCount=n.resultsCount,e.currentTabConfig.offset=n.offset,e.currentTabConfig.allResultsCount=n.allResultsCount,e.currentTabConfig.page=n.page,e.currentTabConfig.pageSize=n.pageSize,e.currentTabConfig.timeFinished=n.timeFinished,e.currentTabConfig.timeTook=n.timeTook,e.currentTabConfig.sizeDelta=n.sizeDelta,e.$apply()}),0),$("#yasr").css("padding","0")}function L(e){return $(e).attr("data-id")}i.getSearchQueries().success((function(n){e.searchQueries=n,i.getSamples().success((function(n){w.query=o.search().selectQuery?o.search().selectQuery:n.text.literals,w.inference=!("false"===o.search().infer),w.sameAs=!("false"===o.search().sameAs),e.tabsData=e.tabs=[w],e.currentQuery=angular.copy(w),e.allSamples=n,f()}))})).error((function(e){const r=getError(e);n.error(r,y.instant("similarity.could.not.get.search.queries.error"))})),e.$watch("viewType",(function(){f()})),e.helpHidden=1===d.get(l.HIDE_SIMILARITY_HELP),e.toggleHelp=function(n){void 0===n&&(n=d.get(l.HIDE_SIMILARITY_HELP)),1!==n?(d.set(l.HIDE_SIMILARITY_HELP,1),e.helpHidden=!0):(d.set(l.HIDE_SIMILARITY_HELP,0),e.helpHidden=!1)},e.viewQuery=function(){m()&&i.getQuery({indexName:e.newIndex.name,indexOptions:e.newIndex.options,query:e.currentQuery.query,indexStopList:e.newIndex.stopList,queryInference:e.currentQuery.inference,querySameAs:e.currentQuery.sameAs,viewType:e.viewType,indexAnalyzer:e.newIndex.analyzer}).success((function(e){e&&r.open({templateUrl:"pages/viewQuery.html",controller:"ViewQueryCtrl",resolve:{query:function(){return e}}})})).error((function(e){const r=getError(e);n.error(r)}))},e.$watch("newIndex.name",(function(){e.isInvalidIndexName=!1,e.isEmptyIndexName=!1})),e.saveQueries=function(){const n=window.editor.getValue().trim();1===e.page?e.newIndex.query=n:2===e.page?e.newIndex.searchQuery=n:3===e.page&&(e.newIndex.analogicalQuery=n)},e.goToPage=function(n){1!==n&&"yasr"!==e.viewMode&&(e.showEditor(),t((function(){2===n&&(e.currentQuery.query=e.newIndex.searchQuery),3===n&&(e.currentQuery.query=e.newIndex.analogicalQuery),window.editor.setValue(e.currentQuery.query||" ")}))),e.saveQueries(),1===n?e.currentQuery.query=e.newIndex.query:2===n?e.currentQuery.query=e.newIndex.searchQuery:3===n&&(e.currentQuery.query=e.newIndex.analogicalQuery),M(),e.notoolbar=1!==n,e.page=n},e.createIndex=function(){m()&&i.getIndexes().success((function(r){if(r.forEach((function(n){n.name===e.newIndex.name&&(e.invalidIndexName=y.instant("similarity.existing.index.name.error"))})),!e.invalidIndexName){let r=e.viewType;if(void 0!==e.literalIndexes){const n=e.newIndex.inputIndex;n!==e.literalIndexes[0]&&x("-input_index",n)}"true"===e.newIndex.isLiteralIndex&&(x("-literal_index","true"),r="textLiteral"),i.createIndex("POST",e.newIndex.name,e.newIndex.options,e.newIndex.query,e.newIndex.searchQuery,e.newIndex.analogicalQuery,e.newIndex.stopList,e.currentQuery.inference,e.currentQuery.sameAs,r,e.newIndex.analyzer).error((function(e){n.error(getError(e),y.instant("similarity.create.index.error"))})),o.url("similarity")}})).error((function(e){const r=getError(e);n.error(r,y.instant("similarity.could.not.get.indexes.error"))}))},e.setQuery=function(e){window.editor.setValue(e||" ")},e.showEditor=function(){window.editor.xhr&&window.editor.xhr.abort(),e.viewMode="yasr"},e.showPreview=function(){e.currentQuery.outputType="table",e.runQuery()},e.resetCurrentTabConfig=function(){e.currentTabConfig={pageSize:100,page:1,allResultsCount:0,resultsCount:0}},e.queryExists=!1,e.resetCurrentTabConfig(),e.tabsData=e.tabs=[w],e.saveTab=function(n){const r=function(n){for(let r=0;r<e.tabsData.length;r++){if(e.tabsData[r].id===n)return r}}(n);if(void 0===r)return{};const t=e.tabsData[r];return e.saveQueryToLocal(t),t},e.loadTab=M,e.addNewTab=function(e,n,r){},e.runQuery=b,e.getNamespaces=q,e.changePagination=function(){b(!0,e.explainRequested)},e.toggleSampleQueries=function(){},e.addKnownPrefixes=C,e.getExistingTabId=E,e.querySelected=function(n){const r=E(n);e.toggleSampleQueries(),angular.isDefined(r)?v(r):e.addNewTab(null,n.name,n.body)},e.saveQueryToLocal=I,e.setLoader=Q,e.getLoaderMessage=function(){const n=(Date.now()-e.queryStartTime)/1e3,r=e.getHumanReadableSeconds(n);let t="";t=e.progressMessage?e.progressMessage+"... "+r:y.instant("common.running.operation",{timeHuman:r});e.extraMessage&&n>10&&(t+="\n"+e.extraMessage);return t},e.fixSizesOnHorizontalViewModeSwitch=T,e.changeViewMode=function(n){e.viewMode="none",e.orientationViewMode=!e.orientationViewMode,T(),$(".dataTables_filter").remove(),$(".resultsTable").remove(),t((function(){M(),v(n)}),100)},e.showHideEditor=S,e.focusQueryEditor=function(){angular.element(document).find(".editable-input").is(":focus")||angular.element(document).find(".CodeMirror textarea:first-child").focus()},e.orientationViewMode=!0,e.getActiveRepository(),e.orientationViewMode||S(),e.getActiveRepository()&&q(),e.$on("$destroy",(function(){window.editor=null,window.yasr=null})),$("textarea").on("paste",(function(){t((function(){C()}),0)})),e.$watchCollection("[currentQuery.inference, currentQuery.sameAs]",(function(){e.currentQuery})),e.$on("tabAction",(function(n,r){r.relatedTarget&&e.saveTab(L(r.relatedTarget)),e.loadTab(L(r.target))})),e.$on("deleteAllexeptSelected",(function(n,r){e.tabsData=r,e.tabs=r})),e.currentQuery=angular.copy(w),e.showSampleQueries=!1,e.savedQuery={},e.sampleQueries={},e.getResultsDescription=function(){},e.getUpdateDescription=function(){},e.getStaleWarningMessage=function(){},e.saveSearchQuery=function(){if("SELECT"!==window.editor.getQueryType())return void n.error(y.instant("similarity.index.select.queries.constraint"));let r={name:e.newIndex.name,changedQuery:e.currentQuery.query,isSearchQuery:2===e.page};return i.saveSearchQuery(JSON.stringify(r)).then((async function(){await u.showToastMessageWithDelay(2===e.page?"similarity.changed.search.query.msg":"similarity.changed.analogical.query.msg"),o.url("similarity")}),(function(e){n.error(getError(e),y.instant("similarity.change.query.error"))}))},e.getCloseBtnMsg=function(){let n=e.editSearchQuery?y.instant("similarity.query.edition.msg"):y.instant("similarity.index.creation.msg");return y.instant("similarity.close.btn.msg",{operation:n})}}angular.module("graphdb.framework.similarity.controllers.create",["graphdb.framework.utils.notifications","graphdb.framework.utils.localstorageadapter"]).controller("CreateSimilarityIdxCtrl",t),t.$inject=["$scope","toastr","$uibModal","$timeout","SimilarityRestService","SparqlRestService","$location","productInfo","Notifications","RDF4JRepositoriesRestService","LocalStorageAdapter","LSKeys","$translate"]},40:function(e,n){function r(e,n){return{showToastMessageWithDelay:function(r){return new Promise(t=>{e.success(n.instant(r)),setTimeout(t,200)})}}}angular.module("graphdb.framework.utils.notifications",[]).factory("Notifications",r),r.$inject=["toastr","$translate"]}}]);