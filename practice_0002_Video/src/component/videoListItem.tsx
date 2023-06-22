import { videoListType } from "../type";

// assets
import playBtn from "../assets/videoList/playBtn.png";

// props
type VideoListItemProps = {
  info: videoListType;
  onPlayBtnClick: () => void;
};

export default function VideoListItem({
  info,
  onPlayBtnClick,
}: VideoListItemProps) {
  return (
    // container
    <div className="w-full min-w-[100%] select-none flex flex-col items-center justify-center">
      {/* 동영상정보 */}
      <div className="w-full flex flex-col items-center justify-center ">
        {/* 회차, 제목*/}
        <div className="h-[25px]">
          {/* 회차 */}
          {info.index !== 0 ? (
            <span className="mr-1">{`[${info.index}화]`}</span>
          ) : (
            <span className="mr-1">{`[프롤로그]`}</span>
          )}
          {/* 제목 */}
          <span className="font-bold">{info.title}</span>
        </div>

        {/* 섬네일 */}
        <div className="relative w-full flex items-center justify-center">
          <img
            src={info.thumbnailUrl}
            alt=""
            width={"80%"}
            className="mt-5 mb-5 rounded-3xl"
          />

          {/* 버튼 */}
          {/* 재생버튼 */}
          <div className="absolute top-0 w-full h-full flex items-center justify-center">
            <img
              src={playBtn}
              alt=""
              width={"20%"}
              onClick={onPlayBtnClick}
              className="cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
