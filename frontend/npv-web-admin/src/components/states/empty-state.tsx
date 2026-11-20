import { NpvButton } from "../button";
import Lottie from "react-lottie";
import emptyStateJson from "../../assets/lottie/emptyState.json";
import { ReactNode } from "react";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: emptyStateJson,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};

export const EmptyState = ({ text, btnText, btnFn }: IEmptyState) => {
  return (
    <div className="w-full min-h-[500px] mt-20 rounded-[8px] border-gray-400 border-dashed bg-gray-100 border p-6 lg:p-10 flex justify-center items-center text-center">
      <div>
        <Lottie options={defaultOptions} height={200} width={200} />
        <p className="text-[18px] font-semibold my-4">{text}</p>
        {btnText && btnFn && <NpvButton click={btnFn}>{btnText}</NpvButton>}
      </div>
    </div>
  );
};

interface IEmptyState {
  text: string;
  btnText?: ReactNode;
  btnFn?: () => void;
}
