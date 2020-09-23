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

// Zip Extrator Singleton
class ZipExtractor {
    static instance: ZipExtractor;
    constructor(){
        if(ZipExtractor.instance) return ZipExtractor.instance
        else ZipExtractor.instance = this;
    }
}

export default new ZipExtractor()