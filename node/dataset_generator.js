const draw=require('../common/draw'); 

const {createCanvas}=require('canvas');
const canvas=createCanvas(400,400);
const ctx=canvas.getContext('2d');

const constants={}; 

constants.DATA_DIR="/Users/g_joss/Documents/Computation/projects/drawing_classifier/data"; 
constants.RAW_DIR=constants.DATA_DIR+"/raw/"; 
constants.DATASET_DIR=constants.DATA_DIR+"/dataset"; 
constants.JSON_DIR=constants.DATASET_DIR+"/json";
constants.IMG_DIR=constants.DATASET_DIR+"/img";
constants.SAMPLES=constants.DATASET_DIR+"/samples.json";

//use the file system
const fs=require('fs');

const fileNames=fs.readdirSync(constants.RAW_DIR); 
// meta data about samples
const samples=[];
//for samples
let id=1; 
fileNames.forEach(fn=>{
    // content is a string of characters that contains the contents of 
    // of filename (fn)
    const content=fs.readFileSync( constants.RAW_DIR+"/"+fn); 
    // from this string extract data by first parsing the string into
    // json then using the destructuring assignment 
    const {session,student,drawings}=JSON.parse(content);

    // There is a sample for each drawing.
    // the label is what the drawing was
    for(let label in drawings){
        // 
        samples.push({
            id,
            label,
            student_name:student,
            student_id:session 
        }); 
        const paths= drawings[label]; 
        fs.writeFileSync(constants.JSON_DIR+"/"+id+".json", JSON.stringify(paths)); 
        generateImageFile(constants.IMG_DIR+"/"+id+".png",paths); 
        id++; 
    }
}); 

// writing the smaples as a json stringified version of this array
fs.writeFileSync(constants.SAMPLES, JSON.stringify(samples)); 

function generateImageFile(outFile,paths){
    ctx.clearRect(0,0,canvas.width,canvas.height); 
    draw.paths(ctx,paths); 

    const buffer=canvas.toBuffer("image/png");
    fs.writeFileSync(outFile, buffer); 
}