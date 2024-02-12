// pages/api/[id].js
import axios from 'axios';

export default async function handler(req, res) {
  // Extract id from the request query
  const { id } = req.query;

  // Define the Instagram API URL
  const API_URL = "https://www.instagram.com/api/graphql";

  // Define request headers
  const headers = {
    Accept: "*/*",
    "Accept-Language": "en-US,en;q=0.5",
    "Content-Type": "application/x-www-form-urlencoded",
    "X-FB-Friendly-Name": "PolarisPostActionLoadPostQueryQuery",
    "X-CSRFToken": "RVDUooU5MYsBbS1CNN3CzVAuEP8oHB52" + id,
    "X-IG-App-ID": "1217981644879628",
    "X-FB-LSD": "AVqbxe3J_YA",
    "X-ASBD-ID": "129477",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "User-Agent":
      "Mozilla/5.0 (Linux; Android 11; SAMSUNG SM-G973U) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/14.2 Chrome/87.0.4280.141 Mobile Safari/537.36",
  };

  // Define the POST data
  const postData = {
    av: "0",
    __d: "www",
    __user: "0",
    __a: "1",
    __req: "3",
    __hs: "19624.HYP:instagram_web_pkg.2.1..0.0",
    dpr: "3",
    __ccg: "UNKNOWN",
    __rev: "1008824440",
    __s: "xf44ne:zhh75g:xr51e7",
    __hsi: "7282217488877343271",
    __dyn:
      "7xeUmwlEnwn8K2WnFw9-2i5U4e0yoW3q32360CEbo1nEhw2nVE4W0om78b87C0yE5ufz81s8hwGwQwoEcE7O2l0Fwqo31w9a9x-0z8-U2zxe2GewGwso88cobEaU2eUlwhEe87q7-0iK2S3qazo7u1xwIw8O321LwTwKG1pg661pwr86C1mwraCg",
    __csr:
      "gZ3yFmJkillQvV6ybimnG8AmhqujGbLADgjyEOWz49z9XDlAXBJpC7Wy-vQTSvUGWGh5u8KibG44dBiigrgjDxGjU0150Q0848azk48N09C02IR0go4SaR70r8owyg9pU0V23hwiA0LQczA48S0f-x-27o05NG0fkw",
    __comet_req: "7",
    lsd: "AVqbxe3J_YA",
    jazoest: "null",
    __spin_r: "null",
    __spin_b: "trunk",
    __spin_t: "null",
    fb_api_caller_class: "RelayModern",
    fb_api_req_friendly_name: "PolarisPostActionLoadPostQueryQuery",
    variables: JSON.stringify({
      shortcode: id,
      fetch_comment_count: "null",
      fetch_related_profile_media_count: "null",
      parent_comment_count: "null",
      child_comment_count: "null",
      fetch_like_count: "null",
      fetch_tagged_user_count: "null",
      fetch_preview_comment_count: "null",
      has_threaded_comments: "false",
      hoisted_comment_id: "null",
      hoisted_reply_id: "null",
    }),
    server_timestamps: "true",
    doc_id: "10015901848480474",
  };

  try {
    // Sending the POST request to Instagram API using Axios
    const response = await axios.post(API_URL, new URLSearchParams(postData).toString(), {
      headers: headers
    });
    
    
        // Extracting id and thumbnail_src from the Instagram API response
        const responseData = response.data;
        const shortcode = responseData?.data?.xdt_shortcode_media?.shortcode;
        const longid = responseData?.data?.xdt_shortcode_media?.id;
        const thumbnail = responseData?.data?.xdt_shortcode_media?.display_url;
        const postedby = responseData?.data?.xdt_shortcode_media?.owner;
        let multi;
        if (responseData?.data?.xdt_shortcode_media?.edge_sidecar_to_children) {
          multi = true;
        } else {
          multi = false;
        }
        

        
    // Sending the Instagram API response back to the client
    res.status(200).json(
      { 
        id: longid || 'nopost',
        likes: responseData?.data?.xdt_shortcode_media?.edge_media_preview_like?.count,
        comments: responseData?.data?.xdt_shortcode_media?.edge_media_to_comment?.count,
        video_plays: responseData?.data?.xdt_shortcode_media?.video_play_count,
        video_views: responseData?.data?.xdt_shortcode_media?.video_view_count,
        media : responseData?.data?.xdt_shortcode_media?.edge_sidecar_to_children?.edges,
        caption : responseData?.data?.xdt_shortcode_media?.accessibility_caption,
        is_video : responseData?.data?.xdt_shortcode_media?.is_video,
        photo_url: thumbnail,
        video_url : responseData?.data?.xdt_shortcode_media?.video_url,
        author: postedby,
      });

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
