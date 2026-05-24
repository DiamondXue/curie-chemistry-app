# 🧪 Curie Chemistry App

> 前后端分离 + 容器化的化学学习网站，灵感来自居里夫人。

---

## 技术栈

| 层级 | 技术 |
|------|------|
| 前端 | React 18 + Vite + React Router + CSS Modules |
| 后端 | Node.js 20 + Express 4 |
| 容器 | Docker + Docker Compose + Nginx（反向代理） |
| 数据 | SQLite（better-sqlite3，本地文件型数据库，零配置） |

---

## 快速开始（Docker 一键部署）

### 前置要求

- [Docker](https://docs.docker.com/get-docker/) ≥ 24
- [Docker Compose](https://docs.docker.com/compose/) ≥ 2.20（通常随 Docker Desktop 内置）

### 步骤

```bash
# 1. 克隆 / 进入项目目录
cd curie-chemistry-app

# 2. 复制环境变量文件（按需修改）
cp .env.example .env

# 3. 一键构建并启动
docker compose up --build -d

# 4. 打开浏览器访问
open http://localhost        # 首页
open http://localhost/periodic  # 元素周期表
```

### 停止服务

```bash
docker compose down
```

### 查看日志

```bash
docker compose logs -f          # 所有服务
docker compose logs -f backend  # 仅后端
docker compose logs -f frontend # 仅前端（Nginx）
```

---

## 本地开发

无需 Docker，前后端分别启动热更新服务器。

### 后端

```bash
cd backend
npm install
npm run dev          # 默认监听 http://localhost:4000
```

### 前端

```bash
cd frontend
npm install
npm run dev          # 默认监听 http://localhost:5173
                     # /api 请求自动代理到 localhost:4000
```

打开 `http://localhost:5173` 即可。

---

## API 文档

后端所有接口均挂载在 `/api` 前缀下。

| 方法 | 路径 | 描述 |
|------|------|------|
| GET | `/health` | 健康检查 |
| GET | `/api/stats` | 网站统计数字 |
| GET | `/api/courses` | 课程列表 |
| GET | `/api/courses/experiments` | 虚拟实验列表 |
| GET | `/api/faq` | 常见问题 |
| GET | `/api/testimonials` | 用户评价 |
| GET | `/api/elements` | 元素列表（支持 `?category=` `?search=`） |
| GET | `/api/elements/:number` | 单个元素详情 |

---

## 目录结构

```
curie-chemistry-app/
├── backend/                  # Node.js / Express
│   ├── src/
│   │   ├── index.js          # 入口
│   │   ├── routes/           # 路由模块
│   │   └── data/             # 数据文件
│   ├── Dockerfile
│   └── package.json
├── frontend/                 # React / Vite
│   ├── src/
│   │   ├── pages/            # 页面组件
│   │   ├── components/       # 公共组件
│   │   ├── hooks/            # 自定义 Hook
│   │   ├── api/              # API 调用层
│   │   └── styles/           # 全局样式
│   ├── nginx.conf            # Nginx 配置（SPA + 反向代理）
│   ├── Dockerfile
│   └── vite.config.js
├── docker-compose.yml        # 服务编排
├── .env                      # 环境变量（不提交 Git）
└── .env.example              # 环境变量示例
```

---

## 环境变量说明

| 变量 | 默认值 | 说明 |
|------|--------|------|
| `APP_PORT` | `80` | 宿主机暴露的端口 |
| `FRONTEND_ORIGIN` | `http://localhost` | 后端 CORS 允许的来源 |
| `NODE_ENV` | `production` | Node 运行模式 |

---

## 部署到生产服务器

1. 将整个目录上传到服务器
2. 修改 `.env`，设置 `FRONTEND_ORIGIN` 为实际域名，如 `https://chemistry.example.com`
3. 如需 HTTPS，在 Nginx 容器前加 Certbot/Traefik 或云 LB 处理 TLS
4. 执行 `docker compose up --build -d`

---

## License

MIT
