
import React, { useContext, useState } from 'react';
import { AppContext } from '../../App';
import PublicLayout from '../../components/PublicLayout';

const ScenarioProcurement: React.FC = () => {
  const { scenarios, categories, products } = useContext(AppContext);
  const [selectedScenario, setSelectedScenario] = useState(scenarios[0]);
  const [activeNode, setActiveNode] = useState<any>(null);

  const scenarioProducts = activeNode 
    ? products.filter((p: any) => p.category === categories.find((c: any) => c.id === activeNode.categoryId)?.name)
    : [];

  return (
    <PublicLayout>
      <div className="bg-secondary text-white py-12 text-center">
        <h1 className="text-4xl font-black mb-4">场景化采购方案</h1>
        <p className="opacity-90">点击场景中的设备查看详情，为您提供定制化净化方案</p>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Scenario Image with Interactive Hotspots */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-slate-100 border border-gray-200">
          <img src={selectedScenario.thumbnail} className="w-full aspect-[21/9] object-cover" alt="Scenario" />
          
          {selectedScenario.points.map((point: any, idx: number) => (
            <button
              key={idx}
              className={`absolute size-10 rounded-full flex items-center justify-center transition-all animate-pulse ${activeNode?.categoryId === point.categoryId ? 'bg-primary scale-125 shadow-lg z-20' : 'bg-red-600 hover:scale-110 z-10'}`}
              style={{ left: `${point.x}%`, top: `${point.y}%`, transform: 'translate(-50%, -50%)' }}
              onClick={() => setActiveNode(point)}
            >
              <span className="material-symbols-outlined text-white text-[20px] fill-current">water_drop</span>
              <div className="absolute -inset-4 rounded-full border-2 border-current opacity-30 animate-ping"></div>
            </button>
          ))}

          <div className="absolute bottom-6 left-6 bg-black/60 backdrop-blur-md px-6 py-3 rounded-lg text-white border border-white/10 flex items-center gap-3">
             <span className="material-symbols-outlined text-primary fill-current">info</span>
             <p className="text-sm font-medium">点击红色标记查看对应区域的净化设备</p>
          </div>
        </div>

        {/* Selected Category Detail */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-4 gap-10">
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <h3 className="font-bold text-gray-800 mb-4 border-b border-gray-50 pb-2">场景产品分类</h3>
              <div className="space-y-2">
                {selectedScenario.linkedCategories.map((catId: string) => {
                  const cat = categories.find((c: any) => c.id === catId);
                  return (
                    <button 
                      key={catId}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all text-sm font-medium flex items-center justify-between ${activeNode?.categoryId === catId ? 'bg-primary text-white shadow-md' : 'hover:bg-gray-50 text-gray-600'}`}
                      onClick={() => setActiveNode({ categoryId: catId })}
                    >
                      {cat?.name}
                      <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>

          <div className="lg:col-span-3">
            {activeNode ? (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center justify-between">
                   <h2 className="text-2xl font-bold text-gray-800">{categories.find((c: any) => c.id === activeNode.categoryId)?.name} (推荐方案)</h2>
                   <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-400">排序：</span>
                      <select className="text-sm border-gray-200 rounded-lg focus:ring-primary focus:border-primary">
                        <option>推荐产品</option>
                        <option>价格从低到高</option>
                        <option>销量优先</option>
                      </select>
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {scenarioProducts.map((p: any) => (
                    <div key={p.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 hover:shadow-lg transition-all group">
                      <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-50 mb-4">
                        <img src={p.imageUrl} className="w-full h-full object-cover group-hover:scale-105 transition-transform" alt={p.name} />
                        <div className="absolute top-3 left-3 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded">高性能推荐</div>
                      </div>
                      <h4 className="font-bold text-gray-800 mb-2">{p.name}</h4>
                      <p className="text-xs text-gray-500 mb-6 line-clamp-2">{p.description}</p>
                      <div className="flex items-center justify-between">
                         <div className="flex flex-col">
                            <span className="text-xs text-gray-400">商城价</span>
                            <span className="text-xl font-black text-primary">¥{p.price}</span>
                         </div>
                         <div className="flex gap-2">
                           <button className="px-4 py-2 border border-gray-200 rounded-lg text-xs font-bold hover:bg-gray-50 transition-colors">比价</button>
                           <button className="px-4 py-2 bg-primary text-white rounded-lg text-xs font-bold hover:bg-primary-dark transition-colors">立即下单</button>
                         </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="h-96 flex flex-col items-center justify-center text-gray-300 border-2 border-dashed border-gray-100 rounded-2xl bg-white">
                <span className="material-symbols-outlined text-6xl mb-4">touch_app</span>
                <p className="text-lg font-bold">请点击场景中的标记点，开始您的采购旅程</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

export default ScenarioProcurement;
