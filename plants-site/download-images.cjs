const https = require("https");
const fs = require("fs");
const path = require("path");

const imagesDir = path.join(__dirname, "public", "images");

// Verified working Wikimedia URLs (no thumbnail, full images)
const images = {
  "zamioculcas1.jpg":
    "https://upload.wikimedia.org/wikipedia/commons/3/3a/Zamioculcas_zamiifolia_BotGartenMuenster_Zz1.jpg",
  "zamioculcas2.jpg":
    "https://upload.wikimedia.org/wikipedia/commons/0/04/Zamioculcas_zamiifolia_%28Zamioculcas_zamiifolia%29_02.jpg",
  "zamioculcas3.jpg":
    "https://upload.wikimedia.org/wikipedia/commons/8/8c/Zamioculcas_zamiifolia_03.jpg",

  "calathea1.jpg":
    "https://upload.wikimedia.org/wikipedia/commons/4/4f/Calathea_ornata.jpg",
  "calathea2.jpg":
    "https://upload.wikimedia.org/wikipedia/commons/1/16/Calathea_makoyana.jpg",
  "calathea3.jpg":
    "https://upload.wikimedia.org/wikipedia/commons/5/53/Calathea_rufibarba.jpg",

  "chamaedorea1.jpg":
    "https://upload.wikimedia.org/wikipedia/commons/6/6e/Chamaedorea_elegans.jpg",
  "chamaedorea2.jpg":
    "https://upload.wikimedia.org/wikipedia/commons/4/43/Chamaedorea_seifrizii.jpg",
  "chamaedorea3.jpg":
    "https://upload.wikimedia.org/wikipedia/commons/1/19/Chamaedorea_ernesti-augusti.jpg",

  "aglaonema1.jpg":
    "https://upload.wikimedia.org/wikipedia/commons/2/2d/Aglaonema_commutatum.jpg",
  "aglaonema2.jpg":
    "https://upload.wikimedia.org/wikipedia/commons/7/78/Aglaonema_treubii.jpg",
  "aglaonema3.jpg":
    "https://upload.wikimedia.org/wikipedia/commons/9/9b/Aglaonema_modestum.jpg",

  "hero-bg.jpg":
    "https://upload.wikimedia.org/wikipedia/commons/4/4d/Tropical_foliage_background.jpg",
};

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    https
      .get(
        url,
        {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          },
          timeout: 30000,
        },
        (response) => {
          if (
            response.statusCode === 301 ||
            response.statusCode === 302 ||
            response.statusCode === 307
          ) {
            downloadImage(response.headers.location, filepath)
              .then(resolve)
              .catch(reject);
            return;
          }

          if (response.statusCode === 200) {
            const contentType = response.headers["content-type"];
            if (!contentType || !contentType.startsWith("image/")) {
              reject(new Error(`Not an image: ${contentType}`));
              return;
            }

            const fileStream = fs.createWriteStream(filepath);
            response.pipe(fileStream);
            fileStream.on("finish", () => {
              fileStream.close();
              const stats = fs.statSync(filepath);
              if (stats.size < 1000) {
                reject(new Error("File too small"));
              } else {
                resolve(filepath);
              }
            });
          } else {
            reject(new Error(`HTTP ${response.statusCode}`));
          }
        },
      )
      .on("error", reject);
  });
}

async function downloadAll() {
  let success = 0,
    failed = 0;

  for (const [filename, url] of Object.entries(images)) {
    const filepath = path.join(imagesDir, filename);
    console.log(
      `[${success + failed + 1}/${Object.keys(images).length}] ${filename}...`,
    );
    try {
      await downloadImage(url, filepath);
      const stats = fs.statSync(filepath);
      console.log(`  ✓ ${(stats.size / 1024).toFixed(1)} KB`);
      success++;
    } catch (error) {
      console.error(`  ✗ ${error.message}`);
      failed++;
    }
    // 2 second delay to avoid rate limiting
    await new Promise((r) => setTimeout(r, 2000));
  }
  console.log(`\n✓ ${success} succeeded, ✗ ${failed} failed`);
}

downloadAll();
