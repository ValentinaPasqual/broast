(window.webpackJsonp=window.webpackJsonp||[]).push([[88],{130:function(e,t){PluginRegistry.add("guide.step",[{guideBlockName:"import-rdf-file",getSteps:(e,t)=>{const i=t.GuideUtils,n=t.toastr,o=t.$translate,l=t.$interpolate;e.mainAction="import-file";const r=[{guideBlockName:"click-main-menu",options:angular.extend({},{menu:"import",showIntro:!0},e)}];e.resourcePath&&r.push({guideBlockName:"download-guide-resource",options:angular.extend({},{title:""},e)});const u=i.getGuideElementSelector("import-settings-import-button");return r.push({guideBlockName:"clickable-element",options:angular.extend({},{content:"guide.step_plugin.import_rdf_file.content",url:"/import",elementSelector:i.getGuideElementSelector("uploadRdfFileButton"),advanceOn:void 0,show:t=>()=>{$("#ngf-wb-import-uploadFile").on("change.importRdfFile",(function(){i.waitFor(i.getGuideElementSelector("import-file-"+e.resourceFile),2).then(()=>t.next())}))},hide:()=>()=>{$("#ngf-wb-import-uploadFile").off("change.importRdfFile")},onNextValidate:()=>!!$(i.getGuideElementSelector("import-file-"+e.resourceFile)).length||(i.noNextErrorToast(n,o,l,"guide.step_plugin.import_rdf_file.file-must-be-uploaded",e),!1)},e)},{guideBlockName:"clickable-element",options:angular.extend({},{content:"guide.step_plugin.import_rdf_file.import-file.button.content",elementSelector:i.getGuideElementSelector("import-file-"+e.resourceFile),url:"/import",placement:"left",onNextClick:()=>i.clickOnGuideElement("import-file-"+e.resourceFile)()},e)},{guideBlockName:"clickable-element",options:angular.extend({},{content:"guide.step_plugin.import_rdf_file.import-settings.import.button.content",elementSelector:u,placement:"top",onPreviousClick:()=>new Promise((function(e){i.clickOnGuideElement("import-settings-cancel-button")().then(()=>e())})),beforeShowPromise:()=>new Promise((function(e,i){t.GuideUtils.deferredShow(300)().then(()=>{t.GuideUtils.waitFor(u,3).then(()=>{e()}).catch(e=>{t.toastr.error(t.$translate.instant("guide.unexpected.error.message")),i(e)})})})),onNextClick:()=>i.clickOnGuideElement("import-settings-import-button")(),canBePaused:!1},e)},{guideBlockName:"read-only-element",options:angular.extend({},{content:"guide.step_plugin.import_status_info.content",url:"/import",elementSelector:i.getGuideElementSelector("import-status-info"),onPreviousClick:()=>new Promise((function(t){i.clickOnGuideElement("import-file-"+e.resourceFile)().then(()=>t())}))},e)}),r}}])}}]);