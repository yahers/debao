
import React, { useContext, useState } from 'react';
import { AppContext } from '../../App';
import PublicLayout from '../../components/PublicLayout';

const StandardDownloads: React.FC = () => {
  const { standards } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('全部');

  const categories = ['全部', '工业标准', '建筑标准', '实验室规范'];

  const filteredStandards = standards.filter((s: any) => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         s.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === '全部' || s.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <PublicLayout>
      <div className="bg-secondary text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent"></div>
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <h1 className="text-5xl font-black mb-6 tracking-tighter">行业标准库</h1>
          <p className="text-xl opacity-80 max-w-3xl mx-auto leading-relaxed">德宝集团为您汇总了最新的净化、节能及实验室运营相关的国家标准与行业规范，助力项目合规建设与高效运行。</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="p-10 border-b border-gray-50 flex flex-col xl:flex-row xl:items-center justify-between gap-10">
            <div className="flex flex-wrap gap-3">
              {categories.map(cat => (
                <button 
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-8 py-2.5 rounded-full font-black text-sm transition-all shadow-sm ${activeCategory === cat ? 'bg-primary text-white scale-105' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="relative group">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">search</span>
              <input 
                type="text" 
                placeholder="搜索规范名称、标准编号或关键字..." 
                className="pl-12 pr-6 py-4 border-gray-200 bg-gray-50 rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary focus:bg-white text-sm w-full xl:w-[450px] transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-900 text-[11px] font-black text-slate-400 uppercase tracking-widest">
                  <th className="px-10 py-6">规范编号与全称</th>
                  <th className="px-10 py-6">专业分类</th>
                  <th className="px-10 py-6">文件格式/大小</th>
                  <th className="px-10 py-6 text-center">下载量</th>
                  <th className="px-10 py-6 text-right">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredStandards.length > 0 ? filteredStandards.map((std: any) => (
                  <tr key={std.id} className="hover:bg-primary/5 transition-colors group">
                    <td className="px-10 py-8">
                      <div className="flex items-center gap-5">
                        <div className="size-14 rounded-2xl bg-red-50 flex flex-col items-center justify-center text-red-500 shrink-0 border border-red-100 group-hover:scale-110 transition-transform">
                          <span className="material-symbols-outlined text-3xl font-black">picture_as_pdf</span>
                        </div>
                        <div>
                          <p className="font-black text-gray-900 text-base leading-tight group-hover:text-primary transition-colors">{std.name}</p>
                          <p className="text-xs text-gray-400 mt-2 font-bold tracking-wider">{std.code}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-8">
                      <span className={`text-[10px] font-black px-4 py-1.5 rounded-lg uppercase tracking-tighter border ${
                        std.category === '工业标准' ? 'bg-orange-50 text-orange-600 border-orange-100' : 
                        std.category === '建筑标准' ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-teal-50 text-teal-600 border-teal-100'
                      }`}>
                        {std.category}
                      </span>
                    </td>
                    <td className="px-10 py-8">
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-gray-600">PDF Document</span>
                        <span className="text-[10px] text-gray-400 mt-1">{std.fileSize}</span>
                      </div>
                    </td>
                    <td className="px-10 py-8 text-sm text-center text-gray-400 font-bold">{std.downloads}</td>
                    <td className="px-10 py-8 text-right">
                      <a 
                        href={std.fileUrl} 
                        download 
                        className="inline-flex items-center gap-2 bg-slate-900 text-white hover:bg-primary px-6 py-3 rounded-xl font-black text-xs transition-all shadow-lg shadow-slate-900/10 hover:shadow-primary/20"
                      >
                        <span className="material-symbols-outlined text-[18px]">download</span>
                        立即下载
                      </a>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={5} className="px-10 py-32 text-center">
                       <div className="flex flex-col items-center gap-4 grayscale opacity-40">
                         <span className="material-symbols-outlined text-8xl">inbox_customize</span>
                         <p className="text-xl font-black text-gray-400">暂未搜索到相关规范标准</p>
                         <button onClick={() => {setSearchTerm(''); setActiveCategory('全部');}} className="text-primary font-bold hover:underline">重置筛选条件</button>
                       </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="mt-10 p-10 bg-slate-100 rounded-3xl border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-8">
           <div className="flex items-center gap-6">
              <span className="material-symbols-outlined text-4xl text-primary font-black">help_center</span>
              <div>
                <p className="font-black text-gray-800 text-lg">没有找到您需要的标准？</p>
                <p className="text-sm text-gray-500 font-medium">德宝集团技术委员会定期更新标准库，您可以联系我们的专家寻求最新版规范。</p>
              </div>
           </div>
           <button className="whitespace-nowrap px-10 py-4 bg-white border-2 border-primary text-primary font-black rounded-2xl hover:bg-primary hover:text-white transition-all">咨询技术委员会</button>
        </div>
      </div>
    </PublicLayout>
  );
};

export default StandardDownloads;
