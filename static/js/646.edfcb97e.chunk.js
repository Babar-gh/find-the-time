"use strict";(self.webpackChunkfind_the_time_private=self.webpackChunkfind_the_time_private||[]).push([[646],{3077:function(e,t,n){n.d(t,{gT:function(){return s},Lj:function(){return c},yM:function(){return l},oc:function(){return d},mZ:function(){return u},QM:function(){return p},XM:function(){return h},xC:function(){return m}});var r=n(4569),i=n.n(r),o=n(6712),a="".concat(o.N,"/events"),s=function(e){return i().post("".concat(a),e)},c=function(e){return i().get("".concat(a),{params:{event_id:e}})},l=function(e){return i().post("".concat(a,"/new"),e)},d=function(e,t){return i().post("".concat(a,"/subscribe"),t,{params:{event_id:e}})},u=function(e){return i().post("".concat(a,"/unsubscribe"),{},{params:{event_id:e}})},p=function(e,t){return i().post("".concat(a,"/choose-interval"),t,{params:{event_id:e}})},h=function(e,t){return i().post("".concat(a,"/remove-subscription"),{},{params:{event_id:e,user_id:t}})},m=function(e){return i().post("".concat(a,"/remove"),{},{params:{event_id:e}})}},2048:function(e,t,n){n.d(t,{lR:function(){return o},XO:function(){return s},Rg:function(){return c}});var r=n(7892),i=n.n(r),o=function(e){return null===e?"notYetScheduled":i()(e.end).isAfter(i()())?"pending":"past"},a={notYetScheduled:"EditCalendar",pending:"Event",past:"EventAvailable"},s=function(e){return a[e]},c=function(e,t){return e.organizedBy.id===t.id?"organizer":e.subscriptions.some((function(e){return e.user.id===t.id}))?"subscriber":"visitor"}},5646:function(e,t,n){n.r(t),n.d(t,{default:function(){return re}});var r=n(5987),i=n(1413),o=n(9448),a=n.n(o),s=n(6871),c=n(2791),l=n(1253),d=n(7993),u=n(528),p=n(6278),h=n(9331),m=n(3960),f=n(3527),_=n(7892),g=n.n(_),v=n(7838),x=n(5446),Z=n(2189),j=n(2048),I={Root:"EventTile_Root__kjvQ+",Heading:"EventTile_Heading__ewzJ9",List:"EventTile_List__WNImg",ListItem:"EventTile_ListItem__vAa6f",ListItem_color_default:"EventTile_ListItem_color_default__Zklcf",ListItem_color_accentPrimary:"EventTile_ListItem_color_accentPrimary__1p0Qy",ListItem_color_accentSecondary:"EventTile_ListItem_color_accentSecondary__4A8S6",ListItem_color_faded:"EventTile_ListItem_color_faded__EOlie",ListItemIconContainer:"EventTile_ListItemIconContainer__ITU09",ListItemTextContainer:"EventTile_ListItemTextContainer__GfTOG"},y=n(184),L=a().bind(I),b={notYetScheduled:"accentPrimary",pending:"accentSecondary",past:"faded"},S=function(e){var t=e.icon,n=e.color,r=void 0===n?"default":n,i=e.children;return(0,y.jsxs)("li",{className:L("ListItem","ListItem_color_".concat(r)),children:[(0,y.jsx)("div",{className:I.ListItemIconContainer,children:(0,y.jsx)(x.Z,{isCentered:!1,type:t})}),(0,y.jsx)("p",{className:I.ListItemTextContainer,children:i})]})},k=function(e){var t=e.title,n=e.organizedBy,r=e.created,i=e.location,o=e.comment,a=e.duration,s=e.chosenInterval,c=(0,j.lR)(s);return(0,y.jsxs)("article",{className:I.Root,children:[(0,y.jsx)("h3",{className:I.Heading,children:(0,y.jsx)(v.Z,{clamp:1,font:"primaryBold",color:"secondary",children:t})}),(0,y.jsxs)("ul",{className:I.List,children:[(0,y.jsxs)(S,{icon:"Person",children:[(0,y.jsx)(v.Z,{clamp:1,children:(0,Z.G)(n)}),(0,y.jsx)("br",{}),(0,y.jsxs)(v.Z,{font:"primaryItalic",size:"small",children:["created ",g()(r).fromNow()]})]}),(0,y.jsx)(S,{icon:"LocationOn",children:(0,y.jsx)(v.Z,{clamp:1,children:i})}),(0,y.jsx)(S,{icon:"Description",children:""!==o?(0,y.jsx)(v.Z,{clamp:3,children:o}):(0,y.jsx)(v.Z,{font:"primaryItalic",children:"No description"})}),(0,y.jsx)(S,{icon:"Timelapse",children:(0,y.jsx)(v.Z,{children:"".concat("past"===c?"Lasted":"Will last"," ").concat(g().duration(a,"minutes").humanize())})}),(0,y.jsxs)(S,{icon:(0,j.XO)(c),color:b[c],children:["notYetScheduled"===c&&(0,y.jsx)(v.Z,{color:"inherit",children:"Not scheduled yet"}),"pending"===c&&(0,y.jsxs)(v.Z,{color:"inherit",children:["Scheduled for ",g()(null===s||void 0===s?void 0:s.start).format("MMM D, YYYY")]}),"past"===c&&(0,y.jsxs)(v.Z,{color:"inherit",children:["Ended ",g()(null===s||void 0===s?void 0:s.end).fromNow()]})]})]})]})},C=n(3155),N=n(1290),T=n(1556),w=n(4833),E={Root:"Switch_Root__8C98f",Input:"Switch_Input__8hKuq",Track:"Switch_Track__mxs1G",Track_checked:"Switch_Track_checked__6TuZE",Container:"Switch_Container__QAlzR"},P=["label","labelPosition","checked"],R=a().bind(E),z=function(e){var t=e.label,n=e.labelPosition,o=void 0===n?"left":n,a=e.checked,s=(0,r.Z)(e,P),c=(0,y.jsx)("label",{className:E.Root,children:(0,y.jsx)("div",{className:R("Track",{Track_checked:a}),children:(0,y.jsx)("input",(0,i.Z)({className:E.Input,type:"checkbox",checked:a},s))})});return t?(0,y.jsxs)("label",{className:E.Container,children:["left"===o&&(0,y.jsx)(v.Z,{color:"inherit",children:t}),c,"right"===o&&(0,y.jsx)(v.Z,{color:"inherit",children:t})]}):c},O=n(2754),B=function(e){var t=e.filter,n=e.onFilterChange,r=(0,O.Z)()("Mobile","Tablet")?"right":"center",i=function(e){return e||"all"},o=function(e,r){return(0,y.jsx)(T.Z.Item,{id:i(e),icon:"Check",iconIsShownOnlyIfSelected:!0,element:"HTMLButton",elementProps:{onClick:function(){e!==t.status&&n({status:e})}},children:r})},a=[t.isOrganizer,t.status].some((function(e){return null!==e}));return(0,y.jsxs)(C.Z,{align:r,width:"wide",closeOnClick:!1,trigger:(0,y.jsx)(N.Z,{icon:"FilterList",isHighlighted:a,elementProps:{title:"Filters"}}),children:[(0,y.jsxs)(T.Z,{selectedId:i(t.status),children:[o(null,"Show all"),o("pending","Pending"),o("past","Past")]}),(0,y.jsx)(w.Z,{theme:"dropdown"}),(0,y.jsx)(z,{label:"Hide created by others",checked:null!==t.isOrganizer,onChange:function(e){return n({isOrganizer:e.target.checked||null})}})]})},M=n(763),F=n(7508),A="SearchInput_Root__IO2ud",H=function(e){var t=e.filter,n=e.onFilterChange,r=(0,c.useMemo)((function(){return(0,M.debounce)((function(e){e.target.value!==t.title&&n({title:e.target.value})}),600)}),[t.title,n]);return(0,y.jsx)("div",{className:A,children:(0,y.jsx)(F.Z,{theme:"alternative",icon:"Search",placeholder:"Enter event name",onChange:r})})},Y=function(e){var t=e.sorter,n=e.onSorterChange,r=(0,O.Z)()("Mobile","Tablet")?"right":"center",i=function(e,r){return(0,y.jsx)(T.Z.Item,{id:e,icon:"Check",iconIsShownOnlyIfSelected:!0,element:"HTMLButton",elementProps:{onClick:function(){e!==t.sortBy&&n({sortBy:e})}},children:r})};return(0,y.jsx)(C.Z,{align:r,trigger:(0,y.jsx)(N.Z,{icon:"SortByAlpha",isHighlighted:"created"!==t.sortBy,elementProps:{title:"Sort by"}}),children:(0,y.jsxs)(T.Z,{selectedId:t.sortBy,children:[i("created","Created on"),i("chosenInterval","Scheduled for"),i("subscriptions","Possible start")]})})},G=function(e){var t=e.sorter,n=e.onSorterChange,r="descending"===t.direction?"ArrowDownward":"ArrowUpward",i="descending"===t.direction?"ascending":"descending";return(0,y.jsx)(N.Z,{icon:r,elementProps:{onClick:function(){return n({direction:i})},title:"Sort direction"}})},Q={Controls:"Events_Controls__4R+MV",List:"Events_List__z3wNT",ListItem:"Events_ListItem__iqSBL",ListItem_loader:"Events_ListItem_loader__r4ucv"},D=n(5861),W=n(885),X=n(7757),q=n.n(X),U=n(5469),J=n(3077),K=n(6579),V=n(2982),$=function(e,t){switch(t.type){case"pickNextPage":var n=(e.pagination.pageNumber+1)*e.pageSize;if(null!==e.totalItems&&n<e.totalItems){var r=e.pagination.pageNumber+1;return(0,i.Z)((0,i.Z)({},e),{},{pagination:(0,i.Z)((0,i.Z)({},e.pagination),{},{pageNumber:r})})}return(0,i.Z)({},e);case"applyFilter":return(0,i.Z)((0,i.Z)({},e),{},{pagination:(0,i.Z)((0,i.Z)({},e.pagination),{},{pageNumber:0}),totalItems:null,filter:(0,i.Z)((0,i.Z)({},e.filter),t.payload)});case"applySorter":return(0,i.Z)((0,i.Z)({},e),{},{pagination:(0,i.Z)((0,i.Z)({},e.pagination),{},{pageNumber:0}),totalItems:null,sorter:(0,i.Z)((0,i.Z)({},e.sorter),t.payload)});case"parseResponse":return(0,i.Z)((0,i.Z)({},e),{},{totalItems:t.payload.totalItems,items:0===e.pagination.pageNumber?(0,V.Z)(t.payload.items):[].concat((0,V.Z)(e.items),(0,V.Z)(t.payload.items))});case"setIsLoading":return(0,i.Z)((0,i.Z)({},e),{},{isLoading:t.payload})}},ee=function(e){var t=(0,K.T)(),n={pagination:{pageSize:e,pageNumber:0},sorter:{sortBy:"created",direction:"descending"},filter:{isOrganizer:null,location:null,status:null,title:null},items:[],totalItems:null,pageSize:e,isLoading:!1},r=(0,c.useReducer)($,n),o=(0,W.Z)(r,2),a=o[0],s=o[1],l=function(e){return s({type:"parseResponse",payload:e})},d=function(e){return s({type:"setIsLoading",payload:e})};return(0,c.useEffect)((function(){var e=function(){var e=(0,D.Z)(q().mark((function e(){var n,r;return q().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return d(!0),n={pagination:a.pagination,filter:a.filter,sorter:a.sorter},e.prev=2,e.next=5,(0,J.gT)(n);case 5:r=e.sent,l(r.data),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(2),t((0,U.H_)("fetch your events",e.t0));case 12:d(!1);case 13:case"end":return e.stop()}}),e,null,[[2,9]])})));return function(){return e.apply(this,arguments)}}();e()}),[a.pagination,a.filter,a.sorter,t]),(0,i.Z)((0,i.Z)({},a),{},{getNextPage:function(){return s({type:"pickNextPage"})},applyFilter:function(e){return s({type:"applyFilter",payload:e})},applySorter:function(e){return s({type:"applySorter",payload:e})}})},te=["id"],ne=a().bind(Q),re=function(){var e=ee(10),t={filter:e.filter,onFilterChange:e.applyFilter},n={sorter:e.sorter,onSorterChange:e.applySorter},o=(0,m.Z)(e.getNextPage).setSentinelRef,a=e.isLoading&&0===e.pagination.pageNumber,_=e.isLoading&&e.pagination.pageNumber>0;return(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)(c.Suspense,{fallback:(0,y.jsx)(l.Z,{isOpen:!0}),children:(0,y.jsx)(s.j3,{})}),(0,y.jsxs)(h.Z,{title:"Events",headerAddon:(0,y.jsx)(d.Z,{element:"Link",elementProps:{type:"RouterLink",to:f.Su.CreateEvent},children:"Create new event"}),isLoading:a,children:[(0,y.jsxs)("div",{className:Q.Controls,children:[(0,y.jsx)(H,(0,i.Z)({},t)),(0,y.jsx)(G,(0,i.Z)({},n)),(0,y.jsx)(Y,(0,i.Z)({},n)),(0,y.jsx)(B,(0,i.Z)({},t))]}),(0,y.jsxs)("ul",{className:Q.List,children:[e.items.map((function(t,n){var a=t.id,s=(0,r.Z)(t,te),c=e.items.length-1===n;return(0,y.jsx)("li",{className:Q.ListItem,ref:c?o:void 0,children:(0,y.jsx)(u.Z,{type:"RouterLink",to:"".concat(f.Su.Events,"/").concat(a),isWrapper:!0,children:(0,y.jsx)(k,(0,i.Z)({id:a},s))})},a)})),_&&(0,y.jsx)(p.Z,{isShown:!0,children:(0,y.jsx)("li",{className:ne("ListItem","ListItem_loader")})})]})]})]})}}}]);
//# sourceMappingURL=646.edfcb97e.chunk.js.map