(self.webpackChunkfe_authen=self.webpackChunkfe_authen||[]).push([[135],{6135:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return v}});var a=t(3430),o=t(2791),i=t(4569),r=t.n(i),s=t(1405),c=t(1582),l=t(8145),u=t(1342),d=t(184),g=function(e){try{return 2==e.length?"".concat(l.Z.PREFIX_URL,"/images/").concat(e[0],"/").concat(e[1],"_resize"):""}catch(n){return""}};function f(e){console.log("UploadingProgress(props)",e);var n=e.uploadInfo;return(0,d.jsxs)("div",{className:"uploading-progress-container",children:[(0,d.jsx)("h3",{children:"running"==n.state?"Processing":"Complete"}),(0,d.jsxs)("p",{children:["Start time: ",(0,u.toReadAbleDateTime)(n.createdAt)," "]}),(0,d.jsxs)("p",{children:["End time: ",(0,u.toReadAbleDateTime)(n.updatedAt)," "]}),n.imageInfoIDs.map((function(e,n){var t,a,o,i;return console.log(null===(t=e.id)||void 0===t?void 0:t.imageRoot),(0,d.jsxs)("div",{className:"img-progress-container",children:[(0,d.jsx)("img",{src:g(null===(a=e.id)||void 0===a?void 0:a.imageRoot),className:"img-uploading",alt:null===(o=e.id)||void 0===o?void 0:o.alt}),(0,d.jsx)("p",{className:"image-title",children:(null===(i=e.id)||void 0===i?void 0:i.imageName)||"Deleted"}),(0,d.jsx)("p",{className:"progress",children:null!==e&&void 0!==e&&e.state?"Uploaded":"Uploading...."}),(0,d.jsx)("p",{className:"progress",children:"View more"})]},n)}))]})}var m="PROCESSING",h="PROCESSED",p="ALL";function v(){var e,n=(0,s.I0)(),t=(0,o.useState)(m),i=(0,a.Z)(t,2),u=i[0],g=i[1],v=(0,s.v9)((function(e){return e.sharedSlice.currentUserInformation})),x=(0,s.v9)((function(e){return e.imageSlice.processingImagesInfo}));(0,o.useEffect)((function(){e=setInterval((function(){I()}),1e3)}),[v._id]);var I=function(){r().get(l.Z.PREFIX_URL+"/api/image/check-progress-upload",{params:{userID:v._id}},{withCredentials:!0}).then((function(t){var a;t.data.success&&(console.log("data",t),n((0,c.fT)(t.data.data)),(0===(a=t.data.data).length||a.every((function(e){return e.imageInfoIDs.every((function(e){return e.state}))})))&&clearInterval(e))})).catch((function(e){console.log("err",e)}))};return(0,d.jsxs)("div",{className:"page-container",children:[(0,d.jsxs)("button",{onClick:function(){g(m)},children:[" ","Processing"]}),(0,d.jsxs)("button",{onClick:function(){g(h)},children:[" ","Processed"]}),(0,d.jsxs)("button",{onClick:function(){g(p)},children:[" ","All"]}),(0,d.jsx)("div",{className:"content-container",children:x.filter((function(e){return u===m?"running"===e.state:u===h?"processed"===e.state:u===p})).map((function(e){return(0,d.jsx)(f,{uploadInfo:e})}))})]})}},1342:function(e){e.exports={toReadAbleDate:function(e){var n=e.slice(0,10).split("-");return n[2]+"/"+n[1]+"/"+n[0]},calculateTime:function(e){var n=new Date(e),t=Math.abs(new Date-n);return t<6e4?"0 minutes ago":t<36e5?Math.floor(t/1e3/60)+" minutes ago":t<864e5?Math.floor(t/1e3/60/60)+" hours ago":t<2592e6?Math.floor(t/1e3/60/60/24)+" days ago":t<31536e6?Math.floor(t/1e3/60/60/24/30)+" months ago":Math.floor(t/1e3/60/60/24/365)+" years ago"},toReadAbleDateTime:function(e){var n=new Date(e);e.slice(0,10).split("-");return"".concat(n.getDate(),"/").concat(n.getMonth()+1,"/").concat(n.getFullYear()," ").concat(n.getHours(),":").concat(n.getMinutes(),":").concat(n.getSeconds()).concat((n.getMilliseconds()/1e3).toString().slice(1))}}}}]);
//# sourceMappingURL=135.435192f7.chunk.js.map