(window.webpackJsonp=window.webpackJsonp||[]).push([[64],{46:function(t,e,a){"use strict";a.r(e);a(5);function n(t,e,a,n){return{restrict:"AE",template:'<a class="nav-link" role="tab" data-toggle="tab" blur="submit" editable-text="tab.name" e-form="editCurrentlySelectedOnly" ng-click="selectThisTab($event)" ng-dblclick="editCurrentTab()" ><span ng-class="{\'text-muted\': !tab.name}">{{ tab.name || (\'sparql.tab.directive.unnamed.tab.title\' | translate)}}</span><button type="button" ng-click="deleteTab($event)" class="btn btn-link btn-sm secondary delete-sparql-tab-btn" title="Delete tab"><i class="icon-close"></i></button></a>',replace:!0,controller:["$scope","$element","$rootScope","ModalService","toastr","$translate",function(t,n,r,i,l,s){function o(t){return $(t).attr("data-id")}function c(t){$('a[data-id = "'+t+'"]').tab("show")}t.state={},$(n).on("shown.bs.tab",(function(t){r.$broadcast("tabAction",t)})),t.deleteTab=function(d){if(d.preventDefault(),d.stopPropagation(),t.tabs.length<2)return void l.warning(s.instant("sparql.tab.directive.close.last.warning"));d.shiftKey?(t.state.selectedTabId=o(n),i.openSimpleModal({title:s.instant("common.confirm"),message:s.instant("sparql.tab.directive.delete.all.tabs.warning"),warning:!0}).result.then((function(){var n;n=t.state.selectedTabId,t.tabs=t.tabs.filter((function(t){if(t.id===n)return t})),c(t.tabs[0].id),e.set(a.TABS_STATE,t.tabs),r.$broadcast("deleteAllexeptSelected",t.tabs)}))):(t.state.idForDelete=o(n),i.openSimpleModal({title:s.instant("common.confirm"),message:s.instant("sparql.tab.directive.close.tab.warning"),warning:!0}).result.then((function(){!function(e){if(angular.isUndefined(e))throw"Delete by id was called with undefined id";const a=function(e){for(let a=0;a<t.tabs.length;a++){if(t.tabs[a].id===e)return a}}(e);t.tabs.splice(a,1),e===t.currentQuery.id&&t.tabs.length>0&&c(a>0?t.tabs[a-1].id:t.tabs[0].id)}(t.state.idForDelete)})));angular.element(document).find(".CodeMirror textarea:first-child").focus()},t.editCurrentTab=function(){if(o(n)!==t.currentQuery.id)return;t.editCurrentlySelectedOnly.$show();const e=$(".editable-buttons");e.children(".btn.btn-primary").addClass("btn-sm"),e.children(".btn.btn-default").addClass("btn-sm"),$(".editable-controls .editable-input").addClass("form-control-sm").on("change",(function(e){t.currentQuery.name=e.currentTarget.$$currentValue})),$(".editable-buttons .glyphicon.glyphicon-ok").removeClass("glyphicon glyphicon-ok").addClass("fa fa-check"),$(".editable-buttons .glyphicon.glyphicon-remove").removeClass("glyphicon glyphicon-remove").addClass("fa fa-close")},t.selectThisTab=function(e){e.preventDefault(),e.stopPropagation(),t.isTabChangeOk(!1)&&$(n).tab("show")}}]}}angular.module("graphdb.framework.core.directives.queryeditor.sparqltab",["graphdb.framework.core","graphdb.framework.utils.localstorageadapter"]).directive("sparqlTab",n),n.$inject=["$rootScope","LocalStorageAdapter","LSKeys","ModalService"]}}]);