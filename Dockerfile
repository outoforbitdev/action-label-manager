FROM outoforbitdev/node:2.0.1


# =========================== Install Dependencies ============================
COPY package.json /package.json
RUN npm install

# ============================== Set Entrypoint ===============================
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
