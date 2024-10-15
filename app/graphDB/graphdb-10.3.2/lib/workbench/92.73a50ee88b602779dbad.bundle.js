(window.webpackJsonp=window.webpackJsonp||[]).push([[92],{134:function(e,t){const i=()=>()=>{$(".node-wrapper").addClass("disable-visual-graph-node")},n=()=>()=>{$(".node-wrapper").removeClass("disable-visual-graph-node")};PluginRegistry.add("guide.step",[{guideBlockName:"visual-graph",getSteps:(e,t)=>{const i=t.GuideUtils,n=t.$location,o=t.$route;return e.mainAction="visual-graph",[{guideBlockName:"click-main-menu",options:angular.extend({},{menu:"visual-graph",showIntro:!0},e)},{guideBlockName:"input-element",options:angular.extend({},{content:"guide.step_plugin.visual_graph_input_IRI.content",forceReload:!0,url:"/graphs-visualizations",elementSelector:i.getGuideElementSelector("graphVisualisationSearchInputNotConfigured"," input"),onNextValidate:e=>i.validateTextInput(e.elementSelector,e.easyGraphInputText)},e)},{guideBlockName:"clickable-element",options:angular.extend({},{content:"guide.step_plugin.visual_graph_show_autocomplete.content",url:"/graphs-visualizations",elementSelector:i.getGuideElementSelector("autocomplete-"+e.iri),onNextClick:(e,t)=>i.waitFor(t.elementSelector,3).then(()=>$(t.elementSelector).trigger("click")),canBePaused:!1,forceReload:!0},e)},{guideBlockName:"read-only-element",options:angular.extend({},{content:"guide.step_plugin.visual_graph_intro.content",url:"/graphs-visualizations",elementSelector:".graph-visualization",placement:"left",onPreviousClick:()=>new Promise((function(t,a){n.url("/graphs-visualizations"),o.reload();const r=i.getGuideElementSelector("graphVisualisationSearchInputNotConfigured"," input");i.waitFor(r,3).then(()=>{i.validateTextInput(r,e.easyGraphInputText),t()}).catch(e=>a(e))})),initPreviousStep:()=>new Promise((function(t,a){const r="/graphs-visualizations?uri="+e.iri;r!==decodeURIComponent(n.url())?(n.url(r),o.reload(),i.waitFor(`.node-wrapper[id^="${e.iri}"] circle`,3).then(()=>t()).catch(e=>a(e))):t()})),canBePaused:!1,forceReload:!0},e)}]}},{guideBlockName:"visual-graph-expand",getSteps:(e,t)=>{const i=t.GuideUtils,n=t.$rootScope,o=t.$route,a=`.node-wrapper[id^="${e.iri}"] circle`;return[{guideBlockName:"clickable-element",options:angular.extend({},{title:"guide.step_plugin.visual-graph-expand.title",content:"guide.step_plugin.visual-graph-expand.content",url:"/graphs-visualizations",canBePaused:!1,elementSelector:a,advanceOn:void 0,onNextClick:e=>{i.graphVizExpandNode(a),e.getCurrentStep().hide(),i.awaitAlphaDropD3(null,n)().then(()=>{e.next()})},show:e=>()=>{$(a).on("dblclick.onNodeDbClicked",(e=>()=>{i.graphVizExpandNode(a),e.getCurrentStep().hide(),i.awaitAlphaDropD3(null,n)().then(()=>{e.next()})})(e))},hide:()=>()=>{$(a).off("dblclick.onNodeDbClicked")},beforeShowPromise:()=>new Promise((function(e,t){o.reload(),i.deferredShow(50)().then(()=>{i.awaitAlphaDropD3(a,n)().then(()=>e()).catch(e=>t(e))})})),initPreviousStep:(e,t)=>new Promise((function(o,r){const l=e.ShepherdService.getPreviousStepFromHistory(t);l.options.initPreviousStep(e,l.id).then(()=>{e.ShepherdService.getCurrentStepId()===t?o():(i.graphVizExpandNode(a),i.deferredShow(50)().then(()=>{i.awaitAlphaDropD3(null,n)().then(()=>o()).catch(e=>r(e))}))}).catch(e=>r(e))}))},e)}]}},{guideBlockName:"visual-graph-properties",getSteps:(e,t)=>{const i=t.GuideUtils,n=t.$rootScope,o=`.node-wrapper[id^="${e.iri}"] circle`;let a,r;const l=[{guideBlockName:"clickable-element",options:angular.extend({},{title:"guide.step_plugin.visual-graph-properties.title",content:"guide.step_plugin.visual-graph-properties.content",url:"/graphs-visualizations",elementSelector:o,canBePaused:!1,advanceOn:void 0,show:e=>()=>{$(o).on("click.onNodeClicked",((e,t)=>n=>{r?n.timeStamp-a<400&&(e.$timeout.cancel(r),r=null):(a=n.timeStamp,r=e.$timeout((function(){i.graphVizShowNodeInfo(o),r=null,t.next()}),500))})(t,e))},hide:()=>()=>{$(o).off("click.onNodeClicked")},onNextClick:(e,t)=>{i.graphVizShowNodeInfo(t.elementSelector),e.next()},beforeShowPromise:i.awaitAlphaDropD3(o,n)},e)},{guideBlockName:"read-only-element",options:angular.extend({},{title:"guide.step_plugin.visual-graph-properties-side-panel.title",content:"guide.step_plugin.visual-graph-properties-side-panel.content",url:"/graphs-visualizations",elementSelector:".rdf-side-panel-content",canBePaused:!1,placement:"left",beforeShowPromise:i.deferredShow(500),onPreviousClick:()=>new Promise((function(e){i.waitFor(p,3).then(()=>{$(p).trigger("click"),e()}).catch(()=>e())}))},e)}];angular.isArray(e.focusProperties)&&e.focusProperties.forEach(t=>{angular.isObject(t)||(t={property:t});const n="types"===t.property?"-types":"-property",o=t.skipGenericMessage&&t.message?null:"guide.step_plugin.visual-graph-properties-focus"+n+".content";l.push({guideBlockName:"read-only-element",options:angular.extend({},{title:"guide.step_plugin.visual-graph-properties-focus"+n+".title",content:o,url:"/graphs-visualizations",canBePaused:!1,placement:"left",elementSelector:i.getGuideElementSelector("graph-visualization-node-info-"+t.property),focusProperty:t.property,extraContent:t.message},e)})});const p=i.getGuideElementSelector("close-info-panel");return l.push({guideBlockName:"clickable-element",options:angular.extend({},{title:"guide.step_plugin.visual-graph-properties-side-panel-close.title",content:"guide.step_plugin.visual-graph-properties-side-panel-close.content",url:"/graphs-visualizations",canBePaused:!1,placement:"left",elementSelector:p,advanceOn:{selector:p,event:"click"},beforeShowPromise:()=>new Promise((function(e){i.graphVizShowNodeInfo(o),i.deferredShow(500)().then(()=>e())})),onNextClick:()=>i.waitFor(p,3).then(()=>$(p).trigger("click"))},e)}),l}},{guideBlockName:"visual-graph-link-focus",getSteps:(e,t)=>{const o=t.GuideUtils,a=t.$rootScope,r=`.link-wrapper[id^="${e.fromIri}>${e.toIri}"]`;return[{guideBlockName:"read-only-element",options:angular.extend({},{title:"guide.step_plugin.visual-graph-link-focus.title",content:"guide.step_plugin.visual-graph-link-focus.content",url:"/graphs-visualizations",canBePaused:!1,extraPadding:40,elementSelector:r,show:i,hide:n,beforeShowPromise:o.awaitAlphaDropD3(r,a)},e)}]}},{guideBlockName:"visual-graph-node-focus",getSteps:(e,t)=>{const o=t.GuideUtils,a=t.$rootScope,r=`.node-wrapper[id^="${e.iri}"] circle`;return[{guideBlockName:"read-only-element",options:angular.extend({},{title:"guide.step_plugin.visual-graph-node-focus.title",content:"guide.step_plugin.visual-graph-node-focus.content",url:"/graphs-visualizations",canBePaused:!1,extraPadding:10,elementSelector:r,show:i,hide:n,beforeShowPromise:o.awaitAlphaDropD3(r,a),initPreviousStep:(e,t)=>new Promise((i,n)=>{if(o.isVisible(r))i();else{const o=e.ShepherdService.getPreviousStepFromHistory(t);o.options.initPreviousStep(e,o.id).then(()=>i()).catch(e=>n(e))}})},e)}]}}])}}]);