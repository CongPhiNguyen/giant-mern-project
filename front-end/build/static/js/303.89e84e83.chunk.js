"use strict";(self.webpackChunkfe_authen=self.webpackChunkfe_authen||[]).push([[303],{7303:function(e,a,n){n.r(a),n.d(a,{default:function(){return b}});var i=n(3430),s=n(2791),l=n(1405),o=n(4569),c=n.n(o),t=n(184);function r(e){return(0,t.jsxs)("div",{className:"displayer-container ".concat(e.selected?"selected":""),children:[(0,t.jsxs)("div",{className:"image-symbols",children:[(0,t.jsx)("img",{className:"image-left",src:"https://i.pinimg.com/736x/d2/ef/c9/d2efc90c6c6cfba0349971aa14f2f9e3.jpg"}),(0,t.jsxs)("div",{className:"images-right",children:[(0,t.jsx)("img",{className:"image-right image-top",src:"https://i.pinimg.com/736x/ec/46/21/ec46213ad67b7041fdbbda30ae363df1.jpg"}),(0,t.jsx)("img",{className:"image-right image-bottom",src:"https://i.pinimg.com/564x/bd/51/57/bd51576c1ad0511ad7f462c5fd8a8e3f.jpg"})]})]}),(0,t.jsx)("p",{className:"name-tag",children:e.album.albumName})]})}var d=n(7274),m=n(8145);function u(e){var a,n,l,o,r,u,h,f,v,x,b,p,g,j,N;console.log(e.albumInfo);var w=(0,s.useState)({}),I=(0,i.Z)(w,2),y=I[0],P=I[1];return(0,s.useEffect)((function(){var a,n;null!==(a=e.albumInfo)&&void 0!==a&&a.ownPeople&&function(e){c().defaults.withCredentials=!0;var a=m.Z.PREFIX_URL+"/api/user/";c().get(a+e).then((function(e){P(e.data.data)})).catch((function(e){console.log("err",e)}))}(null===(n=e.albumInfo)||void 0===n?void 0:n.ownPeople)}),[e.albumInfo]),(0,t.jsx)(d.Z,{in:e.display,timeout:200,classNames:"slide-right",mountOnEnter:!0,unmountOnExit:!0,children:(0,t.jsxs)("div",{className:"preview-pane-controller",children:[(0,t.jsx)("div",{className:"preview-pane-close noselect",onClick:function(){return e.closePreviewPane()},children:"X"}),(0,t.jsxs)("section",{className:"information-detail information-section",children:[(0,t.jsx)("p",{className:"title",children:"Details"}),(0,t.jsx)("div",{className:"divider"}),(0,t.jsxs)("p",{className:"information-concrete",children:[(0,t.jsx)("label",{className:"information-label",children:"Children albums:"}),null!==(a=null===(n=e.albumInfo)||void 0===n||null===(l=n.haveAlbums)||void 0===l?void 0:l.length)&&void 0!==a?a:" Kh\xf4ng x\xe1c \u0111\u1ecbnh"]}),(0,t.jsxs)("p",{className:"information-concrete",children:[(0,t.jsx)("label",{className:"information-label",children:"Total images:"}),null!==(o=null===(r=e.albumInfo)||void 0===r||null===(u=r.haveImages)||void 0===u?void 0:u.length)&&void 0!==o?o:" Kh\xf4ng x\xe1c \u0111\u1ecbnh"]}),(0,t.jsxs)("p",{className:"information-concrete",children:[(0,t.jsx)("label",{className:"information-label",children:"Storage:"}),null!==(h=null===(f=e.albumInfo)||void 0===f?void 0:f.storage)&&void 0!==h?h:" Kh\xf4ng x\xe1c \u0111\u1ecbnh"]}),(0,t.jsxs)("p",{className:"information-concrete",children:[(0,t.jsx)("label",{className:"information-label",children:"Lastchange :"}),null!==(v=e.albumInfo)&&void 0!==v&&v.updatedAt?function(e){var a=e.slice(0,10).split("-");return a[2]+"/"+a[1]+"/"+a[0]}(null===(x=e.albumInfo)||void 0===x?void 0:x.updatedAt)+" "+function(e){var a=new Date(e),n=Math.abs(new Date-a);return n<6e4?"0 minutes ago":n<36e5?Math.floor(n/1e3/60)+" minutes ago":n<864e5?Math.floor(n/1e3/60/60)+" hours ago":n<2592e6?Math.floor(n/1e3/60/60/24)+" days ago":n<31536e6?Math.floor(n/1e3/60/60/24/30)+" months ago":Math.floor(n/1e3/60/60/24/365)+" years ago"}(null===(b=e.albumInfo)||void 0===b?void 0:b.updatedAt):"Kh\xf4ng x\xe1c \u0111\u1ecbnh"]})]}),(0,t.jsxs)("section",{className:"information-attribute information-section",children:[(0,t.jsx)("p",{className:"title",children:"Attribute"}),(0,t.jsx)("div",{className:"divider"}),(0,t.jsxs)("p",{className:"information-concrete",children:[(0,t.jsx)("label",{className:"information-label",children:"Own by:"}),(0,t.jsx)("img",{className:"own-avatar",src:null===y||void 0===y?void 0:y.avatarURL}),(0,t.jsx)("p",{className:"own-username",children:(null===y||void 0===y?void 0:y.username)||""})]}),(0,t.jsxs)("p",{className:"information-concrete",children:[(0,t.jsx)("label",{className:"information-label",children:"Description:"}),null===(p=e.albumInfo)||void 0===p?void 0:p.description]}),(0,t.jsxs)("p",{className:"information-concrete",children:[(0,t.jsx)("label",{className:"information-label",children:"Location:"}),"".concat(null===y||void 0===y?void 0:y.username,"/").concat(null===(g=e.albumInfo)||void 0===g?void 0:g.albumName)]})]}),(0,t.jsxs)("section",{className:"information-permission information-section",children:[(0,t.jsx)("p",{className:"title",children:"Permission"}),(0,t.jsx)("div",{className:"divider"}),(0,t.jsxs)("p",{className:"information-concrete",children:[(0,t.jsx)("label",{className:"information-label",children:"ShareList:"}),null!==(j=(null===(N=e.albumInfo)||void 0===N?void 0:N.viewedPeople.length)+" people viewed this album")&&void 0!==j?j:""]})]})]})})}var h=n(1582);function f(e){console.log(e);var a=(0,l.I0)(),n=(0,l.v9)((function(e){return e.sharedSlice.currentUserInformation})),i=((0,l.v9)((function(e){return e.imageSlice.search})),(0,s.createRef)());return(0,s.useEffect)((function(){(0,h.c1)({isSearching:!1,module:"",searchValue:[]})}),[]),(0,t.jsxs)("div",{className:"view-heading-app-container",children:[(0,t.jsxs)("div",{className:"search-bar",children:[(0,t.jsx)("input",{type:"text",className:"search-bar-box",ref:i}),(0,t.jsxs)("select",{name:"search-option",id:"search-option",children:[(0,t.jsx)("option",{value:"saab",children:"By name"}),(0,t.jsx)("option",{value:"volvo",children:"By date"})]}),(0,t.jsx)("button",{className:"search",onClick:function(){!function(){if("image"==e.type&&"own"==e.permit){c().defaults.withCredentials=!0;var s=m.Z.PREFIX_URL+"/api/image/own/search";n._id,c().get(s,{params:{namePattern:i.current.value}}).then((function(e){console.log("data",e),a((0,h.c1)({isSearching:!0,module:"ownImage",searchValue:e.data.data}))})).catch((function(e){console.log("err",e)}))}}()},children:"Search"})]}),(0,t.jsx)("div",{className:"add-new-container",children:e.buttonAdd})]})}var v=n(1187),x=n(8665);function b(){var e=(0,v.I)(),a=(0,s.useState)([]),n=(0,i.Z)(a,2),o=n[0],d=n[1],h=(0,s.useState)(-1),b=(0,i.Z)(h,2),p=b[0],g=b[1],j=(0,s.useState)(!1),N=(0,i.Z)(j,2),w=N[0],I=N[1],y=(0,l.v9)((function(e){return e.sharedSlice.currentUserInformation}));(0,s.useEffect)((function(){y.username&&c().get(m.Z.PREFIX_URL+"/api/album/get-all-user-album",{params:{username:y.username}},{withCredentials:!0}).then((function(e){console.log("data",e),d(e.data.albumList)})).catch((function(e){console.log("err",e)}))}),[y.username]);return(0,t.jsxs)("div",{style:{display:"flex"},children:[(0,t.jsxs)("div",{className:"page-container",children:[(0,t.jsx)("div",{className:"view-heading-container",children:(0,t.jsx)(f,{buttonAdd:(0,t.jsx)("button",{className:"add-new",onClick:function(){e((0,x.K4)("Add new album"))},children:"Add new album"})})}),(0,t.jsx)("div",{className:"content-container",children:(0,t.jsx)("div",{className:"album-list",onClick:function(){g(-1),I(!1)},children:null===o||void 0===o?void 0:o.map((function(e,a){return(0,t.jsx)("div",{onClick:function(e){e.stopPropagation(),g(a),I(!0)},children:(0,t.jsx)(r,{album:e,selected:a===p},a)})}))})})]}),(0,t.jsx)(u,{closePreviewPane:function(){I(!1)},display:w,albumInfo:o[p]})]})}}}]);
//# sourceMappingURL=303.89e84e83.chunk.js.map