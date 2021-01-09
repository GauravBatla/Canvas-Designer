(()=>{function e(e){return document.getElementById(e)}function t(t){var n=e(t),a=n.getContext("2d");return n.setAttribute("width",innerWidth),n.setAttribute("height",innerHeight),a.lineWidth=2,a.strokeStyle="#6c96c8",a.fillStyle="rgba(0,0,0,0)",a.font='15px "Arial"',a}e("code-text"),t("main-canvas"),t("temp-canvas")})(),(()=>{var e=document.getElementById("pencil-stroke-style").value,t="#"+document.getElementById("pencil-fill-style").value,n=clone(drawHelper);n.getOptions=function(){return[e,t,fillStyle,globalAlpha,globalCompositeOperation,lineCap,lineJoin,font]}})(),(()=>{var e=document.getElementById("marker-stroke-style").value,t="#"+document.getElementById("marker-fill-style").value,n=clone(drawHelper);n.getOptions=function(){return[e,t,fillStyle,.7,globalCompositeOperation,lineCap,lineJoin,font]}})(),(()=>{var e={text:"",selectedFontFamily:"Arial",selectedFontSize:"15",lastFillStyle:"",onShapeSelected:function(){tempContext.canvas.style.cursor="text",this.x=this.y=this.pageX=this.pageY=0,this.text=""},onShapeUnSelected:function(){this.text="",this.showOrHideTextTools("hide"),tempContext.canvas.style.cursor="default",void 0!==this.blinkCursorInterval&&clearInterval(this.blinkCursorInterval)},getFillColor:function(e){return"rgba(255, 255, 255, 0)"==(e=(e||fillStyle).toLowerCase())||"transparent"==e||"white"===e?"black":e},writeText:function(t,n){if(is.isText){if(n)return e.text=e.text.substr(0,e.text.length-1),void e.fillText(e.text);e.text+=t,e.fillText(e.text)}},fillText:function(t){if(is.isText){tempContext.clearRect(0,0,tempContext.canvas.width,tempContext.canvas.height);var n=e.getOptions();drawHelper.handleOptions(tempContext,n),tempContext.fillStyle=e.getFillColor(n[2]),tempContext.font=e.selectedFontSize+'px "'+e.selectedFontFamily+'"',tempContext.fillText(t,e.x,e.y)}},blinkCursorInterval:null,index:0,blinkCursor:function(){e.index++,e.index%2==0?e.fillText(e.text+"|"):e.fillText(e.text)},getOptions:function(){var t={font:e.selectedFontSize+'px "'+e.selectedFontFamily+'"',fillStyle:e.getFillColor(),strokeStyle:"#6c96c8",globalCompositeOperation:"source-over",globalAlpha:1,lineJoin:"round",lineCap:"round",lineWidth:2};return font=t.font,t},appendPoints:function(){var t=e.getOptions();points[points.length]=["text",['"'+e.text+'"',e.x,e.y],drawHelper.getOptions(t)]},mousedown:function(t){is.isText&&(e.text.length&&this.appendPoints(),e.x=e.y=0,e.text="",e.pageX=t.pageX,e.pageY=t.pageY,e.x=t.pageX-canvas.offsetLeft-5,e.y=t.pageY-canvas.offsetTop+10,void 0!==e.blinkCursorInterval&&clearInterval(e.blinkCursorInterval),e.blinkCursor(),e.blinkCursorInterval=setInterval(e.blinkCursor,700),this.showTextTools(),this.focusVirtualTextbox())},mouseup:function(e){},mousemove:function(e){},showOrHideTextTools:function(e){"hide"===e?this.lastFillStyle.length&&(fillStyle=this.lastFillStyle,this.lastFillStyle=""):this.lastFillStyle.length||(this.lastFillStyle=fillStyle,fillStyle="black"),this.fontFamilyBox.style.display="show"==e?"block":"none",this.fontSizeBox.style.display="show"==e?"block":"none",this.fontSizeBox.style.left=this.x+"px",this.fontFamilyBox.style.left=this.fontSizeBox.clientWidth+this.x+"px",this.fontSizeBox.style.top=this.y+"px",this.fontFamilyBox.style.top=this.y+"px"},showTextTools:function(){this.fontFamilyBox&&this.fontSizeBox&&(this.unselectAllFontFamilies(),this.unselectAllFontSizes(),this.showOrHideTextTools("show"),this.eachFontFamily((function(t){t.onclick=function(t){t.preventDefault(),e.showOrHideTextTools("hide"),e.selectedFontFamily=this.innerHTML,this.className="font-family-selected"},t.style.fontFamily=t.innerHTML})),this.eachFontSize((function(t){t.onclick=function(t){t.preventDefault(),e.showOrHideTextTools("hide"),e.selectedFontSize=this.innerHTML,this.className="font-family-selected"}})))},focusVirtualTextbox:function(){var e=document.getElementById("virtual-textbox");e||((e=document.createElement("input")).id="virtual-textbox",e.setAttribute("type","text"),e.style.opacity="0",e.addEventListener("keyup",function(e){this.text=e.target.value,this.fillText(e.target.value)}.bind(this))),e.value="",document.body.append(e),e.focus()},eachFontFamily:function(e){for(var t=this.fontFamilyBox.querySelectorAll("li"),n=0;n<t.length;n++)e(t[n])},unselectAllFontFamilies:function(){this.eachFontFamily((function(t){t.className="",t.innerHTML===e.selectedFontFamily&&(t.className="font-family-selected")}))},eachFontSize:function(e){for(var t=this.fontSizeBox.querySelectorAll("li"),n=0;n<t.length;n++)e(t[n])},unselectAllFontSizes:function(){this.eachFontSize((function(t){t.className="",t.innerHTML===e.selectedFontSize&&(t.className="font-size-selected")}))},onReturnKeyPressed:function(){if(e.text&&e.text.length){var t=parseInt(e.selectedFontSize)||15;this.mousedown({pageX:this.pageX,pageY:this.pageY+t+5}),drawHelper.redraw()}},fontFamilyBox:document.querySelector(".fontSelectUl"),fontSizeBox:document.querySelector(".fontSizeUl")}})(),(()=>{var e={global:{ismousedown:!1,prevX:0,prevY:0,prevRadius:0,isCircleDrawn:!1,isCircledEnded:!0,isClockwise:!1,arcRangeContainer:null,arcRange:null},mousedown:function(e){var t=this.global,n=e.pageX-canvas.offsetLeft,a=e.pageY-canvas.offsetTop;t.prevX=n,t.prevY=a,t.ismousedown=!0},mouseup:function(e){var t=this.global,n=e.pageX-canvas.offsetLeft,a=e.pageY-canvas.offsetTop;if(t.ismousedown)if(!t.isCircleDrawn&&t.isCircledEnded){var i,o=t.prevX,l=t.prevY,r=(n-o+(a-l))/3;t.prevRadius=r,t.isCircleDrawn=!0,t.isCircleEnded=!1,i=((o>n?o-n:n-o)+(l>a?l-a:a-l))/(2*Math.PI*r/21*2),points[points.length]=["arc",[o+r,l+r,r,i,1],drawHelper.getOptions()];var s=t.arcRange,d=t.arcRangeContainer;d.style.display="block",s.focus(),d.style.top=a+canvas.offsetTop+20+"px",d.style.left=n+"px",s.value=2}else t.isCircleDrawn&&!t.isCircleEnded&&this.end();t.ismousedown=!1,this.fixAllPoints()},mousemove:function(e){var t=this.global,n=e.pageX-canvas.offsetLeft,a=e.pageY-canvas.offsetTop,i=t.ismousedown,o=t.isCircleDrawn,l=t.isCircledEnded;if(i&&!o&&l){var r=t.prevX,s=t.prevY,d=(n-r+(a-s))/3;tempContext.clearRect(0,0,2e3,2e3),drawHelper.arc(tempContext,[r+d,s+d,d,2*Math.PI,!0])}},fixAllPoints:function(){for(var e=this.toFixed,t=0;t<points.length;t++){var n,a=points[t];"arc"===a[0]&&(n=a[1],points[t]=["arc",[e(n[0]),e(n[1]),e(n[2]),e(n[3]),n[4]],a[2]])}},init:function(){var t=find("is-clockwise"),n=this.global;n.arcRangeContainer=find("arc-range-container"),n.arcRange=find("arc-range"),addEvent(t,"change",(function(a){if(n.isClockwise=t.checked,n.arcRange.value=e.toFixed(n.arcRange.value),n.arcRange.focus(),e.arcRangeHandler(a),points.length){var i=points[points.length-1][1];tempContext.clearRect(0,0,innerWidth,innerHeight),drawHelper.arc(tempContext,[i[0],i[1],i[2],i[3],i[4]])}}));var a=n.arcRange;addEvent(a,"keydown",this.arcRangeHandler),addEvent(a,"focus",this.arcRangeHandler)},arcRangeHandler:function(t){var n=e.global,a=n.arcRange,i=t.keyCode,o=+a.value;if(39!=i&&40!=i||(a.value=(o<2?o:1.98)+.02),37!=i&&38!=i||(a.value=(o>0?o:.02)-.02),!i||13==i||39==i||40==i||37==i||38==i){var l=Math.PI*e.toFixed(o),r=points[points.length-1];if("arc"===r[0]){var s=r[1];points[points.length-1]=["arc",[s[0],s[1],s[2],l,n.isClockwise?1:0],r[2]],drawHelper.redraw()}}},toFixed:function(e){return Number(e).toFixed(1)},end:function(){var e=this.global;e.arcRangeContainer.style.display="none",e.arcRange.value=2,e.isCircleDrawn=!1,e.isCircleEnded=!0,drawHelper.redraw()}};e.init()})(),(()=>{var e={lastPdfURL:null,lastIndex:0,lastPointIndex:0,removeWhiteBackground:!1,pdfPageContainer:document.getElementById("pdf-page-container"),pdfPagesList:document.getElementById("pdf-pages-list"),pdfNext:document.getElementById("pdf-next"),pdfPrev:document.getElementById("pdf-prev"),pdfClose:document.getElementById("pdf-close"),pageNumber:1,images:[],ismousedown:!1,prevX:0,prevY:0,getPage:function(t,n){if(t=parseInt(t)||1,!e.pdf)return pdfjsLib.disableWorker=!1,void pdfjsLib.getDocument(e.lastPdfURL).then((function(a){e.pdf=a,e.getPage(t,n)}));var a=e.pdf;a.getPage(t).then((function(i){e.pageNumber=t;var o=i.getViewport(1.5),l=document.createElement("canvas"),r=l.getContext("2d");l.height=o.height,l.width=o.width;var s={canvasContext:r,viewport:o};!0===e.removeWhiteBackground&&(s.background="rgba(0,0,0,0)"),i.render(s).then((function(){if(!0===e.removeWhiteBackground){for(var t=r.getImageData(0,0,l.width,l.height),i=t.data,o={r:0,g:0,b:0,a:0},s=0,d=i.length;s<d;s+=4){var c=i[s],p=i[s+1],u=i[s+2];255==c&&255==p&&255==u&&(i[s]=o.r,i[s+1]=o.g,i[s+2]=o.b,i[s+3]=o.a)}r.putImageData(t,0,0)}e.lastPage=l.toDataURL("image/png"),n(e.lastPage,l.width,l.height,a.numPages)}))}))},load:function(t){e.lastPdfURL=t,e.getPage(parseInt(e.pdfPagesList.value||1),(function(n,a,i,o){e.prevX=canvas.width-a-parseInt(a/2),e.lastIndex=e.images.length;var l=[n,60,20,a,i,e.lastIndex];e.lastPointIndex=points.length,points[points.length]=["pdf",l,drawHelper.getOptions()],e.pdfPagesList.innerHTML="";for(var r=1;r<=o;r++){var s=document.createElement("option");s.value=r,s.innerHTML="Page #"+r,e.pdfPagesList.appendChild(s),e.pageNumber.toString()==r.toString()&&(s.selected=!0)}e.pdfPagesList.onchange=function(){e.load(t)},e.pdfNext.onclick=function(){e.pdfPagesList.selectedIndex++,e.pdfPagesList.onchange()},e.pdfPrev.onclick=function(){e.pdfPagesList.selectedIndex--,e.pdfPagesList.onchange()},e.pdfClose.onclick=function(){e.pdfPageContainer.style.display="none"},document.getElementById("drag-last-path").click(),e.pdfPrev.src=data_uris.pdf_next,e.pdfNext.src=data_uris.pdf_prev,e.pdfClose.src=data_uris.pdf_close,e.pdfPageContainer.style.top="20px",e.pdfPageContainer.style.left=l[3]-parseInt(l[3]/2)+"px",e.pdfPageContainer.style.display="block",syncPoints(!0)}))},mousedown:function(e){var t=e.pageX-canvas.offsetLeft,n=e.pageY-canvas.offsetTop,a=this;a.prevX=t,a.prevY=n,a.ismousedown=!0},mouseup:function(t){var n=t.pageX-canvas.offsetLeft,a=t.pageY-canvas.offsetTop,i=this;i.ismousedown&&(points[e.lastPointIndex]&&(points[e.lastPointIndex]=["pdf",[e.lastPage,i.prevX,i.prevY,n-i.prevX,a-i.prevY,e.lastIndex],drawHelper.getOptions()]),i.ismousedown=!1)},mousemove:function(t){var n=t.pageX-canvas.offsetLeft,a=t.pageY-canvas.offsetTop,i=this;i.ismousedown&&(tempContext.clearRect(0,0,innerWidth,innerHeight),drawHelper.pdf(tempContext,[e.lastPage,i.prevX,i.prevY,n-i.prevX,a-i.prevY,e.lastIndex]))},reset_pos:function(t,n){if(e.pdfPageContainer.style.top=n+"px",points[e.lastPointIndex]){var a=points[e.lastPointIndex][1];e.pdfPageContainer.style.left=a[1]+a[3]-parseInt(a[3]/2)-parseInt(e.pdfPageContainer.clientWidth/2)+"px"}},end:function(){}}})(),(()=>{var e={};if(params.icons)try{e=JSON.parse(params.icons)}catch(t){e={}}e.line,e.arrow,e.pencil,e.marker,e.dragSingle,e.dragMultiple,e.eraser,e.rectangle,e.arc,e.bezier,e.quadratic,e.text,e.image,e.pdf,e.zoom_in,e.zoom_out,e.lineWidth,e.colorsPicker,e.extraOptions,e.undo,e.pdf_next,e.pdf_prev,e.pdf_close})(),(()=>{var e={line:!0,arrow:!0,pencil:!0,marker:!0,dragSingle:!0,dragMultiple:!0,eraser:!0,rectangle:!0,arc:!0,bezier:!0,quadratic:!0,text:!0,image:!0,pdf:!0,zoom:!0,lineWidth:!0,colorsPicker:!0,extraOptions:!0,code:!0,undo:!0};if(params.tools)try{var t=JSON.parse(params.tools);e=t}catch(e){}function n(e,t){endLastPath(),i(),is.set(t);var n=document.getElementsByClassName("selected-shape")[0];n&&(n.className=n.className.replace(/selected-shape/g,"")),e.className||(e.className=""),e.className+=" selected-shape"}function a(){for(var e,t=document.getElementById("tool-box").getElementsByTagName("canvas"),a=window.selectedIcon.toLowerCase(),i=0;i<t.length;i++)e||-1===(t[i].id||"").indexOf(a)||(e=t[i]);e||(window.selectedIcon="Pencil",e=document.getElementById("pencil-icon")),n(e,window.selectedIcon)}function i(){var e=find("additional-container"),t=find("colors-container"),n=find("marker-container"),a=find("marker-fill-colors"),i=find("pencil-container"),o=find("pencil-fill-colors"),l=find("line-width-container");e.style.display=t.style.display=a.style.display=n.style.display=o.style.display=i.style.display=l.style.display="none"}!0===e.code&&(document.querySelector(".preview-panel").style.display="block"),is.set(window.selectedIcon),window.addEventListener("load",(function(){a()}),!1),function(){var t={},a=find("lineCap-select"),o=find("lineJoin-select");function l(e){var t=find(e).getContext("2d");return t.lineWidth=2,t.strokeStyle="#6c96c8",t}function r(e,a){"Pencil"!==a&&"Marker"!==a||(lineCap=lineJoin="round"),addEvent(e.canvas,"click",(function(){var e;textHandler.text.length&&textHandler.appendPoints(),"Text"===a?textHandler.onShapeSelected():textHandler.onShapeUnSelected(),"Pencil"!==a&&"Marker"!==a||(lineCap=lineJoin="round"),dragHelper.global.startingIndex=0,n(this,a),"drag-last-path"===this.id?(find("copy-last").checked=!0,find("copy-all").checked=!1):"drag-all-paths"===this.id&&(find("copy-all").checked=!0,find("copy-last").checked=!1),"image-icon"===this.id&&((e=new FileSelector).accept="image/*",e.selectSingleFile((function(e){if(e){var t=new FileReader;t.onload=function(e){var t=new Image;t.onload=function(){var e=imageHandler.images.length;imageHandler.lastImageURL=t.src,imageHandler.lastImageIndex=e,imageHandler.images.push(t),imageHandler.load(t.clientWidth,t.clientHeight)},t.style="position: absolute; top: -99999999999; left: -999999999;",document.body.appendChild(t),t.src=e.target.result},t.readAsDataURL(e)}}))),"pdf-icon"===this.id&&(e=new FileSelector).selectSingleFile((function(e){var t;e&&((t=new FileReader).onload=function(e){pdfHandler.pdf=null,pdfHandler.load(e.target.result)},t.readAsDataURL(e))}),null,"application/pdf"),"pencil-icon"===this.id||"eraser-icon"===this.id||"marker-icon"===this.id?(t.lineCap=lineCap,t.lineJoin=lineJoin,lineCap=lineJoin="round"):t.lineCap&&t.lineJoin&&(lineCap=t.lineCap,lineJoin=t.lineJoin),"eraser-icon"===this.id?(t.strokeStyle=strokeStyle,t.fillStyle=fillStyle,t.lineWidth=lineWidth,strokeStyle="White",fillStyle="White",lineWidth=10):t.strokeStyle&&t.fillStyle&&void 0!==t.lineWidth&&(strokeStyle=t.strokeStyle,fillStyle=t.fillStyle,lineWidth=t.lineWidth)}))}find("tool-box").style.height=innerHeight+"px",function(){var e=l("drag-last-path"),t=new Image;t.onload=function(){e.drawImage(t,4,4,32,32),r(e,"DragLastPath")},t.src=data_uris.dragSingle}(),!0===e.dragSingle&&(document.getElementById("drag-last-path").style.display="block"),function(){var e=l("drag-all-paths"),t=new Image;t.onload=function(){e.drawImage(t,4,4,32,32),r(e,"DragAllPaths")},t.src=data_uris.dragMultiple}(),!0===e.dragMultiple&&(document.getElementById("drag-all-paths").style.display="block"),!0===e.line&&(function(){var e=l("line"),t=new Image;t.onload=function(){e.drawImage(t,4,4,32,32),r(e,"Line")},t.src=data_uris.line}(),document.getElementById("line").style.display="block"),!0===e.undo&&(function(){var e=l("undo"),t=new Image;t.onload=function(){e.drawImage(t,4,4,32,32),document.querySelector("#undo").onclick=function(){points.length&&(points.length=points.length-1,drawHelper.redraw()),syncPoints(!0)}},t.src=data_uris.undo}(),document.getElementById("undo").style.display="block"),!0===e.arrow&&(function(){var e=l("arrow"),t=new Image;t.onload=function(){e.drawImage(t,4,4,32,32),r(e,"Arrow")},t.src=data_uris.arrow}(),document.getElementById("arrow").style.display="block"),!0===e.zoom&&(function(){var e=l("zoom-up");addEvent(e.canvas,"click",(function(){zoomHandler.up()}));var t=new Image;t.onload=function(){e.drawImage(t,4,4,32,32)},t.src=data_uris.zoom_in}(),function(){var e=l("zoom-down");addEvent(e.canvas,"click",(function(){zoomHandler.down()}));var t=new Image;t.onload=function(){e.drawImage(t,4,4,32,32)},t.src=data_uris.zoom_out}(),document.getElementById("zoom-up").style.display="block",document.getElementById("zoom-down").style.display="block"),!0===e.pencil&&(function(){function e(e,t){return"rgba("+hexToRGB(e).join(",")+",1)"}var t=l("pencil-icon"),n=new Image;n.onload=function(){t.drawImage(n,4,4,32,32),r(t,"Pencil")},n.src=data_uris.pencil;var a=find("pencil-container"),o=find("pencil-fill-colors"),s=find("pencil-stroke-style"),d=find("pencil-colors-list"),c=find("pencil-fill-style"),p=find("pencil-selected-color"),u=find("pencil-selected-color-2"),f=find("pencil-done"),g=t.canvas;pencilStrokeStyle=e(c.value),p.style.backgroundColor=u.style.backgroundColor="#"+c.value,[["FFFFFF","006600","000099","CC0000","8C4600"],["CCCCCC","00CC00","6633CC","FF0000","B28500"],["666666","66FFB2","006DD9","FF7373","FF9933"],["333333","26FF26","6699FF","CC33FF","FFCC99"],["000000","CCFF99","BFDFFF","FFBFBF","FFFF33"]].forEach((function(e){var t="<tr>";e.forEach((function(e){t+='<td style="background-color:#'+e+'" data-color="'+e+'"></td>'})),t+="</tr>",d.innerHTML+=t})),Array.prototype.slice.call(d.getElementsByTagName("td")).forEach((function(e){addEvent(e,"mouseover",(function(){var t=e.getAttribute("data-color");u.style.backgroundColor="#"+t,c.value=t})),addEvent(e,"click",(function(){var t=e.getAttribute("data-color");p.style.backgroundColor=u.style.backgroundColor="#"+t,c.value=t,o.style.display="none"}))})),addEvent(g,"click",(function(){i(),a.style.display="block",a.style.top=g.offsetTop+1+"px",a.style.left=g.offsetLeft+g.clientWidth+"px",c.focus()})),addEvent(f,"click",(function(){a.style.display="none",o.style.display="none",pencilLineWidth=s.value,pencilStrokeStyle=e(c.value)})),addEvent(p,"click",(function(){o.style.display="block"}))}(),document.getElementById("pencil-icon").style.display="block"),!0===e.marker&&(function(){function e(e,t){return"rgba("+hexToRGB(e).join(",")+","+t+")"}var t=l("marker-icon"),n=new Image;n.onload=function(){t.drawImage(n,4,4,32,32),r(t,"Marker")},n.src=data_uris.marker;var a=find("marker-container"),o=find("marker-fill-colors"),s=find("marker-stroke-style"),d=find("marker-colors-list"),c=find("marker-fill-style"),p=find("marker-selected-color"),u=find("marker-selected-color-2"),f=find("marker-done"),g=t.canvas;markerStrokeStyle=e(c.value,.2),p.style.backgroundColor=u.style.backgroundColor="#"+c.value,[["FFFFFF","006600","000099","CC0000","8C4600"],["CCCCCC","00CC00","6633CC","FF0000","B28500"],["666666","66FFB2","006DD9","FF7373","FF9933"],["333333","26FF26","6699FF","CC33FF","FFCC99"],["000000","CCFF99","BFDFFF","FFBFBF","FFFF33"]].forEach((function(e){var t="<tr>";e.forEach((function(e){t+='<td style="background-color:#'+e+'" data-color="'+e+'"></td>'})),t+="</tr>",d.innerHTML+=t})),Array.prototype.slice.call(d.getElementsByTagName("td")).forEach((function(e){addEvent(e,"mouseover",(function(){var t=e.getAttribute("data-color");u.style.backgroundColor="#"+t,c.value=t})),addEvent(e,"click",(function(){var t=e.getAttribute("data-color");p.style.backgroundColor=u.style.backgroundColor="#"+t,c.value=t,o.style.display="none"}))})),addEvent(g,"click",(function(){i(),a.style.display="block",a.style.top=g.offsetTop+1+"px",a.style.left=g.offsetLeft+g.clientWidth+"px",c.focus()})),addEvent(f,"click",(function(){a.style.display="none",o.style.display="none",markerLineWidth=s.value,markerStrokeStyle=e(c.value,.2)})),addEvent(p,"click",(function(){o.style.display="block"}))}(),document.getElementById("marker-icon").style.display="block"),!0===e.eraser&&(function(){var e=l("eraser-icon"),t=new Image;t.onload=function(){e.drawImage(t,4,4,32,32),r(e,"Eraser")},t.src=data_uris.eraser}(),document.getElementById("eraser-icon").style.display="block"),!0===e.text&&(function(){var e=l("text-icon"),t=new Image;t.onload=function(){e.drawImage(t,4,4,32,32),r(e,"Text")},t.src=data_uris.text}(),document.getElementById("text-icon").style.display="block"),!0===e.image&&(function(){var e=l("image-icon"),t=new Image;t.onload=function(){e.drawImage(t,4,4,32,32),r(e,"Image")},t.src=data_uris.image}(),document.getElementById("image-icon").style.display="block"),!0===e.pdf&&(function(){var e=l("pdf-icon"),t=new Image;t.onload=function(){e.drawImage(t,4,4,32,32),r(e,"Pdf")},t.src=data_uris.pdf}(),document.getElementById("pdf-icon").style.display="block"),!0===e.arc&&(function(){var e=l("arc"),t=new Image;t.onload=function(){e.drawImage(t,4,4,32,32),r(e,"Arc")},t.src=data_uris.arc}(),document.getElementById("arc").style.display="block"),!0===e.rectangle&&(function(){var e=l("rectangle"),t=new Image;t.onload=function(){e.drawImage(t,4,4,32,32),r(e,"Rectangle")},t.src=data_uris.rectangle}(),document.getElementById("rectangle").style.display="block"),!0===e.quadratic&&(function(){var e=l("quadratic-curve"),t=new Image;t.onload=function(){e.drawImage(t,4,4,32,32),r(e,"QuadraticCurve")},t.src=data_uris.quadratic}(),document.getElementById("quadratic-curve").style.display="block"),!0===e.bezier&&(function(){var e=l("bezier-curve"),t=new Image;t.onload=function(){e.drawImage(t,4,4,32,32),r(e,"Bezier")},t.src=data_uris.bezier}(),document.getElementById("bezier-curve").style.display="block"),!0===e.lineWidth&&(function(){var e=l("line-width"),t=new Image;t.onload=function(){e.drawImage(t,4,4,32,32)},t.src=data_uris.lineWidth;var n=find("line-width-container"),a=find("line-width-text"),o=find("line-width-done"),r=(document.getElementsByTagName("h1")[0],e.canvas);addEvent(r,"click",(function(){i(),n.style.display="block",n.style.top=r.offsetTop+1+"px",n.style.left=r.offsetLeft+r.clientWidth+"px",a.focus()})),addEvent(o,"click",(function(){n.style.display="none",lineWidth=a.value}))}(),document.getElementById("line-width").style.display="block"),!0===e.colorsPicker&&(function(){var e=l("colors"),t=new Image;t.onload=function(){e.drawImage(t,4,4,32,32)},t.src=data_uris.colorsPicker;var n=find("colors-container"),a=find("stroke-style"),o=find("fill-style"),r=find("colors-done"),s=(document.getElementsByTagName("h1")[0],e.canvas);addEvent(s,"click",(function(){i(),n.style.display="block",n.style.top=s.offsetTop+1+"px",n.style.left=s.offsetLeft+s.clientWidth+"px",a.focus()})),addEvent(r,"click",(function(){n.style.display="none",strokeStyle=a.value,fillStyle=o.value}))}(),document.getElementById("colors").style.display="block"),!0===e.extraOptions&&(function(){var e=l("additional"),t=new Image;t.onload=function(){e.drawImage(t,4,4,32,32)},t.src=data_uris.extraOptions;var n=find("additional-container"),r=find("additional-close"),s=(document.getElementsByTagName("h1")[0],e.canvas),d=find("globalAlpha-select"),c=find("globalCompositeOperation-select");addEvent(s,"click",(function(){i(),n.style.display="block",n.style.top=s.offsetTop+1+"px",n.style.left=s.offsetLeft+s.clientWidth+"px"})),addEvent(r,"click",(function(){n.style.display="none",globalAlpha=d.value,globalCompositeOperation=c.value,lineCap=a.value,lineJoin=o.value}))}(),document.getElementById("additional").style.display="block");var s=find("design-preview"),d=find("code-preview");function c(){u.parentNode.style.display="none",f.style.display="none",i(),endLastPath()}function p(){u.parentNode.style.display="block",f.style.display="block",u.focus(),common.updateTextArea(),u.style.width=innerWidth-f.clientWidth-30+"px",u.style.height=innerHeight-40+"px",u.style.marginLeft=f.clientWidth+"px",f.style.height=innerHeight+"px",i(),endLastPath()}window.selectBtn=function(e,t){d.className=s.className="",e==s?s.className="preview-selected":d.className="preview-selected",!t&&window.connection&&connection.numberOfConnectedUsers>=1?connection.send({btnSelected:e.id}):e==s?c():p()},addEvent(s,"click",(function(){selectBtn(s),c()})),addEvent(d,"click",(function(){selectBtn(d),p()}));var u=find("code-text"),f=find("options-container"),g=find("is-absolute-points"),m=find("is-shorten-code");addEvent(m,"change",common.updateTextArea),addEvent(g,"change",common.updateTextArea)}()})(),(()=>{var e,t=tempContext.canvas,n="createTouch"in document||"ontouchstart"in window;function a(e){e&&("function"==typeof e.preventDefault&&e.preventDefault(),"function"==typeof e.stopPropagation&&e.stopPropagation())}function i(e,t){var n=!1,a=e.srcElement||e.target;return(n=("INPUT"!==a.tagName.toUpperCase()||"TEXT"!==a.type.toUpperCase()&&"PASSWORD"!==a.type.toUpperCase()&&"FILE"!==a.type.toUpperCase()&&"SEARCH"!==a.type.toUpperCase()&&"EMAIL"!==a.type.toUpperCase()&&"NUMBER"!==a.type.toUpperCase()&&"DATE"!==a.type.toUpperCase())&&"TEXTAREA"!==a.tagName.toUpperCase()||a.readOnly||a.disabled)&&e.preventDefault(),n}addEvent(t,n?"touchstart mousedown":"mousedown",(function(e){n&&(e=e.pageX?e:e.touches.length?e.touches[0]:{pageX:0,pageY:0});var t=is;t.isLine?lineHandler.mousedown(e):t.isArc?arcHandler.mousedown(e):t.isRectangle?rectHandler.mousedown(e):t.isQuadraticCurve?quadraticHandler.mousedown(e):t.isBezierCurve?bezierHandler.mousedown(e):t.isDragLastPath||t.isDragAllPaths?dragHelper.mousedown(e):t.isPencil?pencilHandler.mousedown(e):t.isEraser?eraserHandler.mousedown(e):t.isText?textHandler.mousedown(e):t.isImage?imageHandler.mousedown(e):t.isPdf?pdfHandler.mousedown(e):t.isArrow?arrowHandler.mousedown(e):t.isMarker&&markerHandler.mousedown(e),!t.isPdf&&drawHelper.redraw(),a(e)})),addEvent(t,n?"touchend touchcancel mouseup":"mouseup",(function(e){!n||e&&"pageX"in e||(e=e&&e.touches&&e.touches.length?e.touches[0]:e&&e.changedTouches&&e.changedTouches.length?e.changedTouches[0]:{pageX:0,pageY:0});var t=is;t.isLine?lineHandler.mouseup(e):t.isArc?arcHandler.mouseup(e):t.isRectangle?rectHandler.mouseup(e):t.isQuadraticCurve?quadraticHandler.mouseup(e):t.isBezierCurve?bezierHandler.mouseup(e):t.isDragLastPath||t.isDragAllPaths?dragHelper.mouseup(e):t.isPencil?pencilHandler.mouseup(e):t.isEraser?eraserHandler.mouseup(e):t.isText?textHandler.mouseup(e):t.isImage?imageHandler.mouseup(e):t.isPdf?pdfHandler.mousedown(e):t.isArrow?arrowHandler.mouseup(e):t.isMarker&&markerHandler.mouseup(e),!t.isPdf&&drawHelper.redraw(),syncPoints(!(!is.isDragAllPaths&&!is.isDragLastPath)),a(e)})),addEvent(t,n?"touchmove mousemove":"mousemove",(function(e){n&&(e=e.pageX?e:e.touches.length?e.touches[0]:{pageX:0,pageY:0});var t=is;t.isLine?lineHandler.mousemove(e):t.isArc?arcHandler.mousemove(e):t.isRectangle?rectHandler.mousemove(e):t.isQuadraticCurve?quadraticHandler.mousemove(e):t.isBezierCurve?bezierHandler.mousemove(e):t.isDragLastPath||t.isDragAllPaths?dragHelper.mousemove(e):t.isPencil?pencilHandler.mousemove(e):t.isEraser?eraserHandler.mousemove(e):t.isText?textHandler.mousemove(e):t.isImage?imageHandler.mousemove(e):t.isPdf?pdfHandler.mousedown(e):t.isArrow?arrowHandler.mousemove(e):t.isMarker&&markerHandler.mousemove(e),a(e)})),addEvent(document,"keydown",(function(t){8!=(e=t.which||t.keyCode||0)&&46!=e?(t.metaKey&&(isControlKeyPressed=!0,e=17),isControlKeyPressed||17!==e||(isControlKeyPressed=!0)):i(t)})),addEvent(document,"keyup",(function(t){null!=t.which||null==t.charCode&&null==t.keyCode||(t.which=null!=t.charCode?t.charCode:t.keyCode),13===(e=t.which||t.keyCode||0)&&is.isText||(8!=e&&46!=e?isControlKeyPressed&&84===e&&is.isText?textHandler.showTextTools():(isControlKeyPressed&&90===e&&points.length&&(points.length=points.length-1,drawHelper.redraw(),syncPoints(!(!is.isDragAllPaths&&!is.isDragLastPath))),isControlKeyPressed&&65===e&&(dragHelper.global.startingIndex=0,endLastPath(),setSelection(find("drag-all-paths"),"DragAllPaths")),isControlKeyPressed&&67===e&&points.length&&copy(),isControlKeyPressed&&86===e&&copiedStuff.length&&(paste(),syncPoints(!(!is.isDragAllPaths&&!is.isDragLastPath))),void 0!==t.metaKey&&!1===t.metaKey&&(isControlKeyPressed=!1,e=17),17===e&&(isControlKeyPressed=!1)):i(t))})),addEvent(document,"keypress",(function(t){null!=t.which||null==t.charCode&&null==t.keyCode||(t.which=null!=t.charCode?t.charCode:t.keyCode),e=t.which||t.keyCode||0;var n=String.fromCharCode(e);/[a-zA-Z0-9-_ !?|\/'",.=:;(){}\[\]`~@#$%^&*+-]/.test(n)})),addEvent(document,"paste",(function(e){var t;is.isText&&(window.clipboardData&&window.clipboardData.getData?t=window.clipboardData.getData("Text"):e.clipboardData&&e.clipboardData.getData&&(t=e.clipboardData.getData("text/plain")),t&&t.length&&textHandler.writeText(t))}))})(),(()=>{var e,t=0;function n(n){if(n&&(t=0),t!=points.length){for(var a,i=[],o=t;o<points.length;o++)i[o-t]=points[o];i.length&&(a={points:i||[],startIndex:t},window.parent.postMessage({canvasDesignerSyncData:a,uid:e},"*")),!i.length&&points.length||(t=points.length)}}window.addEventListener("message",(function(a){if(a.data)if(e||(e=a.data.uid),a.data.captureStream)webrtcHandler.createOffer((function(t){t.uid=e,window.parent.postMessage(t,"*")}));else if(a.data.renderStream)setTemporaryLine();else if(a.data.sdp)webrtcHandler.setRemoteDescription(a.data);else if(a.data.genDataURL){var i=context.canvas.toDataURL(a.data.format,1);window.parent.postMessage({dataURL:i,uid:e},"*")}else if(a.data.undo&&points.length){var o=a.data.index;if(a.data.tool){for(var l=[],r=points.length,s=points.reverse(),d=0;d<r;d++)(c=s[d])[0]!==a.data.tool&&l.push(c);return points=l.reverse(),drawHelper.redraw(),void n(!0)}if("all"===o)return points=[],drawHelper.redraw(),void n(!0);if(o.numberOfLastShapes){try{points.length-=o.numberOfLastShapes}catch(e){points=[]}return drawHelper.redraw(),void n(!0)}if(-1===o){if(points.length&&("pencil"===points[points.length-1][0]||"marker"===points[points.length-1][0])){for(l=[],r=points.length,d=0;d<r;d++){var c;"start"===(c=points[d])[3]&&(o=d)}var p=[];for(d=0;d<o;d++)p.push(points[d]);return points=p,drawHelper.redraw(),void n(!0)}return points.length=points.length-1,drawHelper.redraw(),void n(!0)}if(points[o]){var u=[];for(d=0;d<points.length;d++)d!==o&&u.push(points[d]);points=u,drawHelper.redraw(),n(!0)}}else if(a.data.syncPoints)n(!0);else{if(a.data.clearCanvas)return points=[],void drawHelper.redraw();if(a.data.canvasDesignerSyncData){var f=a.data.canvasDesignerSyncData;if(0!==f.startIndex)for(d=0;d<f.points.length;d++)points[d+f.startIndex]=f.points[d];else points=f.points;t=points.length,drawHelper.redraw()}}}),!1)})();