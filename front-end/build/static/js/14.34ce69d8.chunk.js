"use strict";(self.webpackChunkfe_authen=self.webpackChunkfe_authen||[]).push([[14],{7014:function(e,n,s){s.r(n),s.d(n,{default:function(){return m}});var t=s(3430),a=s(2791),i=s(4569),u=s.n(i),l=s(9768),r=s(6871),c=s(8145),o=s(184);function m(e){var n=(0,r.s0)(),s=(0,a.useState)(!1),i=(0,t.Z)(s,2),m=i[0],p=i[1],d=(0,a.useState)(!1),h=(0,t.Z)(d,2),f=h[0],x=h[1],v=(0,a.useState)(!0),N=(0,t.Z)(v,2),j=N[0],w=N[1],b=(0,a.useState)("signup"),g=(0,t.Z)(b,2),R=(g[0],g[1],(0,a.useState)(0)),S=(0,t.Z)(R,2),Z=S[0],F=S[1],P=(0,a.useState)(!1),k=(0,t.Z)(P,2),A=k[0],I=(k[1],(0,a.useState)(1)),U=(0,t.Z)(I,2),E=(U[0],U[1],(0,a.useState)("")),C=(0,t.Z)(E,2),_=C[0],y=(C[1],{username:(0,a.useRef)(null),email:(0,a.useRef)(null),password:(0,a.useRef)(null),otpRef:(0,a.useRef)(null)});return(0,o.jsx)("div",{className:"app-1-container",children:(0,o.jsxs)("div",{className:"signup-container",children:[(0,o.jsx)("h1",{className:"signup-title",children:"SIGN UP"}),(0,o.jsxs)("div",{className:"input-container",children:[(0,o.jsx)("label",{htmlFor:"username",className:"input-title",children:"Username"}),(0,o.jsx)("input",{type:"text",id:"username",className:"input-box",ref:y.username,onBlur:function(){var e;e=y.username.current.value,u().post(c.Z.PREFIX_URL+"/api/user/exist-username",{username:e}).then((function(e){!0===e.data.find?p(!0):p(!1)})).catch((function(e){(0,l.Am)(e.message)}))}})]}),m?(0,o.jsx)("p",{className:"error-input",children:"Username is exist"}):null,(0,o.jsxs)("div",{className:"input-container",children:[(0,o.jsx)("label",{htmlFor:"username",className:"input-title",children:"Email"}),(0,o.jsx)("input",{type:"email",id:"email",className:"input-box",ref:y.email,onBlur:function(){var e;e=y.email.current.value,u().post(c.Z.PREFIX_URL+"/api/user/exist-email",{email:e}).then((function(e){!0===e.data.find?x(!0):x(!1)})).catch((function(e){(0,l.Am)(e.message)})),function(e){/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e)?w(!0):w(!1)}(y.email.current.value)}})]}),f?(0,o.jsx)("p",{className:"error-input",children:"Email is exist"}):j?null:(0,o.jsx)("p",{className:"error-input",children:"Email is not valid"}),(0,o.jsxs)("div",{className:"input-container",children:[(0,o.jsx)("label",{htmlFor:"password",className:"input-title",children:"Password"}),(0,o.jsx)("input",{type:"password",id:"password",className:"input-box",ref:y.password})]}),(0,o.jsxs)("div",{className:"input-container",children:[(0,o.jsx)("label",{htmlFor:"password",className:"input-title",children:"Confirm password"}),(0,o.jsx)("input",{type:"password",id:"repeat-password",className:"input-box",ref:y.password})]}),(0,o.jsxs)("div",{className:"input-container",children:[(0,o.jsx)("label",{htmlFor:"otp",className:"input-title",children:"OTP"}),(0,o.jsxs)("div",{className:"input-concrete",children:[(0,o.jsx)("input",{type:"text",id:"otp",className:"input-box",ref:y.otpRef,defaultValue:""}),(0,o.jsx)("button",{className:m&&Z<=0&&A?"send-otp-button":"send-otp-button disable",onClick:function(){var e,n;m&&Z<=0&&A&&(e=y.usernameRef.current.value,u().post(c.Z.PREFIX_URL+"/api/otp/make-otp-sign-up",{username:e,email:n}).then((function(e){if(1==e.data.success){var n=Math.round(60-(new Date-new Date(e.data.time).getTime())/1e3);F(n);var s=setInterval((function(){console.log(Z),F((function(e){return 0==e&&clearInterval(s),e-1}))}),1e3)}})).catch((function(e){(0,l.Am)(e.message)})))},children:"Send"})]})]}),Z>0?(0,o.jsxs)("p",{className:"count-down",children:["OTP valid in ",Z," seconds"]}):null,(0,o.jsx)("button",{className:"send-otp-button",onClick:function(){return n=_,s=y.otpRef.current.value,void u().post(c.Z.PREFIX_URL+"/api/otp/check-otp",{username:n,otp:s,time:new Date}).then((function(n){console.log(n.data),1==n.data.success?((0,l.Am)("Authentication OK"),e.changeComponent("home")):(0,l.Am)(n.data.message)})).catch((function(e){(0,l.Am)(e.message)}));var n,s},children:"Submit"}),(0,o.jsx)("button",{className:"login-button",onClick:function(){var e,s,t;e=y.username.current.value,s=y.email.current.value,t=y.password.current.value,0!=e.length&&0!=t.length?u().post(c.Z.PREFIX_URL+"/api/user/sign-up",{email:s,username:e,password:t}).then((function(e){n("/sign-in")})).catch((function(e){console.log(e),(0,l.Am)("Signup failed!")})):(0,l.Am)("You must input all the information")},children:"SIGN UP"})]})})}}}]);
//# sourceMappingURL=14.34ce69d8.chunk.js.map