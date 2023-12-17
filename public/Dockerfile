
# nginx 部署
FROM nginx:alpine
RUN echo "🎉 开 🎉 始 🎉 构 🎉 建 🎉"

COPY  / /usr/share/nginx/html/dist
COPY  nginx.conf /etc/nginx/nginx.conf

CMD ["nginx", "-g", "daemon off;"]

RUN echo "🎉 架 🎉 设 🎉 成 🎉 功 🎉"

