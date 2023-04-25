class SketchPad {
    constructor(container, size=400){     // parameter, the div
        this.canvas=document.createElement("canvas");
        this.canvas.width=size;
        this.canvas.height=size;
        // a back tick is used to make a 'Template Literal' which is a string that works
        // on multiple lines
        this.canvas.style=`
            background-color:white;
            box-shadow: 0px 0px 10px 2px black;
        `;
        // "link myself to the page (the element we are attached to)"
        container.appendChild(this.canvas);
        // mouse location
        /*
        "2d" parameter creates at CanvasRenderingContext2D object
        The CanvasRenderingContext2D interface, part of the Canvas API, provides 
        the 2D rendering context for the drawing surface of a <canvas> element. It 
        is used for drawing shapes, text, images, and other objects.
        */
        this.ctx=this.canvas.getContext("2d");

        this.path=[]; 
        this.isDrawing=false; 

        // # signifies private method
        this.#addEventListeners(); 
    }

    // Add an event listener that fires when a user clicks
    #addEventListeners(){
        this.canvas.onmousedown=(evt)=>{
            const mouse=this.#getMouse(evt); 
            this.path=[mouse]; 
            this.isDrawing=true;  
        }

        this.canvas.onmousemove=(evt)=>{
            if(this.isDrawing){
                const mouse=this.#getMouse(evt); 
                this.path.push(mouse); 
                this.#redraw(); 
            }
        }
        this.canvas.onmouseup=()=>{
            this.isDrawing=false; 
        }
    }

    #redraw(){
        this.ctx.clearRect(0,0,
            this,this.canvas.width,this.canvas.height);
        draw.path(this.ctx, this.path); 
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
        ]
    }

}