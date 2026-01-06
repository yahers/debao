
import React, { useContext } from 'react';
import { AppContext } from '../../App';
import PublicLayout from '../../components/PublicLayout';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  const { banners, articles } = useContext(AppContext);
  const activeBanners = banners.filter((b: any) => b.isActive);
  const news = articles.filter((a: any) => a.type === 'NEWS' || a.type === 'INDUSTRY_NEWS');
  const science = articles.filter((a: any) => a.type === 'SCIENCE');

  return (
    <PublicLayout>
      {/* Hero Banner */}
      <div className="relative h-[600px] bg-slate-900 overflow-hidden">
        {activeBanners.length > 0 && (
          <div className="absolute inset-0">
            <img src={activeBanners[0].imageUrl} className="w-full h-full object-cover opacity-60" alt="Banner" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
              <h1 className="text-4xl md:text-6xl font-black mb-6">{activeBanners[0].title}</h1>
              <Link to="/mall" className="bg-primary hover:bg-primary-dark px-10 py-4 rounded-lg font-bold text-lg transition-all shadow-xl">
                进入净化商城
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Recommended Info */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-3xl font-bold mb-2">推荐信息</h2>
          <div className="h-1 w-12 bg-red-600"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 group cursor-pointer overflow-hidden rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
            <div className="h-96 relative">
              <img src="https://picsum.photos/800/600?random=101" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Case" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8 text-white">
                <span className="text-sm font-medium mb-2 opacity-80">成功案例</span>
                <h3 className="text-2xl font-bold">长春市疾控中心项目</h3>
                <p className="text-sm opacity-80 mt-2">微生物实验室、理化实验工艺设计技术咨询服务。</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="h-1/2 group cursor-pointer overflow-hidden rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
              <div className="h-full relative">
                <img src="https://picsum.photos/400/400?random=102" className="w-full h-full object-cover group-hover:scale-105 transition-transform" alt="Product" />
                <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6 text-white">
                  <span className="text-xs font-bold uppercase tracking-wider mb-1">产品</span>
                  <h4 className="text-lg font-bold">除湿控温净化机组</h4>
                </div>
              </div>
            </div>
            <div className="h-1/2 group cursor-pointer overflow-hidden rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
              <div className="h-full relative">
                <img src="https://picsum.photos/400/400?random=103" className="w-full h-full object-cover group-hover:scale-105 transition-transform" alt="Product" />
                <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6 text-white">
                  <span className="text-xs font-bold uppercase tracking-wider mb-1">产品</span>
                  <h4 className="text-lg font-bold">实验室洁净控制系统</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Content Section: News & Science */}
      <div className="bg-gray-100 py-16">
        <section className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center mb-12">
            <h2 className="text-3xl font-bold mb-2">新闻与科普</h2>
            <div className="h-1 w-12 bg-red-600"></div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* News List */}
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
              {news.slice(0, 2).map((item: any) => (
                <div key={item.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all">
                  <div className="h-48 relative">
                    <img src={item.imageUrl} className="w-full h-full object-cover" alt={item.title} />
                    <span className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded">新闻</span>
                  </div>
                  <div className="p-6">
                    <h4 className="font-bold text-lg mb-2 line-clamp-2">{item.title}</h4>
                    <p className="text-gray-500 text-sm mb-4">{item.publishDate}</p>
                    <p className="text-gray-600 text-sm line-clamp-3 mb-6">{item.summary}</p>
                    <Link to={`/static/${item.id}`} className="text-primary font-bold text-sm hover:underline">了解更多 →</Link>
                  </div>
                </div>
              ))}
            </div>
            {/* Science List */}
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold border-l-4 border-primary pl-4">科普</h3>
                <Link to="/static/science-all" className="text-gray-400 hover:text-primary text-sm">查看全部</Link>
              </div>
              <div className="space-y-6">
                {science.slice(0, 5).map((item: any) => (
                  <div key={item.id} className="group cursor-pointer">
                    <Link to={`/static/${item.id}`} className="block">
                      <p className="text-gray-800 font-medium group-hover:text-primary transition-colors line-clamp-2">科普分享 | {item.title}</p>
                      <div className="h-px w-full bg-gray-100 mt-4"></div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-12 gap-4">
            <button className="px-10 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors text-sm font-medium">更多新闻</button>
            <button className="px-10 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors text-sm font-medium">更多科普</button>
          </div>
        </section>
      </div>

      {/* Bottom Search */}
      <div className="bg-gray-100 pb-16 pt-8 flex justify-center">
        <div className="relative max-w-2xl w-full mx-6">
          <input type="text" placeholder="请输入搜索关键字" className="w-full h-14 pl-6 pr-16 rounded-lg border-gray-200 shadow-sm focus:ring-primary focus:border-primary" />
          <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary">
            <span className="material-symbols-outlined">search</span>
          </button>
        </div>
      </div>
    </PublicLayout>
  );
};

export default HomePage;
