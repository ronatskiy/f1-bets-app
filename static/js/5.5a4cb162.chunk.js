(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{735:function(e,t,a){"use strict";var n=a(1),r=a(5),c=a(10),l=a(8),i=a(9),o=a(0),s=a.n(o),u=a(19),m=a(3),p=(a(74),a(736));a(737);function b(e){var t=e.firstName,a=e.lastName;return"".concat(t," ").concat(a.toUpperCase())}var d=function(e){function t(){var e,a;Object(n.a)(this,t);for(var r=arguments.length,i=new Array(r),o=0;o<r;o++)i[o]=arguments[o];return(a=Object(c.a)(this,(e=Object(l.a)(t)).call.apply(e,[this].concat(i)))).handleSelect=function(e){var t=a.props,n=t.pos;(0,t.onSelect)(e?e.value:null,n)},a._renderOption=function(e){var t=e.value;return s.a.createElement(p.a.Option,Object.assign({},e,{className:"racers-select__option"}),b(t))},a._renderSingleValue=function(e){var t=e.data;return s.a.createElement(p.a.SingleValue,e,b(t))},a}return Object(i.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){var e=this.props,t=e.value,a=e.racerList,n=e.placeholder,r=function(e){return e.map(function(e){return{label:b(e),value:e}})}(a);return s.a.createElement(p.b,{className:"racers-select",value:t,options:r,placeholder:n,searchable:!1,onChange:this.handleSelect,components:{Option:this._renderOption,SingleValue:this._renderSingleValue}})}}]),t}(s.a.Component);d.defaultProps={value:null,placeholder:""};var h,f,E,v,O,g,j=d,y=a(38),S=a(20),w=a(7),_=(a(41),a(4)),k=(h=function(){function e(t){var a=this,r=t.racers,c=t.onSave,l=t.initData,i=void 0===l?{}:l,o=t.gridPositionsCount,s=void 0===o?10:o;Object(n.a)(this,e),Object(S.a)(this,"_map",f,this),Object(S.a)(this,"handleSelect",E,this),this.handleSubmit=function(){return a._onSave(a.gridMapAsJS)},this._initMap(r,i,s),this._racers=r,this._onSave=c}return Object(r.a)(e,[{key:"_initMap",value:function(e,t,a){var n=this;Array(a).fill(null).forEach(function(a,r){var c=e.find(function(e){return e.code===t[r+1]});n.handleSelect(c||null,r+1)})}},{key:"gridMapAsJS",get:function(){var e={},t=!0,a=!1,n=void 0;try{for(var r,c=this._map[Symbol.iterator]();!(t=(r=c.next()).done);t=!0){var l=r.value,i=Object(y.a)(l,2),o=i[0],s=i[1];s&&(e[o]=s.code)}}catch(u){a=!0,n=u}finally{try{t||null==c.return||c.return()}finally{if(a)throw n}}return e}},{key:"tableData",get:function(){return Array.from(this._map).map(function(e){var t=Object(y.a)(e,2);return{pos:t[0],racer:t[1]}})}},{key:"availableRacers",get:function(){var e=this;return this._racers.filter(function(t){var a=t.name;return!e.tableData.filter(function(e){var t=e.racer;return Boolean(t)}).some(function(e){return e.racer.name===a})})}}]),e}(),f=Object(w.a)(h.prototype,"_map",[_.observable],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return new Map}}),Object(w.a)(h.prototype,"gridMapAsJS",[_.computed],Object.getOwnPropertyDescriptor(h.prototype,"gridMapAsJS"),h.prototype),Object(w.a)(h.prototype,"tableData",[_.computed],Object.getOwnPropertyDescriptor(h.prototype,"tableData"),h.prototype),Object(w.a)(h.prototype,"availableRacers",[_.computed],Object.getOwnPropertyDescriptor(h.prototype,"availableRacers"),h.prototype),E=Object(w.a)(h.prototype,"handleSelect",[_.action],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){var e=this;return function(t,a){e._map.set(a,t)}}}),Object(w.a)(h.prototype,"_initMap",[_.action],Object.getOwnPropertyDescriptor(h.prototype,"_initMap"),h.prototype),h),C=a(75),N=Object(u.c)((g=O=function(e){function t(e){var a;return Object(n.a)(this,t),(a=Object(c.a)(this,Object(l.a)(t).call(this,e)))._grid=new k(e),a}return Object(i.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){var e=this,t=this.props,a=t.placeholder,n=t.submitButtonText;return s.a.createElement(m.i,{tag:"div"},s.a.createElement(m.z,{striped:!0},s.a.createElement("thead",null,s.a.createElement("tr",null,s.a.createElement("th",{className:"text-center"},"\u041f\u043e\u0437\u0438\u0446\u0438\u044f"),s.a.createElement("th",null,"\u041f\u0438\u043b\u043e\u0442"))),s.a.createElement("tbody",null,this._grid.tableData.map(function(t){var n=t.pos,r=t.racer;return s.a.createElement("tr",{key:n},s.a.createElement("td",{className:"text-center"},n),s.a.createElement("td",{style:{width:"85%"}},s.a.createElement(j,{value:r,racerList:e._grid.availableRacers,onSelect:e._grid.handleSelect,pos:Number(n),placeholder:a})))}))),s.a.createElement(m.k,null,s.a.createElement(C.a,{onClick:this._grid.handleSubmit},n)))}}]),t}(s.a.Component),O.defaultProps={placeholder:"",submitButtonText:"\u0421\u043e\u0445\u0440\u0430\u043d\u0438\u0442\u044c",gridPositionsCount:10,initData:{}},v=g))||v;t.a=N},737:function(e,t,a){},776:function(e,t,a){},786:function(e,t,a){"use strict";a.r(t);var n=a(1),r=a(5),c=a(10),l=a(8),i=a(9),o=a(0),s=a.n(o),u=a(19),m=a(3),p=(a(776),a(20)),b=a(72),d=a(7),h=(a(41),a(4)),f=a(2),E=a.n(f),v=a(6),O=a(31),g=a(735),j=a(736),y=(a(90),function(e){function t(){var e,a;Object(n.a)(this,t);for(var r=arguments.length,i=new Array(r),o=0;o<r;o++)i[o]=arguments[o];return(a=Object(c.a)(this,(e=Object(l.a)(t)).call.apply(e,[this].concat(i)))).handleSelect=function(e){a.props.onSelect(e)},a}return Object(i.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){var e=this.props,t=e.value,a=e.raceList;return s.a.createElement(j.b,{value:t,labelKey:"title",options:a,searchable:!1,onChange:this.handleSelect})}}]),t}(s.a.Component));y.defaultProps={value:null};var S,w,_,k,C,N,R,A,U,I,D,T,P,x,z=y,F=a(75),L=(a(74),a(47)),M=a(201),B=Object(u.b)(function(e){return{onBetsSubmit:e.adminPageStore.racesSectionStore.addNewBet,racers:e.adminPageStore.racesSectionStore.racers,users:e.adminPageStore.racesSectionStore.users}})(S=Object(u.c)((w=function(e){function t(){var e,a;Object(n.a)(this,t);for(var r=arguments.length,i=new Array(r),o=0;o<r;o++)i[o]=arguments[o];return a=Object(c.a)(this,(e=Object(l.a)(t)).call.apply(e,[this].concat(i))),Object(p.a)(a,"_isDialogOpen",_,Object(b.a)(Object(b.a)(a))),Object(p.a)(a,"_selectedUser",k,Object(b.a)(Object(b.a)(a))),Object(p.a)(a,"handleSubmit",C,Object(b.a)(Object(b.a)(a))),Object(p.a)(a,"handleToggleDialog",N,Object(b.a)(Object(b.a)(a))),Object(p.a)(a,"handleUserSelect",R,Object(b.a)(Object(b.a)(a))),a}return Object(i.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){var e=this.props,t=e.race,a=e.users,n=e.racers;return s.a.createElement(s.a.Fragment,null,s.a.createElement(F.a,{onClick:this.handleToggleDialog},"Add bet"),this._isDialogOpen&&s.a.createElement(m.o,{isOpen:!0},s.a.createElement(m.q,null,"\u0413\u043e\u043b\u043e\u0432\u043e\u0432\u0430\u043d\u0438\u0435 \u0434\u043b\u044f (",t.title,")"),s.a.createElement(m.p,null,s.a.createElement(m.i,null,s.a.createElement(m.k,null,s.a.createElement(m.n,{htmlFor:"users_select"},"\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044f"),s.a.createElement(j.b,{name:"users_select",value:this._selectedUser,labelKey:"name",options:a.slice(),searchable:!1,onChange:this.handleUserSelect})),s.a.createElement(m.k,null,s.a.createElement(g.a,{racers:n,onSave:this.handleSubmit}))))))}}]),t}(s.a.Component),_=Object(d.a)(w.prototype,"_isDialogOpen",[h.observable],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return!1}}),k=Object(d.a)(w.prototype,"_selectedUser",[h.observable],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),C=Object(d.a)(w.prototype,"handleSubmit",[h.action],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){var e=this;return function(){var t=Object(v.a)(E.a.mark(function t(a){var n;return E.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(e._selectedUser){t.next=3;break}return alert("\u0412\u044b\u0431\u0435\u0440\u0438 \u042e\u0437\u0435\u0440\u0430!!!"),t.abrupt("return");case 3:return n=new M.a({userInfo:e._selectedUser.toUserInfo(),betsMap:a}),t.next=6,e.props.onBetsSubmit(n);case 6:e.handleToggleDialog();case 7:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}()}}),N=Object(d.a)(w.prototype,"handleToggleDialog",[h.action],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){var e=this;return function(){e._isDialogOpen=!e._isDialogOpen}}}),R=Object(d.a)(w.prototype,"handleUserSelect",[h.action],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){var e=this;return function(t){e._selectedUser=t}}}),S=w))||S)||S,J=Object(u.b)(function(e){return{racesSectionStore:e.adminPageStore.racesSectionStore}})(A=Object(u.c)(A=function(e){function t(){var e,a;Object(n.a)(this,t);for(var r=arguments.length,i=new Array(r),o=0;o<r;o++)i[o]=arguments[o];return(a=Object(c.a)(this,(e=Object(l.a)(t)).call.apply(e,[this].concat(i)))).handleAddNewRace=function(){},a.handleAddRaceResults=function(){a.props.racesSectionStore.showRaceResultsPanel()},a.handleInitRacesCollection=function(){a.props.racesSectionStore.initRacesCollection()},a.handleGridSelectorSave=function(){var e=Object(v.a)(E.a.mark(function e(t){return E.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,a.props.racesSectionStore.addOrUpdateRaceResults(t);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),a.handleRaceSelect=function(e){a.props.racesSectionStore.selectedRace=e},a}return Object(i.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){var e=this.props.racesSectionStore,t=e.storeApiUrl,a=e.isRaceResultsPanelVisible,n=e.selectedRace,r=e.races,c=e.racers;return s.a.createElement("section",{style:{marginTop:"10px"}},s.a.createElement(m.w,null,s.a.createElement(m.c,{className:"command-buttons-container"},s.a.createElement(m.b,{size:"sm",color:"info",className:"command-button",disabled:!0,onClick:this.handleInitRacesCollection},"Init Races"),s.a.createElement(m.b,{size:"sm",color:"info",className:"command-button",onClick:this.handleAddNewRace},"Add New Race"),s.a.createElement(m.b,{size:"sm",color:"info",className:"command-button",onClick:this.handleAddRaceResults},"Add Race Results"))),a&&[s.a.createElement(m.w,{key:1},s.a.createElement(m.c,{md:2},"\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0433\u043e\u043d\u043a\u0443:"),s.a.createElement(m.c,null,s.a.createElement(z,{value:n,onSelect:this.handleRaceSelect,raceList:r.slice()}))),s.a.createElement(m.w,{key:2},s.a.createElement(m.c,null,s.a.createElement(g.a,{racers:c.slice(),onSave:this.handleGridSelectorSave})))],s.a.createElement(m.w,null,s.a.createElement(m.c,null,s.a.createElement(m.z,{bordered:!0,size:"sm"},s.a.createElement("thead",null,s.a.createElement("tr",null,s.a.createElement("th",null,"\u2116"),s.a.createElement("th",null,"Title"),s.a.createElement("th",null,"Date"),s.a.createElement("th",null,"Bets"),s.a.createElement("th",null,"Commands"))),s.a.createElement("tbody",null,r.map(function(e,t){var a=e.title,n=e.raceStartTime,r=e.qualifyingStartTime,c=e.bets;return s.a.createElement("tr",{key:a},s.a.createElement("td",null,t+1),s.a.createElement("td",null,a),s.a.createElement("td",null,s.a.createElement("div",null,"Qual: ",Object(O.d)(r)),s.a.createElement("div",null,"Race: ",Object(O.d)(n))),s.a.createElement("td",null,"We have ",c.length," bets"),s.a.createElement("td",null,s.a.createElement(B,{race:e})))}))))),s.a.createElement(m.w,null,s.a.createElement(m.c,null,"Details:"," ",s.a.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:t},t))))}}]),t}(o.Component))||A)||A,V=function(e){function t(){var e,a;Object(n.a)(this,t);for(var r=arguments.length,i=new Array(r),o=0;o<r;o++)i[o]=arguments[o];return(a=Object(c.a)(this,(e=Object(l.a)(t)).call.apply(e,[this].concat(i)))).handleOkClick=function(){var e=a.props.user,t=new L.a({id:e&&e.id||void 0,login:a._userLoginInput.value,name:a._userNameInput.value,password:a._userPasswordInput.value,isAdmin:a._userIsAdminInput.checked});a.props.onSubmit(t)},a}return Object(i.a)(t,e),Object(r.a)(t,[{key:"componentWillReceiveProps",value:function(e){var t=e.user;if(t){var a=t.login,n=t.name,r=t.password,c=t.isAdmin;this._userLoginInput.value=a,this._userNameInput.value=n,this._userPasswordInput.value=r,this._userIsAdminInput.checked=c}}},{key:"render",value:function(){var e=this;return s.a.createElement(m.w,null,s.a.createElement(m.c,null,s.a.createElement(m.i,{tag:"div",className:"user-form"},s.a.createElement(m.k,null,s.a.createElement(m.n,{for:"login",className:"user-form__label"},"Login"),s.a.createElement(m.m,{className:"user-form__input",type:"text",name:"login",id:"login",placeholder:"Login",innerRef:function(t){e._userLoginInput=t}})),s.a.createElement(m.k,null,s.a.createElement(m.n,{for:"name",className:"user-form__label"},"\u0418\u043c\u044f \u0443\u0447\u0430\u0441\u0442\u043d\u0438\u043a\u0430"),s.a.createElement(m.m,{className:"user-form__input",type:"text",name:"name",id:"name",placeholder:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0412\u0430\u0448\u0435 \u0438\u043c\u044f",innerRef:function(t){e._userNameInput=t}})),s.a.createElement(m.k,{className:"user-form"},s.a.createElement(m.n,{for:"password",className:"user-form__label"},"\u041f\u0430\u0440\u043e\u043b\u044c"),s.a.createElement(m.m,{className:"user-form__input user-form__input--password",type:"password",name:"password",id:"password",placeholder:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043f\u0430\u0440\u043e\u043b\u044c",innerRef:function(t){e._userPasswordInput=t}})),s.a.createElement(m.k,{check:!0},s.a.createElement(m.n,{check:!0},s.a.createElement(m.m,{type:"checkbox",innerRef:function(t){e._userIsAdminInput=t}})," ","Check me out")),s.a.createElement(m.k,null,s.a.createElement("button",{className:"btn btn-default user-form__button",onClick:this.handleOkClick},"OK")))))}}]),t}(s.a.Component),K=Object(u.b)(function(e){return{usersSectionStore:e.adminPageStore.usersSectionStore}})(U=Object(u.c)(U=function(e){function t(){var e,a;Object(n.a)(this,t);for(var r=arguments.length,i=new Array(r),o=0;o<r;o++)i[o]=arguments[o];return(a=Object(c.a)(this,(e=Object(l.a)(t)).call.apply(e,[this].concat(i)))).handleInitUsersCollection=Object(v.a)(E.a.mark(function e(){return E.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:a.props.usersSectionStore.fetchUsers();case 1:case"end":return e.stop()}},e,this)})),a.handleAddNewUser=function(){a._toggleForm(!0)},a.handleEditUser=function(e){var t=a.props.usersSectionStore,n=t.users;(0,t.setUserForEdit)(n.find(function(t){return t.id===e})||null)},a.handleUserFormSubmit=function(){var e=Object(v.a)(E.a.mark(function e(t){return E.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,a.props.usersSectionStore.addOrUpdate(t);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),a}return Object(i.a)(t,e),Object(r.a)(t,[{key:"_toggleForm",value:function(e){this.props.usersSectionStore.toggleUserForm(e)}},{key:"render",value:function(){var e=this,t=this.props.usersSectionStore,a=t.isUserFormVisible,n=t.storeApiUrl,r=t.userForEdit,c=t.users,l=t.deleteUser;return s.a.createElement("section",{style:{marginTop:"10px"}},a&&s.a.createElement(V,{onSubmit:this.handleUserFormSubmit,user:r}),s.a.createElement(m.w,null,s.a.createElement(m.c,{className:"command-buttons-container"},s.a.createElement(m.b,{size:"sm",color:"info",className:"command-button",disabled:!0,onClick:this.handleInitUsersCollection},"Init User's Col"),s.a.createElement(m.b,{size:"sm",color:"info",className:"command-button",onClick:this.handleAddNewUser},"Add New User"))),s.a.createElement(m.w,null,s.a.createElement(m.c,null,s.a.createElement(m.z,{bordered:!0,size:"sm"},s.a.createElement("thead",null,s.a.createElement("tr",null,s.a.createElement("th",null,"User Name"),s.a.createElement("th",null,"Login"),s.a.createElement("th",null,"isAdmin"),s.a.createElement("th",null,"isTesting"),s.a.createElement("th",null,"Action"))),s.a.createElement("tbody",null,c.map(function(t){var a=t.id,n=t.name,r=t.login,c=t.isAdmin,i=t.isTesting;return s.a.createElement("tr",{key:a},s.a.createElement("td",{title:a},n),s.a.createElement("td",null,r),s.a.createElement("td",null,s.a.createElement("div",null,s.a.createElement("input",{type:"checkbox",checked:c,readOnly:!0}))),s.a.createElement("td",null,s.a.createElement("input",{type:"checkbox",checked:i,readOnly:!0})),s.a.createElement("td",null,s.a.createElement(m.b,{onClick:function(){return e.handleEditUser(a)}},"edit"),s.a.createElement(m.b,{onClick:function(){l(a)}},"delete")))}))))),s.a.createElement(m.w,null,s.a.createElement(m.c,null,"Details:"," ",s.a.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:n},n))))}}]),t}(o.Component))||U)||U,q=Object(u.b)(function(e){return{usersCount:e.adminPageStore.usersSectionStore.users.length}})(I=Object(u.c)((D=function(e){function t(){var e,a;Object(n.a)(this,t);for(var r=arguments.length,i=new Array(r),o=0;o<r;o++)i[o]=arguments[o];return a=Object(c.a)(this,(e=Object(l.a)(t)).call.apply(e,[this].concat(i))),Object(p.a)(a,"activeTab",T,Object(b.a)(Object(b.a)(a))),Object(p.a)(a,"toggle",P,Object(b.a)(Object(b.a)(a))),a}return Object(i.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){var e=this,t=this.props.usersCount;return s.a.createElement("div",null,s.a.createElement(m.r,{tabs:!0},s.a.createElement(m.s,null,s.a.createElement(m.t,{className:"".concat("1"===this.activeTab?"active":""),onClick:function(){e.toggle("1")}},"Races")),s.a.createElement(m.s,null,s.a.createElement(m.t,{className:"".concat("2"===this.activeTab?"active":""),onClick:function(){e.toggle("2")}},"Users"," ",s.a.createElement(m.a,{color:"secondary",pill:!0},t)))),s.a.createElement(m.x,{activeTab:this.activeTab},s.a.createElement(m.y,{tabId:"1"},s.a.createElement(m.w,{style:{marginTop:"1rem"}},s.a.createElement(m.c,{sm:"12"},s.a.createElement("h4",null,"Races details"),s.a.createElement(J,null)))),s.a.createElement(m.y,{tabId:"2"},s.a.createElement(m.w,{style:{marginTop:"1rem"}},s.a.createElement(m.c,{sm:"12"},s.a.createElement("h4",null,"Users Details"),s.a.createElement(K,null))))))}}]),t}(o.Component),T=Object(d.a)(D.prototype,"activeTab",[h.observable],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return"1"}}),P=Object(d.a)(D.prototype,"toggle",[h.action],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){var e=this;return function(t){e.activeTab!==t&&(e.activeTab=t)}}}),I=D))||I)||I,G=Object(u.c)(x=function(e){function t(){return Object(n.a)(this,t),Object(c.a)(this,Object(l.a)(t).apply(this,arguments))}return Object(i.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){return s.a.createElement(m.e,{tag:"section"},s.a.createElement(m.w,null,s.a.createElement(m.c,null,s.a.createElement("h1",{className:"page-title"},"Admin Page"))),s.a.createElement(q,null))}}]),t}(s.a.Component))||x;t.default=G}}]);