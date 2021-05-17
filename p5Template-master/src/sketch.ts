// -------------------
//  Parameters and UI
// -------------------

const gui = new dat.GUI()
const params = {
    Ellipse_Size: 30,
    Download_Image: () => save(),
}
gui.add(params, "Download_Image")
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
        // Style GAN (nébuleuses)
        url: "https://stylegan-9d4f8d9c.hosted-models.runwayml.cloud/v1/",
        token: "8qc1au2OaebjTFSjwL6QLg==",
        
        // ReeffishGAN
        /*url: "https://reeffishgan-958f2802.hosted-models.runwayml.cloud/v1/",
        token: "6IaywDT1bxDYv9hOOzXiyA==",*/
        
        // CoralGAN
        /*url: "https://coralgan-e0d82ae2.hosted-models.runwayml.cloud/v1/",
        token: "SX7PZNGf1RquuGiYtqsUCg==",*/
        
        //Earth_Image_Simulator
        /*url: "https://earth-image-generator-4911471b.hosted-models.runwayml.cloud/v1/",
        token: "kH28KZpjsu25SlZQAK466g==",*/
        
        // Seascapes
        /*url: "https://seascapes-217d37c7.hosted-models.runwayml.cloud/v1/",
        token: "AR6xRpcZLrjyxjPA7bxGsg==",*/
        
        //BigGAN
        /*url: "https://biggan-296ffb3e.hosted-models.runwayml.cloud/v1/",
        token: "+p4wo2Qdk9YlHw+Po03Tfw==",*/
      });

    for (let i = 0; i<200; ++i){
      const z = []
      for (let i = 0; i<512; i++){
          z[i] = random(-0.5,0.5);
      }
      const inputs = {
        "z": z,
        "truncation": 0.8,
      };
      model.query(inputs).then(outputs => {
        const { image } = outputs; //remplacer image par generated_output pour biggan
        img = createImg(image)
      });
  }
}

function windowResized() {
    p6_ResizeCanvas()
}
