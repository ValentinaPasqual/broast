(window.webpackJsonp=window.webpackJsonp||[]).push([[116],{78:function(e,r){angular.module("graphdb.framework.rest.graphconfig.service",[]).factory("GraphConfigRestService",n);function n(e){return{getGraphConfigs:function(){return e.get("rest/explore-graph/config")},getGraphConfigSamples:function(){return e.get("rest/explore-graph/samples")},loadGraphForConfig:function(r,n,o,t){return e.get(`rest/explore-graph/config/graph/${encodeURIComponent(r.id)}?includeInferred=${n}&linksLimit=${o}&sameAsState=${t}`)},getConfig:function(r){return e.get("rest/explore-graph/config/"+encodeURIComponent(r))},createGraphConfig:function(r){return e.post("rest/explore-graph/config",r)},updateGraphConfig:function(r){return e.put("rest/explore-graph/config/"+encodeURIComponent(r.id),r)},deleteGraphConfig:function(r){return e.delete("rest/explore-graph/config/"+encodeURIComponent(r.id))},validateQuery:function(r,n,o,t,p){return e({method:"POST",url:"rest/explore-graph/validate",data:{query:r,queryType:n,params:o,all:t,oneOf:p}})}}}n.$inject=["$http"]}}]);