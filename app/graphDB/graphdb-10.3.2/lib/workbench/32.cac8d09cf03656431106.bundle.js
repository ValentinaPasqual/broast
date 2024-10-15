(window.webpackJsonp=window.webpackJsonp||[]).push([[32,117],{259:function(e,t,n){"use strict";var r=r||{};r.Export={getCSSRules:function(e){var t=$('link[href="'+e+'"]')[0].sheet.rules,n="";return _.each(t,(function(e){n+=e.cssText})),n},generateBase64ImageSource:function(){var e=d3.selectAll("svg").attr({version:"1.1",xmlns:"http://www.w3.org/2000/svg"}).node().parentNode.innerHTML;return"data:image/svg+xml;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(e)))}},t.a=r},63:function(e,t){angular.module("graphdb.framework.rest.graphexplore.data.service",[]).factory("GraphDataRestService",n),n.$inject=["$http"];function n(e){return{getClassHierarchyData:function(t){return e.get("rest/class-hierarchy",{params:{graphURI:t}})},reloadClassHierarchy:function(t){return e.get("rest/class-hierarchy",{params:{doReload:!0,graphURI:t}})},getClassInstances:function(t){return e.get("rest/class-hierarchy/class-instances",{params:{targetUri:t}})},getDomainRangeData:function(t,n){return e.get("rest/domain-range",{params:{targetUri:t,collapsed:n}})},checkDomainRangeData:function(t){return e.head("rest/domain-range",{params:{targetUri:t}})},getRelationshipsData:function(t,n,r){return e.get("rest/dependencies/matrix",{params:{mode:n,classes:_.map(t,(function(e){return e.name})),graphURI:r}})},getRelationshipsClasses:function(t,n){return e.get("rest/dependencies/classes",{params:{mode:t,graphURI:n}})},getRelationshipsStatus:function(t){return e.get("rest/dependencies/status",{params:{graphURI:t}})},calculateRelationships:function(t){return e.get("rest/dependencies/update",{params:{graphURI:t}})},getPredicates:function(t,n,r){return e.get("rest/dependencies/predicates",{params:{from:t,to:n,mode:"all",graphURI:r}})},getInstanceNode:function(t){return e.get("rest/explore-graph/node",{params:{iri:t}})},getInstanceNodeLinks:function(t){return e.get("rest/explore-graph/links",{params:{iri:t}})},getRdfsLabelAndComment:function(t,n,r){const a=r||{};return e({url:"rest/explore/details",method:"GET",params:_.extend(a,{uri:t,languages:n}),headers:{Accept:"application/json"}})}}}},88:function(e,t,n){"use strict";n.r(t);var r=n(259);n(63);function a(e,t){return{restrict:"A",template:'<div id="dependencies-chord"></div>',scope:{dependenciesData:"="},link:function(n){n.$watch("dependenciesData",(function(){if(n.dependenciesData){const a=n.dependenciesData;!function(a,s){if(function(){let e=!0;for(const t of a){if(t.some(e=>0!==e)){e=!1;break}}return e}())return;const i=d3.scale.category20(),o=d3.select("body").append("div").attr("class","tooltip").style("opacity",0);d3.select("body").on("click",(function(){o.style("opacity",0)}));const c=Math.min(800,800)/2.8,d=c-24,l=d3.svg.arc().innerRadius(d).outerRadius(c),p=d3.layout.chord().padding(.04).sortSubgroups(d3.descending).sortChords(d3.ascending),u=d3.svg.chord().radius(d),g=d3.select("#dependencies-chord").append("svg").attr("viewBox","0 0 800 800").attr("preserveAspectRatio","xMidYMid meet").style("font","10px sans-serif").append("g").attr("id","circle").attr("transform","translate(400,400)");g.append("circle").attr("r",c).style("fill","none"),p.matrix(a);const f=g.selectAll(".group").data(p.groups).enter().append("g").attr("class","group").on("mouseover",(function(e,t){h.classed("fade",(function(e){return e.source.index!==t&&e.target.index!==t}))}));f.append("title").text((function(e,t){return s[t]})),f.append("path").attr("id",(function(e,t){return"group"+t})).attr("d",l).style("fill",(function(e,t){return i(t)})),f.append("text").each((function(e){e.angle=(e.startAngle+e.endAngle)/2})).attr("dy",".35em").attr("transform",(function(e){return"rotate("+(180*e.angle/Math.PI-90)+")translate("+(d+26)+")"+(e.angle>Math.PI?"rotate(180)":"")})).style("text-anchor",(function(e){return e.angle>Math.PI?"end":null})).text((function(e){return s[e.index]}));const h=g.selectAll(".chord").data(p.chords).enter().append("path").attr("class","chord").style("fill",(function(e){return i(e.target.index)})).style("fill-opacity",".67").style("stroke","#000").style("stroke-width",".25px").style("cursor","pointer").attr("d",u);h.on("mouseover",(function(){d3.select(this).style({"fill-opacity":"1"})})),h.on("mouseout",(function(){d3.select(this).style({"fill-opacity":".67"})})),h.on("click",(function(e){const r=s[e.source.index],a=s[e.target.index],i=d3.event.pageX,c=d3.event.pageY;t.getPredicates(r,a,n.selectedGraph&&n.selectedGraph.contextID.uri).success((function(e){let t="<div class='dependencies-tooltip'>"+("<div class='row'>"+r+" <i class='fa fa-exchange'></i> "+a+"</div>")+_.map(e.slice(0,10),(function(e){const t=" <i class='fa fa-long-arrow-"+("out"===e.direction?"right":"left")+"'></i>";return"<div class='row'>"+e.predicate+" : "+e.weight+t+" </div>"})).join("");e.length>10?t=t+"<div class='pull-right'>And "+(e.length-10).toString()+" more...</div></div>":t+="</div>",o.html(t).style("left",i+"px").style("top",c+"px")})),o.transition().duration(200).style("opacity",1)})),d3.select("#circle").on("mouseleave",(function(){g.selectAll(".chord").classed("fade",!1)})),d3.select("#download-svg").on("mouseover",(function(){const t=r.a.Export.generateBase64ImageSource();d3.select(this).attr({href:t,download:"dependencies-"+e.getActiveRepository()+".svg"})}))}(a.matrix,a.nodes,a.direction)}}))}}}angular.module("graphdb.framework.graphexplore.directives.dependencies",["graphdb.framework.graphexplore.controllers.dependencies","graphdb.framework.rest.graphexplore.data.service"]).directive("dependenciesChord",a),a.$inject=["$repositories","GraphDataRestService"]}}]);