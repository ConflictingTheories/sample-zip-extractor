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

import axios from "axios";
import unzipper from "unzipper";

// Zip Extrator Singleton
class ZipExtractor {
  static instance: ZipExtractor;
  constructor() {
    if (ZipExtractor.instance) return ZipExtractor.instance;
    else ZipExtractor.instance = this;
  }

  // Fetch Zip from Web and Pipe Data
  async pipeZipFromURL(url: string): Promise<any> {
    const response = await axios({
      method: "GET",
      url: url,
      responseType: "stream",
    });
    return response.data;
  }

  // Fetch Zip from Web and Return Data
  async getZipFromURL(url: string): Promise<any> {
    const response = await axios({
      method: "GET",
      url: url,
    });
    return response.data;
  }

  // Extract Zip File Contents
  async extractZip(url: string) {
    const zipData = await this.pipeZipFromURL(url);
    const files = zipData.pipe(unzipper.Parse({ forceStream: true }));
    return files;
  }
}
export default new ZipExtractor();

export interface ZipEntry {
  name: string;
  iso: number;
  size: number;
}
