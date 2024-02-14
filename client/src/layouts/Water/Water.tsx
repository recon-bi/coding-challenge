import PageLayout from "layouts/PageLayout";
import MDBox from "ui/MDBox";
import "assets/styles/animation/waves.css";
import "assets/styles/animation/bubbles.css";

export default function Water({ children }: any) {
  return (
    <PageLayout>
      <MDBox overflow="hidden" width="100vw" height="100vh">
        {" "}
        <div className="header">

          {children}

          <div>
            <svg
              className="waves"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 24 150 28"
              preserveAspectRatio="none"
              shapeRendering="auto"
            >
              <defs>
                <path
                  id="gentle-wave"
                  d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
                />
              </defs>
              <g className="parallax">
                <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7" />
                <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
                <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
                <use xlinkHref="#gentle-wave" x="48" y="7" fill="#fff" />
              </g>
            </svg>
          </div>
        </div>
        <div className="bubble bubble--1" />
        <div className="bubble bubble--2" />
        <div className="bubble bubble--3" />
        <div className="bubble bubble--4" />
        <div className="bubble bubble--5" />
        <div className="bubble bubble--6" />
        <div className="bubble bubble--7" />
        <div className="bubble bubble--8" />
        <div className="bubble bubble--9" />
        <div className="bubble bubble--10" />
        <div className="bubble bubble--11" />
        <div className="bubble bubble--12" />
      </MDBox>
    </PageLayout>
  );
}
