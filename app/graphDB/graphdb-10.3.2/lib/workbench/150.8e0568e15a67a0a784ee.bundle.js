(window.webpackJsonp=window.webpackJsonp||[]).push([[150],{216:function(module,exports){module.exports=function(obj){obj||(obj={});var __t,__p="";with(obj)__p+='<div class="mb-2 row" ng-hide="getActiveRepository() && !isRestricted">\n    <div role="alert">\n        <div class="mb-1 mt-1 ml-1 mr-1">\n            <div class="card repository-errors">\n                <div class="alert lead" ng-class="!getActiveRepository() ? \'alert-info\' : \'alert-warning\'">\n                    <div ng-if="!getActiveRepository()" >{{\'core.errors.no.connected.repository.warning.msg\' | translate}}</div>\n                    <div id="restrictedDiv" ng-if="getActiveRepository() && isRestricted">{{\'core.errors.restricted.warning.msg\' | translate}}\n                        <span ng-if="!isLicenseValid()">{{\'core.errors.not.valid.license.warning.msg\' | translate}}\n                            <p></p>\n                            <div><a href="license" class="btn btn-primary confirm-btn">{{\'core.errors.set.new.license.warning.msg\' | translate}}</a></div>\n                        </span>\n                        <span ng-if="isSecurityEnabled() && !canWriteActiveRepo()">{{\'core.errors.no.permission.to.repository.warning.msg\' | translate}}</span>\n                        <strong ng-if="isActiveRepoOntopType()">{{getActiveRepository()}}</strong>\n                        <span ng-if="canWriteActiveRepo() && isActiveRepoOntopType()">{{\'core.errors.read.only.repository.warning.msg\' | translate}}</span>\n                        <span ng-if="canWriteActiveRepo() && isActiveRepoFedXType()"> <strong>{{title | translate}}</strong>{{\'core.errors.fedx.repository.warning.msg\' | translate}}</span></div>\n                    <small>\n                        <span ng-if="getAccessibleRepositories().length && isLicenseValid()">\n                            {{\'core.errors.select.repository.warning.msg\' | translate}}<span ng-if="canManageRepositories()">{{\'core.errors.or.create.repository.warning.msg\' | translate}}</span>.\n                        </span>\n\n                        <span ng-hide="getAccessibleRepositories().length">\n                            {{\'core.errors.no.accessible.warning.msg\' | translate}}<span ng-if="isRestricted">{{\'core.errors.writable\' | translate}}\n                        </span>{{\'core.errors.repositories\' | translate}}<span ng-if="canManageRepositories()">{{\'core.errors.create.repository.warning.msg\' | translate}}</span>.\n                        </span>\n                    </small>\n                </div>\n                <div ng-if="!getActiveRepository()">\n                    <button class="btn btn-link" ng-click="toggleShowRemoteLocations()">\n                        {{(showRemoteLocations ? "core.errors.hide.remote.locations.btn" : "core.errors.show.remote.locations.btn") | translate}}\n                    </button>\n                </div>\n                <ul class="list-group limit-height clearfix two-columns repos" ng-mouseleave="hidePopoverForRepo($event)">\n                    <li ng-repeat="repository in getAccessibleRepositories() | orderBy: [\'type === \\\'system\\\'\', \'location\', \'id\']"\n                        ng-if="repository.id !== getActiveRepository() || repository.location !== getActiveRepositoryObject().location"\n                        class="list-group-item list-group-item-action repository"\n                        ng-class="{\'remote\': !repository.local}"\n                        ng-mouseenter="showPopoverForRepo($event, repository)" ngx-mouseleave="setPopoverForRepo($event, repository, false)">\n                        <div class="lead ellipsis-block" ng-click="setRepository(repository)">\n                            <span class="popover-anchor"\n                                  popover-popup-delay="500"\n                                  popover-trigger="show" popover-placement="{{$index % 2 === 0 ? \'bottom-right\' : \'left-bottom\'}}"\n                                  uib-popover-template="popoverTemplate" popover-title="Repository {{repository.id}}">\n                            <em class="icon-lg" ng-class="\'icon-repo-\' + repository.type"></em>\n                            <strong>{{repository.id}}</strong></span>\n                            <span class="small" ng-if="showRemoteLocations">\n                                <small>@ {{repository.location ? repository.location : \'core.errors.location.local.label\' | translate}}</small>\n                            </span>\n                        </div>\n                    </li>\n                </ul>\n\n                <div class="pull-right" ng-if="isLicenseValid() && canManageRepositories()">\n                    <button class="btn btn-link px-0 create-repository-btn" ng-click="goToAddRepo()">\n                        <span class="icon-plus"></span> {{ \'repository.create.btn\' | translate }}\n                    </button>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n\n';return __p}}}]);