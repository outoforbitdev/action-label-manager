FROM outoforbitdev/node:2.0.1

COPY entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh

RUN npm install

ENTRYPOINT ["/entrypoint.sh"]
