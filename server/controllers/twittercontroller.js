import { TwitterApi } from 'twitter-api-v2';
import cron from 'node-cron';
import Complaint from '../models/Complaint.js';
import dotenv from 'dotenv';
dotenv.config();

const client = new TwitterApi({
  appKey: "ZWMbH6z6Sig4ILIT5QNccOMn4",
  appSecret:"EDowlGSHPDxMJYYEpdG27uCqnZS0WNhRmEadWEKCxItY0dwydC",
  accessToken: "1780088596264779776-AfGCx3ZIV2ZYUS6Xv52I2xfTzNHJRd",
  accessSecret: "S5ZOiiM4b5v6sVND8IUNTzjcziSNFbGM6yEkxFRcM80kR",
  bearerToken:"AAAAAAAAAAAAAAAAAAAAAM7ltQEAAAAADB8vYjznS5G2EYEbmYpktQKqyEY%3DCy6bthY91HwlVztAGFZofTFf5dQdUDMqEl6WaUQvgVfwK9cJHY"
});

const rwClient = client.readWrite;
const textTweet = async (text) => {
  try {
    await rwClient.v2.tweet(text);
    console.log("Tweet success");
  } catch (error) {
    console.error(error);
  }
};
async function convertToImage(base64String) {
  try {
    const response = await fetch(`data:image/jpeg;base64,${base64String}`);
    const blob = await response.blob();
    const mimeType = response.headers.get('content-type');
    return { data: URL.createObjectURL(blob), mimeType };
  } catch (error) {
    console.error('Error converting to image:', error);
    return null;
  }
}
const base64ToBuffer = (base64Data) => {
  const buffer = Buffer.from(base64Data, 'base64');
  return buffer;
};


const mediaTweet = async (text, image) => {
  try {
    const mediaId = await client.v1.uploadMedia(image, { type: 'image/jpeg' });
    await rwClient.v2.tweet({
      text: text,
      media: { media_ids: [mediaId] },
    });
    console.log("Tweet success");
  } catch (e) {
    console.error(e);
  }
};


export const startTwitterScheduler = () => {
  return cron.schedule('* * * * *', async () => {
    try {
      const complaints =await Complaint.find({
        resolved: false,
        //date: { $lte: new Date(new Date().setDate(new Date().getDate() - 7)) },
        posted: false
      });

      for (const complaint of complaints) {
        const tweetText = `
        \nProblem: ${complaint.problem}
        \nDepartment:${complaint.department}
        \nLocation: ${complaint.location}
        \nDescription:${complaint.description}
        \nDate:${complaint.date}
        \n@Sakthivignesh07
        \n@Rajesh07512678 `;
        const imageData = base64ToBuffer(complaint.image);
        await mediaTweet(tweetText, imageData);
        complaint.posted = true;
        await complaint.save();
      }


      console.log('Complaints processed successfully.');
    } catch (error) {
      console.error('Error processing complaints:', error);
    }
  });
};
