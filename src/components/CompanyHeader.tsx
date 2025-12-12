import logo from 'figma:asset/1bcebbebdeca114bb54a8da607b649cd40cadd65.png';
import { AuthButton } from './AuthButton';

export function CompanyHeader() {
  return (
    <div className="bg-white border-b-4 border-black mb-6">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center">
          <div className="flex justify-between items-start w-full mb-4">
            <div className="flex-1"></div>
            <img src={logo} alt="Silver Bay Seafoods" className="h-20" />
            <div className="flex-1 flex justify-end">
              <AuthButton />
            </div>
          </div>
          <h1 className="text-slate-900 text-center">Silver Bay Seafoods</h1>
          <div className="bg-black text-white px-8 py-2 mt-2 w-full text-center">
            <h2 className="text-white">EMPLOYEE-Injury/Illness Report</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
