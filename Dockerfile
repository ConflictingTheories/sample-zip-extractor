# /*                                            *\
# ** ------------------------------------------ **
# **              Sample Zip Extractor          **
# ** ------------------------------------------ **
# **           Copyright (c) 2020               **
# **             Kyle Derby MacInnis            **
# **                                            **
# ** Any unauthorized distribution or transfer  **
# **    of this work is strictly prohibited.    **
# **                                            **
# **           All Rights Reserved.             **
# ** ------------------------------------------ **
# \*                                            */

FROM node
# Extract
RUN mkdir /opt/zip-extractor
WORKDIR /opt/zip-extractor
COPY . .
# Build
RUN yarn build
# Run
CMD ["yarn", "start"]