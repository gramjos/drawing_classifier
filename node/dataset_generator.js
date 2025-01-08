const draw=require('../common/draw.js')
const constants=require('../common/constants.js')
const utils=require('../common/utils.js')

const {createCanvas}=require('canvas'); 
const canvas=createCanvas(400,400);
const ctx=canvas.getContext('2d'); 

const fs=require('fs'); 

// just time stamped file names
const fileNames=fs.readdirSync(constants.RAW_DIR);
const samples=[];
let id=1; 
fileNames.forEach(fn=>{
    const content = fs.readFileSync(constants.RAW_DIR+"/"+fn); 
    // console.log(JSON.parse(content));  contains each users collected data. sample below
    // {
    //     session: 1683989263130,
    //     student: 'Colab',
    //     drawings: {
    //       car: [
    //         [Array], [Array], [Array],
    //         [Array], [Array], [Array],
    //         [Array], [Array], [Array],
    //         [Array], [Array], [Array],
    //         [Array], [Array], [Array],
    //         [Array], [Array], [Array]
    //       ],
    //       fish: [ [Array], [Array] ],
    //       house: [
    //         [Array], [Array],
    //         ...
    const {session,student,drawings}= JSON.parse(content); 
    for(let label in drawings){
        samples.push({
            id,
            label,
            student_name:student,
            student_id:session
        }); 

        const paths=drawings[label]; 
        // 
        fs.writeFileSync(constants.JSON_DIR+"/"+id+".json", JSON.stringify(paths)); 

        generateImageFile(constants.IMG_DIR+"/"+id+".png", paths); 

        // the max count is *8 b/c each has 8 drawings
        utils.printProgress(id, fileNames.length*8); 

        id++; 
    }
}); 

fs.writeFileSync(constants.SAMPLES, JSON.stringify(samples)); 

function generateImageFile(outFile,paths){
    // same canvas is used so it needs to be cleared
    ctx.clearRect(0,0, canvas.width,canvas.height);
 
    draw.paths(ctx,paths);
 
    const buffer=canvas.toBuffer("image/png");// create buffer of type
    fs.writeFileSync(outFile,buffer);//write buf to file
 }