(this["webpackJsonpf1-bets-app"]=this["webpackJsonpf1-bets-app"]||[]).push([[9],{493:function(e,t,r){"use strict";r.r(t);var s=r(0),a=r.n(s),n=r(6),c=r(1),l=r(2),u=r.n(l),o=r(5),i=r(474),p=r(13),m=(r(47),r(86)),b=(r(27),r(87));class h extends s.Component{constructor(...e){var t;super(...e),t=this,this._handleSave=function(){var e=Object(o.a)(u.a.mark((function e(r){var s,a,n,c;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return s=t.props,a=s.user,n=s.onBetsSubmit,c=new m.a({userInfo:a.toUserInfo(),betsMap:r}),e.next=4,n(c);case 4:t._goToResultsPage();case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()}_goToResultsPage(){this.props.history.push(p.a.RESULTS)}render(){const e=this.props,t=e.racers,r=e.usersBet;return a.a.createElement(b.a,{racers:t,initData:r,placeholder:"\u0423\u043a\u0430\u0436\u0438\u0442\u0435 \u0412\u0430\u0448 \u043f\u0440\u043e\u0433\u043d\u043e\u0437",submitButtonText:"\u0421\u043e\u0445\u0440\u0430\u043d\u0438\u0442\u044c \u043f\u0440\u043e\u0433\u043d\u043e\u0437",gridPositionsCount:10,onSave:this._handleSave})}}var B=Object(i.a)(h);t.default=Object(n.inject)(({betPageStore:e})=>({racers:e.racers,currentUser:e.currentUser,usersBet:e.usersBet,isBetsAllowed:e.isBetsAllowed,nextRaceTitle:e.nextRaceTitle,onBetsSubmit:t=>e.submitBet(t)}))((function(e){const t=e.racers,r=e.currentUser,s=e.usersBet,n=e.isBetsAllowed,l=e.nextRaceTitle,u=e.onBetsSubmit,o=n?"\u0414\u0435\u043b\u0430\u0439\u0442\u0435 \u0412\u0430\u0448\u0438 \u043f\u0440\u043e\u0433\u043d\u043e\u0437\u044b!":"\u041f\u0440\u043e\u0433\u043d\u043e\u0437\u044b \u043d\u0435 \u043f\u0440\u0438\u043d\u0438\u043c\u0430\u044e\u0442\u0441\u044f.";return a.a.createElement(c.e,{className:"page"},a.a.createElement(c.x,null,a.a.createElement(c.c,null,a.a.createElement("h1",{className:"page-title"},o))),a.a.createElement(c.x,null,a.a.createElement(c.c,null,n?a.a.createElement(B,{racers:t,user:r,usersBet:s,onBetsSubmit:u}):a.a.createElement("div",{className:"alert alert-warning",role:"alert"},"\u0421\u0435\u0439\u0447\u0430\u0441 \u043f\u0440\u043e\u0433\u043d\u043e\u0437\u044b \u043d\u0430 ",l," \u0443\u0436\u0435 \u043d\u0435 \u043f\u0440\u0438\u043d\u0438\u043c\u0430\u044e\u0442\u0441\u044f.",a.a.createElement("br",null),"\u041d\u043e\u0432\u0430\u044f \u0432\u043e\u0437\u043c\u043e\u0436\u043d\u043e\u0441\u0442\u044c \u043e\u0441\u0442\u0430\u0432\u0438\u0442\u044c \u0441\u0432\u043e\u0439 \u043f\u0440\u043e\u0433\u043d\u043e\u0437 \u043d\u0430 \u0431\u0443\u0434\u0443\u0449\u0443\u044e \u0433\u043e\u043d\u043a\u0443 \u0443 \u0412\u0430\u0441 \u043f\u043e\u044f\u0432\u0438\u0442\u0441\u044f \u043f\u043e\u0441\u043b\u0435 \u043d\u0430\u0447\u0430\u043b\u0430 \u044d\u0442\u043e\u0439."))))}))}}]);