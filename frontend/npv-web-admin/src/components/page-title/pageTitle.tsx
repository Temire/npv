import { ReactNode } from "react";

export const PageTitle = ({ title, subtitle, children }: IPageTitleProps) => {
  return (
    <div className="mb-6">
      <div className="w-full flex flex-wrap items-center justify-between gap-10">
        <div>
          <h2 className="text-[28px] font-semibold text-[black] mb-2 lg:mb-4 leading-[1]">
            {title}
          </h2>
          {subtitle && (
            <p className="text-[14px] font-normal text-npv_grey">{subtitle}</p>
          )}
        </div>
        {children}
      </div>
    </div>
  );
};
interface IPageTitleProps {
  title: string;
  subtitle?: string;
  children?: ReactNode;
}
