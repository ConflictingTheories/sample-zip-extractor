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

import exifr from "exifr";

// Image Manipulation Singleton
class ImageTools {
  static instance: ImageTools;
  constructor() {
    if (ImageTools.instance) return ImageTools.instance;
    else ImageTools.instance = this;
  }

  // Return ISO from MetaData
  getISO(stream: any): Promise<number> {
    return new Promise((resolve, reject) => {
      let body: Buffer[] = [];
      stream.on("data", (chunk: Buffer) => {
        body.push(chunk);
      });
      stream.on("end", async () => {
        try {
          const exifData = await exifr.parse(Buffer.concat(body), {
            jfif: true,
          });
          resolve(exifData.ISO);
        } catch (err) {
          console.error(err);
          reject(-1);
        }
      });
    });
  }

  // Get Full MetaData from Image Entry
  getMetadata(stream: any) {
    return new Promise((resolve, reject) => {
      let body: Buffer[] = [];
      stream.on("data", (chunk: Buffer) => {
        body.push(chunk);
      });
      stream.on("end", async () => {
        try {
          const exifData = await exifr.parse(Buffer.concat(body), {
            jfif: true,
          });
          resolve(exifData);
        } catch (err) {
          reject(err);
        }
      });
    });
  }
}

export default new ImageTools();
