const constants=require('../common/constants.js');
const features=require('../common/features.js');

const fs=require('fs');

console.log("Executing Feature Extractor")
// samples can be linked to the drawing(paths) by the 'id'
// below is an excerpt from the samples.json
/*
  {
    "id": 4,
    "label": "tree",
    "student_name": "Radu",
    "student_id": 1663053145814
  },
*/
const samples=JSON.parse(
    fs.readFileSync(constants.SAMPLES)
);

for(const sample of samples){
    const paths=JSON.parse(
        fs.readFileSync(
            constants.JSON_DIR+"/"+sample.id+".json"
        )
    ); 
    // add two new attributes to the samples JSON object,
    // which are the features (get{Path,Point}Count)
    sample.point=[
        features.getPathCount(paths),
        features.getPointCount(paths)
    ]; 
}

const featureNames=["Path Count","Point Count"]; 

fs.writeFileSync(constants.FEATURES,
    JSON.stringify({
        featureNames,
        // remove un-necessary data. 
        samples:samples.map(s=>{
            return {
                point:s.point,
                label:s.label
            }; 
        })
    })
); 

// save a version with all the data.
fs.writeFileSync(constants.FEATURES_JS,
    `const features=
    ${JSON.stringify({featureNames, samples})}
    ;`
); 

console.log("DONE!")