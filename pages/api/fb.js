import axios from 'axios';

export default async function handler(req, res) {
  try {
    const response = await axios.post('https://www.facebook.com/api/graphql/', {
      av: 0,
      __aaid: 0,
      __user: 0,
      __a: 1,
      __req: 4,
      __hs: '19766.HYP:comet_loggedout_pkg.2.1..0.0',
      dpr: 1.5,
      __ccg: 'EXCELLENT',
      __rev: 1011397866,
      __s: 'c1244n:b18c81:o198kt',
      __hsi: '7335230786482609293',
      __dyn: '7xeUmwlEnwn8K2Wmh0cm5U4e0yoW3q322aew9G2S0zU20xi3y4o11U1lVE4W0om78-0BE2awgolzUO0-E4a3a4oaEd82lwv89k2C1FwIw9i0D8vwRwlE-U2exi4UaEW0D888brwKxm5o2eUlwhEdE7am7-0imm2S3qazo7u1qwPwbS16wEwTwNwLwFg2Xwkoqwqo4eE7PwxK68jwGAAwHw',
      __csr: 'gvjNZhsADOqiKhqGVpULH_JWJoCl2oiZ4Luml6Bm9AzAGGDBxfzui-F8GdwIUx38pAwJUKbBDzXABy9U8UKqvCggxCmUKaDwyhU8V42mq6pppu4UycBV5yErK7o-U98nzpHxe2GfyUrxG3S9wqopwuU0NC13wafg1s80A20daw9CqE0e8k1Jc05N80yOvw24Ux07nw3C802rEU0e1Q0t202_e0dQg0_S08Io0AO099wIw5dzo3zYUiw1wzo62033K0KU2ZwgEbGxmq02CC0la0gxa5k05zU1i81zA0h-1hG5k6cE11Zw1gq19w3980gJQ1HwMw8u',
      __comet_req: 15,
      lsd: 'AVrGljuwR24',
      jazoest: 2970,
      __spin_r: 1011397866,
      __spin_b: 'trunk',
      __spin_t: 1707866505,
      fb_api_caller_class: 'RelayModern',
      fb_api_req_friendly_name: 'CometTahoeUpNextEndCardQuery',
      variables: JSON.stringify({
        upNextVideoID: '',
        scale: 1.5,
        currentID: '801014508520396'
      }),
      server_timestamps: true,
      doc_id: '6821602291229853'
    }, {
      headers: {
        'Host': 'www.facebook.com',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Sec-Fetch-Site': 'same-origin',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Dest': 'empty',
        'Referer': 'https://www.facebook.com/61552827720118/videos/801014508520396/',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8',
        'Priority': 'u=1, i',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.6099.199 Safari/537.36',
        'Viewport-Width': '1280',
        'X-Fb-Friendly-Name': 'CometTahoeUpNextEndCardQuery',
        'X-Fb-Lsd': 'AVrGljuwR24',
        'X-Asbd-Id': '129477',
        'Dpr': '1.5',
        'Sec-Ch-Ua': '"Not_A Brand";v="8", "Chromium";v="120"',
        'Sec-Ch-Ua-Mobile': '?0',
        'Sec-Ch-Ua-Platform-Version': '""',
        'Sec-Ch-Ua-Full-Version-List': '',
        'Sec-Ch-Ua-Model': '""',
        'Sec-Ch-Prefers-Color-Scheme': 'dark',
        'Sec-Ch-Ua-Platform': 'Windows',
        'Accept': '*/*',
        'Origin': 'https://www.facebook.com',
        'Cookie': 'ps_n=0; dpr=1.5; wd=1280x595; datr=3OrLZffQRTm_s8tbAKmc41cS; sb=6-rLZdOA90t-rzVDBUwJvSup'
      }
    });

    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response.status || 500).json({ error: error.message });
  }
}
