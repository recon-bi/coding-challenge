import PageLayout from "layouts/PageLayout";
import MDBox from "ui/MDBox";
import "assets/styles/animation/heavySnow.scss";
import React from "react";
import Checkbox from "@mui/material/Checkbox";
import MDTypography from "ui/MDTypography";

export default function Snow({ children }: any) {
  const [snow, setSnow] = React.useState<boolean>(false)
  return (
    <PageLayout>
      <MDBox display="flex" pt={1}>
        <MDBox>
          <Checkbox onChange={() => setSnow(!snow)} />
        </MDBox>
        <MDBox>
          <MDTypography fontSize="0.8rem" mt={1.2}>
            Make it snow
          </MDTypography>

        </MDBox>
      </MDBox>

      <MDBox overflow="hidden" width="100vw" height="100vh">
        {" "}
        <div className="header">
          {children}
        </div>
        {
          snow &&
          <div className="wrapper">
            <div className="snow layer1 a"></div>
            <div className="snow layer1"></div>
            <div className="snow layer2 a"></div>
            <div className="snow layer2"></div>
            <div className="snow layer3 a"></div>
            <div className="snow layer3"></div>
          </div>
        }

      </MDBox>
    </PageLayout>
  );
}
