/*                                            *\
** ------------------------------------------ **
**              Sample Zip Extractor          **
** ------------------------------------------ **
**           Copyright (c) 2020               **
**             Kyle Derby MacInnis            **
**                                            **
** Any unauthorized distribution or transfer  **
**    of this work is strictly prohibited.    **
**                                            **
**           All Rights Reserved.             **
** ------------------------------------------ **
\*                                            */

// Imports

import AppError from "./lib/Error";
import ZipExtractor, { ZipEntry } from "./lib/ZipExtractor";
import ImageTools from "./lib/ImageTools";
import path from "path";
import fs from "fs";

// Zip Url
const ZIP_URL =
  "https://downloads.campbellcloud.io/assessment/202009/Photos_To_Review.zip";

const STORAGE_DIR = path.join(__dirname, "../data");

// Main Application Class
class Application {
  // Final Result Array
  output: ZipEntry[] = [];

  // Run Application
  constructor() {
    this.main();
  }

  // Main Entrypoint into Application
  async main(): Promise<void> {
    try {
      // Fetch Zip
      const zip = await ZipExtractor.extractZip(ZIP_URL);
      // Scan Files
      for await (const entry of zip) {
        // Properties from Zip
        const fileName: string = entry.path;
        const type = entry.type;
        const size = entry.vars.uncompressedSize;
        const isJpeg = fileName.match(/.jp[eg|g]$/i);
        // Scan ISO Image Data if Jpeg Image
        if (type === "File" && isJpeg) {
          const iso = await ImageTools.getISO(entry);
          if (iso !== -1)
            this.output.push({
              name: fileName,
              iso: iso,
              size: size,
            });
        }
        // Export to Local File Storage
        entry.pipe(fs.createWriteStream(path.join(STORAGE_DIR, fileName)));
      }
      // Output Image Names (Sorted by ISO)
      console.log(`--> Finished Scanning Zip File Fetched from [${ZIP_URL}]:`);
      console.log(`\nImages :: In Order of ISO (Largest -> Smallest) ::`);
      this.output
        .sort((a: ZipEntry, b: ZipEntry) => {
          return b.iso - a.iso;
        })
        .map((x: ZipEntry) => console.log(`:: ${x.name} - ISO : ${x.iso}`));
    } catch (err) {
      AppError.setError("Error", -100, err);
      AppError.sendError(console.error);
    }
  }
}

// Run Application on Export
export default new Application();
