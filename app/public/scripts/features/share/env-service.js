'use strict';
/*
<select ng-model="selectedState" ng-options="item.key as item.value for item in stateItems"></select>

<select ng-model="selectedVal">
	<option ng-repeat="item in stateItems" value="{{item.key}}" ng-selected="item.key ===  selectedVal">{{item.value |translate}}</option>
</select>

{{selectedState.key}} <br/> {{selectedVal}}
*/

angular.module(_APP_).constant('ENV', {
  emptyRootUi: {working: false, msg: null},
  emptyRootModel: {calDateFormat:null, dateOptions:null},
  emptyUserDetailsModel: {accessSchoolIds:null},
  emptyUserModel: {username:null,password:null,details:null,enabled:false,accountNonExpired:false,accountNonLocked:false,credentialsNonExpired:false,displayName:null,orgId:null,email:null,role:null,version:0,modified:null,created:null,oldRole:null,repassword:null,oldpassword:null},
  emptyPersonProfileModel: {orgId:null,addressId:null,title:null,nameFirst:null,nameMiddle:null,nameLast:null,doB:null,poB:null,gender:null,religion:null,bloodGroup:null,uid:null,id:null,blobKey:null,modifiedBy:null,createdBy:null,modified:null,created:null},
  emptyAddressModel: {id:null,street1:null,street2:null,landmark:null,city:null,pinZip:null,state:null,country:null,mobile1:null,mobile2:null,phone1:null,phone2:null,fax:null,emailId:null,web:null,type:null,created:null},
  emptyPersonModel: {orgId:null,addressId:null,title:null,nameFirst:null,nameMiddle:null,nameLast:null,doB:null,poB:null,gender:null,religion:null,bloodGroup:null,uid:null,id:null,doD:null,caste:null,subCategory:null,subCaste:null,cwsn:null,occupation:null,income:0.0,type:null,fatherId:null,motherId:null,blobKey:null,active:false,created:null},
  emptySchoolModel: {id:null,code:null,name:null,nameEn:null,nameShort:null,level:null,clusterId:null,villageId:null,block:null,publicEducationCenter:null,panchayatMunicipal:null,villageWard:null,basahat:null,medium:null,registration:null,established:null,assemblyId:null,addressId:null,parentSchoolId:null,blobKey:null,type:null,board:null,active:true,created:null,constituencyId:null,constituencyName:null},
  dateOptions: {startingDay: 1, changeYear: true, changeMonth: true },

  categoryItems: [{key:'strategy',value:'Strategy'},{key:'operations',value:'Operations'},{key:'management',value:'Management'},{key:'technology',value:'Technology'},{key:'community_service',value:'Community Service'},{key:'self_learning',value:'Self Learning'},{key:'training',value:'Training'},{key:'foreign_language',value:'Foreign Language'},{key:'other',value:'Other'}],
  template: 'public/views/common/admin-lte-tpl.html',
  dateFormat: 'd/M/yyyy'

});