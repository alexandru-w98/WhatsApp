import * as styles from "./tutorial-video.module.css";
import React, { useRef, useState } from "react";
import loginTutorial from "../../assets/images/login-tutorial.png";
import loginTutorialVideo from "../../assets/media/login-qr.mp4";
import { ArrowRight } from "../../components/icons";
import { Link } from "react-router-dom";

const TutorialVideo = () => {
  const [isVideoActive, setIsVideoActive] = useState(false);
  const videoRef = useRef(null);

  const onVideoPlay = () => {
    setIsVideoActive(true);
    videoRef.current.play();
  };

  return (
    <div className={styles["tutorial"]}>
      <div className={styles["tutorial__title"]}>Tutorial</div>
      <Link className={styles["tutorial__link"]} to="#">
        Need help to get started?
      </Link>
      <div className={styles["tutorial__media"]}>
        {!isVideoActive && (
          <button className={styles["media__button"]} onClick={onVideoPlay}>
            <ArrowRight />
          </button>
        )}
        <div className={styles["media-container"]}>
          <video controls ref={videoRef} className={styles["media"]}>
            <source src={loginTutorialVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {!isVideoActive && (
            <img
              src={loginTutorial}
              draggable={false}
              className={styles["media"]}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TutorialVideo;
