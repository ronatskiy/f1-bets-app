(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{452:function(e,t,a){"use strict";var n=a(0),r=a.n(n);a(453);t.a=function(e){var t=e.children;return r.a.createElement("span",{className:"pseudo-link"},t)}},453:function(e,t,a){},454:function(e,t,a){},457:function(e,t,a){"use strict";var n=a(0),r=a.n(n);function s(){return(s=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e}).apply(this,arguments)}function c(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},s=Object.keys(e);for(n=0;n<s.length;n++)a=s[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(n=0;n<s.length;n++)a=s[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var l=r.a.createElement("path",{fill:"currentColor",d:"M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z"}),i=function(e){var t=e.svgRef,a=c(e,["svgRef"]);return r.a.createElement("svg",s({viewBox:"0 0 320 512",ref:t},a),l)},u=r.a.forwardRef(function(e,t){return r.a.createElement(i,s({svgRef:t},e))}),o=(a.p,a(119)),m=a.n(o);a(454),t.a=function(e){var t=e.direction,a=void 0===t?"down":t,n=e.className,s=void 0===n?"":n,c=m()("chevron-icon","chevron-icon--".concat(a),s);return r.a.createElement(u,{className:c})}},459:function(e,t,a){},460:function(e,t,a){},461:function(e,t,a){},468:function(e,t,a){"use strict";a.r(t);var n=a(1),r=a(5),s=a(8),c=a(7),l=a(9),i=a(0),u=a.n(i),o=a(12),m=a(2),p=a(92),h=(a(33),function(e){var t=e.hasRaceResults;return u.a.createElement("thead",{className:"thead-light"},u.a.createElement("tr",{className:"text-uppercase"},u.a.createElement("th",null,"\u041f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044c"),u.a.createElement("th",{className:"text-center"},"1"),u.a.createElement("th",{className:"text-center"},"2"),u.a.createElement("th",{className:"text-center"},"3"),u.a.createElement("th",{className:"text-center"},"4"),u.a.createElement("th",{className:"text-center"},"5"),u.a.createElement("th",{className:"text-center"},"6"),u.a.createElement("th",{className:"text-center"},"7"),u.a.createElement("th",{className:"text-center"},"8"),u.a.createElement("th",{className:"text-center"},"9"),u.a.createElement("th",{className:"text-center"},"10"),t&&u.a.createElement("th",{className:"text-center"},"PTS")))}),f=a(119),b=a.n(f),d=(a(459),function(e){function t(){return Object(n.a)(this,t),Object(s.a)(this,Object(c.a)(t).apply(this,arguments))}return Object(l.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){var e=this.props,t=e.text,a=e.points,n=e.isBadgeVisible,r=b()("polling-result-cell",{"text-success":n&&10===a,"text-warning":n&&a>0&&a<10,"text-secondary text--line-through":n&&0===a});return u.a.createElement("div",{className:r},t,n&&t&&u.a.createElement(m.a,{className:"polling-result-cell__badge",color:"light",pill:!0},a))}}]),t}(u.a.Component));d.defaultProps={points:0,isBadgeVisible:!1,text:""};var E=d,O=function(e){function t(){return Object(n.a)(this,t),Object(s.a)(this,Object(c.a)(t).apply(this,arguments))}return Object(l.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){var e=this.props,t=e.userPollData,a=e.isCurrentUserRow,n=void 0!==a&&a,r=e.hasRaceResults,s=void 0!==r&&r,c=e.isOfficialResultsRow,l=void 0!==c&&c,i=t.id,o=t.name,m=t.userPoll,p=t.userScore,h=b()({"table-info":n,"table-success":l});return u.a.createElement("tr",{className:h},u.a.createElement("td",null,o),Array(10).fill(1).map(function(e,t){return u.a.createElement("td",{key:i+t,className:"text-center"},u.a.createElement(E,{points:p.getPointsAt(t),text:m[t+1],isBadgeVisible:s&&!l}))}),s&&u.a.createElement("td",{className:"text-center"},u.a.createElement("span",{title:p.tooltip},!l&&p.value)))}}]),t}(u.a.Component),v=function(e){function t(){return Object(n.a)(this,t),Object(s.a)(this,Object(c.a)(t).apply(this,arguments))}return Object(l.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){var e=this.props,t=e.rows,a=e.currentUser,n=e.hasRaceResults;return u.a.createElement(m.A,{size:"sm",responsive:!0},u.a.createElement(h,{hasRaceResults:n}),u.a.createElement("tbody",null,t.map(function(e){return u.a.createElement(O,{userPollData:e,key:e.id,isOfficialResultsRow:e.id===p.a||e.id===p.b,isCurrentUserRow:a&&a.id===e.id,hasRaceResults:n})})))}}]),t}(u.a.Component);v.defaultProps={rows:[],currentUser:null,hasRaceResults:!1};var g,j,N,y,x,R=v,w=(a(223),a(13)),_=a(31),k=a(6),P=(a(36),a(66)),C=a.n(P),B=a(4),S=a(452),U=(a(460),a(457)),z=Object(o.observer)((j=function(e){function t(){var e,a;Object(n.a)(this,t);for(var r=arguments.length,l=new Array(r),i=0;i<r;i++)l[i]=arguments[i];return a=Object(s.a)(this,(e=Object(c.a)(t)).call.apply(e,[this].concat(l))),Object(w.a)(a,"_isOpen",N,Object(_.a)(Object(_.a)(a))),Object(w.a)(a,"_toggle",y,Object(_.a)(Object(_.a)(a))),a}return Object(l.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){var e=this.props.usersVotes,t=void 0===e?[]:e,a=C()(t,function(e){return-e.totalPoints});return u.a.createElement(u.a.Fragment,null,u.a.createElement("h2",{className:"page-title",onClick:this._toggle},u.a.createElement(S.a,null,"\u0421\u0432\u043e\u0434\u043d\u0430\u044f \u0442\u0430\u0431\u043b\u0438\u0446\u0430 \u0440\u0435\u0437\u0443\u043b\u044c\u0442\u0430\u0442\u043e\u0432 \u0433\u043e\u043b\u043e\u0441\u043e\u0432\u0430\u043d\u0438\u044f",u.a.createElement(U.a,{className:"user-standings-table-header-icon",direction:this._isOpen?"top":"down"}))),u.a.createElement(m.d,{isOpen:this._isOpen},u.a.createElement(m.A,{className:"user-standings-table",size:"sm",responsive:!0},u.a.createElement("thead",{className:"thead-light"},u.a.createElement("tr",{className:"text-uppercase"},u.a.createElement("th",{className:"user-standings-table__pos-column"},"\u041f\u043e\u0437"),u.a.createElement("th",null,"\u041f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044c"),u.a.createElement("th",{className:"text-right"},"\u043e\u0447\u043a\u0438"))),u.a.createElement("tbody",null,a.map(function(e,t){return u.a.createElement("tr",{key:e.userId},u.a.createElement("td",{className:"user-standings-table__pos-column"},t+1),u.a.createElement("td",null,e.userName),u.a.createElement("td",{className:"text-right"},e.totalPoints))})))))}}]),t}(u.a.Component),N=Object(k.a)(j.prototype,"_isOpen",[B.observable],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return!1}}),y=Object(k.a)(j.prototype,"_toggle",[B.action],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){var e=this;return function(){e._isOpen=!e._isOpen}}}),g=j))||g,A=(a(224),a(461),Object(o.inject)(function(e){var t=e.resultsPageStore;return{currentUser:t.authenticatedUser,raceResultsWithBets:t.raceResultsWithBets,userStandings:t.userStandings}})(x=function(e){function t(){return Object(n.a)(this,t),Object(s.a)(this,Object(c.a)(t).apply(this,arguments))}return Object(l.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){var e=this.props,t=e.currentUser,a=e.raceResultsWithBets,n=e.userStandings;return u.a.createElement(m.e,{tag:"section",className:"page"},n.length>0&&u.a.createElement(m.x,null,u.a.createElement(m.c,null,u.a.createElement(z,{usersVotes:n}))),a.reverse().map(function(e){var a=e.raceId,n=e.raceTitle,r=e.hasOfficialResults,s=e.userBetsResults;return 0===s.length?null:u.a.createElement(m.x,{key:a},u.a.createElement(m.c,null,u.a.createElement("h2",{className:"page-title"},n),u.a.createElement(R,{rows:s,currentUser:t,hasRaceResults:r})))}))}}]),t}(u.a.Component))||x);t.default=A}}]);