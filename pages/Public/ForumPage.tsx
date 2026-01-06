
import React from 'react';
import PublicLayout from '../../components/PublicLayout';

const ForumPage: React.FC = () => {
  return (
    <PublicLayout>
      <div className="bg-primary py-12 text-center text-white">
        <h1 className="text-4xl font-black mb-4">净化论坛</h1>
        <p className="opacity-90 max-w-2xl mx-auto px-6">分享专业空气净化及水净化技术交流平台，讨论健康生活方式。</p>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Sidebar: User Stats */}
        <aside className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
            <div className="flex flex-col items-center mb-6">
              <div className="size-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-4xl text-gray-300">person</span>
              </div>
              <p className="font-bold text-gray-800">访客用户</p>
              <p className="text-xs text-gray-400 mt-1">登录后可参与讨论</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button className="bg-primary text-white py-2 rounded-lg font-bold text-sm">登录</button>
              <button className="border border-gray-200 py-2 rounded-lg font-bold text-sm hover:bg-gray-50 transition-colors">注册</button>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-4 pb-2 border-b border-gray-50">论坛统计</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">今日发帖</span>
                <span className="font-bold text-primary">128</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">昨日发帖</span>
                <span className="font-bold">356</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">会员总数</span>
                <span className="font-bold">12,580</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content: Post List */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-50 flex items-center justify-between">
              <div className="flex gap-4 overflow-x-auto no-scrollbar">
                <button className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-bold">全部话题</button>
                <button className="text-gray-500 hover:text-primary px-4 py-1.5 rounded-full text-sm font-medium transition-colors">使用经验</button>
                <button className="text-gray-500 hover:text-primary px-4 py-1.5 rounded-full text-sm font-medium transition-colors">产品评测</button>
                <button className="text-gray-500 hover:text-primary px-4 py-1.5 rounded-full text-sm font-medium transition-colors">行业动态</button>
              </div>
              <button className="bg-primary text-white px-6 py-2 rounded-lg font-bold text-sm flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">edit</span>
                发表新帖子
              </button>
            </div>

            <div className="divide-y divide-gray-50">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="p-6 hover:bg-gray-50 transition-colors group cursor-pointer">
                  <div className="flex gap-4">
                    <img src={`https://picsum.photos/100/100?random=${i}`} className="size-16 rounded-lg object-cover flex-shrink-0" alt="Post" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="bg-orange-100 text-orange-600 text-[10px] font-bold px-1.5 py-0.5 rounded">热门</span>
                        <h4 className="font-bold text-lg text-gray-800 group-hover:text-primary transition-colors">家用空气净化器选购指南：如何选择适合自己的产品</h4>
                      </div>
                      <p className="text-gray-500 text-sm line-clamp-2 mb-4">随着空气质量问题日益受到关注，越来越多的家庭开始购买空气净化器。但是面对市场上琳琅满目的产品...</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6 text-xs text-gray-400">
                          <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">person</span> 净化专家</span>
                          <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">visibility</span> 1,234</span>
                          <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">chat</span> 45</span>
                        </div>
                        <span className="text-xs text-gray-300">2小时前</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

export default ForumPage;
