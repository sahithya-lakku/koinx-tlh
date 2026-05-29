import { useState } from 'react';

export default function DisclaimerBanner() {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-[#141829] border border-[#2a2f42] rounded-xl overflow-hidden mb-6">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left"
      >
        <div className="flex items-center gap-2 text-blue-400 font-medium text-sm">
          <span className="text-lg">ℹ️</span>
          Important Notes And Disclaimers
        </div>
        <span className={`text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>▼</span>
      </button>
      {open && (
        <div className="px-5 pb-4 text-sm text-gray-400 border-t border-[#2a2f42] pt-3 space-y-2">
          <p>• Tax loss harvesting involves selling assets at a loss to offset capital gains and reduce tax liability.</p>
          <p>• The calculations shown are estimates based on the data provided and may not reflect actual tax obligations.</p>
          <p>• Please consult a qualified tax professional before making any investment decisions.</p>
          <p>• Past performance of assets does not guarantee future results.</p>
        </div>
      )}
    </div>
  );
}
