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

import AppError from './lib/Error';
import ZipExtractor from './lib/ZipExtractor';

// Main Application Class
class Application {
  constructor() {
    this.main();
  }
  // Main Entrypoint into Application
  main(): void {
    // TODO
    try{
        // Fetch Zip

        // Decompress

        // Scan Files

        // Read Image Meta Data (ISO Speed)

        // Collate Data & Sort (Reverse Order of ISO Speed)

        // Output Image Names

    }catch(err){
        AppError.setError('Error',-100,err);
        AppError.sendError(console.error);
    }
  }
}

// Run Application on Export
export default new Application();
