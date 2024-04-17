### BUILD
#Choose node version to build. Node version: 18.18.2
FROM node:18 AS build
#Author
LABEL AUTHOR="Dung Le"
#Work space
WORKDIR /usr/src/app
#Copy all file with package name
COPY package*.json ./
#Install angular version can match with my angular app. Angular version: 15.0.5
#--legacy-peer-deps là một tùy chọn khi chạy lệnh npm install để yêu cầu npm sử dụng cách tiếp cận "cũ" hơn 
#để xử lý các phụ thuộc đồng đối tượng (peer dependencies). Trong phiên bản mới của npm, 
#cách tiếp cận này đã được thay thế bằng một cách tiếp cận mới hơn dựa trên npm audit 
#và npm ci để xác định và cài đặt các phụ thuộc một cách an toàn hơn.
RUN npm install -g @angular/cli --legacy-peer-deps
#Install npm. npm version: 9.8.1
RUN npm install --legacy-peer-deps
#Copy work space
COPY . .
#Build Angular app
RUN npm run build
#Change default port 4200 to 4201
EXPOSE 4201:4200
#Docker will run after build completed
CMD ["ng", "serve", "--host", "0.0.0.0"]

##Testing: try dockerizing angular, nodejs on nginx
# FROM nginx:1.24.0

# COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# COPY --from=build /app/dist/sinhnhat /usr/share/nginx/html

# EXPOSE 80 