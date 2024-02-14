// @mui material components
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Icon from "@mui/material/Icon";
import { Theme } from "@mui/material/styles";

// Material Dashboard 2 PRO React TS components
import MDBox from "ui/MDBox";
import MDTypography from "ui/MDTypography";

// Material Dashboard 2 PRO React TS Base Styles
import typography from "assets/theme/base/typography";

const APP_NAME = import.meta.env.VITE_APPLICATION_NAME

function Footer({ light }: { light?: boolean }): JSX.Element {
  const { size } = typography;

  return (
    <MDBox position="absolute" width="100%" bottom={0} py={4}>
      <Container>
        <MDBox
          width="100%"
          display="flex"
          flexDirection={{ xs: "column", lg: "row" }}
          justifyContent="space-between"
          alignItems="center"
          px={1.5}
        >
          <MDBox
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexWrap="wrap"
            color={light ? "white" : "text"}
            fontSize={size.sm}
          >
            &copy; {new Date().getFullYear()}, made with
            <MDBox fontSize={size.md} color={light ? "white" : "dark"} mb={-0.5} mx={0.25}>
              <Icon color="inherit" fontSize="inherit">
                favorite
              </Icon>
            </MDBox>
            by
            <Link href="https://www.skewb.co.uk/" target="_blank">
              <MDTypography variant="button" fontWeight="medium" color={light ? "white" : "dark"}>
                {APP_NAME}
              </MDTypography>
            </Link>
            for a better web.
          </MDBox>
          <MDBox
            component="ul"
            sx={({ breakpoints }: Theme) => ({
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              listStyle: "none",
              mt: 3,
              mb: 0,
              p: 0,

              [breakpoints.up("lg")]: {
                mt: 0,
              },
            })}
          />
        </MDBox>
      </Container>
    </MDBox>
  );
}

// Declaring default props for Footer
Footer.defaultProps = {
  light: false,
};

export default Footer;
