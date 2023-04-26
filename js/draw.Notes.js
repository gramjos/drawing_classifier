const draw={}; 

draw.path=(ctx, path, color="black")=>{
    ctx.strokeStyle=color;
    ctx.lineWidth=3;
        /*
        beginPath() method begins a path, or resets the current path.
            Use moveTo(), lineTo(), quadricCurveTo(), bezierCurveTo(), 
                arcTo(), and arc(), to create paths.
            Use the stroke() method to actually draw the path on the canvas.
        */
    ctx.beginPath();// 1. initialize 
    // ... unpacking array operator b/c moveTo requires two paramters
    // move cursor to starting point (w/o creating a line)
    ctx.moveTo(...path[0]);   // 2. starting mark
    for ( let i=1 ; i<path.length; i++ ){
        // lineTo() creates a straight, direct line connection from the 
        // previous marked point
        ctx.lineTo(...path[i]); // 3. mark
    }
    ctx.lineCap="round";
    ctx.lineJoin="round";
    ctx.stroke();  // perform(fill in) the specified draw
}

draw.paths=(ctx, paths, color="black")=>{
    for(const path of paths){
        draw.path(ctx,path,color); 
    }
}