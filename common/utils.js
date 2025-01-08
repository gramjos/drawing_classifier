const utils={};

utils.flaggedUsers=
   [1663882102141,1663900040545,1664485938220];

utils.styles={
    car:{color:'gray',text:'🚗'},
    fish:{color:'red',text:'🐠'},
    house:{color:'yellow',text:'🏠'},
    tree:{color:'green',text:'🌳'},
    bicycle:{color:'cyan',text:'🚲'},
    guitar:{color:'blue',text:'🎸'},
    pencil:{color:'magenta',text:'✏️'},
    clock:{color:'lightgray',text:'🕒'},
 };

utils.formatPercent=(n)=>{
    return (n*100).toFixed(2)+"%";
}

utils.printProgress=(count,max)=>{
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    const percent=utils.formatPercent( count/max ); 
    process.stdout.write(count+"/"+max+" ("+percent+")");
}

// a general groupBy function; grouping by student_id to view all drawings by same person
utils.groupBy=(objArray,key)=>{
    const groups={};
    for(let obj of objArray){
        const val=obj[key];
        if(groups[val]==null){
            groups[val]=[];
        }
        groups[val].push(obj);
    }
    return groups;
}

// d=√((x2 – x1)² + (y2 – y1)²
utils.distance=(p1,p2)=>{
   return Math.sqrt(
      (p1[0]-p2[0])**2+
      (p1[1]-p2[1])**2
   );
}

/* given a location a set of points,
    iterate through all of the points and store a current minimum distance in `minDist`
    */
utils.getNearest=(loc,points)=>{
   let minDist=Number.MAX_SAFE_INTEGER;
   let nearestIndex=0;

   for(let i=0;i<points.length;i++){
      const point=points[i];
      const d=utils.distance(loc,point);

      if(d<minDist){
         minDist=d;
         nearestIndex=i;
      }
   }
   return nearestIndex;
}

if (typeof module !== 'undefined'){
    module.exports=utils;
}