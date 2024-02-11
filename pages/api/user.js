export default async function handler(req, res) {
    try {
        const { u } = req.query;

        const response = await fetch(`https://www.instagram.com/api/v1/users/web_profile_info/?username=${u}`, {
            method: 'GET',
            headers: {
                'Host': 'www.instagram.com',
                'Sec-Ch-Ua': '"Not_A Brand";v="8", "Chromium";v="120"',
                'X-Ig-Www-Claim': '0',
                'Sec-Ch-Ua-Platform-Version': '""',
                'X-Requested-With': 'XMLHttpRequest',
                'Dpr': '1.5',
                'Sec-Ch-Ua-Full-Version-List': '',
                'Sec-Ch-Prefers-Color-Scheme': 'dark',
                'X-Csrftoken': 'u4dYShJkpBnAA2aUCKbXcU',
                'Sec-Ch-Ua-Platform': 'Windows',
                'X-Ig-App-Id': '936619743392459',
                'Sec-Ch-Ua-Model': '""',
                'Sec-Ch-Ua-Mobile': '?0',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.6099.199 Safari/537.36',
                'Viewport-Width': '1280',
                'Accept': '*/*',
                'X-Asbd-Id': '129477',
                'Sec-Fetch-Site': 'same-origin',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Dest': 'empty',
                'Referer': `https://www.instagram.com/${u}/`,
                'Accept-Encoding': 'gzip, deflate, br',
                'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8',
                'Priority': 'u=1, i',
                'Cookie': 'csrftoken=u4dYShJkpBnAA2aUCKbXcU; ps_l=0; ps_n=0; mid=ZblKYwALAAGIrHHdFMkD9HyQ3MEg; ig_did=97AB00BC-F3CA-40AB-91DD-945042CF2277; datr=Y0q5Zd0LsL7lEFEZkRn8F9vV; ig_nrcb=1'
            }
        });
      
        const data = await response.json();
      
        res.status(response.status).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
