// initialize the obj
const draw = {}; 

draw.path=(ctx,path,color='black')=>{
    ctx.strokeStyle = color;
    ctx.lineWidth = 3; 
    ctx.beginPath(); 
    ctx.moveTo(...path[0]); // begin a new sub-path with the spread operator
    for(let i=1;i<path.length;i++){
        ctx.lineTo(...path[i]); // add a straight line to the current sub-path
    }
    ctx.lineCap  = 'round';
    ctx.lineJoin = 'round'; // when mouse changes direction have soft edges
    ctx.stroke(); // apply 
}

draw.paths=(ctx,paths,color='black')=>{
    paths.forEach(path=>draw.path(ctx,path,color));
}

if(typeof module !== 'undefined'){
    module.exports = draw;
}