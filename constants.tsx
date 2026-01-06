
import { Banner, Article, MallCategory, Product, StandardDownload, PointTier, ProcurementScenario } from './types';

export const LOGO_URL = "./files/logo.png";

export const INITIAL_BANNERS: Banner[] = [
  { id: '1', title: '德宝集团：打造全球净化产业供应链+生态链', imageUrl: './files/pop1.jpg', link: '/mall', isActive: true },
  { id: '2', title: '创新驱动未来：专业实验室净化方案专家', imageUrl: './files/pop2.png', link: '/static/diagnosis', isActive: true },
  { id: '3', title: '智造洁净空间：工业建筑环境集成服务商', imageUrl: './files/pop3.png', link: '/scenarios', isActive: true },
];

export const INITIAL_ARTICLES: Article[] = [
  { 
    id: 'a1', 
    title: '可持续包装领域的突破', 
    summary: '随着环境意识的提高，新的净化包装材料正在改变行业...', 
    content: '德宝集团最新研发的生物基净化膜已正式投产...', 
    type: 'SCIENCE', 
    category: '科普分享', 
    publishDate: '2024-10-10', 
    imageUrl: 'https://picsum.photos/400/300?random=10' 
  },
  { 
    id: 'a2', 
    title: '德宝集团引进磁控胶囊胃镜技术', 
    summary: '开启内镜检查新时代，助力基层医疗水平提升...', 
    content: '通过高度洁净的实验室环境，确保医疗器械的绝对安全...', 
    type: 'NEWS', 
    category: '公司动态', 
    publishDate: '2024-10-08', 
    imageUrl: 'https://picsum.photos/400/300?random=11' 
  },
];

export const MALL_CATEGORIES: MallCategory[] = [
  { id: 'cat1', name: '工业空气净化', productCount: 12, thumbnail: 'https://picsum.photos/200/200?random=20', status: 'ACTIVE' },
  { id: 'cat2', name: '家用净水器', productCount: 8, thumbnail: 'https://picsum.photos/200/200?random=21', status: 'ACTIVE' },
  { id: 'cat3', name: '滤芯耗材', productCount: 24, thumbnail: 'https://picsum.photos/200/200?random=22', status: 'ACTIVE' },
  { id: 'cat4', name: '安装配件', productCount: 15, thumbnail: 'https://picsum.photos/200/200?random=23', status: 'ACTIVE' },
];

export const INITIAL_STANDARDS: StandardDownload[] = [
  { id: 's1', name: '工业建筑供暖通风与空气调节设计规范', code: 'GB 50019-2015', fileUrl: './files/GB50019-2015工业建筑供暖通风与空气调节设计规范.pdf', fileSize: '4.2 MB', category: '工业标准', downloads: 124, status: 'ACTIVE' },
  { id: 's2', name: '工业设备及管道绝热工程设计规范', code: 'GB 50264-2013', fileUrl: './files/GB50264-2013工业设备及管道绝热工程设计规范.pdf', fileSize: '3.8 MB', category: '工业标准', downloads: 85, status: 'ACTIVE' },
  { id: 's3', name: '公共建筑节能设计标准', code: 'DB11/T 687-2024', fileUrl: './files/DB11T687-2024公共建筑节能设计标准.pdf', fileSize: '5.1 MB', category: '建筑标准', downloads: 210, status: 'ACTIVE' },
  { id: 's4', name: '建筑节能工程施工质量验收标准', code: 'DBJ50-255-2022', fileUrl: './files/DBJ50-255-2022建筑节能工程施工质量验收标准.pdf', fileSize: '6.4 MB', category: '建筑标准', downloads: 167, status: 'ACTIVE' },
  { id: 's5', name: '良好实验室规范（GLP）管理、描述和测试项目的使用', code: 'GB/T 43547-2023', fileUrl: './files/GBT43547-2023良好实验室规范GLP管理描述和测试项目的使用.pdf', fileSize: '2.9 MB', category: '实验室规范', downloads: 342, status: 'ACTIVE' },
  { id: 's6', name: '实验室废弃物处置指南', code: 'T/ LZZLXH 034-2020', fileUrl: './files/TLZZLXH034-2020实验室废弃物处置指南.pdf', fileSize: '1.2 MB', category: '实验室规范', downloads: 456, status: 'ACTIVE' },
];

export const POINT_TIERS: PointTier[] = [
  { id: 't1', name: '普通会员', minSpend: 0, maxSpend: 1000, multiplier: 1.0 },
  { id: 't2', name: '白银会员', minSpend: 1001, maxSpend: 5000, multiplier: 1.5 },
  { id: 't3', name: '黄金会员', minSpend: 5001, maxSpend: 999999, multiplier: 2.0 },
];

export const INITIAL_SCENARIOS: ProcurementScenario[] = [
  { 
    id: 'sc1', 
    name: '生物实验室场景采购', 
    sku: 'LAB-SCENE-001', 
    thumbnail: 'https://picsum.photos/1200/600?random=40',
    linkedCategories: ['cat1', 'cat3'],
    points: [
      { x: 30, y: 40, categoryId: 'cat1' },
      { x: 70, y: 20, categoryId: 'cat3' }
    ]
  }
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: '工业级空气净化器 X-200',
    sku: 'IND-200',
    price: 3999,
    inventory: 50,
    category: '工业空气净化',
    brand: '中元德宝',
    imageUrl: 'https://picsum.photos/400/400?random=50',
    vendorId: 'v1',
    status: 'APPROVED',
    description: 'Powerful industrial air purifier...'
  },
];
