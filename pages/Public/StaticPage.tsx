
import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AppContext } from '../../App';
import PublicLayout from '../../components/PublicLayout';

const StaticPage: React.FC = () => {
  const { id } = useParams();
  const { articles } = useContext(AppContext);
  
  // Find article by ID or provide default mock content for corporate pages
  const article = articles.find((a: any) => a.id === id);
  
  const corporatePages: Record<string, any> = {
    'diagnosis': { title: '净源智诊', content: '为您提供专业的空气净化系统诊断服务。' },
    'brand': { title: '品牌实力', content: '深耕净化行业二十载，打造民族品牌标杆。' },
    'company-intro': { title: '公司介绍', content: '净源净化科技有限公司是一家集研发、生产、销售为一体的高新技术企业。' },
    'history': { title: '发展历程', content: '从2005年至今，我们一步一个脚印，从小型作坊成长为行业巨头。' },
    'culture': { title: '企业文化', content: '核心价值观：诚信、创新、卓越、共赢。' },
  };

  const pageData = article || corporatePages[id as string] || { title: '页面未找到', content: '抱歉，您访问的页面不存在。' };

  return (
    <PublicLayout>
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 py-6 flex items-center gap-2 text-xs text-gray-400">
          <Link to="/" className="hover:text-primary">首页</Link>
          <span className="material-symbols-outlined text-[12px]">chevron_right</span>
          <span className="text-gray-600 font-bold">{pageData.title}</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16">
        <article className="bg-white p-10 md:p-16 rounded-3xl shadow-sm border border-gray-100 prose prose-teal max-w-none">
          <header className="mb-12 border-b border-gray-100 pb-12">
            <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">{pageData.title}</h1>
            {article && (
              <div className="flex items-center gap-6 text-sm text-gray-400">
                <span className="flex items-center gap-2"><span className="material-symbols-outlined text-[18px]">calendar_month</span> {article.publishDate}</span>
                <span className="flex items-center gap-2"><span className="material-symbols-outlined text-[18px]">folder</span> {article.category}</span>
                <span className="flex items-center gap-2"><span className="material-symbols-outlined text-[18px]">visibility</span> 1,245 次阅读</span>
              </div>
            )}
          </header>

          <div className="text-gray-700 leading-loose text-lg space-y-8">
            {article?.imageUrl && <img src={article.imageUrl} className="w-full rounded-2xl shadow-xl" alt="" />}
            <p>{pageData.content}</p>
            <p>净化行业作为现代工业生产的重要基础设施，其重要性不言而喻。从半导体芯片生产到生物制药实验室，每一个环节都需要精确的空气洁净度控制。我们致力于提供一站式的净化工程解决方案，包括初步诊断、方案设计、设备供应及后期维护。</p>
            
            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 not-prose my-12">
              <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">tips_and_updates</span> 专家提示
              </h4>
              <p className="text-sm text-gray-600">在选择净化设备时，不仅要关注其过滤效率，更要考虑系统的整体风量匹配及能耗表现。长期的运营成本往往超过了初始购买成本。</p>
            </div>
          </div>

          <footer className="mt-20 pt-10 border-t border-gray-100 flex justify-between items-center not-prose">
            <div className="flex gap-4">
              <button className="flex items-center gap-2 px-6 py-2 border border-gray-200 rounded-full text-sm font-bold text-gray-500 hover:bg-gray-50 transition-all">
                <span className="material-symbols-outlined text-[18px]">share</span> 分享
              </button>
              <button className="flex items-center gap-2 px-6 py-2 border border-gray-200 rounded-full text-sm font-bold text-gray-500 hover:bg-gray-50 transition-all">
                <span className="material-symbols-outlined text-[18px]">print</span> 打印
              </button>
            </div>
            <div className="flex items-center gap-4">
               <span className="text-sm text-gray-400">关注我们：</span>
               <div className="flex gap-2">
                 <div className="size-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:text-primary transition-colors cursor-pointer"><span className="material-symbols-outlined text-[18px]">chat</span></div>
                 <div className="size-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:text-primary transition-colors cursor-pointer"><span className="material-symbols-outlined text-[18px]">public</span></div>
               </div>
            </div>
          </footer>
        </article>
      </div>
    </PublicLayout>
  );
};

export default StaticPage;
