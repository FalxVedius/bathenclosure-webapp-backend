const { stringify } = require('querystring');
const client = require('../config/openaiConfig');
const fs = require('fs');

const generateAnswer = async (req, res) => {

  function encodeImage(filePath) {
  return fs.readFileSync(filePath, "base64");
}
  //Sets up the Variables to pass the AI the Message
  let currentPath = "a";


  currentPath = req.body.systemImg;
  let systemImg = encodeImage(currentPath);

  currentPath = req.body.hingeImg;
  let hingeImg = encodeImage(currentPath);

  currentPath = req.body.slidingImg;
  let slidingImg = encodeImage(currentPath);

  currentPath = req.body.barnDoorImg;
  let barnDoorImg = encodeImage(currentPath);

  currentPath = req.body.hingeImg;
  let bypassImg = encodeImage(currentPath);

  currentPath = req.body.handleImg;
  let handleImg = encodeImage(currentPath);

  currentPath = req.body.bracketImg;
  let bracketImg = encodeImage(currentPath);

  currentPath = req.body.glassImg;
  let glassImg = encodeImage(currentPath);

  currentPath = req.body.hardwareFinishImg;
  let finishImg = encodeImage(currentPath);

  let prompt = "Default";

  let image = req.body.image;

  let base64Image1 = image;
  let imageIndex = req.body.imageIndex;

  let response = "Default";

  //Adjust if it is a sliding door to remove Door Hinge
  if(req.body.system == "Sliding")
  {
    if(req.body.sliding == "Barn Door")
    {
        let system = "a " + req.body.system + " shower enclosure system ";
        let sliding = "a " + req.body.sliding + " door design based on the 2nd image, ";
        let barnDoor = "a " + req.body.barnDoor + " frame design based on the 3rd image, ";
        let handle = "a " + req.body.handle + " handle based on the 4th image, ";
        let bracket = "a " + req.body.bracket + " clamp and bracket design based on the 5th image, ";
        let glass = "with " + req.body.glass + " glass based on the 6th image, ";
        let finish = "and the hardware with a " + req.body.finish + " finish based on the 7th image.";

        prompt = "Edit the 1st image to use " + system + sliding + barnDoor + handle + bracket + glass + finish + " Do not add any new hardware not requested.";
        console.log(prompt);

        //Message Sent off to the AI - FOR NOW not sending system and glass Image as it confuses the AI
        response = await client.responses.create({
          model: "gpt-5.6-luna",
          input: [
            {
              role: "user",
              content: [
                { type: "input_text", text: prompt},
                {
                  type: "input_image",
                  image_url: `data:image/png;base64,${base64Image1}`,
                  detail: "auto",
                },
                {
                  type: "input_image",
                  image_url: `data:image/png;base64,${slidingImg}`,
                  detail: "auto",
                },
                {
                  type: "input_image",
                  image_url: `data:image/png;base64,${barnDoorImg}`,
                  detail: "auto",
                },
                {
                  type: "input_image",
                  image_url: `data:image/png;base64,${handleImg}`,
                  detail: "auto",
                },
                {
                  type: "input_image",
                  image_url: `data:image/png;base64,${bracketImg}`,
                  detail: "auto",
                },
                {
                  type: "input_image",
                  image_url: `data:image/png;base64,${glassImg}`,
                  detail: "auto",
                },
                {
                  type: "input_image",
                  image_url: `data:image/png;base64,${finishImg}`,
                  detail: "auto",
                },
              ],
            },
          ],
          tools: [{ type: "image_generation", action: "edit", quality: "low" }],
        });
    }
    else {

      let system = "a " + req.body.system + " shower enclosure system ";
      let sliding = "a " + req.body.sliding + " door design based on the 2ndimage, ";
      let bypass = "a " + req.body.bypass + " frame design based on the 3rd image, ";
      let handle = "a " + req.body.handle + " handle based on the 4th image, ";
      let bracket = "a " + req.body.bracket + " clamp and bracket design based on the 5th image, ";
      let glass = "with " + req.body.glass + " glass based on the 6th image, ";
      let finish = "and the hardware with a " + req.body.finish + " finish based on the 7th image.";

      prompt = "Edit the 1st image to use " + system + sliding + bypass + handle + bracket + glass + finish + " Do not add any new hardware not requested.";
      console.log(prompt);

            //Message Sent off to the AI - FOR NOW not sending system and glass Image as it confuses the AI
      response = await client.responses.create({
        model: "gpt-5.6-luna",
        input: [
          {
            role: "user",
            content: [
              { type: "input_text", text: prompt},
              {
                type: "input_image",
                image_url: `data:image/png;base64,${base64Image1}`,
                detail: "auto",
              },
              {
                type: "input_image",
                image_url: `data:image/png;base64,${slidingImg}`,
                detail: "auto",
              },
              {
                type: "input_image",
                image_url: `data:image/png;base64,${bypassImg}`,
                detail: "auto",
              },
              {
                type: "input_image",
                image_url: `data:image/png;base64,${handleImg}`,
                detail: "auto",
              },
              {
                type: "input_image",
                image_url: `data:image/png;base64,${bracketImg}`,
                detail: "auto",
              },
              {
                type: "input_image",
                image_url: `data:image/png;base64,${glassImg}`,
                detail: "auto",
              },
              {
                type: "input_image",
                image_url: `data:image/png;base64,${finishImg}`,
                detail: "auto",
              },
            ],
          },
        ],
        tools: [{ type: "image_generation", action: "edit", quality: "low" }],
      });
    }

  }
  else if(req.body.system == "Hinged")
  {

    let system = "a " + req.body.system + " shower enclosure system ";
    let hinge = "a " + req.body.hinge + " door hinge design based on the 2nd image, ";
    let handle = "a " + req.body.handle + " handle based on the 3rd image, ";
    let bracket = "a " + req.body.bracket + " clamp and bracket design based on the 4thh image, ";
    let glass = "with " + req.body.glass + " glass based on the 5th image, ";
    let finish = "and the hardware with a " + req.body.finish + " finish based on the 6th image.";

    prompt = "Edit the 1st image to use " + system + hinge + handle + bracket + glass + finish + " Do not add any new hardware not requested.";
    console.log(prompt);

        //Message Sent off to the AI - FOR NOW not sending system and glass Image as it confuses the AI
    response = await client.responses.create({
      model: "gpt-5.6-luna",
      input: [
        {
          role: "user",
          content: [
            { type: "input_text", text: prompt},
            {
              type: "input_image",
              image_url: `data:image/png;base64,${base64Image1}`,
              detail: "auto",
            },
            {
              type: "input_image",
              image_url: `data:image/png;base64,${hingeImg}`,
              detail: "auto",
            },
            {
              type: "input_image",
              image_url: `data:image/png;base64,${handleImg}`,
              detail: "auto",
            },
            {
              type: "input_image",
              image_url: `data:image/png;base64,${bracketImg}`,
              detail: "auto",
            },
            {
              type: "input_image",
              image_url: `data:image/png;base64,${glassImg}`,
              detail: "auto",
            },
            {
              type: "input_image",
              image_url: `data:image/png;base64,${finishImg}`,
              detail: "auto",
            },
          ],
        },
      ],
      tools: [{ type: "image_generation", action: "edit", quality: "low" }],
    });
  }
  else {

      let system = "a " + req.body.system + " shower enclosure system ";
      let bracket = "a " + req.body.bracket + " clamp and bracket design based on the 2nd image, ";
      let glass = "with " + req.body.glass + " glass based on the 3rd image, ";
      let finish = "and the hardware with a " + req.body.finish + " finish based on the 4th image.";

      prompt = "Edit the 1st image to use " + system + bracket + glass + finish + " Do not add any new hardware not requested.";
      console.log(prompt);

      response = await client.responses.create({
        model: "gpt-5.6-luna",
        input: [
          {
            role: "user",
            content: [
              { type: "input_text", text: prompt},
              {
                type: "input_image",
                image_url: `data:image/png;base64,${base64Image1}`,
                detail: "auto",
              },
              {
                type: "input_image",
                image_url: `data:image/png;base64,${bracketImg}`,
                detail: "auto",
              },
              {
                type: "input_image",
                image_url: `data:image/png;base64,${glassImg}`,
                detail: "auto",
              },
              {
                type: "input_image",
                image_url: `data:image/png;base64,${finishImg}`,
                detail: "auto",
              },
            ],
          },
        ],
        tools: [{ type: "image_generation", action: "edit", quality: "low" }],
      });
  }


  //Parse AI response
  let imageData = response.output
    .filter((output) => output.type === "image_generation_call")
    .map((output) => output.result);

  //Send back Finished Image and data to Server
  if (imageData.length > 0) {

    let imageBase64 = imageData[0];
    let ind = Math.floor(Math.random() * 10000);
    //fs.writeFileSync("public/FinishedExample" + ind.toString() + ".png", Buffer.from(imageBase64, "base64"))
    
    res.json({
      imgPath: imageBase64
    })

  } else {
    console.log(response.output_text);
  }
}
  
module.exports = { generateAnswer }