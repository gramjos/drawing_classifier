const draw={};

draw.path=(ctx,path,color="black")=>{
   ctx.strokeStyle=color;
   ctx.lineWidth=3;
   ctx.beginPath();
   // move to the first point in the path.
   // NOTE `moveTo` takes 2 parameters. path[0] has an X,Y mouse
   //    coordinate in an array. Spread operator
   ctx.moveTo(...path[0]);
   for(let i=1;i<path.length;i++){ // starting at index 1 b/c we are already at 0th paths
      ctx.lineTo(...path[i]);
   }
   //for softer edges
   ctx.lineCap="round"; // segments 
   ctx.lineJoin="round"; // direction change
   ctx.stroke();
}

// drawing multiple paths
draw.paths=(ctx,paths,color="black")=>{
   for(const path of paths){
      draw.path(ctx,path,color);
   }
}

if(typeof module!=='undefined'){
   module.exports=draw;
}