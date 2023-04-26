class SketchPad {
    constructor(container, size=400){     // parameter = the div
        //The <canvas> element is only a container for graphics. 
        //You must use a script to actually draw the graphics.
        this.canvas=document.createElement("canvas");
        this.canvas.width=size;
        this.canvas.height=size;
        // a back tick is used to make a 'Template Literal' which is a 
        //  string that works on multiple lines
        this.canvas.style=`
            background-color:white;
            box-shadow: 0px 0px 10px 2px black;
        `;
        // "link myself to the page (the element we are attached to 
        // which is aprt of the page)"
        container.appendChild(this.canvas);
        // mouse location
        /*
        "2d" parameter creates at CanvasRenderingContext2D object
        The CanvasRenderingContext2D interface, part of the Canvas API, provides 
        the 2D rendering context for the drawing surface of a <canvas> element. It 
        is used for drawing shapes, text, images, and other objects.
        */
        this.ctx=this.canvas.getContext("2d");

        this.paths=[]; // contains the segments that comprise a drawing
        this.isDrawing=false; 

        // # signifies private method
        this.#addEventListeners(); // status checking on a continual loop 
    }

    // Add an event listener that fires when a user left clicks
    #addEventListeners(){
        // mark and store first point then turn drawing flag
        this.canvas.onmousedown=(evt)=>{
            const mouse=this.#getMouse(evt); 
            this.paths.push([mouse]); 
            this.isDrawing=true;  
        }
        // waiting for drawing flag to be flipped...
        // continual segmenting as the mouse trace is recognized
        // 
        this.canvas.onmousemove=(evt)=>{
            if(this.isDrawing){
                const mouse=this.#getMouse(evt); 
                const lastPath=this.paths[this.paths.length-1]
                lastPath.push(mouse); 
                this.#redraw(); // each call to redraw reset
            }
        }
        // turning flag on release left click
        this.canvas.onmouseup=()=>{
            this.isDrawing=false; 
        }
    }

    #redraw(){
        // context.clearRect(x,y,width,height); dimension of space to be cleared
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
        // external utility to perform draw
        draw.paths(this.ctx, this.paths); 
    }

    #getMouse=(evt)=>{
        /*
        The getBoundingClientRect() method returns:
            - the size of an element and its position relative to the viewport.
            - a DOMRect object with eight properties: 
                left, top, right, bottom, x, y, width, height.
            scrolling changes these values every time
        */
        const rect=this.canvas.getBoundingClientRect();
        return [
            Math.round(evt.clientX-rect.left),
            Math.round(evt.clientY-rect.top)
        ]; 
    }

}