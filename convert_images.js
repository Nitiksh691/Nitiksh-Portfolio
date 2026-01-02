const fs = require('fs');
const path = require('path');

async function convertImages() {
    try {
        const sharp = require('sharp');
        const publicDir = path.join(__dirname, 'public');
        const files = fs.readdirSync(publicDir);

        for (const file of files) {
            if (file.toLowerCase().endsWith('.heic')) {
                const filePath = path.join(publicDir, file);
                const newFilePath = path.join(publicDir, file.replace(/\.heic$/i, '.jpg'));

                console.log(`Converting ${file} to JPG...`);

                await sharp(filePath)
                    .toFormat('jpeg')
                    .toFile(newFilePath);

                // Verify conversion before deleting
                if (fs.existsSync(newFilePath)) {
                    fs.unlinkSync(filePath);
                    console.log(`Deleted original ${file}`);
                }
            }
        }
        console.log("Conversion complete.");
    } catch (err) {
        console.error("Conversion failed:", err);
        // Fallback: If sharp fails, we can't convert.
        // However, given the environment, we might not have sharp installed directly.
        // But 'next' usually installs it.
    }
}

convertImages();
