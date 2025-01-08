class SketchPad{
    constructor(container,onUpdate=null,size=400){
        this.canvas = document.createElement('canvas');
        this.canvas.width = size;
        this.canvas.height = size;
        this.canvas.style=`
            background-color:white;
            box-shadow: 0px 0px 10px 2px black;
        `
        // add to DOM node
        container.appendChild(this.canvas);
        const lineBreak = document.createElement('br');
        container.appendChild(lineBreak);

        this.undoBtn = document.createElement('button');
        this.undoBtn.innerHTML = 'Undo';
        container.appendChild(this.undoBtn);

        this.ctx = this.canvas.getContext('2d');

        this.onUpdate=onUpdate;
        this.reset();

        this.#addEventListeners();

    }

    reset(){
        this.paths=[]; // 2D
        this.isDrawing = false; // a helpful class attribute 
        this.#redraw(); // for the initial state of the undo button
    }

    #addEventListeners(){
        this.canvas.onmousedown = (evt)=>{
            // to start drawing when we just click on the canvas
            // with mouse we create an array with the mouse coordinates
            const mouse = this.#getMouse(evt);
            this.paths.push([mouse]);
            this.isDrawing = true; // a helpful class attribute 
        }
        this.canvas.onmousemove = (evt)=>{
            if (this.isDrawing){
                const mouse = this.#getMouse(evt);
                const lastPath=this.paths[this.paths.length-1];
                lastPath.push(mouse);
                this.#redraw(); 
            }
        }
        // document instead of canvas to stop drawing when mouse leaves the canvas
        document.onmouseup = ()=>{ this.isDrawing = false; }
        // this.canvas.onmouseup = ()=>{ this.isDrawing = false; }

        // touch events
        this.canvas.ontouchstart=(evt)=>{
            const loc=evt.touches[0]; // get the first touch b/c multi-touch is a thing...
            this.canvas.onmousedown(loc); 
        }
        this.canvas.ontouchmove=(evt)=>{
            const loc=evt.touches[0]; 
            this.canvas.onmousemove(loc);   
        }
        // this.canvas.ontouchend=()=>{
        // just like for 'onmouseup' ends drawings outside of canvas
        document.ontouchend=()=>{
            this.canvas.onmouseup();   
        }
        this.undoBtn.onclick=()=>{
            this.paths.pop();
            this.#redraw();
        }
    }
    
    #redraw(){
        // start by clearing th canvas from top left to bottom right
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
        // the draw utility object performs the drawing
        draw.paths(this.ctx,this.paths);
        // when the 2d paths is empty undo doesn't make sense
        if(this.paths.length>0){ this.undoBtn.disabled=false; }
        else{ this.undoBtn.disabled=true;  }
        this.triggerUpdate();
    }
    triggerUpdate(){
        if(this.onUpdate){ this.onUpdate(this.paths); }
    }

    
    #getMouse=(evt)=>{
        //get this dimensions of the canvas
        const rect=this.canvas.getBoundingClientRect(); 
        return [ // get mouse coordinate relative this canvas position
            Math.round(evt.clientX - rect.left),
            Math.round(evt.clientY - rect.top),
        ]
    }
}