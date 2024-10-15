(window.webpackJsonp=window.webpackJsonp||[]).push([[108],{100:function(e,r){function o(e,r,o,t){return{restrict:"E",scope:!0,templateUrl:"js/angular/repositories/templates/fedx-repo.html",link:function(s){const i="ResolvableRepository";s.fedxMembers=[],s.knownRepos=[],s.allAttachedRepos=[],s.editRepoPage&&(s.fedxMembers=s.repositoryInfo.params.member.value.slice());function n(){for(const e of s.fedxMembers)s.knownRepos=s.knownRepos.filter((function(r){return e.repositoryServer?r.id!==e.repositoryName||r.location!==e.repositoryServer:r.id!==e.repositoryName||!r.local}))}function a(){r.getRepositories(s.repositoryInfo.location).success((function(e){let r=[];_.values(e).forEach(e=>{r.push.apply(r,e)}),s.allAttachedRepos=_.cloneDeep(r)})).error((function(e){const r=getError(e);o.error(r,t.instant("common.error"))})).then((function(){s.knownRepos=s.allAttachedRepos.slice(),n()}))}s.setWritableRepo=function(e){let r=s.fedxMembers.find(e=>"true"===e.writable);r&&((r.store!==i||e.store===i&&r.repositoryName===e.repositoryName)&&("RemoteRepository"!==r.store||"RemoteRepository"===e.store&&r.repositoryName===e.repositoryName&&r.repositoryServer===e.repositoryServer)||(r.writable="false")),e.writable=JSON.stringify("false"===e.writable)},s.getActiveClass=function(e){return"true"===e.writable?" active":""},s.checkIfRepoExist=function(e){return!s.allAttachedRepos.length||(e.store===i?s.allAttachedRepos.find(r=>r.id===e.repositoryName&&!r.location):"RemoteRepository"!==e.store||s.allAttachedRepos.find(r=>r.id===e.repositoryName&&r.location===e.repositoryServer))},s.getRepositoryServer=function(e){return e.local?"Local":e.location};const p=setInterval((function(){a()}),5e3);function l(e){s.fedxMembers.push(e),s.repositoryInfo.params.member.value=s.fedxMembers}function d(e){return"/"===e.slice(-1)?e.slice(0,-1):e}function m(){return s.editRepoPage&&!s.editRepoPage||!s.model.editMode}s.$on("$destroy",(function(){clearInterval(p)})),s.addMember=function(e){let r;r="Local"===s.getRepositoryServer(e)?{store:i,repositoryName:e.id,repoType:e.type,respectRights:"true",writable:"false"}:{store:"RemoteRepository",repositoryName:e.id,repositoryServer:e.location,username:"",password:"",supportsASKQueries:"true",writable:"false"},s.knownRepos=s.knownRepos.filter(r=>r.id!==e.id||r.location!==e.location),l(r)},s.removeMember=function(e){e.store&&e.store===i?(s.fedxMembers=s.fedxMembers.filter(r=>r.store!==e.store||r.repositoryName!==e.repositoryName&&!r.repositoryServer),a()):e.store&&"SPARQLEndpoint"===e.store?s.fedxMembers=s.fedxMembers.filter(r=>r.endpoint!==e.endpoint):e.store&&"NativeStore"===e.store?s.fedxMembers=s.fedxMembers.filter(r=>r.repositoryLocation!==e.repositoryLocation):e.store&&"RemoteRepository"===e.store&&(s.fedxMembers=s.fedxMembers.filter(r=>r.store!==e.store||r.repositoryName!==e.repositoryName||r.repositoryServer!==e.repositoryServer),a()),s.repositoryInfo.params.member.value=s.fedxMembers},s.addRemoteMember=function(){s.mode="remote",s.model={editMode:!1,store:"RemoteRepository",repositoryName:"",repositoryServer:"",sparqlEndpoint:"",username:"",password:"",supportsASKQueries:"true",writable:"false"},s.$uibModalInstance=e.open({templateUrl:"js/angular/templates/modal/add-fedx-remote-repo.html",scope:s})},s.getMemberIcon=function(e){return e.repoType?"icon-repo-"+e.repoType:"NativeStore"===e.store?"icon-warning":"icon-link"},s.editFedXRepository=function(r){r.store===i?(s.mode="local",s.model={editMode:!0,store:r.store,respectRights:r.respectRights,repositoryName:r.repositoryName,repoType:r.repoType,writable:r.writable}):(s.mode="remote",s.model={editMode:!0,store:r.store,repositoryName:r.repositoryName,repositoryServer:r.repositoryServer,sparqlEndpoint:"SPARQLEndpoint"===r.store?r.endpoint:r.repositoryLocation,username:r.username,password:r.password,supportsASKQueries:r.supportsASKQueries,writable:r.writable}),s.$uibModalInstance=e.open({templateUrl:"js/angular/templates/modal/add-fedx-remote-repo.html",scope:s})},s.resolveName=function(e){switch(e.store){case i:return e.repositoryName;case"RemoteRepository":return e.repositoryName+"@"+e.repositoryServer;case"SPARQLEndpoint":return e.endpoint;case"NativeStore":return e.repositoryLocation;default:return""}},s.cancel=function(){s.$uibModalInstance.dismiss("cancel")},s.ok=function(){let e;if(s.model.repositoryName&&s.model.store===i)e={store:i,repositoryName:s.model.repositoryName,repoType:s.model.repoType,respectRights:s.model.respectRights,writable:s.model.writable},s.fedxMembers=s.fedxMembers.filter(r=>r.repositoryName!==e.repositoryName||r.store!==e.store);else if(s.model.repositoryName&&"RemoteRepository"===s.model.store){if(e={store:"RemoteRepository",repositoryName:s.model.repositoryName,repositoryServer:d(s.model.repositoryServer),username:s.model.username,password:s.model.password,writable:s.model.writable},m()&&s.fedxMembers.find(r=>r.repositoryName===e.repositoryName&&r.repositoryServer===e.repositoryServer)){let r=s.resolveName(e);return o.error(t.instant("fedx.repo.already.added.member.error",{name:r})),void s.$uibModalInstance.close()}s.fedxMembers=s.fedxMembers.filter(r=>r.repositoryName!==e.repositoryName||r.repositoryServer!==e.repositoryServer)}else{if(e={store:"SPARQLEndpoint",endpoint:d(s.model.sparqlEndpoint),username:s.model.username,password:s.model.password,supportsASKQueries:s.model.supportsASKQueries,writable:s.model.writable},m()&&s.fedxMembers.find(r=>r.endpoint===e.endpoint)){let r=s.resolveName(e);return o.error(t.instant("fedx.repo.already.added.sparql.endpoint.error",{name:r})),void s.$uibModalInstance.close()}s.fedxMembers=s.fedxMembers.filter(r=>r.endpoint!==e.endpoint)}l(e),n(),s.$uibModalInstance.close()},s.$on("changedLocation",(function(){s.fedxMembers=[],a()})),a()}}}angular.module("graphdb.framework.repositories.fedx-repo.directive",[]).directive("fedxRepo",o),o.$inject=["$uibModal","RepositoriesRestService","toastr","$translate"]}}]);