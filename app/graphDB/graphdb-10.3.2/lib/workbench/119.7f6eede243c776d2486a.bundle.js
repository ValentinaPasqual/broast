(window.webpackJsonp=window.webpackJsonp||[]).push([[119],{99:function(t,n){angular.module("graphdb.framework.rest.rdfrank.service",[]).factory("RdfRankRestService",e);function e(t){return{getStatus:function(){return t.get("rest/rdfrank/status")},checkRdfRankPluginEnabled:function(){return t.get("rest/rdfrank/plugin-found")},checkFilteringEnabled:function(){return t.get("rest/rdfrank/filtering")},toggleFiltering:function(n){return t.post("rest/rdfrank/filtering?enabled="+n)},filter:function(n){return t.get("rest/rdfrank/filtering/"+n)},updateFilter:function(n,e){return t.put("rest/rdfrank/filtering/"+n,e)},deleteFilter:function(n,e){return t.delete("rest/rdfrank/filtering/"+n,{data:e,headers:{"Content-Type":"application/json;charset=utf-8"}})},includeExplicit:function(){return t.get("rest/rdfrank/include-explicit")},toggleIncludeExplicit:function(n){return t.post("rest/rdfrank/include-explicit?enabled="+n)},includeImplicit:function(){return t.get("rest/rdfrank/include-implicit")},toggleIncludeImplicit:function(n){return t.post("rest/rdfrank/include-implicit?enabled="+n)},compute:function(){return t.post("rest/rdfrank/compute")},computeIncremental:function(){return t.post("rest/rdfrank/compute-incremental")},interrupt:function(){return t.post("rest/rdfrank/interrupt")}}}e.$inject=["$http"]}}]);