// -------------------
//  Parameters and UI
// -------------------

const gui = new dat.GUI()
const params = {
    Ellipse_Size: 30,
    Vitesse : 0,
    Download_Image: () => save(),
    Nombre : 0,
}
gui.add(params, "Download_Image")
gui.add(params, "Vitesse",1,15,1)
gui.add(params, "Nombre",0,30,1)
let img

// -------------------
//       Drawing
// -------------------

function draw() {
    if (img)
        image(img, 0, 0, width, height)
        //Function we used to download all the images generated
        //p6_SaveImageSequence(50, "png")
}

// -------------------
//    Initialization
// -------------------

function setup() {
    p6_CreateCanvas()
    const model = new rw.HostedModel({
        url: "https://stylegan-9d4f8d9c.hosted-models.runwayml.cloud/v1/",
        token: "8qc1au2OaebjTFSjwL6QLg==",
      });

    for (let i = 0; i<50; ++i){
      const z = []
      for (let i = 0; i<512; i++){
          z[i] = random(-0.5,0.5);
      }
      const inputs = {
        "z": z,
        "truncation": 0.8,
      };
      model.query(inputs).then(outputs => {
        const { image } = outputs;
        img = createImg(image)
      });
  }
}

function windowResized() {
    p6_ResizeCanvas()
}