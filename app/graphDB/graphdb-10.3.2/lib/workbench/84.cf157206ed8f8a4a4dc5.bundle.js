(window.webpackJsonp=window.webpackJsonp||[]).push([[84],{126:function(e,t){PluginRegistry.add("guide.step",[{guideBlockName:"create-repository",getSteps:(e,t)=>{const o=t.GuideUtils;e.mainAction="create-repository";const r=o.getGuideElementSelector("graphDBRepositoryIdInput"),n=e.repositoryId,i=[{guideBlockName:"click-main-menu",options:angular.extend({},{menu:"repositories",showIntro:!0},e)},{guideBlockName:"clickable-element",options:angular.extend({},{content:"guide.step_plugin.create_repository.create_repository_button.content",url:"/repository",elementSelector:o.getGuideElementSelector("createRepository"),onNextClick:e=>o.clickOnGuideElement("createRepository")().then(()=>e.next())},e)},{guideBlockName:"clickable-element",options:angular.extend({},{content:"guide.step_plugin.create_repository.graph_db_repository.content",url:"/repository/create",elementSelector:o.getGuideElementSelector("createGraphDBRepository"),onNextClick:o.clickOnGuideElement("createGraphDBRepository")},e)},{guideBlockName:"input-element",options:angular.extend({},{content:"guide.step_plugin.create_repository.repository_id.content",url:"/repository/create/graphdb",elementSelector:r,onNextValidate:()=>o.validateTextInput(r,n)},e)}];return e.rulesetName&&i.push({guideBlockName:"clickable-element",options:angular.extend({},{content:"guide.step_plugin.create_repository.ruleset_dropdown.content",url:"/repository/create/graphdb",elementSelector:o.getGuideElementSelector("graphDBRepositoryRulesetSelect"),show:()=>()=>{o.validateTextInput(r,n)},rulesetName:e.rulesetName},e)}),i.push({guideBlockName:"clickable-element",options:angular.extend({},{content:"guide.step_plugin.create_repository.save_button.content",url:"/repository/create/graphdb",elementSelector:o.getGuideElementSelector("graphDBRepositoryCrateButton"),show:()=>()=>{o.validateTextInput(r,n)},onNextClick:o.clickOnGuideElement("graphDBRepositoryCrateButton")},e)}),i}}])}}]);