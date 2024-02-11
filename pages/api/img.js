import axios from 'axios';

export default async function handler(req, res) {
    const { save } = req.query;
    try {
        const thumbnailResponse = await axios.get(save, {
            responseType: 'arraybuffer' // Ensure the response is in binary format
        });

        function getFileExtension(contentType) {
            if (!contentType) return 'jpg'; // Default to jpg if content type is not available
            const parts = contentType.split('/');
            if (parts.length < 2) return 'jpg'; // Default to jpg if content type is not in expected format
            return parts[1];
        }

        // Set custom filename for the downloaded thumbnail
        const fileName = `photo.${getFileExtension(thumbnailResponse.headers['content-type'])}`;

        // Set headers for the response to trigger download with custom filename
        res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
        res.setHeader('Content-Type', thumbnailResponse.headers['content-type']);
        res.end(thumbnailResponse.data, 'binary'); // Send the binary data of the thumbnail

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
