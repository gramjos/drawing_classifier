class SketchPad{
    constructor(container,size=400){
       this.canvas=document.createElement("canvas");
       this.canvas.width=size;
       this.canvas.height=size;
       this.canvas.style=`
          background-color:white;
          box-shadow: 0px 0px 10px 2px black;
       `;
       container.appendChild(this.canvas);
 
       const lineBreak=document.createElement("br");
       container.appendChild(lineBreak);
 
       this.undoBtn=document.createElement("button");
       this.undoBtn.innerHTML="UNDO";
       container.appendChild(this.undoBtn);
 
       this.ctx=this.canvas.getContext("2d");
 
       this.reset();
 
       this.#addEventListeners();
    }
 
    reset(){
       this.paths=[]; // 2D array
       this.isDrawing=false;
       this.#redraw();
    }
 
    #addEventListeners(){
       this.canvas.onmousedown=(evt)=>{
          const mouse=this.#getMouse(evt);
          this.paths.push([mouse]); // many paths make up a drawing
          this.isDrawing=true;
       }
       this.canvas.onmousemove=(evt)=>{
          if(this.isDrawing){
             const mouse=this.#getMouse(evt);
             const lastPath=this.paths[this.paths.length-1];
             lastPath.push(mouse);
             this.#redraw();
          }
       }
       document.onmouseup=()=>{ this.isDrawing=false; }
       // mobile touches 
       this.canvas.ontouchstart=(evt)=>{
          const loc=evt.touches[0]; // b/c multi touch is available on some devices 
          this.canvas.onmousedown(loc);
       }
       this.canvas.ontouchmove=(evt)=>{
          const loc=evt.touches[0];
          this.canvas.onmousemove(loc);
       }
       document.ontouchend=()=>{ document.onmouseup(); }
       // remove last drawn segment 
       this.undoBtn.onclick=()=>{
          this.paths.pop();
          this.#redraw();
       }
    }
 
    #redraw(){
       // clear the given context
       this.ctx.clearRect(0,0, this.canvas.width,this.canvas.height);
       // a general draw utility. Given a context -> draw these paths on the ctx
       draw.paths(this.ctx,this.paths);

       if(this.paths.length>0){ this.undoBtn.disabled=false; }
       else{ this.undoBtn.disabled=true; }
    }
 
    #getMouse=(evt)=>{
        // getting coordinates relative to the canvas
       const rect=this.canvas.getBoundingClientRect();
       return [
          Math.round(evt.clientX-rect.left), 
          Math.round(evt.clientY-rect.top)
       ];
    }
 }