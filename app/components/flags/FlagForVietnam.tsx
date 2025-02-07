type FlagForVietnamProps = {
    size: string;
};
      
const FlagForVietnam = ({ size }: FlagForVietnamProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 64 64"><circle cx="32" cy="32" r="30" fill="#f42f4c"/><path fill="#ffe62e" d="m32 39l9.9 7l-3.7-11.4l9.8-7.4H35.8L32 16l-3.7 11.2H16l9.8 7.4L22.1 46z"/></svg>
);

export default FlagForVietnam; 