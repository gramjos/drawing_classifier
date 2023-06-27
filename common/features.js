const features={};

features.getPathCount=(paths)=>{
    return paths.length;
}

features.getPointCount=(paths)=>{
    // paths is a 2d array so flatten to 1d
    const points=paths.flat();
    return points.length; 
}

if(typeof module!=='undefined'){
    module.exports=features;
}